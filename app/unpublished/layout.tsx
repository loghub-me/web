import MemberGuard from '@/guard/member';
import { Metadata } from 'next';

const title = '비공개 포스트';
const description = '비공개 포스트 목록 페이지입니다.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { card: 'summary', title, description },
};

export default function UnpublishedLayout({ children }: Readonly<LayoutProps<'/unpublished'>>) {
  return <MemberGuard>{children}</MemberGuard>;
}
