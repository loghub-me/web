import { ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { UserAvatar } from '~/components/users';

interface UserAvatarUpdateDialogProps {
  username: string;
  children: React.ReactNode;
}

export default function UserAvatarUpdateDialog({ username, children }: Readonly<UserAvatarUpdateDialogProps>) {
  return (
    <Dialog>
      <DialogTrigger className="relative">
        <div className="absolute z-10 flex items-center justify-center w-full h-full bg-black/5 border cursor-pointer rounded-full backdrop-blur-xs opacity-0 transition-opacity hover:opacity-100">
          <p className="flex items-center gap-1">
            <ImageIcon className="size-4" /> 사진 변경
          </p>
        </div>
        <UserAvatar username={username} size={'xl'} />
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>프로필 사진 변경</DialogTitle>
          <DialogDescription>최대 10분 정도 소요될 수 있습니다.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
