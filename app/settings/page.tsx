'use client';

import { getSelfProfile, getSelfGitHub, getSelfPrivacy } from '@/apis/client/user';
import {
  UserAvatarForm,
  UsernameForm,
  UserProfileForm,
  UserPrivacyForm,
  UserGitHubForm,
  UserThemeForm,
  UserWithdrawButton,
} from '@/components/client/user';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardTitle } from '@ui/card';

export default function SettingsPage() {
  const { session, status: authStatus } = useAuth();
  const { data: profile } = useQuery({
    queryKey: ['getSelfProfile'],
    queryFn: getSelfProfile,
    enabled: authStatus === 'authenticated',
  });
  const { data: privacy } = useQuery({
    queryKey: ['getSelfPrivacy'],
    queryFn: getSelfPrivacy,
    enabled: authStatus === 'authenticated',
  });
  const { data: github } = useQuery({
    queryKey: ['getSelfGitHub'],
    queryFn: getSelfGitHub,
    enabled: authStatus === 'authenticated',
  });

  if (!session) {
    return;
  }

  return (
    <main className="mx-auto p-4 pt-20 max-w-3xl w-full min-h-screen flex flex-col md:flex-row gap-8">
      <aside className="md:sticky md:top-4 mx-auto max-w-xs h-fit space-y-3">
        <UserAvatarForm session={session} />
      </aside>
      <Card className="w-full h-fit">
        <CardContent className="space-y-4 pb-4 border-b">
          <div className="space-y-1.5">
            <CardTitle>유저네임 설정</CardTitle>
            <CardDescription>유저네임을 변경하려면 아래 폼을 작성해주세요.</CardDescription>
          </div>
          <UsernameForm username={session.username} />
        </CardContent>
        <CardContent className="space-y-4 pb-4 border-b">
          <div className="space-y-1.5">
            <CardTitle>프로필 설정</CardTitle>
            <CardDescription>프로필 설정을 변경하려면 아래 폼을 작성해주세요.</CardDescription>
          </div>
          {profile && <UserProfileForm nickname={session.nickname} profile={profile} />}
        </CardContent>
        <CardContent className="space-y-4 pb-4 border-b">
          <div className="space-y-1.5">
            <CardTitle>개인정보 설정</CardTitle>
            <CardDescription>다른 사용자에게 표시되는 정보를 관리할 수 있습니다.</CardDescription>
          </div>
          {privacy && <UserPrivacyForm privacy={privacy} />}
        </CardContent>
        <CardContent className="space-y-4 pb-4 border-b">
          <div className="space-y-1.5">
            <CardTitle>GitHub 설정</CardTitle>
            <CardDescription>GitHub 계정을 등록하려면 아래 폼을 작성해주세요.</CardDescription>
          </div>
          {github && <UserGitHubForm github={github} />}
        </CardContent>
        <CardContent className="space-y-4 pb-4 border-b">
          <div className="space-y-1.5">
            <CardTitle>테마 설정</CardTitle>
            <CardDescription>
              라이트 모드, 다크 모드 또는 시스템 설정에 따라 자동으로 변경되도록 설정할 수 있습니다.
            </CardDescription>
          </div>
          <UserThemeForm />
        </CardContent>
        <CardContent className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <UserWithdrawButton />
        </CardContent>
      </Card>
    </main>
  );
}
