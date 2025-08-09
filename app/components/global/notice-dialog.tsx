import { CheckIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

interface NoticeDialogProps {
  id: string;
  title: string;
  content: string;
}

export default function NoticeDialog({ id, title, content }: Readonly<NoticeDialogProps>) {
  const [open, setOpen] = useState(false);

  function onClickNeverShowAgain() {
    localStorage.setItem(`notice-${id}`, 'true');
    setOpen(false);
  }

  useEffect(() => {
    const accepted = localStorage.getItem(`notice-${id}`);
    setOpen(!accepted);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type={'button'} variant={'ghost'}>
              <XIcon /> 닫기
            </Button>
          </DialogClose>
          <Button type={'button'} onClick={onClickNeverShowAgain}>
            <CheckIcon /> 다시 보지 않기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
