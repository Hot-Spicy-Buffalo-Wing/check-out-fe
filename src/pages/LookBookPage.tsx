import { Box, Text, Image } from '@mantine/core';
import useSWR from 'swr';
import { LookBook } from '../api/ai';

const LookBookPage = () => {
  const { data } = useSWR<{ total: number; list: LookBook[] }>('/ai');

  return (
    <Box
      style={{
        display: 'flex',
        height: '80vh',
        width: '100vw',
        alignItems: 'center',
        overflow: 'scroll',
      }}
    >
      {data?.list.map((lookBook) => (
        <Box
          key={lookBook.id}
          style={{
            flex: '0 0 400px',
            border: '1px solid #95afc0',
            borderRadius: '20px',
            padding: '20px',
            margin: '40px',
            backgroundColor: '#dff9fb',
          }}
        >
          <Image
            src={lookBook.imageUrl}
            alt={lookBook.prompt}
            style={{ marginBottom: '30px' }}
          />
          <Text>{lookBook.prompt}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default LookBookPage;
