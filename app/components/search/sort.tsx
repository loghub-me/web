import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

interface SearchSortProps {
  to: string;
  currentSort: Sort;
  sortOptions: Record<Sort, string>;
}

export default function SearchSort({ to, currentSort, sortOptions }: Readonly<SearchSortProps>) {
  return (
    <DropdownMenu>
      <input type="hidden" name={'sort'} value={currentSort} />
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>
          <span>{sortOptions[currentSort]}</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(sortOptions).map(([key, value]) => (
          <DropdownMenuItem key={key} asChild>
            <Link to={`${to}${key}`} className="flex items-center justify-between">
              <span>{value}</span>
              {currentSort === key && <CheckIcon />}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
