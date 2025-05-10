import type { Route } from './+types/layout';
import { ChevronRightIcon, SearchIcon } from 'lucide-react';
import { Form, Outlet } from 'react-router';
import { SearchSort } from '~/components/search';
import { Button } from '~/components/ui/button';
import { IconInput } from '~/components/ui/icon-input';
import { SORT_OPTIONS } from '~/constants/sorts';
import { parseSearchParams } from '~/lib/parse';
import { articlesSearchSchema } from '~/schemas/articles';

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const searchParams = parseSearchParams(url.searchParams, articlesSearchSchema);

  return { pathname, searchParams };
}

export default function SearchLayout({ loaderData: { pathname, searchParams } }: Route.ComponentProps) {
  const { query, sort } = searchParams;

  return (
    <div className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <Form action={pathname} className="flex gap-2">
        <SearchSort to={`${pathname}?query=${query}&sort=`} currentSort={sort} sortOptions={SORT_OPTIONS[pathname]} />
        <IconInput icon={SearchIcon} type="text" name="query" placeholder="Search for anything..." />
        <Button type={'submit'}>
          <ChevronRightIcon />
        </Button>
      </Form>
      <Outlet />
    </div>
  );
}
