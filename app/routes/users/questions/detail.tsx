import type { Route } from './+types/detail';
import { getQuestion, getQuestionAnswers } from '~/apis/server/question';
import {
  QuestionAnswerList,
  QuestionAnswerListItem,
  QuestionAnswerPost,
  QuestionDetailAside,
  QuestionDetailContent,
  QuestionDetailHeader,
  QuestionDetailHero,
  QuestionSummaryCard,
} from '~/components/question';
import { Card } from '~/components/ui/card';
import { useAuth } from '~/hooks/use-auth';
import { parseParams } from '~/lib/parse';
import { compositeKeySchema } from '~/schemas/common';

export async function loader({ params }: Route.LoaderArgs) {
  const { username, slug } = parseParams(params, compositeKeySchema);
  const question = await getQuestion(username, slug);
  const answers = await getQuestionAnswers(question.id);
  return { question, answers };
}

export default function QuestionDetailRoute({ loaderData }: Route.ComponentProps) {
  const { question, answers } = loaderData;
  const { session } = useAuth();

  return (
    <main className="container mx-auto px-2 pt-20 pb-4 min-h-screen space-y-4">
      <QuestionDetailHero {...question} />
      <div className="flex gap-4">
        <div className="w-full space-y-4">
          <Card className="pt-0">
            <QuestionDetailHeader {...question} />
            <QuestionDetailContent {...question} />
          </Card>
          <QuestionAnswerList>
            <QuestionAnswerPost questionId={question.id} questionStatus={question.status} />
            {answers.map((answer) => {
              const permission = {
                isWriter: question.writer.username === answer.writer.username,
                isAcceptable:
                  question.status === 'OPEN' &&
                  question.writer.username !== answer.writer.username &&
                  session?.username === question.writer.username,
                isEditable:
                  question.status === 'OPEN' && question.writer && session?.username === answer.writer.username,
                isDeletable:
                  question.status === 'OPEN' && question.writer && session?.username === answer.writer.username,
              } satisfies AnswerPermission;
              return (
                <QuestionAnswerListItem
                  key={answer.id}
                  answer={answer}
                  questionId={question.id}
                  permission={permission}
                />
              );
            })}
          </QuestionAnswerList>
        </div>
        <QuestionDetailAside>
          <QuestionSummaryCard questionWriter={question.writer} answers={answers} />
        </QuestionDetailAside>
      </div>
    </main>
  );
}
