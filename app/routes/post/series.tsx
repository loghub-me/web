import type { Route } from './+types/series';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SeriesPostForm } from '~/components/series';
import { seriesPostSchema } from '~/schemas/series';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const autosave = localStorage.getItem('autosave:post-series');
  return { autosave };
}

export default function PostSeriesRoute({ loaderData: { autosave } }: Route.ComponentProps) {
  const form = useForm<z.infer<typeof seriesPostSchema>>({
    resolver: zodResolver(seriesPostSchema),
    defaultValues: { title: '', content: '', thumbnail: 'default/thumbnail.webp', topicSlugs: [] },
  });

  return (
    <main className="container mx-auto p-4 pt-16 min-h-screen space-y-4">
      <div className="mt-16 mx-auto max-w-md w-full">
        <div className="flex flex-col items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">시리즈 등록</h2>
          <p className="text-sm text-secondary-foreground">
            시리즈를 등록하시면 다른 사용자들과 정보를 공유할 수 있습니다.
          </p>
        </div>
        <SeriesPostForm form={form} />
      </div>
    </main>
  );
}
