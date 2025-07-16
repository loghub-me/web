import type { Route } from './+types/edit';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { removeSeriesChapter } from '~/apis/client/series';
import { getSeries } from '~/apis/server/series';
import { SeriesEditForm } from '~/components/series';
import { Button, ButtonLink } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { handleMessageError } from '~/lib/error';
import { parseParams } from '~/lib/parse';
import { compositeKeySchema } from '~/schemas/common';
import { seriesPostSchema } from '~/schemas/series';

export async function loader({ params }: Route.LoaderArgs) {
  const { username, slug } = parseParams(params, compositeKeySchema);
  const series = await getSeries(username, slug);
  return { series };
}

export default function EditSeriesRoute({ loaderData }: Route.ComponentProps) {
  const { series } = loaderData;
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof seriesPostSchema>>({
    resolver: zodResolver(seriesPostSchema),
    defaultValues: { ...series, topicSlugs: series.topics.map((topic) => topic.slug) },
  });

  function onClickDeleteChapter(sequence: number) {
    removeSeriesChapter(series.id, sequence)
      .then(({ message }) => {
        toast.success(message);
        navigate(0);
      })
      .catch(handleMessageError);
  }

  return (
    <main className="container mx-auto p-4 pt-16 min-h-screen space-y-4 flex flex-col md:flex-row gap-4">
      <div className="mt-4 md:mt-16 mx-auto max-w-md w-full">
        <div className="flex flex-col items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">시리즈 수정</h2>
          <p className="text-sm text-secondary-foreground">시리즈를 수정하려면 아래 양식을 작성해주세요.</p>
        </div>
        <SeriesEditForm form={form} id={series.id} />
      </div>
      <hr />
      <div className="mt-4 md:mt-16 mx-auto max-w-md w-full">
        <div className="flex flex-col items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">챕터 수정</h2>
          <p className="text-sm text-secondary-foreground">챕터를 수정하려면 아래 양식을 작성해주세요.</p>
        </div>
        <div className="space-y-2">
          {series.chapters.map((chapter) => (
            <Card key={chapter.sequence} className="p-4 w-full h-fit flex-row items-center gap-2 shadow-none">
              <div className="space-y-2 w-full">
                <span className="font-semibold text-sm text-primary">챕터 {chapter.sequence}</span>
                <p className="font-medium">{chapter.title}</p>
              </div>
              <div className="flex">
                <ButtonLink
                  to={`/@${series.writer.username}/series/${series.slug}/${chapter.sequence}/edit`}
                  variant={'outline'}
                  className="rounded-l-full border-r-0"
                >
                  <PencilIcon className="ml-0.5" />
                </ButtonLink>
                <Button
                  variant={'outline'}
                  className="rounded-r-full"
                  onClick={() => onClickDeleteChapter(chapter.sequence)}
                >
                  <TrashIcon className="mr-0.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
