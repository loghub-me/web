'use client';

import { postTopicRequest } from '@/apis/client/support';
import { handleFormError } from '@/lib/error';
import { topicRequestSchema } from '@/schemas/support';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Textarea } from '@ui/textarea';
import { MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface TopicRequestFormProps {
  closeDialog?: () => void;
}

export default function TopicRequestForm({ closeDialog }: TopicRequestFormProps) {
  const form = useForm<z.infer<typeof topicRequestSchema>>({
    resolver: zodResolver(topicRequestSchema),
    defaultValues: { name: '', description: '' },
  });

  function onSubmit(values: z.infer<typeof topicRequestSchema>) {
    postTopicRequest(values)
      .then(({ message }) => {
        toast.success(message);
        form.reset();
        closeDialog?.();
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
        <FormField
          control={form.control}
          name={'name'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>토픽 이름</FormLabel>
              <FormControl>
                <Input type={'title'} placeholder="토픽 이름을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'description'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>토픽 설명</FormLabel>
              <FormControl>
                <Textarea placeholder="토픽 설명을 입력해주세요." className="h-32" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <MailIcon /> 토픽 요청 보내기
          </Button>
        </div>
      </form>
    </Form>
  );
}
