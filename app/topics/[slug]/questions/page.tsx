import { getTopicQuestions } from '@/apis/server/topic';
import { PageNav } from '@/components/client/page';
import { TopicQuestionsSort } from '@/components/client/topic';
import { QuestionSearchSkeleton, QuestionList, QuestionListItem } from '@/components/server/question';
import { parseObject } from '@/lib/parse';
import { topicDetailSchema, topicQuestionsSearchParams } from '@/schemas/topic';
import ListEmpty from '@ui/list-empty';
import { Suspense } from 'react';
import z from 'zod';

export default async function TopicQuestionsPage({ params, searchParams }: PageProps<'/topics/[slug]/questions'>) {
  const parsedParam = parseObject(await params, topicDetailSchema);
  const parsedSearchParams = parseObject(await searchParams, topicQuestionsSearchParams);
  const questions = getTopicQuestions(parsedParam.slug, parsedSearchParams);

  return (
    <main className="space-y-4">
      <TopicQuestionsSort slug={parsedParam.slug} searchParams={parsedSearchParams} />
      <Suspense fallback={<QuestionSearchSkeleton />}>
        <TopicQuestionsResult questions={questions} searchParams={parsedSearchParams} />
      </Suspense>
    </main>
  );
}

interface TopicQuestionsResultProps {
  questions: Promise<Page<Question>>;
  searchParams: z.infer<typeof topicQuestionsSearchParams>;
}

async function TopicQuestionsResult({ questions, searchParams }: Readonly<TopicQuestionsResultProps>) {
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
