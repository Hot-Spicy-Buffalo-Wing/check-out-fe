import { Box, Text, Image } from '@mantine/core';
import useSWR from 'swr';
import { LookBook } from '../api/ai';

const LookBookPage = () => {
  const { data } = useSWR<{ total: number; list: LookBook[] }>('/ai');

  return (
    <Box
      style={{
        display: 'flex',
        flex: 1,
        width: '100vw',
        alignItems: 'stretch',
        overflow: 'scroll',
      }}
    >
      {data?.list.map((lookBook) => (
        <Box
          key={lookBook.id}
          style={{
            flex: '0 0 min(400px, calc(100vw - 80px))',
            border: '1px solid #95afc0',
            borderRadius: '20px',
            padding: '20px',
            margin: '40px',
            backgroundColor: '#dff9fb',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Image
            src={lookBook.imageUrl}
            alt={lookBook.prompt}
            flex="1 0 0"
            h="0"
            fit="contain"
            style={{ marginBottom: '30px' }}
          />
          <Text>{lookBook.prompt}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default LookBookPage;
