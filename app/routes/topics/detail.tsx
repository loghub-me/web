import type { Route } from './+types/detail';
import { LayersIcon, MessagesSquareIcon, ScrollIcon } from 'lucide-react';
import { Suspense } from 'react';
import { Await } from 'react-router';
import {
  getTopicBySlug,
  getTrendingArticlesByTopicSlug,
  getTrendingQuestionsByTopicSlug,
  getTrendingSeriesByTopicSlug,
} from '~/apis/server/topic';
import { ArticleList, ArticleListItem, ArticleListSkeleton } from '~/components/article';
import ListEmpty from '~/components/common/list/empty';
import { QuestionList, QuestionListItem, QuestionListSkeleton } from '~/components/question';
import { SeriesList, SeriesListItem, SeriesListSkeleton } from '~/components/series';
import { TopicDetailAside } from '~/components/topic';
import { ButtonLink } from '~/components/ui/button';
import { parseParams, parseSearchParams } from '~/lib/parse';
import { slugSchema } from '~/schemas/common';
import { topicSearchSchema } from '~/schemas/topic';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { slug } = parseParams(params, slugSchema);
  const searchParams = parseSearchParams(url.searchParams, topicSearchSchema);
  const topic = await getTopicBySlug(slug);

  switch (searchParams.view) {
    case 'articles':
      const articles = getTrendingArticlesByTopicSlug(slug);
      return { topic, articles, searchParams };
    case 'series':
      const series = getTrendingSeriesByTopicSlug(slug);
      return { topic, series, searchParams };
    case 'questions':
      const questions = getTrendingQuestionsByTopicSlug(slug);
      return { topic, questions, searchParams };
  }
};

export default function TopicDetailRoute({ loaderData }: Route.ComponentProps) {
  const { topic, articles, series, questions, searchParams } = loaderData;
  const { view } = searchParams;

  function renderView() {
    switch (view) {
      case 'articles':
        return (
          articles && (
            <ArticleList>
              <Suspense fallback={<ArticleListSkeleton size={4} />}>
                <Await resolve={articles}>
                  {(resolved) => {
                    if (resolved.length === 0) {
                      return <ListEmpty className="col-span-4" message="검색된 아티클이 없습니다." />;
                    }
                    return resolved.map((article) => <ArticleListItem key={article.id} article={article} />);
                  }}
                </Await>
              </Suspense>
            </ArticleList>
          )
        );
      case 'series':
        return (
          series && (
            <SeriesList>
              <Suspense fallback={<SeriesListSkeleton size={4} />}>
                <Await resolve={series}>
                  {(resolved) => {
                    if (resolved.length === 0) {
                      return <ListEmpty className="col-span-4" message="검색된 시리즈가 없습니다." />;
                    }
                    return resolved.map((series) => <SeriesListItem key={series.id} series={series} />);
                  }}
                </Await>
              </Suspense>
            </SeriesList>
          )
        );
      case 'questions':
        return (
          questions && (
            <QuestionList>
              <Suspense fallback={<QuestionListSkeleton size={4} />}>
                <Await resolve={questions}>
                  {(resolved) => {
                    if (resolved.length === 0) {
                      return <ListEmpty className="col-span-4" message="검색된 질문이 없습니다." />;
                    }
                    return resolved.map((question) => <QuestionListItem key={question.id} question={question} />);
                  }}
                </Await>
              </Suspense>
            </QuestionList>
          )
        );
    }
  }

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4 flex flex-col md:flex-row gap-8">
      <TopicDetailAside {...topic} />
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2">
          <ButtonLink to={`/topics/${topic.slug}?view=articles`} variant={view === 'articles' ? 'secondary' : 'ghost'}>
            <ScrollIcon /> 아티클
          </ButtonLink>
          <ButtonLink to={`/topics/${topic.slug}?view=series`} variant={view === 'series' ? 'secondary' : 'ghost'}>
            <LayersIcon /> 시리즈
          </ButtonLink>
          <ButtonLink
            to={`/topics/${topic.slug}?view=questions`}
            variant={view === 'questions' ? 'secondary' : 'ghost'}
          >
            <MessagesSquareIcon /> 질문
          </ButtonLink>
        </div>
        {renderView()}
      </div>
    </main>
  );
}
