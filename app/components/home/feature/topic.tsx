import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { TopicSlugsFormControl } from '~/components/common/topic/form-control';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form';
import zodFields from '~/schemas/fields';

export default function FeatureTopic() {
  const { topicSlugs } = zodFields;
  const schema = z.object({ topicSlugs });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { topicSlugs: [] },
  });
  const [topics, setTopics] = useState<Topic[]>([]);

  function onSubmit(_values: z.infer<typeof schema>) {
    if (topics.length === 0) {
      toast.error('토픽을 하나 이상 선택해주세요');
      return;
    }
    toast.success(`선택한 토픽: ${topics.map((topic) => topic.name).join(', ')}`);
  }

  useEffect(() => {
    form.setValue(
      'topicSlugs',
      topics.map((topic) => topic.slug)
    );
  }, [topics]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 gap-4 p-4 w-full h-full border bg-muted rounded-xl"
      >
        <div className="w-full space-y-2">
          <TopicSlugsFormControl topics={topics} setTopics={setTopics} />
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <CheckIcon /> 선택 완료
          </Button>
        </div>
      </form>
    </Form>
  );
}
