'use client';

import { getSeriesForEdit } from '@/apis/client/series';
import { SeriesChapterManager, SeriesEditForm } from '@/components/client/series';
import { useAuth } from '@/hooks/use-auth';
import { useQueryErrorHandle } from '@/hooks/use-query-error-handle';
import { parseObject } from '@/lib/parse';
import { idSchema } from '@/schemas/common';
import { seriesEditSchema } from '@/schemas/series';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SeriesEditPage() {
  const params = useParams<{ id: string }>();
  const { id } = parseObject(params, idSchema);
  const { status } = useAuth();
  const { data: series, error } = useQuery({
    queryKey: ['getSeriesForEdit', id],
    queryFn: () => getSeriesForEdit(id),
    enabled: status === 'authenticated',
    retry: false,
  });

  useQueryErrorHandle(error, '/search/series');

  return (
    status === 'authenticated' && (
      <main className="container mx-auto px-4 py-20 min-h-screen space-y-4">
        {series && <SeriesEditor key={series.id} defaultValues={series} />}
        {series && <SeriesChapterManager series={series} />}
      </main>
    )
  );
}

interface SeriesEditorProps {
  defaultValues: SeriesForEdit;
}

function SeriesEditor({ defaultValues }: Readonly<SeriesEditorProps>) {
  const form = useForm<z.infer<typeof seriesEditSchema>>({ resolver: zodResolver(seriesEditSchema), defaultValues });

  return (
    <Card className="mx-auto max-w-3xl w-full">
      <CardHeader className="space-y-1.5 pb-4 border-b">
        <CardTitle>시리즈 수정</CardTitle>
        <CardDescription>시리즈를 수정하기 위해 아래 폼을 작성해주세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <SeriesEditForm id={defaultValues.id} form={form} />
      </CardContent>
    </Card>
  );
}
