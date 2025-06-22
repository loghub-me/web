import { Card } from '~/components/ui/card';

export default function AnswerPostClosed() {
  return (
    <Card className="p-6 flex-row items-center gap-2 text-muted-foreground bg-muted">
      <p>이 질문은 현재 답변을 받을 수 없는 상태입니다.</p>
    </Card>
  );
}
