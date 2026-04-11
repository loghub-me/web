import ExitGuard from '@/guard/exit';
import MemberGuard from '@/guard/member';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '질문 작성',
  description: '질문을 작성하고 답변을 받아보세요.',
};

export default function QuestionPostLayout({ children }: Readonly<LayoutProps<'/post/questions'>>) {
  return (
    <MemberGuard>
      <ExitGuard>{children} </ExitGuard>
    </MemberGuard>
  );
}
