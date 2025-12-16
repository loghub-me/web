import { getUserDetail } from '@/apis/server/user';
import { TopicIcon } from '@/components/client/topic';
import { UserAvatar, UserDetailNav } from '@/components/client/user';
import { UserDetailAside, UserDetailAsideSkeleton } from '@/components/server/user';
import { parseObject } from '@/lib/parse';
import { userDetailSchema } from '@/schemas/user';
import { SimpleTooltip } from '@ui/simple-tooltip';
import { BadgeCheckIcon, BadgeXIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function UserDetailLayout({ params, children }: LayoutProps<'/[username]'>) {
  const parsedParam = parseObject(await params, userDetailSchema);
  const user = getUserDetail(parsedParam.username);

  return (
    <main className="container mx-auto px-4 py-20 min-h-screen space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <UserDetailAside>
          <Suspense fallback={<UserDetailAsideSkeleton />}>
            <UserDetailAsideContent user={user} />
          </Suspense>
        </UserDetailAside>
        <div className="flex-1 min-w-0 space-y-4">
          <UserDetailNav {...parsedParam} />
          {children}
        </div>
      </div>
    </main>
  );
}

interface UserDetailAsideContentProps {
  user: Promise<UserDetail>;
}

async function UserDetailAsideContent({ user }: Readonly<UserDetailAsideContentProps>) {
  const resolvedUser = await user;
  const { email, username, profile, github } = resolvedUser;

  return (
    <>
      <UserAvatar size={'xl'} {...resolvedUser} className="shadow-xs" />
      <div className="w-full space-y-1.5">
        <h3 className="text-lg font-semibold">@{username}</h3>
        <p className="text-muted-foreground">{profile.nickname}</p>
      </div>
      <div className="space-y-1.5 w-full">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MailIcon className="size-4 text-foreground" />{' '}
          {email ? (
            <Link href={`mailto:${email}`} className="hover:underline">
              {email}
            </Link>
          ) : (
            '비공개'
          )}
        </div>
        {github.username && (
          <div className="flex items-center gap-2  text-muted-foreground">
            <TopicIcon slug={'github'} name={'GitHub'} />{' '}
            <Link href={`https://github.com/${github.username}`} target={'_blank'} className="hover:underline">
              {github.username}
            </Link>
            <SimpleTooltip
              content={github.verified ? '인증완료' : '미인증'}
              render={() =>
                github.verified ? (
                  <BadgeCheckIcon className="text-green-500 size-4" />
                ) : (
                  <BadgeXIcon className="text-muted-foreground size-4" />
                )
              }
            ></SimpleTooltip>
          </div>
        )}
      </div>
    </>
  );
}
