'use client';

import { QUESTION_FILTER_OPTIONS } from '@/constants/options';
import { questionSearchSchema } from '@/schemas/question';
import { ButtonLink } from '@ui/button-link';
import { useFormStatus } from 'react-dom';
import { z } from 'zod';

interface QuestionSearchFilterProps {
  defaultValues: z.infer<typeof questionSearchSchema>;
  action: string;
}

export default function QuestionSearchFilter({ defaultValues, action }: Readonly<QuestionSearchFilterProps>) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-wrap gap-2">
      <input type="hidden" name="filter" value={defaultValues.filter} />
      {Object.entries(QUESTION_FILTER_OPTIONS).map(([key, { label }]) => (
        <ButtonLink
          key={key}
          href={{
            pathname: action,
            query: { ...defaultValues, page: 1, filter: key },
          }}
          variant={defaultValues.filter === key ? 'secondary' : 'ghost'}
          className={'rounded-full'}
          disabled={pending}
        >
          {label}
        </ButtonLink>
      ))}
    </div>
  );
}
