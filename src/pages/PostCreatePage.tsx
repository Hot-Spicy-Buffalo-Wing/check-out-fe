import { Box, Button, Image, Text, Textarea } from '@mantine/core';
import { useState } from 'react';
import { LookBook } from '../api/ai';
import LookBookSelectModalButton from './LookBookSelectModalButton';
import { createPost } from '../api/post';
import { useNavigate } from 'react-router-dom';

const PostCreatePage = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const navigate = useNavigate();

  const upload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createPost({
      title: e.currentTarget.titleText.value,
      body: e.currentTarget.content.value,
      imageUrls,
    });
    navigate(`/posts/${res.id}`);
  };

  return (
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        display="flex"
        style={{
          width: '80vw',
          height: '80vh',
          marginTop: '50px',
        }}
        p={4}
        component="form"
        onSubmit={upload}
      >
        <Box
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
          }}
        >
          <Box
            display="flex"
            style={{
              flexDirection: 'column',
              width: '80%',
            }}
            ta="right"
          >
            <Text style={{ width: 80, textAlign: 'left', marginBottom: '5px' }}>
              Title
            </Text>
            <Textarea
              name="titleText"
              required
              minRows={2}
              maxRows={2}
              style={{ width: '100%' }}
            />
          </Box>
          <Box
            display="flex"
            style={{
              flexDirection: 'column',
              width: '80%',
            }}
          >
            <Text
              style={{ width: 100, textAlign: 'left', marginBottom: '5px' }}
            >
              Content
            </Text>
            <Textarea
              name="content"
              autosize
              minRows={10}
              maxRows={10}
              required
              style={{ width: '100%' }}
            />
          </Box>
          <Box
            style={{
              width: '80%',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <LookBookSelectModalButton
              onAddLookBook={(lookBook: LookBook) =>
                setImageUrls([...imageUrls, lookBook.imageUrl])
              }
            />
          </Box>
          <Box
            style={{
              width: '80%',
            }}
          >
            <Button type="submit" style={{ width: '100%' }}>
              Create Post
            </Button>
          </Box>
        </Box>
        <Box
          style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            display="flex"
            style={{
              width: '80%',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ width: '300px', textAlign: 'left' }}>
              Selected LookBooks
            </Text>
            <Box
              miw={200}
              mih={200}
              bd="1px solid black"
              display="flex"
              style={{
                width: '300px',
                height: '76%',
                overflow: 'auto',
              }}
            >
              {imageUrls.map((url) => (
                <Image
                  key={url}
                  src={url}
                  alt="LookBook"
                  h={'100%'}
                  fit="contain"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostCreatePage;
