import { Button } from '@ui/button';
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { UserXIcon } from 'lucide-react';

export default function UserWithdrawButton() {
  // TODO

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type={'button'} variant={'destructive'} size={'sm'}>
          <UserXIcon /> 탈퇴하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>탈퇴 기능은 아직 지원하지 않습니다.</DialogTitle>
          <DialogDescription>추후에 지원할 예정이니 조금만 기다려주세요!</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCloseButton>취소하기</DialogCloseButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
