import { Card } from '~/components/ui/card';
import { UserLink } from '~/components/user';

interface QuestionSummaryCardProps {
  writer: User;
  answers: QuestionAnswer[];
}

export default function QuestionSummaryCard({ writer, answers }: Readonly<QuestionSummaryCardProps>) {
  const answerWriters = Array.from(new Set(answers.map((answer) => answer.writer.username)));

  return (
    <Card className="p-4 space-y-4 gap-0">
      <div className="flex flex-col gap-1 items-start">
        <h5 className="p-2 text-sm text-muted-foreground font-semibold">질문자</h5>
        <UserLink username={writer.username} />
      </div>
      <hr />
      <div className="flex flex-col gap-1 items-start">
        <h5 className="p-2 text-sm text-muted-foreground font-semibold">답변자</h5>
        {answerWriters.map((answer) => (
          <UserLink username={answer} />
        ))}
      </div>
    </Card>
  );
}
