import type { Route } from './+types/questions';
import { Suspense } from 'react';
import { Await } from 'react-router';
import { searchQuestions } from '~/apis/server/questions';
import { PageNavSkeleton } from '~/components/common/skeletons';
import { QuestionList, QuestionListItem, QuestionListSkeleton, QuestionStatusFilter } from '~/components/questions';
import PageNav from '~/components/search/page-nav';
import { parseSearchParams } from '~/lib/parse';
import { questionsSearchSchema } from '~/schemas/questions';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams, questionsSearchSchema);
  const questions = searchQuestions(searchParams);

  return { questions, url, searchParams };
}

export default function SearchQuestionsRoute({ loaderData }: Route.ComponentProps) {
  const {
    questions,
    url: { pathname },
    searchParams: { query, sort, filter, page },
  } = loaderData;

  return (
    <main className="space-y-4">
      <QuestionStatusFilter filter={filter} query={query} sort={sort} />
      <QuestionList>
        <Suspense fallback={<QuestionListSkeleton size={4} />}>
          <Await resolve={questions}>
            {(resolved) =>
              resolved.content.map((question, index) => <QuestionListItem key={question.id} question={question} />)
            }
          </Await>
        </Suspense>
      </QuestionList>
      <Suspense fallback={<PageNavSkeleton />}>
        <Await resolve={questions}>
          {(resolved) => (
            <PageNav
              to={`${pathname}?query=${query}&sort=${sort}&page=`}
              currentPage={page}
              totalPages={resolved.page.totalPages}
            />
          )}
        </Await>
      </Suspense>
    </main>
  );
}
