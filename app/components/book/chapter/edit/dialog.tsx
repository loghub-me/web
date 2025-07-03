import { CloudUploadIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

interface BookChapterEditDialogProps {
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function BookChapterEditDialog({ children, onOpenChange }: Readonly<BookChapterEditDialogProps>) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={'default'}>
          <CloudUploadIcon /> 수정하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>챕터 수정</DialogTitle>
          <DialogDescription>챕터를 게시하면 다른 사용자들이 챕터를 볼 수 있습니다.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
