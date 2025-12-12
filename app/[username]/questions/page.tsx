import { getUserQuestions } from '@/apis/server/user';
import { QuestionListItems, QuestionPageNav } from '@/app/search/questions/page';
import { PageSkeleton } from '@/components/client/page';
import { QuestionSearchForm } from '@/components/client/question';
import { QuestionList, QuestionListSkeleton } from '@/components/server/question';
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
      <QuestionList>
        <Suspense fallback={<QuestionListSkeleton />}>
          <QuestionListItems questions={questions} />
        </Suspense>
      </QuestionList>
      <Suspense fallback={<PageSkeleton />}>
        <QuestionPageNav currentPage={parsedSearchParams.page} questions={questions} />
      </Suspense>
    </div>
  );
}
