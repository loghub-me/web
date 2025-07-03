import { BookIcon, FileQuestionIcon, PaperclipIcon, StarIcon, UserIcon } from 'lucide-react';
import { ButtonNavLink } from '~/components/ui/button';

interface UserHeaderProps {
  username: string;
}

export default function UserHeader({ username }: Readonly<UserHeaderProps>) {
  const navLinks = [
    { name: '프로필', to: `/@${username}`, icon: UserIcon },
    { name: '아티클', to: `/@${username}/articles`, icon: PaperclipIcon },
    { name: '도서', to: `/@${username}/books`, icon: BookIcon },
    { name: '질문', to: `/@${username}/questions`, icon: FileQuestionIcon },
    { name: '스타', to: `/@${username}/stars`, icon: StarIcon },
  ];

  return (
    <nav className="flex items-center gap-2">
      {navLinks.map(({ name, to, icon: Icon }) => (
        <ButtonNavLink key={to} to={to} end>
          <Icon /> {name}
        </ButtonNavLink>
      ))}
    </nav>
  );
}
