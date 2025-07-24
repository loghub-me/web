import { LayersIcon, MessageCircleQuestionIcon, ScrollIcon, StarIcon, UserIcon } from 'lucide-react';
import { ButtonNavLink } from '~/components/ui/button';

interface UserDetailNavProps {
  username: string;
}

export default function UserDetailNav({ username }: Readonly<UserDetailNavProps>) {
  const navLinks = [
    { name: '프로필', to: `/@${username}`, icon: UserIcon },
    { name: '아티클', to: `/@${username}/articles`, icon: ScrollIcon },
    { name: '시리즈', to: `/@${username}/series`, icon: LayersIcon },
    { name: '질문', to: `/@${username}/questions`, icon: MessageCircleQuestionIcon },
    { name: '스타', to: `/@${username}/stars`, icon: StarIcon },
  ];

  return (
    <nav className="flex items-center gap-2 overflow-x-auto">
      {navLinks.map(({ name, to, icon: Icon }) => (
        <ButtonNavLink key={to} to={to} end>
          <Icon /> {name}
        </ButtonNavLink>
      ))}
    </nav>
  );
}
