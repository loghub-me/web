import { DotIcon } from 'lucide-react';
import { UserInline } from '~/components/users';
import { parseRelativeTime } from '~/lib/parse';

interface ArticleDetailHeroProps {
  title: string;
  writer: User;
  createdAt: string;
}

export default function ArticleDetailHero({ title, writer, createdAt }: Readonly<ArticleDetailHeroProps>) {
  return (
    <div className="p-16 space-y-4">
      <h2 className="text-center font-semibold text-2xl">{title}</h2>
      <div className="mt-auto flex items-center gap-1 justify-center">
        <UserInline username={writer.username} />
        <DotIcon className="text-muted-foreground" />
        <span className="text-center text-muted-foreground text-sm">{parseRelativeTime(createdAt)}</span>
      </div>
    </div>
  );
}
