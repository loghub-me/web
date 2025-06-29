import { useQuery } from '@tanstack/react-query';
import { getSelfProfile } from '~/apis/client/users';
import { UserAvatarUpdateDialog, UserAvatarUpdateForm, UserProfileUpdateForm } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';

export default function SettingProfileRoute() {
  const { session, status: authStatus } = useAuth();
  const { data: profile } = useQuery({
    queryKey: ['user', 'self', 'profile'],
    queryFn: getSelfProfile,
    enabled: authStatus === 'authenticated',
  });

  return (
    <main className="flex gap-8 flex-col items-center md:items-start md:flex-row">
      {session && (
        <UserAvatarUpdateDialog username={session.username}>
          <UserAvatarUpdateForm username={session.username} />
        </UserAvatarUpdateDialog>
      )}
      <div className="w-full space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">프로필 설정</h3>
          <p className="text-sm text-muted-foreground">프로필 사진과 닉네임, 소개 등을 설정할 수 있습니다.</p>
        </div>
        {profile && <UserProfileUpdateForm profile={profile} />}
      </div>
    </main>
  );
}
