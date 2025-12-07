import MemberGuard from '@/guard/member';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '설정',
  description: '계정 및 서비스 환경 설정',
};

export default function SettingLayout({ children }: LayoutProps<'/settings'>) {
  return <MemberGuard>{children}</MemberGuard>;
}
