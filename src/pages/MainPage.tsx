import {
  Box,
  Button,
  Container,
  Grid,
  Image,
  LoadingOverlay,
  Modal,
  Select,
} from '@mantine/core';
import { useState } from 'react';
import useSWR from 'swr';
import { LookBook, createLookBook } from '../api/ai';
import area from '../data/area';
import useUser from '../hooks/useUser';
import Swal from 'sweetalert2';
import { Circles } from 'react-loader-spinner';

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

function MainPage() {
  const [gender, setGender] = useState<string | null>('');
  const [ageRange, setAgeRange] = useState<string | null>('');
  const [error, setError] = useState('');
  const [selectedTPO, setSelectedTPO] = useState<string[]>([]);
  const [province, setProvince] = useState<string>('서울특별시');
  const [city, setCity] = useState<string>('강남구');
  const [district, setDistrict] = useState<string>('청담동');
  const [loading, setLoading] = useState(false);

  const { user, updateUser } = useUser();
  const { data: lookBookData, mutate } = useSWR<{
    total: number;
    list: LookBook[];
  }>('/ai');

  const renderTodayLookBook = () => {
    if (!lookBookData) {
      return (
        <Container
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Circles />
        </Container>
      );
    } else if (lookBookData.list.length === 0) {
      return (
        <Container
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <p style={{ whiteSpace: 'pre-line' }}>
            {`최근 생성한 LookBook이 없습니다!
            오른쪽에서 정보를 선택하여 새로운 LookBook을 만들어주세요.`}
          </p>
        </Container>
      );
    }

    if (lookBookData.list[0].imageUrl) {
      return (
        <Image
          src={lookBookData.list[0].imageUrl}
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
      mutate();
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
    } catch (err: any) {
      setError(
        'Failed to update user info: ' +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <>
      <LoadingOverlay visible={loading} />
      <Grid>
        <Box style={{ width: '50%' }}>
          <h1 style={{ textAlign: 'center' }}>나의 메인 페이지</h1>
          <p style={{ textAlign: 'center' }}>가장 최근 생성한 나의 LookBook</p>
          {renderTodayLookBook()}
        </Box>
        <div style={{ width: '50%', paddingLeft: '10px' }}>
          <div style={{ width: '75%', height: '50vh' }}>
            <h2>나의 TPO 선택하기</h2>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '50px',
              }}
            >
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
            <Box display="flex" style={{ gap: 12, flexWrap: 'wrap' }}>
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
          <Button
            onClick={handleSubmit}
            style={{
              marginBottom: '100px',
              backgroundColor: 'pink',
              color: 'black',
            }}
          >
            입력한 정보를 바탕으로 입을 옷 추천 받기
          </Button>
        </div>
      </Grid>

      <Modal
        opened={!user?.ageRange || !user.gender}
        onClose={() => {}}
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
          style={{ marginBottom: '15px' }}
        />
        <Button onClick={handleSave}>이렇게 알려주기</Button>
      </Modal>
    </>
  );
}

export default MainPage;
