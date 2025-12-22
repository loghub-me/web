'use client';

import { QuestionSearchFilter, QuestionSearchQuery, QuestionSearchSort } from '@/components/client/question';
import { questionSearchSchema } from '@/schemas/question';
import Form from 'next/form';
import { useRef } from 'react';
import { z } from 'zod';

interface QuestionSearchFormProps {
  defaultValues: z.infer<typeof questionSearchSchema>;
  action?: string;
}

export default function QuestionSearchForm({
  defaultValues,
  action = '/search/questions',
}: Readonly<QuestionSearchFormProps>) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form ref={formRef} action={action} className="space-y-3">
      <div className="flex gap-2">
        <QuestionSearchSort defaultValues={defaultValues} action={action} />
        <QuestionSearchQuery defaultValue={defaultValues.query} key={defaultValues.query} />
      </div>
      <QuestionSearchFilter defaultValues={defaultValues} action={action} />
    </Form>
  );
}
