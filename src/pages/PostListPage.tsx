import { Box, Table, Button, useMantineTheme } from '@mantine/core';

import useSWR from 'swr';
import { Post } from '../api/post';
import { Link } from 'react-router-dom';

const PostListPage = () => {
  const { data } = useSWR<{ total: number; list: Post[] }>('/post');
  const theme = useMantineTheme();

  return (
    <Box style={{ padding: 32 }}>
      <Box display="flex" style={{ flexDirection: 'column', gap: 8 }}>
        <Table borderColor={theme.colors.cyan[4]}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Author</Table.Th>
              <Table.Th>Views</Table.Th>
              <Table.Th>CreatedAt</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.list.map((post) => (
              <Table.Tr key={post.id}>
                <Table.Td>{post.id}</Table.Td>
                <Table.Td>
                  <Link to={`/posts/${post.id}`}>{post.contents.title}</Link>
                </Table.Td>
                <Table.Td>{post.author.name}</Table.Td>
                <Table.Td>{post.views}</Table.Td>
                <Table.Td>{post.createdAt}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Box>
          <Link to="/posts/create">
            <Button>Create Post</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default PostListPage;
