import { updateSelfAvatar, uploadImage } from '@/apis/client/user';
import { toast } from 'sonner';

export const defaultInputFileProps: React.InputHTMLAttributes<HTMLInputElement> = {
  type: 'file',
  accept: 'image/*',
  className: 'hidden',
};

export async function uploadImageFile(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  if (!file) throw new Error('파일을 선택해주세요.');

  const result = toast.promise(() => uploadImage(file), {
    loading: '이미지를 업로드 중입니다.',
    success: '이미지가 업로드되었습니다.',
  });

  return result.unwrap().then(({ data }) => ({
    filename: file.name,
    path: data,
  }));
}

export async function uploadAvatarFile(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  if (!file) throw new Error('파일을 선택해주세요.');

  const result = toast.promise(() => updateSelfAvatar(file), {
    loading: '아바타를 업로드 중입니다.',
    success: '아바타가 업로드되었습니다. 완료까지 다소 시간이 걸릴 수 있습니다.',
  });

  return result.unwrap();
}
