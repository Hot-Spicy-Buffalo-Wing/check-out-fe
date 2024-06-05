import { useState, useEffect } from 'react';
import {
  Modal,
  Select,
  Box,
  Button,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import api from '../api';
import useUser from '../hooks/useUser';
import { updateUser } from '../api/auth';

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

  const { user, loading } = useUser();

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
      <p>Gender: {userInfo.gender}</p>
      <p>Age Range: {userInfo.ageRange}</p>

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
