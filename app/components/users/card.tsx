import { ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Card, CardFooter, CardHeader } from '~/components/ui/card';
import { ROLE_MAP } from '~/constants/role';

interface UserCardProps {
  user: User;
  title?: string;
}

export default function UserCard({ user, title }: Readonly<UserCardProps>) {
  const { username, nickname, role } = user;
  const RoleIcon = ROLE_MAP[role];

  return (
    <Card className="pt-0 overflow-hidden">
      <div className="bg-muted border-b p-1.5">
        <p className="text-xs text-center text-muted-foreground">{title}</p>
      </div>
      <CardHeader className="flex flex-col items-center border-b space-y-1">
        <Avatar className="size-24 border mb-2">
          {/*<AvatarImage src={`${import.meta.env.VITE_BUCKET_HOST}/avatars/${username}.webp`} />*/}
          <AvatarFallback className="text-xs">{username[0]}</AvatarFallback>
        </Avatar>
        <h5 className="font-medium">@{username}</h5>
        <p className="text-muted-foreground text-sm">{nickname}</p>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/@${username}`}>
            <ChevronRightIcon /> 프로필 보기
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
