import { Button } from '@ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@ui/dialog';
import { PencilIcon } from 'lucide-react';

interface ArticleEditDialogProps {
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function ArticleEditDialog({ onOpenChange, children }: Readonly<ArticleEditDialogProps>) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger render={<Button variant={'default'} />}>
        <PencilIcon /> 수정하기
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>아티클 수정</DialogTitle>
          <DialogDescription>아티클을 수정하면 다른 사용자들이 볼 수 있습니다.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
