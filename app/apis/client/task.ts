import { clientTaskAPI } from '~/apis/client/instance';

export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return clientTaskAPI.post('image/upload', { body: formData }).json<DataResponseBody<string>>();
};

export const uploadAvatar = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return clientTaskAPI.post('avatar/upload', { body: formData }).json<DataResponseBody<string>>();
};
