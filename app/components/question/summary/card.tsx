import { useEffect, useState } from 'react';
import ListEmpty from '~/components/common/list/empty';
import { ButtonLink } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { UserAvatar } from '~/components/user';

interface QuestionSummaryCardProps {
  question: Question;
  answers: QuestionAnswer[];
}

export default function QuestionSummaryCard({ question, answers }: Readonly<QuestionSummaryCardProps>) {
  const [activeSlug, setActiveSlug] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const slug = entry.target.getAttribute('id');
          setActiveSlug((prev) => (entry.isIntersecting && slug ? slug : prev));
        }),
      { root: null, rootMargin: '0px 0px -92% 0px', threshold: 0 }
    );

    const element = document.getElementById('question') as HTMLHeadingElement | null;
    if (element) {
      observer.observe(element);
    }
    answers.forEach((answer) => {
      const element = document.getElementById(`answer-${answer.id}`) as HTMLHeadingElement | null;
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [answers]);

  return (
    <Card className="pb-2">
      <CardHeader className="px-2 pb-2 border-b space-y-2">
        <CardTitle className="pl-2 text-sm text-muted-foreground">질문</CardTitle>
        <ButtonLink
          to={'#question'}
          variant={activeSlug === 'question' ? 'secondary' : 'ghost'}
          className="px-2 w-full justify-start"
        >
          <UserAvatar {...question.writer} /> <span className="truncate">{question.title}</span>
        </ButtonLink>
      </CardHeader>
      <CardContent className="px-2 space-y-2">
        <CardTitle className="pl-2 text-sm text-muted-foreground">답변</CardTitle>
        {answers.length === 0 && <ListEmpty message={'아직 답변이 등록되지 않았습니다'} />}
        {answers.map((answer) => (
          <ButtonLink
            key={answer.id}
            to={`#answer-${answer.id}`}
            variant={activeSlug === `answer-${answer.id}` ? 'secondary' : 'ghost'}
            className="px-2 w-full justify-start"
          >
            <UserAvatar {...answer.writer} /> <span className="truncate">{answer.title}</span>
          </ButtonLink>
        ))}
      </CardContent>
    </Card>
  );
}
