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
      <Button type="button" onClick={() => setShow(true)}>
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
              h={400}
              bd="1px solid black"
              style={{ position: 'relative' }}
            >
              <Image
                src={lookBook.imageUrl}
                alt={lookBook.prompt}
                h={200}
                fit="contain"
              />
              <Text>{lookBook.prompt}</Text>
              <Button
                onClick={() => {
                  onAddLookBook(lookBook);
                  setShow(false);
                }}
                style={{ position: 'absolute', right: 0, bottom: 0 }}
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
