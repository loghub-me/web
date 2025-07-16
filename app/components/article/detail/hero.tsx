import { DotIcon } from 'lucide-react';
import Timestamp from '~/components/common/timestamp';
import { UserLink } from '~/components/user';

interface ArticleDetailHeroProps {
  title: string;
  writer: User;
  createdAt: string;
  updatedAt: string;
}

export default function ArticleDetailHero({ title, writer, createdAt, updatedAt }: Readonly<ArticleDetailHeroProps>) {
  return (
    <div className="p-16 space-y-4">
      <h2 className="text-center font-semibold text-2xl">{title}</h2>
      <div className="mt-auto flex items-center justify-center">
        <UserLink {...writer} />
        <DotIcon className="text-muted-foreground mr-2" />
        <Timestamp createdAt={createdAt} updatedAt={updatedAt} />
      </div>
    </div>
  );
}
