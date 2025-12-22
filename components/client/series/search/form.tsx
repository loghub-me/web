'use client';

import { SeriesSearchQuery, SeriesSearchSort } from '@/components/client/series';
import { seriesSearchSchema } from '@/schemas/series';
import Form from 'next/form';
import { useRef } from 'react';
import { z } from 'zod';

interface SeriesSearchFormProps {
  defaultValues: z.infer<typeof seriesSearchSchema>;
  action?: string;
}

export default function SeriesSearchForm({
  defaultValues,
  action = '/search/series',
}: Readonly<SeriesSearchFormProps>) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form ref={formRef} action={action} className="flex gap-2">
      <SeriesSearchSort defaultValues={defaultValues} action={action} />
      <SeriesSearchQuery defaultValue={defaultValues.query} key={defaultValues.query} />
    </Form>
  );
}
