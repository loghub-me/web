import type { Route } from './+types/questions';
import { Suspense, useRef } from 'react';
import { Await, Form } from 'react-router';
import { searchQuestions } from '~/apis/server/question';
import ListEmpty from '~/components/common/list/empty';
import { PageNavSkeleton } from '~/components/common/skeletons';
import { QuestionList, QuestionListItem, QuestionListSkeleton, QuestionStatusFilter } from '~/components/question';
import { SearchQuery, SearchSort, SearchSubmit } from '~/components/search';
import PageNav from '~/components/search/page-nav';
import { QUESTION_SORT_OPTIONS } from '~/constants/sorts';
import { parseSearchParams } from '~/lib/parse';
import { questionSearchSchema } from '~/schemas/question';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams, questionSearchSchema);
  const questions = searchQuestions(searchParams);

  return { questions, url, searchParams };
}

export default function SearchQuestionsRoute({ loaderData }: Route.ComponentProps) {
  const {
    questions,
    url: { pathname },
    searchParams: { query, sort, filter, page },
  } = loaderData;
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <Form action={pathname} ref={formRef} className="space-y-4">
        <div className="flex gap-2">
          <SearchSort
            submit={() => formRef.current?.requestSubmit()}
            currentSort={sort}
            sortOptions={QUESTION_SORT_OPTIONS}
          />
          <SearchQuery />
          <SearchSubmit />
        </div>
        <QuestionStatusFilter filter={filter} query={query} sort={sort} />
      </Form>
      <QuestionList>
        <Suspense fallback={<QuestionListSkeleton size={4} />}>
          <Await resolve={questions}>
            {(resolved) => {
              if (resolved.content.length === 0) {
                return <ListEmpty message="검색된 질문이 없습니다." />;
              }
              return resolved.content.map((question) => <QuestionListItem key={question.id} question={question} />);
            }}
          </Await>
        </Suspense>
      </QuestionList>
      <Suspense fallback={<PageNavSkeleton />}>
        <Await resolve={questions}>
          {(resolved) => (
            <PageNav
              to={`${pathname}?query=${query}&sort=${sort}&filter=${filter}&page=`}
              currentPage={page}
              totalPages={resolved.page.totalPages}
            />
          )}
        </Await>
      </Suspense>
    </main>
  );
}
