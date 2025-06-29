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

interface QuestionPostDialogProps {
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function QuestionPostDialog({ onOpenChange, children }: Readonly<QuestionPostDialogProps>) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={'default'}>
          <CloudUploadIcon /> 게시하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>질문 작성</DialogTitle>
          <DialogDescription>
            질문을 작성하여 커뮤니티에 공유하세요. 다른 사용자들이 답변을 달 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
