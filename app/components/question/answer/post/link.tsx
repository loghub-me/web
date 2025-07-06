import { MessagesSquareIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

export default function QuestionAnswerPostLink() {
  return (
    <Card className="p-6 flex items-center gap-2 bg-blue-50">
      <ButtonLink to={'/login'} variant={'default'}>
        <MessagesSquareIcon /> 답변하기
      </ButtonLink>
      <p>를 통해 사람들과 지식을 공유해보세요!</p>
    </Card>
  );
}
