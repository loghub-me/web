'use client';

import { TOPIC_QUESTION_SORT_OPTIONS } from '@/constants/options';
import { topicQuestionsSearchParams } from '@/schemas/topic';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { useRouter } from 'next/navigation';
import { format } from 'node:url';
import { z } from 'zod';

interface TopicQuestionsSortProps {
  slug: string;
  searchParams: z.infer<typeof topicQuestionsSearchParams>;
}

export default function TopicQuestionsSort({ slug, searchParams }: Readonly<TopicQuestionsSortProps>) {
  const router = useRouter();

  function onValueChange(value: string) {
    const href = format({
      pathname: `/topics/${slug}/questions`,
      query: { sort: value },
    });
    router.push(href);
  }

  return (
    <Select name={'sort'} defaultValue={searchParams.sort} onValueChange={onValueChange}>
      <SelectTrigger className="w-38">
        <SelectValue placeholder={'Sort'} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(TOPIC_QUESTION_SORT_OPTIONS).map(([value, { label, icon: Icon }]) => (
          <SelectItem key={value} value={value}>
            <div className={'flex items-center gap-2'}>
              <Icon /> {label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
