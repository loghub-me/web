import { NewspaperIcon, PencilIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';

export default function PostIndex() {
  return (
    <main className="container max-h-screen h-screen mx-auto p-4 pt-16">
      <div className="p-16 space-y-4 text-center">
        <h1 className="font-semibold text-2xl">글쓰기</h1>
        <p className="text-muted-foreground text-sm">
          글을 작성하고, 다른 사람들과 공유해보세요. <br />
          글은 Markdown으로 작성할 수 있습니다.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <Link to={'/post/articles'} className="lg:col-span-2">
          <Card className="h-64 relative group cursor-pointer overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full blur-xs">
              <img
                src="/images/post-articles.webp"
                alt="아티클 작성하기"
                className="transition-transform group-hover:scale-105"
              />
            </div>
            <CardContent className="absolute -bottom-4 group-hover:bottom-6 space-y-2 transition-all">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <NewspaperIcon /> 아티클
              </h2>
              <p className="text-muted-foreground text-sm">
                아티클을 작성하고, 다른 사람들과 공유해보세요. <br />
                아티클은 Markdown으로 작성할 수 있습니다.
              </p>
              <Button variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <PencilIcon /> 작성하기
              </Button>
            </CardContent>
          </Card>
        </Link>
        <Card className="col-span-1 h-64" />
        <Card className="lg:col-span-1 h-64" />
        <Card className="lg:col-span-2 h-64" />
      </div>
    </main>
  );
}
