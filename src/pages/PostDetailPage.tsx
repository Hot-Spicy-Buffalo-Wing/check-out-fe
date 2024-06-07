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
      mt="md"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80vw',
        height: '80vh',
      }}
    >
      <Box
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '20%',
            borderBottom: '1px solid lightgrey',
          }}
        >
          <Group
            gap="xs"
            variant="apart"
            style={{
              marginBottom: '20px',
              marginTop: theme.spacing.sm,
              height: '50px',
            }}
          >
            <Text
              fw={700}
              size="xl"
              style={{
                fontFamily: 'Roboto, sans-serif',
              }}
            >
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
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: theme.spacing.sm,
            }}
          >
            <Box
              style={{
                display: 'flex',
              }}
            >
              <Avatar src={authorAvatarUrl} size={50} radius="xl" />
              <Stack
                gap={0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '5px',
                }}
              >
                <Text fw={500}>{post.author.name}</Text>
                <Text size="xs" c="dimmed">
                  Author
                </Text>
              </Stack>
            </Box>
            <Text>{'작성일: ' + post.createdAt.substring(0, 10)}</Text>
          </Group>
        </Box>

        <Box style={{ display: 'flex', height: '80%', width: '100%' }}>
          <Box
            display="flex"
            style={{
              overflow: 'auto',
              width: '55%',
              justifyContent: post.imageUrls.length > 1 ? '' : 'center',
              alignItems: 'center',
            }}
          >
            {post.imageUrls.map((url) => (
              <Image src={url} key={url} h={500} />
            ))}
          </Box>
          <Text
            style={{
              marginTop: '20px',
              marginLeft: '50px',
              lineHeight: 1.6,
              width: '45%',
              borderLeft: '1px solid lightgrey',
              paddingLeft: '20px',
            }}
          >
            {post.contents.body}
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

export default PostDetailPage;
