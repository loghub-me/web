import { ListPlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { addSeriesChapter } from '~/apis/client/series';
import { Button } from '~/components/ui/button';
import { handleMessageError } from '~/lib/error';

interface SeriesChapterAddButtonProps {
  seriesId: number;
}

export default function SeriesChapterAddButton({ seriesId }: Readonly<SeriesChapterAddButtonProps>) {
  const navigate = useNavigate();

  function onClick() {
    addSeriesChapter(seriesId)
      .then(({ message }) => {
        toast.success(message);
        navigate(0);
      })
      .catch(handleMessageError);
  }

  return (
    <Button className="w-full" onClick={onClick}>
      <ListPlusIcon /> 챕터 추가
    </Button>
  );
}
