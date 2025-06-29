import { FileQuestionIcon, PaperclipIcon, StarIcon, UserIcon } from 'lucide-react';
import UserHeaderNavLink from '~/components/user/header/nav-link';

interface UserHeaderProps {
  username: string;
}

export default function UserHeader({ username }: Readonly<UserHeaderProps>) {
  const navLinks = [
    { name: '프로필', to: `/@${username}`, icon: UserIcon },
    { name: '아티클', to: `/@${username}/articles`, icon: PaperclipIcon },
    { name: '질문', to: `/@${username}/questions`, icon: FileQuestionIcon },
    { name: '스타', to: `/@${username}/stars`, icon: StarIcon },
  ];

  return (
    <nav className="flex items-center gap-2">
      {navLinks.map((navLink) => (
        <UserHeaderNavLink key={navLink.to} {...navLink} />
      ))}
    </nav>
  );
}
