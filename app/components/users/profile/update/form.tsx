import { zodResolver } from '@hookform/resolvers/zod';
import { UploadIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { refreshToken } from '~/apis/client/auth';
import { updateSelfProfile } from '~/apis/client/users';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useAuth } from '~/hooks/use-auth';
import { handleFormError } from '~/lib/error';
import { userProfileUpdateSchema } from '~/schemas/user';

interface UserProfileUpdateFormProps {
  profile: UserProfile;
}

export default function UserProfileUpdateForm({ profile }: Readonly<UserProfileUpdateFormProps>) {
  const { registerSession, unregisterSession } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof userProfileUpdateSchema>>({
    resolver: zodResolver(userProfileUpdateSchema),
    defaultValues: profile,
  });

  function onSubmit(values: z.infer<typeof userProfileUpdateSchema>) {
    updateSelfProfile(values)
      .then(({ message }) => {
        toast.success(message);
        navigate(0);
        refreshToken().then(registerSession).catch(unregisterSession);
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>닉네임</FormLabel>
              <FormControl>
                <Input placeholder="닉네임" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="readme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>소개</FormLabel>
              <FormControl>
                <Textarea className="h-32" placeholder="소개를 작성해보세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type={'button'} variant={'ghost'} onClick={() => form.reset()}>
            초기화
          </Button>
          <Button type={'submit'}>
            <UploadIcon /> 저장
          </Button>
        </div>
      </form>
    </Form>
  );
}
