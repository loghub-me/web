import { UserAvatar } from '~/components/user';

interface UserDetailAsideProps {
  id: number;
  username: string;
  nickname: string;
  readme: string;
}

export default function UserDetailAside({ id, username, nickname, readme }: Readonly<UserDetailAsideProps>) {
  return (
    <aside className="md:max-w-64 w-full flex flex-col gap-4 items-center md:items-start">
      <UserAvatar id={id} username={username} size="xl" />
      <div className="flex flex-col items-center md:items-start">
        <h3 className="text-lg font-medium">@{username}</h3>
        <h4 className="text-muted-foreground">{nickname}</h4>
      </div>
      <hr className="w-full" />
      {readme && <p className="text-muted-foreground">{readme}</p>}
    </aside>
  );
}
