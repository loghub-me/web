import ExitGuard from '@/guard/exit';
import MemberGuard from '@/guard/member';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '아티클 작성',
  description: '글을 작성하고 공유해보세요.',
};

export default function ArticlePostLayout({ children }: Readonly<LayoutProps<'/post/articles'>>) {
  return (
    <MemberGuard>
      <ExitGuard>{children} </ExitGuard>
    </MemberGuard>
  );
}
