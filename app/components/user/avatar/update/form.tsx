import { ImageIcon, UploadIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { updateSelfAvatar } from '~/apis/client/user';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { DialogClose } from '~/components/ui/dialog';
import { handleMessageError } from '~/lib/error';

interface UserAvatarUpdateFormProps {
  id: number;
  username: string;
}

export default function UserAvatarUpdateForm({ id, username }: Readonly<UserAvatarUpdateFormProps>) {
  const defaultAvatarSrc = `${import.meta.env.VITE_BUCKET_HOST}/${id}/avatar.webp`;
  const navigate = useNavigate();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatarSrc, setAvatarSrc] = useState(defaultAvatarSrc);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    setAvatarFile(file);
  }

  function onSubmit() {
    if (!avatarFile) {
      toast.error('먼저 변경할 프로필 사진을 선택해주세요.');
      return;
    }

    updateSelfAvatar(avatarFile)
      .then(() => {
        toast.success('프로필 사진이 성공적으로 변경되었습니다.');
        setAvatarSrc(`${defaultAvatarSrc}?t=${Date.now()}`); // Avoid caching issues
        navigate('/settings/profile');
      })
      .catch(handleMessageError);
  }

  useEffect(() => {
    if (!avatarFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarSrc(reader.result as string);
    };
    reader.readAsDataURL(avatarFile);
  }, [avatarFile]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <div
          className="absolute z-10 flex items-center justify-center w-full h-full bg-black/5 border cursor-pointer rounded-full backdrop-blur-xs opacity-0 transition-opacity hover:opacity-100"
          onClick={() => inputFileRef.current?.click()}
        >
          <p className="flex items-center gap-1">
            <ImageIcon className="size-4" /> 사진 변경
          </p>
        </div>

        <Avatar className="size-64 border">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback className="text-xs">{username[0]}</AvatarFallback>
        </Avatar>
        <input ref={inputFileRef} type="file" className="hidden" accept="image/*" onChange={onFileChange} />
      </div>
      <div className="flex justify-center gap-2">
        <DialogClose asChild>
          <Button type={'button'} variant={'ghost'}>
            <XIcon /> 닫기
          </Button>
        </DialogClose>
        <Button type={'button'} onClick={onSubmit}>
          <UploadIcon /> 수정
        </Button>
      </div>
    </div>
  );
}
