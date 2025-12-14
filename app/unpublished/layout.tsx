import MemberGuard from '@/guard/member';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비공개 포스트',
  description: '비공개 포스트 목록 페이지입니다.',
};

export default function UnpublishedLayout({ children }: Readonly<LayoutProps<'/unpublished'>>) {
  return <MemberGuard>{children}</MemberGuard>;
}
