import { CheckIcon, ChevronDownIcon, type LucideIcon } from 'lucide-react';
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
  sortOptions: Record<Sort, { icon: LucideIcon; label: string }>;
}

export default function SearchSort({ to, currentSort, sortOptions }: Readonly<SearchSortProps>) {
  const { icon: Icon, label } = sortOptions[currentSort];

  return (
    <DropdownMenu>
      <input type="hidden" name={'sort'} value={currentSort} />
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>
          <Icon />
          <span>{label}</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(sortOptions).map(([key, { icon: Icon, label }]) => (
          <DropdownMenuItem key={key} asChild>
            <Link to={`${to}${key}`} className="flex items-center">
              <Icon />
              <span>{label}</span>
              {currentSort === key && <CheckIcon className="ml-auto" />}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
