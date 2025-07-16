import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getTrendingArticles } from '~/apis/client/article';
import { getTrendingQuestions } from '~/apis/client/question';
import { getTrendingSeries } from '~/apis/client/series';
import { getSelfRecentPosts } from '~/apis/client/user';
import { ArticleList, ArticleListItem } from '~/components/article';
import { QuestionList, QuestionListItem } from '~/components/question';
import { SeriesList, SeriesListItem } from '~/components/series';
import { Tabs, TabsContent, TabsDescription, TabsList, TabsTitle, TabsTrigger } from '~/components/ui/tabs';
import { UserPostList, UserPostListItem, UserPostListSkeleton, UserPostShowMoreButton } from '~/components/user';

export default function MemberHomeRoute() {
  const { data: recentPosts, status } = useQuery({ queryKey: ['getSelfRecentPosts'], queryFn: getSelfRecentPosts });
  const { data: trendingArticles } = useQuery({ queryKey: ['getTrendingPosts'], queryFn: getTrendingArticles });
  const { data: trendingSeries } = useQuery({ queryKey: ['getTrendingSeries'], queryFn: getTrendingSeries });
  const { data: trendingQuestions } = useQuery({ queryKey: ['getTrendingQuestions'], queryFn: getTrendingQuestions });

  const [showAllPosts, setShowAllPosts] = useState(false);
  const filteredRecentPosts = showAllPosts ? recentPosts : recentPosts?.slice(0, 3);

  return (
    <main className="min-h-screen pt-16 flex flex-col lg:flex-row">
      <aside className="p-4 lg:max-w-sm w-full lg:min-h-screen h-full space-y-4 border-b lg:border-b-0 lg:border-r">
        <h5 className="text-primary font-semibold">최근에 작성한 포스트</h5>
        <UserPostList>
          {status === 'pending' && <UserPostListSkeleton size={2} />}
          {filteredRecentPosts?.map((post) => (
            <UserPostListItem key={post.path} post={post} />
          ))}
          <UserPostShowMoreButton
            postsLength={recentPosts?.length || 0}
            showAllPosts={showAllPosts}
            setShowAllPosts={setShowAllPosts}
          />
        </UserPostList>
      </aside>
      <Tabs defaultValue={'articles'} className="p-4 w-full">
        <TabsList>
          <TabsTrigger value={'articles'}>아티클</TabsTrigger>
          <TabsTrigger value={'series'}>시리즈</TabsTrigger>
          <TabsTrigger value={'questions'}>질문</TabsTrigger>
        </TabsList>
        <TabsContent value={'articles'}>
          <div className="space-y-4">
            <div className="space-y-2">
              <TabsTitle>인기 아티클</TabsTitle>
              <TabsDescription>최근 인기 있는 아티클을 확인해보세요!</TabsDescription>
            </div>
            <ArticleList>
              {trendingArticles?.map((article) => (
                <ArticleListItem key={article.id} article={article} />
              ))}
            </ArticleList>
          </div>
        </TabsContent>
        <TabsContent value={'series'}>
          <div className="space-y-4">
            <div className="space-y-2">
              <TabsTitle>인기 시리즈</TabsTitle>
              <TabsDescription>최근 인기 있는 시리즈를 확인해보세요!</TabsDescription>
            </div>
            <SeriesList>
              {trendingSeries?.map((series) => (
                <SeriesListItem key={series.id} series={series} />
              ))}
            </SeriesList>
          </div>
        </TabsContent>
        <TabsContent value={'questions'}>
          <div className="space-y-4">
            <div className="space-y-2">
              <TabsTitle>인기 질문</TabsTitle>
              <TabsDescription>최근 인기 있는 질문을 확인해보세요!</TabsDescription>
            </div>
            <QuestionList>
              {trendingQuestions?.map((question) => (
                <QuestionListItem key={question.id} question={question} />
              ))}
            </QuestionList>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
