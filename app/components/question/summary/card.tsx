import { Card } from '~/components/ui/card';
import { UserLink } from '~/components/user';

interface QuestionSummaryCardProps {
  questionWriter: User;
  answers: QuestionAnswer[];
}

export default function QuestionSummaryCard({ questionWriter, answers }: Readonly<QuestionSummaryCardProps>) {
  const answerWriters = Array.from(new Set(answers.map((answer) => answer.writer)));

  return (
    <Card className="p-4 space-y-4 gap-0">
      <div className="flex flex-col gap-1 items-start">
        <h5 className="p-2 text-sm text-muted-foreground font-semibold">질문자</h5>
        <UserLink {...questionWriter} />
      </div>
      <hr />
      <div className="flex flex-col gap-1 items-start">
        <h5 className="p-2 text-sm text-muted-foreground font-semibold">답변자</h5>
        {answerWriters.map((answerWriter) => (
          <UserLink {...answerWriter} />
        ))}
      </div>
    </Card>
  );
}
