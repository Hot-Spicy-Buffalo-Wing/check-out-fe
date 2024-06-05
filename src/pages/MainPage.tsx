import { useState, useEffect } from 'react';
import {
  Modal,
  Select,
  Box,
  Button,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import useSWR from 'swr';
import { LookBook, createLookBook } from '../api/ai';
import useUser from '../hooks/useUser';
import { updateUser } from '../api/auth';
import { Link } from 'react-router-dom';

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
  const today = new Date().toISOString().split('T')[0];

  const { user } = useUser();
  const { data } = useSWR<{ total: number; list: LookBook[] }>('/ai');
  const lookBookData = data;

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
      }
    };

    fetchUserInfo();
  }, [user]);

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
        <img
          src={lookBookData.list[lookBookData.list.length - 1].imageUrl}
          alt="Today's Look"
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
      return null;
    }

    const area = {
      province: '서울특별시',
      city: '강남구',
      district: '역삼동',
    };

    try {
      await createLookBook({ area: area, TPO: selectedTPO });
    } catch (err: any) {
      setError(
        'Failed to create look book: ' +
          (err.response?.data?.message || err.message)
      );
      console.error(err);
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
      <div>{renderTodayLookBook()}</div>

      <div>
        <h2>오늘, 나의 TPO</h2>
        {/* Select Boxes */}
        <div>
          {/* First Select Box */}
          <select>{/* Options */}</select>
          {/* Second Select Box */}
          <select>{/* Options */}</select>
          {/* Third Select Box */}
          <select>{/* Options */}</select>
        </div>
        {/* Toggle Button */}
        <div></div>
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
          <button
            key={option}
            style={{
              backgroundColor: selectedTPO.includes(option)
                ? 'green'
                : 'initial',
            }}
            onClick={() => handleTPOSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {/* Submit Button */}
      <button onClick={handleSubmit}>check-out, 오늘 입을 옷 추천해줘</button>
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
