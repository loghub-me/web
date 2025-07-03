import { BotIcon, BotOffIcon, CloudUploadIcon, LetterTextIcon, WandSparklesIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { postQuestion } from '~/apis/client/question';
import TopicSlugsFormControl from '~/components/common/topic/form-control';
import { Button } from '~/components/ui/button';
import { DialogClose } from '~/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { GlowButton } from '~/components/ui/glow-button';
import { IconInput } from '~/components/ui/icon-input';
import { Switch, SwitchIcon } from '~/components/ui/switch';
import { handleMessageError } from '~/lib/error';
import { questionPostSchema } from '~/schemas/question';

interface QuestionPostFormProps {
  form: UseFormReturn<z.infer<typeof questionPostSchema>>;
}

export default function QuestionPostForm({ form }: Readonly<QuestionPostFormProps>) {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);

  function onSubmit(values: z.infer<typeof questionPostSchema>) {
    postQuestion(values)
      .then(({ pathname, message }) => {
        toast.success(message);
        navigate(pathname);
      })
      .catch(handleMessageError);
  }

  useEffect(() => {
    form.setValue(
      'topicSlugs',
      topics.map((topic) => topic.slug)
    );
  }, [topics]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <IconInput icon={LetterTextIcon} placeholder="제목을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TopicSlugsFormControl topics={topics} setTopics={setTopics} />
        <FormField
          control={form.control}
          name="requestBotAnswer"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 space-y-0">
              <div className="space-y-0.5">
                <FormLabel>AI 답변 요청하기</FormLabel>
                <FormDescription>봇에게 답변을 요청하면, 질문에 대한 답변을 AI가 생성합니다.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange}>
                  <SwitchIcon enabledIcon={BotIcon} disabledIcon={BotOffIcon} value={field.value} />
                </Switch>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField control={form.control} name="content" render={({ field }) => <FormMessage />} />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <XIcon /> 취소하기
            </Button>
          </DialogClose>
          <GlowButton type="button" variant="outline">
            <WandSparklesIcon /> 자동완성
          </GlowButton>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <CloudUploadIcon /> 게시하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
