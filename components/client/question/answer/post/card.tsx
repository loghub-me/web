'use client';

import { QuestionAnswerPostForm } from '@/components/client/question';
import { useAuth } from '@/hooks/use-auth';
import { ButtonLink } from '@ui/button-link';
import { Card } from '@ui/card';
import { LogInIcon } from 'lucide-react';

interface QuestionAnswerPostCardProps {
  question: Pick<Question, 'id' | 'writer'>;
}

export default function QuestionAnswerPostCard({ question }: Readonly<QuestionAnswerPostCardProps>) {
  const { status: authStatus, session } = useAuth();

  switch (authStatus) {
    case 'loading':
    case 'unauthenticated':
      return (
        <Card className="p-4 flex-row items-center bg-primary/10 gap-3">
          <ButtonLink variant={'default'} href={'/login'}>
            <LogInIcon /> 로그인
          </ButtonLink>
          <p className="text-sm text-accent-foreground">하고 답변을 작성해 보세요!</p>
        </Card>
      );
    case 'authenticated':
      return session?.id === question.writer.id ? (
        <Card className="p-4 flex-row items-center bg-primary/10 gap-3">
          <p className="text-sm text-accent-foreground">
            <strong className="text-primary">상단의 답변 생성 버튼</strong>을 눌러 AI 답변 작성을 요청해 보세요!
          </p>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <QuestionAnswerPostForm questionId={question.id} />
        </Card>
      );
  }
}
