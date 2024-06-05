import { Table } from '@mantine/core';

import useSWR from 'swr';
import { Post } from '../api/post';

const PostListPage = () => {
  const { data } = useSWR<{ total: number; list: Post[] }>('/post');

  return (
    <Table>
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
            <Table.Td>{post.contents.title}</Table.Td>
            <Table.Td>{post.author.name}</Table.Td>
            <Table.Td>{post.views}</Table.Td>
            <Table.Td>{post.createdAt}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default PostListPage;
