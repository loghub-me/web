import type { Route } from './+types/books';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BookPostForm } from '~/components/book';
import { bookPostSchema } from '~/schemas/book';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const autosave = localStorage.getItem('autosave:post-books');
  return { autosave };
}

export default function PostBookRoute({ loaderData: { autosave } }: Route.ComponentProps) {
  const form = useForm<z.infer<typeof bookPostSchema>>({
    resolver: zodResolver(bookPostSchema),
    defaultValues: { title: '', content: '', thumbnail: 'default/thumbnail.webp', topicSlugs: [] },
  });

  return (
    <main className="container mx-auto p-4 pt-16 min-h-screen space-y-4">
      <div className="mt-16 mx-auto max-w-md w-full">
        <div className="flex flex-col items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">도서 등록</h2>
          <p className="text-sm text-secondary-foreground">
            도서를 등록하시면 다른 사용자들과 정보를 공유할 수 있습니다.
          </p>
        </div>
        <BookPostForm form={form} />
      </div>
    </main>
  );
}
