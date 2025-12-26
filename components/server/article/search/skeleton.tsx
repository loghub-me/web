import { PageSkeleton } from '@/components/client/page';
import { ArticleList, ArticleListSkeleton } from '@/components/server/article';

export default function ArticleSearchSkeleton() {
  return (
    <>
      <ArticleList>
        <ArticleListSkeleton />
      </ArticleList>
      <PageSkeleton />
    </>
  );
}
