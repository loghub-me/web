import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';

interface PageNavProps {
  to: string;
  currentPage: number;
  totalPages: number;
}

export default function PageNav({ to, currentPage, totalPages }: Readonly<PageNavProps>) {
  const maxPagesToShow = 5;
  const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex items-center justify-center gap-1">
      {currentPage > 1 && (
        <ButtonLink to={`${to}${currentPage - 1}`} size={'icon'}>
          <ChevronLeftIcon className="h-4 w-4" />
        </ButtonLink>
      )}

      {pages.map((page) => (
        <ButtonLink key={page} to={`${to}${page}`} variant={currentPage === page ? 'secondary' : 'ghost'} size={'icon'}>
          {page}
        </ButtonLink>
      ))}

      {currentPage < totalPages && (
        <ButtonLink to={`${to}${currentPage + 1}`} size={'icon'}>
          <ChevronRightIcon />
        </ButtonLink>
      )}
    </div>
  );
}
