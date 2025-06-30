import { toast } from 'sonner';
import { uploadImage } from '~/apis/client/users';

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
    error: '이미지 업로드에 실패했습니다.',
  });

  return result.unwrap().then(({ data }) => ({
    filename: file.name,
    path: data,
  }));
}
