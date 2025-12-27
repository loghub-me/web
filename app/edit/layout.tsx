import MemberGuard from '@/guard/member';
import { Metadata } from 'next';

const title = '수정하기';
const description = '포스트 수정을 위한 페이지입니다.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { card: 'summary', title, description },
};

export default function EditLayout({ children }: Readonly<LayoutProps<'/edit'>>) {
  return <MemberGuard>{children}</MemberGuard>;
}
