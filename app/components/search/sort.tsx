import { ChevronDownIcon, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

interface SearchSortProps {
  submit: () => void;
  currentSort: Sort;
  sortOptions: Record<Sort, { icon: LucideIcon; label: string }>;
}

export default function SearchSort({ submit, currentSort, sortOptions }: Readonly<SearchSortProps>) {
  const { icon: Icon, label } = sortOptions[currentSort];
  const [sort, setSort] = useState(currentSort);

  useEffect(() => {
    if (sort !== currentSort) {
      submit();
    }
  }, [sort]);

  return (
    <DropdownMenu>
      <input type="hidden" name={'sort'} value={sort} />
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>
          <Icon />
          <span>{label}</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={sort} onValueChange={(value) => setSort(value as Sort)}>
          {Object.entries(sortOptions).map(([key, { icon: Icon, label }]) => (
            <DropdownMenuRadioItem key={key} value={key}>
              <Icon />
              <span>{label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
