import {
  Box,
  Button,
  Grid,
  Image,
  LoadingOverlay,
  MantineProvider,
  Modal,
  Select,
  createTheme,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { LookBook, createLookBook } from '../api/ai';
import { updateUser } from '../api/auth';
import area from '../data/area';
import useUser from '../hooks/useUser';
import Swal from 'sweetalert2';

const genderOptions = [
  { value: '여자', label: '여자' },
  { value: '남자', label: '남자' },
  { value: '논바이너리', label: '논바이너리' },
];

const ageRangeOptions = [
  { value: '20대 초반', label: '20대 초반' },
  { value: '20대 후반', label: '20대 후반' },
  { value: '30대 초반', label: '30대 초반' },
  { value: '30대 후반', label: '30대 후반' },
  { value: '40대 초반', label: '40대 초반' },
  { value: '40대 후반', label: '40대 후반' },
  { value: '50대 초반', label: '50대 초반' },
  { value: '50대 후반', label: '50대 후반' },
];

const theme = createTheme({
  components: {
    Modal: {
      styles: {
        body: {
          maxWidth: 400,
          margin: 'auto',
        },
      },
    },
  },
});

function MainPage() {
  const [userInfo, setUserInfo] = useState(
    { gender: '', ageRange: '' } || null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [gender, setGender] = useState<string | null>('');
  const [ageRange, setAgeRange] = useState<string | null>('');
  const [error, setError] = useState('');
  const [selectedTPO, setSelectedTPO] = useState<string[]>([]);
  const [province, setProvince] = useState<string>('서울특별시');
  const [city, setCity] = useState<string>('강남구');
  const [district, setDistrict] = useState<string>('청담동');
  const today = new Date().toISOString().split('T')[0];
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const { data: lookBookData } = useSWR<{ total: number; list: LookBook[] }>(
    '/ai'
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!user) {
          return null;
        }

        setUserInfo(user);

        if (!user.gender || !user.ageRange) {
          setIsModalOpen(true);
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err);
        console.log(userInfo);
      }
    };

    fetchUserInfo();
  }, [user, userInfo]);

  const renderTodayLookBook = () => {
    if (!lookBookData || !lookBookData.list || lookBookData.list.length === 0) {
      return <img src="../data/no_image.png" alt="Default" />;
    }

    const lastItemCreatedAt = new Date(
      lookBookData.list[lookBookData.list.length - 1].createdAt
    )
      .toISOString()
      .split('T')[0];
    if (lastItemCreatedAt === today) {
      return (
        <Image
          src={lookBookData.list[lookBookData.list.length - 1].imageUrl}
          alt="Today's Look"
          width="100%"
          radius="md"
          fit="contain"
          height={600}
        />
      );
    } else {
      return <img src="../data/no_image.png" alt="Default" />;
    }
  };

  const handleTPOSelect = (tpo: string) => {
    setSelectedTPO((prevTPO) => {
      if (prevTPO.includes(tpo)) {
        return prevTPO.filter((item) => item !== tpo);
      } else {
        return [...prevTPO, tpo];
      }
    });
  };

  const handleSubmit = async () => {
    if (!selectedTPO.length) {
      Swal.fire({
        icon: 'error',
        title: 'Please select at least one TPO!',
        showConfirmButton: false,
        timer: 1500,
      });
      return null;
    }

    try {
      setLoading(true);
      await createLookBook({
        area: { province, city, district },
        TPO: selectedTPO,
      });
    } catch (err: any) {
      setError(
        'Failed to create look book: ' +
          (err.response?.data?.message || err.message)
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!gender || !ageRange) {
      return null;
    }

    try {
      await updateUser({ gender, ageRange });
      setUserInfo({ gender, ageRange });
      setIsModalOpen(false);
    } catch (err: any) {
      setError(
        'Failed to update user info: ' +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <MantineProvider theme={theme}>
      <h1>Welcome to the Main Page</h1>
      <LoadingOverlay visible={loading} />
      <Grid>
        <Box style={{ padding: '10px', width: '50%' }}>
          {renderTodayLookBook()}
        </Box>
        <div style={{ width: '50%', paddingLeft: '10px' }}>
          <div>
            <h2>오늘, 나의 TPO</h2>
            <div>
              <Select
                value={province}
                onChange={(value) => {
                  if (!value) return;
                  setProvince(value);
                  setCity(Object.keys(area[value])[0]);
                  setDistrict(
                    Object.keys(area[value][Object.keys(area[value])[0]])[0]
                  );
                }}
                data={Object.keys(area)}
              />
              <Select
                value={city}
                onChange={(value) => {
                  if (!value) return;
                  setCity(value);
                  setDistrict(Object.keys(area[province][value])[0]);
                }}
                data={Object.keys(area[province])}
              />
              <Select
                value={district}
                onChange={(value) => value && setDistrict(value)}
                data={Object.keys(area[province][city])}
              />
            </div>
            <Box display="flex" style={{ gap: 4, flexWrap: 'wrap' }}>
              {[
                '꾸안꾸',
                '여름코디',
                '데일리',
                '데이트',
                '캠퍼스룩',
                '여행',
                '출근룩',
                '하객룩',
                '휴양지',
                '놀이공원',
                '카페',
                '운동',
                '축제',
                '파티',
                '소개팅',
              ].map((option) => (
                <Button
                  key={option}
                  style={
                    selectedTPO.includes(option)
                      ? { backgroundColor: 'green' }
                      : {}
                  }
                  onClick={() => handleTPOSelect(option)}
                >
                  {option}
                </Button>
              ))}
            </Box>
          </div>
          {/* Submit Button */}
          <Button onClick={handleSubmit}>
            check-out, 오늘 입을 옷 추천해줘
          </Button>
        </div>
      </Grid>

      <Box display="flex" style={{ flexDirection: 'column' }}>
        <Link to="/look-books">LookBook list</Link>
        <Link to="/posts">Post list</Link>
      </Box>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="당신에 대해 알고 싶어요!"
      >
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Select
          label="Gender"
          placeholder="Select your gender"
          data={genderOptions}
          value={gender}
          onChange={setGender}
          required
        />
        <Select
          label="Age Range"
          placeholder="Select your age range"
          data={ageRangeOptions}
          value={ageRange}
          onChange={setAgeRange}
          required
        />
        <Button onClick={handleSave}>이렇게 알려주기</Button>
      </Modal>
    </MantineProvider>
  );
}

export default MainPage;
