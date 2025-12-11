import { PostManual, MarkdownManual } from '@/components/server/manual';
import { Separator } from '@ui/separator';

export default function ManualPage() {
  return (
    <main className="mx-auto p-4 pt-24 pb-8 max-w-4xl w-full min-h-screen space-y-4">
      <PostManual />
      <Separator className="my-8" />
      <MarkdownManual />
    </main>
  );
}
