import { Box, Text } from '@mantine/core';
import useSWR from 'swr';
import { LookBook } from '../api/ai';

const LookBookPage = () => {
  const { data } = useSWR<{ total: number; list: LookBook[] }>('/ai');

  return (
    <Box>
      {data?.list.map((lookBook) => (
        <Box key={lookBook.id}>
          <img src={lookBook.imageUrl} alt={lookBook.prompt} />
          <Text>{lookBook.prompt}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default LookBookPage;
