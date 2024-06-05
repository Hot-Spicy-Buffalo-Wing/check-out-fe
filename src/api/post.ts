import api from '.';

interface PostPayload {
  title: string;
  body: string;
  imageUrls: string[];
}

interface Post {
  id: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    uuid: string;
  };
  contents: {
    title: string;
    body: string;
  };
  imageUrls: string[];
}

export const getPostList = (query: { page?: number; pageSize?: number }) =>
  api
    .get<{ total: number; list: Post[] }>('/post', { params: query })
    .then((res) => res.data);

export const createPost = (payload: PostPayload) =>
  api.post<Post>('/post', payload).then((res) => res.data);

export const getPost = (id: number) =>
  api.get<Post>(`/post/${id}`).then((res) => res.data);

export const updatePost = (
  id: number,
  payload: Omit<PostPayload, 'imageUrls'>,
) => api.patch<Post>(`/post/${id}`, payload).then((res) => res.data);

export const deletePost = (id: number) =>
  api.delete<{ message: string }>(`/post/${id}`).then((res) => res.data);
