import { useParams } from 'react-router-dom';
import useSWR from 'swr/immutable';
import { Post } from '../api/post';
import {
  Box,
  Image,
  Container,
  useMantineTheme,
  Group,
  Text,
  Badge,
  Stack,
  Avatar,
} from '@mantine/core';
import { IconEye } from '@tabler/icons-react';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useMantineTheme();
  const authorAvatarUrl =
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F106359%2Favatar&psig=AOvVaw3tt-sI6a36VQQSXBGGetlI&ust=1717833453425000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJiI1LeCyYYDFQAAAAAdAAAAABAQ';

  const { data: post, error } = useSWR<Post>(`/post/${id}`);

  if (!id) return null;
  if (error) return <div>Error</div>;
  if (!post) return null;

  return (
    <Container
      size="sm"
      mt="md"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
      }}
    >
      <Box>
        <Group
          gap="xs"
          variant="apart"
          style={{ marginBottom: 10, marginTop: theme.spacing.sm }}
        >
          <Text fw={700} size="xl" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {post.contents.title}
          </Text>
          <Badge color="pink" variant="filled" size="lg">
            <Group>
              <IconEye size={18} />
              <Text>{post.views}</Text>
            </Group>
          </Badge>
        </Group>

        <Group
          gap="xs"
          align="center"
          style={{ marginBottom: theme.spacing.sm }}
        >
          <Avatar src={authorAvatarUrl} size={50} radius="xl" />
          <Stack gap={0}>
            <Text fw={500}>{post.author.name}</Text>
            <Text size="xs" c="dimmed">
              Author
            </Text>
          </Stack>
        </Group>

        <Text
          size="sm"
          style={{ marginTop: theme.spacing.sm, lineHeight: 1.6 }}
        >
          {post.contents.body}
        </Text>
        <Box display="flex" style={{ gap: 4 }}>
          {post.imageUrls.map((url) => (
            <Image src={url} key={url} h={400} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default PostDetailPage;
