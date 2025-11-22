import { TopicRequestForm } from '@/components/client/support';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@ui/dialog';
import { DialogHeader } from '@ui/dialog';
import { useState } from 'react';

interface TopicRequestDialogProps {
  className?: string;
}

export default function TopicRequestDialog({ className }: TopicRequestDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      <span>찾으시는 토픽이 없으신가요?</span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'link'} size={'sm'} className="ml-1.5 p-0 h-auto">
            토픽 요청하기
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>토픽 요청 </DialogTitle>
            <DialogDescription>토픽 요청을 위해 폼을 작성해주세요.</DialogDescription>
          </DialogHeader>
          <TopicRequestForm closeDialog={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </p>
  );
}
