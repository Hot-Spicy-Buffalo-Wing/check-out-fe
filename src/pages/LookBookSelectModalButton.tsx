import { Box, Button, Modal, Text, Image } from '@mantine/core';
import { useState } from 'react';
import useSWR from 'swr';
import { LookBook } from '../api/ai';

interface LookBookSelectModalButtonProps {
  onAddLookBook: (lookBook: LookBook) => void;
}

const LookBookSelectModalButton = ({
  onAddLookBook,
}: LookBookSelectModalButtonProps) => {
  const { data } = useSWR<{ total: number; list: LookBook[] }>('/ai');
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setShow(true)}
        style={{ width: '100%' }}
      >
        Select LookBooks
      </Button>
      <Modal
        opened={show}
        onClose={() => setShow(false)}
        title={<Text size="lg">Select LookBook</Text>}
      >
        <Box
          w="100%"
          display="flex"
          style={{ flexDirection: 'column', gap: 4 }}
        >
          {data?.list.map((lookBook) => (
            <Box
              key={lookBook.id}
              bd="1px solid black"
              style={{
                position: 'relative',
                paddingTop: '20px',
                height: '550px',
              }}
            >
              <Image
                src={lookBook.imageUrl}
                alt={lookBook.prompt}
                h={220}
                fit="contain"
              />
              <Text style={{ margin: '30px 20px' }}>{lookBook.prompt}</Text>
              <Button
                onClick={() => {
                  onAddLookBook(lookBook);
                  setShow(false);
                }}
                style={{ position: 'absolute', right: 5, bottom: 5 }}
              >
                Add
              </Button>
            </Box>
          ))}
        </Box>
      </Modal>
    </>
  );
};

export default LookBookSelectModalButton;
