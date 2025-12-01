import { getQuestionAnswers, getQuestionDetail } from '@/apis/server/question';
import { QuestionAnswerPostCard, QuestionAnswerTOCCard, QuestionAnswerTOCSkeleton } from '@/components/client/question';
import {
  QuestionAnswerList,
  QuestionAnswerListItem,
  QuestionAnswerListSkeleton,
  QuestionDetailAside,
  QuestionDetailContent,
  QuestionDetailHeader,
  QuestionDetailHero,
  QuestionStatusCard,
} from '@/components/server/question';
import { parseObject } from '@/lib/parse';
import { compositeKeySchema } from '@/schemas/common';
import { Card } from '@ui/card';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({ params }: PageProps<'/questions/[username]/[slug]'>): Promise<Metadata> {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const question = await getQuestionDetail(username, slug);
  return {
    title: question.title,
    description: question.content.markdown.slice(0, 160).replace(/\n/g, ' '),
  };
}

export default async function QuestionDetailPage({ params }: PageProps<'/questions/[username]/[slug]'>) {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const question = await getQuestionDetail(username, slug);
  const answers = getQuestionAnswers(question.id);

  return (
    <main className="container mx-auto py-20 min-h-screen space-y-4">
      <QuestionDetailHero question={question} />
      <div className="flex gap-4">
        <div className="w-full min-w-0 space-y-4">
          <Card id="question" className="pt-0">
            <QuestionDetailHeader question={question} />
            <QuestionDetailContent question={question} />
          </Card>
          {question.status === 'OPEN' && <QuestionAnswerPostCard question={question} />}
          <QuestionAnswerList>
            <Suspense fallback={<QuestionAnswerListSkeleton />}>
              <QuestionAnswerListContent answers={answers} question={question} />
            </Suspense>
          </QuestionAnswerList>
        </div>
        <QuestionDetailAside>
          <QuestionStatusCard question={question} />
          <Suspense fallback={<QuestionAnswerTOCSkeleton />}>
            <QuestionAnswerTOCContent answers={answers} />
          </Suspense>
        </QuestionDetailAside>
      </div>
    </main>
  );
}

interface QuestionAnswerListContentProps {
  answers: Promise<QuestionAnswer[]>;
  question: Pick<QuestionDetail, 'id' | 'status' | 'writer'>;
}

async function QuestionAnswerListContent({ answers, question }: Readonly<QuestionAnswerListContentProps>) {
  const resolvedAnswers = await answers;
  return resolvedAnswers.map((answer) => (
    <QuestionAnswerListItem key={answer.id} answer={answer} question={question} />
  ));
}

async function QuestionAnswerTOCContent({ answers }: Readonly<Pick<QuestionAnswerListContentProps, 'answers'>>) {
  const resolvedAnswers = await answers;
  return <QuestionAnswerTOCCard answers={resolvedAnswers} />;
}
