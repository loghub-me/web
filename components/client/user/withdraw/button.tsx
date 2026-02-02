'use client';

import { withdraw } from '@/apis/client/user';
import { UsernameField } from '@/components/client/field';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { userWithdrawConfirmSchema } from '@/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { UserXIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export default function UserWithdrawButton() {
  const { session } = useAuth();
  const form = useForm<z.infer<typeof userWithdrawConfirmSchema>>({
    resolver: zodResolver(userWithdrawConfirmSchema),
    defaultValues: { username: '' },
  });

  async function onSubmit(values: z.infer<typeof userWithdrawConfirmSchema>) {
    if (!session) return;
    if (values.username !== session.username) {
      form.setError('username', { message: '입력한 유저네임이 현재 유저네임과 일치하지 않습니다.' });
      return;
    }

    try {
      const { message } = await withdraw();
      toast.success(message);
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button type={'button'} variant={'destructive'} size={'sm'} />}>
        <UserXIcon /> 탈퇴하기
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>탈퇴 확인</DialogTitle>
          <DialogDescription>서비스 탈퇴 시 데이터가 모두 삭제되며, 복구할 수 없습니다.</DialogDescription>
        </DialogHeader>
        <form id="withdraw-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <UsernameField id="withdraw-form-nickname" control={form.control} />
          <p className="text-sm">
            탈퇴를 원하시면 <strong>현재 유저네임</strong>을 입력해주세요.
          </p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <DialogCloseButton>취소하기</DialogCloseButton>
            <Button type={'submit'} variant={'destructive'} size={'sm'} disabled={form.formState.isSubmitting}>
              <UserXIcon /> 탈퇴하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
