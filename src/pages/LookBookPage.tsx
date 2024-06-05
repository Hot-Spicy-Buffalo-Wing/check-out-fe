import { Box, Text, Image } from '@mantine/core';
import useSWR from 'swr';
import { LookBook } from '../api/ai';

const LookBookPage = () => {
  const { data } = useSWR<{ total: number; list: LookBook[] }>('/ai');

  return (
    <Box>
      {data?.list.map((lookBook) => (
        <Box key={lookBook.id} w={300} h={400} bd="1px solid black">
          <Image
            src={lookBook.imageUrl}
            alt={lookBook.prompt}
            h={200}
            fit="contain"
          />
          <Text>{lookBook.prompt}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default LookBookPage;
