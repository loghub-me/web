import { KeyboardIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '~/components/ui/card';
import { POST_LINKS } from '~/constants/nav-links';
import { cn } from '~/lib/utils';

export default function PostIndex() {
  return (
    <main className="container max-h-screen h-screen mx-auto p-4 pt-16">
      <div className="p-16 space-y-4 text-center">
        <h1 className="font-bold text-3xl">글쓰기</h1>
        <p className="text-muted-foreground ">
          글을 작성하고, 다른 사람들과 공유해보세요. <br />
          글은 Markdown으로 작성할 수 있습니다.
        </p>
        <ButtonLink to={'/manual/markdown'} variant={'default'}>
          <KeyboardIcon /> 마크다운 사용법
        </ButtonLink>
      </div>
      <div className="overflow-hidden rounded-xl border flex">
        {POST_LINKS.map(({ name, description, to }) => (
          <Card key={to} className={cn('flex-1 py-4 border-0 border-r last:border-r-0 rounded-none')}>
            <CardContent>
              <CardTitle as={'h3'}>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardContent>
            <CardFooter>
              <ButtonLink to={to} className={'mt-auto'} variant={'outline'}>
                {name}
              </ButtonLink>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
