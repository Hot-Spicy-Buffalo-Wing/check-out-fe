import api from '.';

interface LookBookPayload {
  area: {
    province: string;
    city: string;
    district: string;
  };
  TPO: string[];
}

interface LookBook {
  id: number;
  createdAt: string;
  authorId: string;
  prompt: string;
  imageUrl: string;
}

export const getLookBookList = () =>
  api.get<{ total: number; list: LookBook[] }>('/ai').then((res) => res.data);

export const createLookBook = (payload: LookBookPayload) =>
  api
    .post<{ prompt: string; imageUrl: string }>('/ai', payload)
    .then((res) => res.data);

export const getLookBook = (id: number) =>
  api.get<LookBook>(`/ai/${id}`).then((res) => res.data);

export const deleteLookBook = (id: number) =>
  api.delete<{ message: string }>(`/ai/${id}`).then((res) => res.data);
