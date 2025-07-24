import { TopicBadge } from '~/components/topic';
import { Badge } from '~/components/ui/badge';
import { ButtonLink } from '~/components/ui/button';
import { UserAvatar } from '~/components/user';
import { USER_STAR_TARGET_LABELS, USER_STAR_TARGET_PATH } from '~/constants/labels';

interface UserStarListItemProps {
  star: UserStar;
}

export default function UserStarListItem({ star }: Readonly<UserStarListItemProps>) {
  const { slug, title, writer, topics, target } = star;
  const path = USER_STAR_TARGET_PATH[target].replace('%s', writer.username).replace('%s', slug);

  return (
    <ButtonLink to={path} variant={'outline'} size={'custom'} className="inline-block p-2 w-full space-y-1">
      <div className="flex flex-nowrap gap-2 justify-start">
        <UserAvatar {...writer} />
        <h3 className="flex-1 w-0 truncate">{title}</h3>
        <Badge variant={'secondary'} className="px-1 rounded-sm">
          {USER_STAR_TARGET_LABELS[target]}
        </Badge>
      </div>
      {topics.length > 0 && (
        <div className="pl-8 flex gap-1 flex-wrap">
          {topics.map((topic) => (
            <TopicBadge key={topic.slug} topic={topic} />
          ))}
        </div>
      )}
    </ButtonLink>
  );
}
