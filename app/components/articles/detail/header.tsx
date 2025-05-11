import { StarIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';

interface ArticleDetailHeaderProps {
  title: string;
  writer: User;
  stats: { starCount: number };
}

export default function ArticleDetailHeader({
  title,
  writer: { username },
  stats: { starCount },
}: Readonly<ArticleDetailHeaderProps>) {
  return (
    <div className="sticky top-0 z-40 px-4 h-16 bg-card border-b flex items-center justify-between gap-4">
      <div className="container mx-auto px-4 h-16 flex items-center gap-2">
        <Avatar className="size-6">
          <AvatarImage src={`${import.meta.env.VITE_BUCKET_HOST}/avatars/${username}.webp`} />
          <AvatarFallback className="text-xs">{username[0]}</AvatarFallback>
        </Avatar>
        <h5 className="font-medium">{title}</h5>
        <Button className="ml-auto rounded-full" variant={'outline'}>
          <StarIcon /> {starCount}
        </Button>
      </div>
    </div>
  );
}
