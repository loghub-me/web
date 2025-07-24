import { Badge } from '~/components/ui/badge';
import { ButtonLink } from '~/components/ui/button';
import { UserAvatar } from '~/components/user';
import { USER_ACTIVITY_ACTION_LABELS, USER_ACTIVITY_ACTION_PATH } from '~/constants/labels';

interface UserActivityListItemProps {
  activity: UserActivity;
  user: User;
}

export default function UserActivityListItem({ activity, user }: Readonly<UserActivityListItemProps>) {
  const { slug, title, action } = activity;
  const path = USER_ACTIVITY_ACTION_PATH[action].replace('%s', user.username).replace('%s', slug);

  return (
    <ButtonLink to={path} variant={'ghost'} size={'custom'} className="inline-block p-2 w-full space-y-1">
      <div className="flex flex-nowrap gap-2 justify-start">
        <UserAvatar {...user} />
        <h3 className="flex-1 w-0 truncate">{title}</h3>
        <Badge variant={'secondary'} className="px-1 rounded-sm">
          {USER_ACTIVITY_ACTION_LABELS[action]}
        </Badge>
      </div>
    </ButtonLink>
  );
}
