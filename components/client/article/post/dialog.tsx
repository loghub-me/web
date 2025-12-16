import { Button } from '@ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@ui/dialog';
import { UploadIcon } from 'lucide-react';

interface ArticlePostDialogProps {
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function ArticlePostDialog({ onOpenChange, children }: Readonly<ArticlePostDialogProps>) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger render={<Button variant={'default'} />}>
        <UploadIcon /> 게시하기
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>아티클 게시</DialogTitle>
          <DialogDescription>아티클을 게시하면 다른 사용자들이 아티클을 볼 수 있습니다.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
