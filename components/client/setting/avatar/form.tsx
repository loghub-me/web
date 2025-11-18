'use client';

import { handleError } from '@/lib/error';
import { defaultInputFileProps, uploadAvatarFile } from '@/lib/image/upload';
import { buildAssetsUrl } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState } from 'react';

interface SettingAvatarFormProps {
  session: Session;
}

export default function SettingAvatarForm({ session }: Readonly<SettingAvatarFormProps>) {
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
      <Avatar className="border size-48 group cursor-pointer" onClick={() => inputFileRef.current?.click()}>
        <AvatarImage
          key={version}
          src={buildAssetsUrl(`${session.id}/avatar.webp?${new Date().getTime()}`)}
          className="transition-[scale] group-hover:scale-110"
        />
        <AvatarFallback>{session.username[0]}</AvatarFallback>
      </Avatar>
      <input {...inputFileProps} />
      <Button type={'button'} variant={'secondary'} onClick={() => inputFileRef.current?.click()}>
        <ImageUpIcon /> 사진 변경
      </Button>
    </div>
  );
}
