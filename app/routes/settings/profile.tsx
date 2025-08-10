import type { Route } from './+types/profile';
import { useQuery } from '@tanstack/react-query';
import { getSelfProfile } from '~/apis/client/user';
import { UserAvatarUpdateDialog, UserAvatarUpdateForm, UserProfileUpdateForm } from '~/components/user';
import { createMetadata } from '~/constants/meta';
import { useAuth } from '~/hooks/use-auth';

export const meta: Route.MetaFunction = () => {
  const title = '프로필 설정';
  const description = '프로필 사진과 닉네임, 소개 등을 설정할 수 있습니다.';
  return createMetadata(title, description);
};

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
        <UserAvatarUpdateDialog {...session}>
          <UserAvatarUpdateForm {...session} />
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
