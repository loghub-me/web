import { UserAvatar } from '~/components/users';

interface UserDetailAsideProps {
  username: string;
  nickname: string;
  readme: string;
}

export default function UserDetailAside({ username, nickname, readme }: Readonly<UserDetailAsideProps>) {
  return (
    <aside className="flex flex-col gap-2 items-center md:items-start">
      <UserAvatar username={username} size="xl" />
      <h3 className="mt-2 text-lg font-medium">@{username}</h3>
      <h4 className="text-muted-foreground">{nickname}</h4>
      <hr className="w-full" />
      <p className="text-muted-foreground">{readme}</p>
    </aside>
  );
}
