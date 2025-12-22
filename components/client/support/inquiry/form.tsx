'use client';

import { postInquiry } from '@/apis/client/support';
import { EmailField, TitleField } from '@/components/client/field';
import { handleFormError } from '@/lib/error';
import { inquirySchema } from '@/schemas/support';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Field, FieldError, FieldLabel } from '@ui/field';
import { InputGroup, InputGroupAddon, InputGroupAutoHeightTextarea, InputGroupText } from '@ui/input-group';
import { MailIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function InquiryForm() {
  const form = useForm<z.infer<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { email: '', title: '', content: '' },
  });

  async function onSubmit(values: z.infer<typeof inquirySchema>) {
    try {
      const { message } = await postInquiry(values);
      toast.success(message);
      form.reset();
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    <form id="support-inquiry-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <EmailField id="support-inquiry-form-email" control={form.control} optional />
      <TitleField id="support-inquiry-form-title" control={form.control} />
      <Controller
        name={'content'}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="support-inquiry-form-description">내용</FieldLabel>
            <InputGroup>
              <InputGroupAutoHeightTextarea
                {...field}
                id="support-inquiry-form-description"
                placeholder="문의 내용을 입력해주세요."
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="ml-auto">{field.value.length}/2048 자 입력</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          <MailIcon /> 문의 보내기
        </Button>
      </div>
    </form>
  );
}
