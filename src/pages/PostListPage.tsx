import { Box, Table, Button } from '@mantine/core';

import useSWR from 'swr';
import { Post } from '../api/post';
import { Link } from 'react-router-dom';

const PostListPage = () => {
  const { data } = useSWR<{ total: number; list: Post[] }>('/post');

  return (
    <Box
      display="flex"
      style={{
        flexDirection: 'column',
        gap: 8,
        alignItems: 'center',
        paddingBlock: '30px',
      }}
    >
      <Box>
        <Link to="/posts/create">
          <Button>Create Post</Button>
        </Link>
      </Box>
      <Table style={{ width: '80vw', marginTop: '20px' }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: 'center' }}>Id</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Title</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Author</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Views</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>CreatedAt</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.list.map((post) => (
            <Table.Tr
              key={post.id}
              style={{ borderBottomWidth: '10px', borderColor: '#ffffff' }}
            >
              <Table.Td style={{ padding: '20px 0px', textAlign: 'center' }}>
                {post.id}
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <Link to={`/posts/${post.id}`}>{post.contents.title}</Link>
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                {post.author.name}
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>{post.views}</Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                {post.createdAt.substring(0, 10)}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default PostListPage;
