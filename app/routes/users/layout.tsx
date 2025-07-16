import type { Route } from './+types/layout';
import { Outlet } from 'react-router';
import { getUser } from '~/apis/server/user';
import { UserDetailAside, UserDetailNav } from '~/components/user';
import { parseParams } from '~/lib/parse';
import { usernameSchema } from '~/schemas/common';

export async function loader({ params }: Route.LoaderArgs) {
  const { username } = parseParams(params, usernameSchema);
  const user = await getUser(username);
  return { user };
}

export default function UserLayout({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <main className="container mx-auto px-4 pt-20 pb-4 min-h-screen space-y-4 flex flex-col md:flex-row gap-8">
      <UserDetailAside {...user} />
      <div className="w-full space-y-4">
        <UserDetailNav {...user} />
        <Outlet />
      </div>
    </main>
  );
}
