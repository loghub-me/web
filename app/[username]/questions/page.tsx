import { getUserQuestions } from '@/apis/server/user';
import { QuestionSearchForm } from '@/components/client/question';
import { QuestionSearchResult, QuestionSearchSkeleton } from '@/components/server/question';
import { parseObject } from '@/lib/parse';
import { questionSearchSchema } from '@/schemas/question';
import { userDetailSchema } from '@/schemas/user';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({ params }: PageProps<'/[username]/questions'>): Promise<Metadata> {
  const parsedParam = parseObject(await params, userDetailSchema);
  return {
    title: `@${parsedParam.username} - 질문`,
    description: `${parsedParam.username}님의 프로필 페이지입니다.`,
  };
}

export default async function UserQuestionSearchPage({ params, searchParams }: PageProps<'/[username]/questions'>) {
  const parsedParam = parseObject(await params, userDetailSchema);
  const parsedSearchParams = parseObject(await searchParams, questionSearchSchema);
  const questions = getUserQuestions(parsedParam.username, parsedSearchParams);

  return (
    <div className="space-y-4">
      <QuestionSearchForm defaultValues={parsedSearchParams} action={`/${parsedParam.username}/questions`} />
      <Suspense fallback={<QuestionSearchSkeleton />}>
        <QuestionSearchResult questions={questions} searchParams={parsedSearchParams} />
      </Suspense>
    </div>
  );
}
