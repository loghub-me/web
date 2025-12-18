'use client';

import { postTopicRequest } from '@/apis/client/support';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { topicRequestSchema } from '@/schemas/support';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { DialogHeader } from '@ui/dialog';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@ui/dialog';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@ui/form';
import { Input } from '@ui/input';
import { Textarea } from '@ui/textarea';
import { MailIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export default function TopicRequest() {
  const [open, setOpen] = useState(false);
  const { status } = useAuth();

  if (status !== 'authenticated') {
    return;
  }

  return (
    <TopicRequestDialog open={open} setOpen={setOpen}>
      <TopicRequestForm setOpen={setOpen} />
    </TopicRequestDialog>
  );
}

interface TopicRequestDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

function TopicRequestDialog({ open, setOpen, children }: TopicRequestDialogProps) {
  return (
    <p className={'text-sm text-muted-foreground'}>
      <span>찾으시는 토픽이 없으신가요?</span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant={'link'} size={'sm'} className="ml-1.5 p-0 h-auto" />}>
          토픽 요청하기
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>토픽 요청 </DialogTitle>
            <DialogDescription>토픽 요청을 위해 폼을 작성해주세요.</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </p>
  );
}

interface TopicRequestFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function TopicRequestForm({ setOpen }: TopicRequestFormProps) {
  const form = useForm<z.infer<typeof topicRequestSchema>>({
    resolver: zodResolver(topicRequestSchema),
    defaultValues: { name: '', description: '' },
  });

  async function onSubmit(values: z.infer<typeof topicRequestSchema>) {
    try {
      const { message } = await postTopicRequest(values);
      toast.success(message);
      form.reset();
      setOpen(false);
    } catch (err) {
      handleFormError(err, form.setError);
    }
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
