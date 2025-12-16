import { Button } from '@ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@ui/dialog';
import { PencilIcon } from 'lucide-react';

interface QuestionAnswerEditDialogProps {
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function QuestionAnswerEditDialog({ onOpenChange, children }: Readonly<QuestionAnswerEditDialogProps>) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger render={<Button variant={'default'} />}>
        <PencilIcon /> 수정하기
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>답변 수정</DialogTitle>
          <DialogDescription>답변을 수정하면 다른 사용자들이 볼 수 있습니다.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
