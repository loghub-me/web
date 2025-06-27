import { useQuery } from '@tanstack/react-query';
import { getSelfPrivacy } from '~/apis/client/users';
import { UserPrivacyUpdateForm } from '~/components/users';
import { useAuth } from '~/hooks/use-auth';

export default function SettingPrivacyRoute() {
  const { status: authStatus } = useAuth();
  const { data: privacy } = useQuery({
    queryKey: ['user', 'self', 'privacy'],
    queryFn: getSelfPrivacy,
    enabled: authStatus === 'authenticated',
  });

  return (
    <main className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">개인정보 설정</h3>
        <p className="text-sm text-muted-foreground">다른 사용자에게 표시되는 정보를 관리할 수 있습니다.</p>
      </div>
      {privacy && <UserPrivacyUpdateForm privacy={privacy} />}
    </main>
  );
}
