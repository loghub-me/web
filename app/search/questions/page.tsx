import { getQuestions } from '@/apis/server/question';
import { QuestionSearchForm } from '@/components/client/question';
import { QuestionSearchSkeleton, QuestionSearchResult } from '@/components/server/question';
import { parseObject } from '@/lib/parse';
import { questionSearchSchema } from '@/schemas/question';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '질문 검색',
  description: '질문은 사용자 간의 질문과 답변을 공유하는 공간입니다.',
};

export default async function QuestionSearchPage({ searchParams }: PageProps<'/search/questions'>) {
  const parsedSearchParams = parseObject(await searchParams, questionSearchSchema);
  const questions = getQuestions(parsedSearchParams);

  return (
    <main className="container mx-auto px-4 py-20 min-h-screen space-y-4">
      <QuestionSearchForm defaultValues={parsedSearchParams} />
      <Suspense fallback={<QuestionSearchSkeleton />}>
        <QuestionSearchResult questions={questions} searchParams={parsedSearchParams} />
      </Suspense>
    </main>
  );
}
