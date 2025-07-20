import { ButtonLink } from '~/components/ui/button';
import { QUESTION_FILTER_OPTIONS } from '~/constants/options';

interface QuestionStatusFilterProps {
  filter: QuestionFilter;
  query: string;
  sort: QuestionSort;
}

export default function QuestionStatusFilter({ filter, query, sort }: Readonly<QuestionStatusFilterProps>) {
  return (
    <div className="flex items-center gap-2">
      <input type="hidden" name="filter" value={filter} />
      {Object.entries(QUESTION_FILTER_OPTIONS).map(([key, { label }]) => (
        <ButtonLink
          key={key}
          to={`/search/questions?query=${query}&sort=${sort}&filter=${key}`}
          variant={filter === key ? 'secondary' : 'ghost'}
          className={'rounded-full'}
        >
          {label}
        </ButtonLink>
      ))}
    </div>
  );
}
