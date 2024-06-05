import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { Post } from '../api/post';
import { Box, Image } from '@mantine/core';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: post, error } = useSWR<Post>(`/post/${id}`);

  if (!id) return null;
  if (error) return <div>Error</div>;
  if (!post) return null;

  return (
    <Box>
      <h1>{post.contents.title}</h1>
      <p>author: {post.author.name}</p>
      <p>views: {post.views}</p>
      <p>{post.contents.body}</p>
      <h2>Images</h2>
      <Box display="flex" style={{ gap: 4 }}>
        {post.imageUrls.map((url) => (
          <Image src={url} key={url} h={400} />
        ))}
      </Box>
    </Box>
  );
};

export default PostDetailPage;
