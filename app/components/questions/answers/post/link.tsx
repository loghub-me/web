import { MessagesSquareIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

export default function AnswerPostLink() {
  return (
    <Card className="p-6 flex-row items-center gap-2 bg-blue-50">
      <Button asChild>
        <Link to={'/login'}>
          <MessagesSquareIcon /> 답변하기
        </Link>
      </Button>
      <p>를 통해 사람들과 지식을 공유해보세요!</p>
    </Card>
  );
}
