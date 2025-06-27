import { ChevronRightIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';

export default function SearchSubmit() {
  return (
    <Button type="submit" variant={'ghost'}>
      <ChevronRightIcon />
    </Button>
  );
}
