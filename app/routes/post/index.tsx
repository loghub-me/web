import { BookIcon, KeyboardIcon, MessageCircleQuestionIcon, NewspaperIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

export default function PostIndex() {
  return (
    <main className="container max-h-screen h-screen mx-auto p-4 pt-16">
      <div className="p-16 space-y-4 text-center">
        <h1 className="font-bold text-3xl">글쓰기</h1>
        <p className="text-muted-foreground ">
          글을 작성하고, 다른 사람들과 공유해보세요. <br />
          글은 Markdown으로 작성할 수 있습니다.
        </p>
        <Button asChild>
          <Link to={'/how-to-use-markdown'}>
            <KeyboardIcon /> 마크다운 사용법
          </Link>
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl flex">
        <Card className="w-full rounded-r-none p-6 gap-2">
          <NewspaperIcon className="mb-2" />
          <div>
            <h3 className="font-semibold">아티클 작성하기</h3>
            <p className="text-muted-foreground">아티클을 작성하고, 다른 사람들과 공유해보세요.</p>
          </div>
          <Button variant="outline" className="mt-auto" asChild>
            <Link to={'/post/articles'}>새 글 작성하기</Link>
          </Button>
        </Card>
        <Card className="w-full rounded-none p-6 gap-2 border-x-0">
          <BookIcon className="mb-2" />
          <div>
            <h3 className="font-semibold">책 작성하기</h3>
            <p className="text-muted-foreground">책을 작성하고, 다른 사람들과 공유해보세요.</p>
          </div>
          <Button variant="outline" className="mt-auto" asChild>
            <Link to={'/post/books'}>새 책 작성하기</Link>
          </Button>
        </Card>
        <Card className="w-full rounded-l-none p-6 gap-2">
          <MessageCircleQuestionIcon className="mb-2" />
          <div>
            <h3 className="font-semibold">질문 작성하기</h3>
            <p className="text-muted-foreground">질문을 작성하고, 다른 사람들과 공유해보세요.</p>
          </div>
          <Button variant="outline" className="mt-auto" asChild>
            <Link to={'/post/questions'}>새 질문 작성하기</Link>
          </Button>
        </Card>
      </div>
    </main>
  );
}
