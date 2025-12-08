import { USER_ACTIVITY_ACTION_OPTIONS } from '@/constants/options';
import { Badge } from '@ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/tooltip';
import Link from 'next/link';

interface UserActivityListItemProps {
  activity: UserActivity;
}

export default function UserActivityListItem({ activity }: Readonly<UserActivityListItemProps>) {
  const { href, title, action } = activity;
  const { label, icon: Icon } = USER_ACTIVITY_ACTION_OPTIONS[action];

  return (
    <div className="flex flex-row items-center gap-2 px-3 py-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={'outline'} className="p-1.5 rounded-md">
            <Icon />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>

      <h3 className="font-medium line-clamp-1">
        <Link href={href} prefetch={false} className="mr-2 transition-colors hover:text-accent-foreground/50">
          {title}
        </Link>
      </h3>
    </div>
  );
}
