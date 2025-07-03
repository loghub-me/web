import { UserRoundPenIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

interface UsernameUpdateDialogProps {
  children: React.ReactNode;
}

export default function UsernameUpdateDialog({ children }: Readonly<UsernameUpdateDialogProps>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-32">
          <UserRoundPenIcon /> 유저네임 변경
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>유저네임 변경</DialogTitle>
          <DialogDescription>유저네임은 30일에 한 번만 변경할 수 있습니다. 신중하게 변경해주세요.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
