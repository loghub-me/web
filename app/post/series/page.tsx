'use client';

import { SeriesPostForm } from '@/components/client/series';
import { seriesPostSchema } from '@/schemas/series';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SeriesPostPage() {
  const form = useForm<z.infer<typeof seriesPostSchema>>({
    resolver: zodResolver(seriesPostSchema),
    defaultValues: { title: '', description: '', thumbnail: '0/default-series-thumbnail.webp', topicSlugs: [] },
  });

  return (
    <main className="container mx-auto px-4 py-20 min-h-screen space-y-4">
      <Card className="mx-auto max-w-3xl w-full">
        <CardHeader className="space-y-1.5 pb-4 border-b">
          <CardTitle>새 시리즈 만들기</CardTitle>
          <CardDescription>시리즈를 만들기 위해 아래 폼을 작성해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <SeriesPostForm form={form} />
        </CardContent>
      </Card>
    </main>
  );
}
