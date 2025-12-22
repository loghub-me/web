'use client';

import { TopicSlugsField } from '@/components/client/field';
import zodFields from '@/schemas/fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { CheckIcon, TagIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export default function HomeFeatureTopic() {
  const schema = z.object({ topicSlugs: zodFields.topicSlugs });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { topicSlugs: [] },
  });
  const [topicSlugs, setTopicSlugs] = useState(new Set<string>());

  function onSubmit(values: z.infer<typeof schema>) {
    if (values.topicSlugs.length === 0) {
      toast.error('토픽을 하나 이상 선택해주세요');
      return;
    }
    toast.success('토픽이 선택되었습니다!', { icon: <TagIcon className="size-4" /> });
  }

  useEffect(() => {
    form.setValue('topicSlugs', [...topicSlugs]);
  }, [form, topicSlugs]);

  return (
    <div className="p-4 min-h-84 flex items-center justify-center w-full h-full border rounded-xl">
      <form id="home-feature-topic-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <TopicSlugsField
          id="home-feature-topic-slugs"
          control={form.control}
          topicSlugs={topicSlugs}
          setTopicSlugs={setTopicSlugs}
        />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <CheckIcon /> 선택 완료
          </Button>
        </div>
      </form>
    </div>
  );
}
