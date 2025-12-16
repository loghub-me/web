'use client';

import { handleError } from '@/lib/error';
import { defaultInputFileProps, uploadAvatarFile } from '@/lib/image/upload';
import { buildAssetsUrl } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState } from 'react';

interface UserAvatarFormProps {
  session: Session;
}

export default function UserAvatarForm({ session }: Readonly<UserAvatarFormProps>) {
  const [version, setVersion] = useState(0);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const inputFileProps = {
    ...defaultInputFileProps,
    ref: inputFileRef,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      uploadAvatarFile(e)
        .then(() => setVersion((prev) => prev + 1))
        .catch(handleError),
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="size-48 cursor-pointer" onClick={() => inputFileRef.current?.click()}>
        <AvatarImage key={version} src={buildAssetsUrl(`${session.id}/avatar.webp?${new Date().getTime()}`)} />
        <AvatarFallback>{session.username[0]}</AvatarFallback>
        <Button
          type={'button'}
          variant={'secondary'}
          onClick={() => inputFileRef.current?.click()}
          className="absolute bottom-2 left-2 border-border"
        >
          <ImageUpIcon /> 변경
        </Button>
      </Avatar>
      <input {...inputFileProps} />
      <p className="text-sm text-center text-muted-foreground">
        변경 후, 브라우저 캐시로 인해 즉시 반영되지 않을 수 있습니다. 잠시만 기다려 주세요.
      </p>
    </div>
  );
}
