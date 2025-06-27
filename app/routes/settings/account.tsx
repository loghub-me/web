import { MailIcon, UserXIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import UsernameUpdateDialog from '~/components/users/username/update/dialog';
import UsernameUpdateForm from '~/components/users/username/update/form';
import { useAuth } from '~/hooks/use-auth';

export default function SettingAccountRoute() {
  const { session } = useAuth();

  return (
    session && (
      <main className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">계정 설정</h3>
          <p className="text-sm text-muted-foreground">계정 설정을 통해 사용자 정보를 업데이트할 수 있습니다.</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">이메일</label>
          <div className="flex gap-2">
            <Input type="text" name="email" value={session.email} disabled />
            <Button type="button" variant="outline" disabled>
              <MailIcon /> 이메일 변경
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">유저네임</label>
          <div className="flex gap-2">
            <Input type="text" name="username" value={session.username} disabled />
            <UsernameUpdateDialog>
              <UsernameUpdateForm />
            </UsernameUpdateDialog>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant={'destructive'}>
            <UserXIcon /> 탈퇴하기
          </Button>
        </div>
      </main>
    )
  );
}
