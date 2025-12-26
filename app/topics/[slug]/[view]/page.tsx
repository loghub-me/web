import { getTopicTrendingPosts } from '@/apis/server/topic';
import { ArticleList, ArticleListItem, ArticleListSkeleton } from '@/components/server/article';
import { QuestionList, QuestionListItem, QuestionListSkeleton } from '@/components/server/question';
import { SeriesList, SeriesListItem, SeriesListSkeleton } from '@/components/server/series';
import { TopicDetailNav } from '@/components/server/topic';
import { parseObject } from '@/lib/parse';
import { topicDetailSchema } from '@/schemas/topic';
import ListEmpty from '@ui/list-empty';
import { ComponentType, ReactNode, Suspense } from 'react';

interface ListComponents {
  list: ComponentType<{ children?: ReactNode }>;
  listSkeleton: ComponentType<{ size?: number }>;
}

const LIST_COMPONENTS = {
  articles: {
    list: ArticleList,
    listSkeleton: ArticleListSkeleton,
  } satisfies ListComponents,
  series: {
    list: SeriesList,
    listSkeleton: SeriesListSkeleton,
  } satisfies ListComponents,
  questions: {
    list: QuestionList,
    listSkeleton: QuestionListSkeleton,
  } satisfies ListComponents,
};

export default async function TopicTrendingPostPage({ params }: PageProps<'/topics/[slug]/[view]'>) {
  const parsedParam = parseObject(await params, topicDetailSchema);
  const posts = getTopicTrendingPosts(parsedParam.slug, parsedParam.view);

  const { list: List, listSkeleton: ListSkeleton } = LIST_COMPONENTS[parsedParam.view];

  return (
    <div className="flex-1 space-y-4">
      <TopicDetailNav {...parsedParam} />
      <List>
        <Suspense fallback={<ListSkeleton />}>
          <TopicTrendingListContent posts={posts} view={parsedParam.view} />
        </Suspense>
      </List>
    </div>
  );
}

interface TopicTrendingListContentProps {
  posts: Promise<Article[] | Series[] | Question[]>;
  view: TopicDetailView;
}

async function TopicTrendingListContent({ posts, view }: Readonly<TopicTrendingListContentProps>) {
  const resolvedPosts = await posts;

  if (resolvedPosts.length === 0) {
    return <ListEmpty message={'검색 결과를 찾을 수 없습니다.'} className="py-4" />;
  }

  switch (view) {
    case 'articles':
      return (resolvedPosts as Article[]).map((post) => <ArticleListItem key={post.id} article={post} />);
    case 'series':
      return (resolvedPosts as Series[]).map((post) => <SeriesListItem key={post.id} series={post} />);
    case 'questions':
      return (resolvedPosts as Question[]).map((post) => <QuestionListItem key={post.id} question={post} />);
    default:
      return null;
  }
}
