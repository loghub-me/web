import { SearchIcon } from 'lucide-react';
import { IconInput } from '~/components/ui/icon-input';

export default function SearchQuery() {
  return <IconInput icon={SearchIcon} type="text" name="query" placeholder="검색..." />;
}
