import { Box, Button, Image, Input, Text, Textarea } from '@mantine/core';
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
    <Box
      display="flex"
      style={{ flexDirection: 'column', gap: 4 }}
      p={4}
      component="form"
      onSubmit={upload}
    >
      <Box display="flex" style={{ alignItems: 'center', gap: 4 }} ta="right">
        <Text style={{ width: 80 }}>Title</Text>
        <Input name="titleText" required />
      </Box>
      <Box display="flex" style={{ gap: 4 }}>
        <Text style={{ width: 80 }} ta="right">
          Content
        </Text>
        <Textarea name="content" required />
      </Box>
      <Box display="flex" style={{ gap: 4 }}>
        <Text style={{ width: 80 }} ta="right">
          Selected LookBooks
        </Text>
        <Box
          miw={200}
          mih={200}
          bd="1px solid black"
          display="flex"
          style={{ gap: 4 }}
        >
          {imageUrls.map((url) => (
            <Image key={url} src={url} alt="LookBook" h={300} fit="contain" />
          ))}
        </Box>
      </Box>
      <LookBookSelectModalButton
        onAddLookBook={(lookBook: LookBook) =>
          setImageUrls([...imageUrls, lookBook.imageUrl])
        }
      />
      <Button type="submit">Create Post</Button>
    </Box>
  );
};

export default PostCreatePage;
