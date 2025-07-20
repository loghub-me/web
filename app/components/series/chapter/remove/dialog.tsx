import { TrashIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { removeSeriesChapter } from '~/apis/client/series';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { handleMessageError } from '~/lib/error';

interface SeriesChapterDeleteDialogProps {
  seriesId: number;
  seriesSlug: string;
  writerUsername: string;
  chapterSequence: number;
}

export default function SeriesChapterDeleteDialog({
  seriesId,
  seriesSlug,
  writerUsername,
  chapterSequence,
}: Readonly<SeriesChapterDeleteDialogProps>) {
  const navigate = useNavigate();

  function onClickDelete() {
    removeSeriesChapter(seriesId, chapterSequence)
      .then(({ message }) => {
        toast.success(message);
        navigate(`/@${writerUsername}/series/${seriesSlug}/edit`);
      })
      .catch(handleMessageError);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          <TrashIcon /> <span className="hidden md:block">삭제하기</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>챕터 삭제</DialogTitle>
          <DialogDescription>챕터를 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'ghost'}>
              <XIcon /> 취소하기
            </Button>
          </DialogClose>
          <Button variant={'destructive'} onClick={onClickDelete}>
            <TrashIcon /> 삭제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
