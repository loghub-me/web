'use client';

import { postInquiry } from '@/apis/client/support';
import { handleFormError } from '@/lib/error';
import { inquirySchema } from '@/schemas/support';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { LabelOptional } from '@ui/label';
import { Textarea } from '@ui/textarea';
import { MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function InquiryForm() {
  const form = useForm<z.infer<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { email: '', title: '', content: '' },
  });

  function onSubmit(values: z.infer<typeof inquirySchema>) {
    postInquiry(values)
      .then(({ message }) => {
        toast.success(message);
        form.reset();
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
        <FormField
          control={form.control}
          name={'email'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                이메일 <LabelOptional />
              </FormLabel>
              <FormControl>
                <Input type={'email'} placeholder="이메일을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'title'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input type={'title'} placeholder="제목을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'content'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Textarea placeholder="내용을 입력해주세요." className="h-32" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <MailIcon /> 문의 보내기
          </Button>
        </div>
      </form>
    </Form>
  );
}
