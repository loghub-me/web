import { Badge } from '~/components/ui/badge';
import { ButtonLink } from '~/components/ui/button';
import { UserAvatar } from '~/components/user';

interface TrendingListItemProps {
  index: number;
  title: string;
  writer: UserSimple;
  to: string;
}

export default function TrendingListItem({ index, title, writer, to }: Readonly<TrendingListItemProps>) {
  return (
    <ButtonLink to={to} className="px-2 w-full justify-start font-medium">
      <Badge variant={'secondary'} className="size-6">
        {index + 1}
      </Badge>
      <span className="flex-1 truncate">{title}</span>
      <UserAvatar {...writer} />
    </ButtonLink>
  );
}
