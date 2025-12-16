import { USER_ACTIVITY_ACTION_OPTIONS } from '@/constants/options';
import { Badge } from '@ui/badge';
import { ButtonLink } from '@ui/button-link';
import { SimpleTooltip } from '@ui/tooltip';

interface UserActivityListItemProps {
  activity: UserActivity;
}

export default function UserActivityListItem({ activity }: Readonly<UserActivityListItemProps>) {
  const { href, title, action } = activity;
  const { label, icon: Icon } = USER_ACTIVITY_ACTION_OPTIONS[action];

  return (
    <div className="flex flex-row items-center gap-2 px-3 py-2">
      <SimpleTooltip content={label}>
        <Badge variant={'outline'} className="p-1.5 rounded-md">
          <Icon />
        </Badge>
      </SimpleTooltip>
      <h3 className="font-medium line-clamp-1">
        <ButtonLink href={href} variant={'link'} size={'sm'} className="p-0 h-auto text-foreground">
          {title}
        </ButtonLink>
      </h3>
    </div>
  );
}
