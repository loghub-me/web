import { Link } from 'react-router';
import { Button } from '~/components/ui/button';

interface QuestionStatusFilterProps {
  filter: QuestionFilter;
  query: string;
  sort: QuestionSort;
}

export default function QuestionStatusFilter({ filter, query, sort }: Readonly<QuestionStatusFilterProps>) {
  return (
    <div className="flex items-center gap-2">
      <input type="hidden" name="filter" value={filter} />
      <Button className="rounded-full" variant={filter === 'all' ? 'secondary' : 'ghost'} asChild>
        <Link to={`/search/questions?query=${query}&sort=${sort}&filter=all`}>ALL</Link>
      </Button>
      <Button className="rounded-full" variant={filter === 'open' ? 'secondary' : 'ghost'} asChild>
        <Link to={`/search/questions?query=${query}&sort=${sort}&filter=open`}>OPEN</Link>
      </Button>
      <Button className="rounded-full" variant={filter === 'closed' ? 'secondary' : 'ghost'} asChild>
        <Link to={`/search/questions?query=${query}&sort=${sort}&filter=closed`}>CLOSED</Link>
      </Button>
      <Button className="rounded-full" variant={filter === 'solved' ? 'secondary' : 'ghost'} asChild>
        <Link to={`/search/questions?query=${query}&sort=${sort}&filter=solved`}>SOLVED</Link>
      </Button>
    </div>
  );
}
