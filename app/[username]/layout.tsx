import { getUserDetail } from '@/apis/server/user';
import { TopicIcon } from '@/components/client/topic';
import { UserAvatar, UserDetailNav } from '@/components/client/user';
import { TopicUsagesChart } from '@/components/server/topic';
import { UserDetailAside, UserDetailAsideSkeleton } from '@/components/server/user';
import { parseObject } from '@/lib/parse';
import { userDetailSchema } from '@/schemas/user';
import { Badge } from '@ui/badge';
import { Separator } from '@ui/separator';
import { SimpleTooltip } from '@ui/simple-tooltip';
import { BadgeCheckIcon, BadgeXIcon, InfoIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function UserDetailLayout({ params, children }: LayoutProps<'/[username]'>) {
  const parsedParam = parseObject(await params, userDetailSchema);
  const user = getUserDetail(parsedParam.username);

  return (
    <main className="container mx-auto px-4 py-20 min-h-screen space-y-4">
      <div className="flex flex-col md:flex-row gap-8">
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
  const { email, username, nickname, meta } = resolvedUser;
  const { github, stats } = meta;

  return (
    <>
      <UserAvatar size={'xl'} {...resolvedUser} className="shadow-xs" />
      <div className="w-full space-y-1.5">
        <h3 className="text-lg font-semibold">@{username}</h3>
        <p className="text-muted-foreground">{nickname}</p>
      </div>
      <div className="space-y-1.5 w-full">
        {email && <UserDetailAsideEmail email={email} />}
        {github.username && <UserDetailAsideGitHub github={github} />}
        <UserDetailAsideStats stats={stats} />
      </div>
    </>
  );
}

function UserDetailAsideEmail({ email }: { email: string }) {
  return (
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
  );
}

function UserDetailAsideGitHub({ github }: { github: UserGitHub }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <TopicIcon slug={'github'} name={'GitHub'} />{' '}
      <Link href={`https://github.com/${github.username}`} target={'_blank'} className="hover:underline">
        {github.username}
      </Link>
      <SimpleTooltip content={github.verified ? '인증완료' : '미인증'}>
        {github.verified ? (
          <BadgeCheckIcon className="text-green-500 size-4" />
        ) : (
          <BadgeXIcon className="text-muted-foreground size-4" />
        )}
      </SimpleTooltip>
    </div>
  );
}

function UserDetailAsideStats({ stats }: { stats: UserStats }) {
  const { totalPostedCount, totalAddedStarCount, totalGazedStarCount, topicUsages } = stats;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-sm">
        <Badge variant={'muted'} className="px-0">
          작성한 게시물: <span className="font-mono text-foreground">{totalPostedCount}</span>
        </Badge>
        <Badge variant={'muted'} className="px-0">
          추가한 스타: <span className="font-mono text-foreground">{totalAddedStarCount}</span>
        </Badge>
        <Badge variant={'muted'} className="px-0">
          받은 스타: <span className="font-mono text-foreground">{totalGazedStarCount}</span>
        </Badge>
        <SimpleTooltip content="매일 자정에 갱신됩니다.">
          <InfoIcon className="size-3.5 text-muted-foreground" />
        </SimpleTooltip>
      </div>
      {topicUsages.length > 0 && (
        <>
          <Separator />
          <div className="space-y-2">
            <h2 className="font-medium">토픽 사용 현황</h2>
            <TopicUsagesChart topicUsages={topicUsages} />
            <p className="text-sm text-right text-muted-foreground">상위 5개까지 확인할 수 있습니다.</p>
          </div>
        </>
      )}
    </div>
  );
}
