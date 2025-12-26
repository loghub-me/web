import { PageNav } from '@/components/client/page';
import { QuestionList, QuestionListItem } from '@/components/server/question';
import { questionSearchSchema } from '@/schemas/question';
import ListEmpty from '@ui/list-empty';
import z from 'zod';

interface QuestionSearchResultProps {
  questions: Promise<Page<Question>>;
  searchParams: z.infer<typeof questionSearchSchema>;
}

export default async function QuestionSearchResult({ questions, searchParams }: Readonly<QuestionSearchResultProps>) {
  const resolvedQuestions = await questions;

  return (
    <>
      <QuestionList>
        {resolvedQuestions.content.length === 0 && <ListEmpty message={'검색된 질문이 없습니다.'} className="py-4" />}
        {resolvedQuestions.content.map((question) => (
          <QuestionListItem key={question.id} question={question} />
        ))}
      </QuestionList>
      <PageNav currentPage={searchParams.page} totalPages={resolvedQuestions.page.totalPages} />
    </>
  );
}
