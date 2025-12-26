import { PageSkeleton } from '@/components/client/page';
import { QuestionList, QuestionListSkeleton } from '@/components/server/question';

export default function QuestionSearchSkeleton() {
  return (
    <>
      <QuestionList>
        <QuestionListSkeleton />
      </QuestionList>
      <PageSkeleton />
    </>
  );
}
