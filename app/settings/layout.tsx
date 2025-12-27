import MemberGuard from '@/guard/member';
import { Metadata } from 'next';

const title = '설정';
const description = '계정 및 서비스 환경 설정';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: `${process.env.WEB_HOST}/settings` },
  twitter: { card: 'summary', title, description },
};

export default function SettingLayout({ children }: LayoutProps<'/settings'>) {
  return <MemberGuard>{children}</MemberGuard>;
}
