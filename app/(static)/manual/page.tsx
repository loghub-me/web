import { PostManual, MarkdownManual } from '@/components/server/manual';
import { Separator } from '@ui/separator';
import { Metadata } from 'next';

const title = '매뉴얼';
const description = '서비스 사용을 위한 매뉴얼 페이지입니다.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: `${process.env.WEB_HOST}/manual` },
  twitter: { card: 'summary', title, description },
};

export default function ManualPage() {
  return (
    <main className="mx-auto p-4 pt-24 pb-8 max-w-4xl w-full min-h-screen space-y-4">
      <PostManual />
      <Separator className="my-8" />
      <MarkdownManual />
    </main>
  );
}
