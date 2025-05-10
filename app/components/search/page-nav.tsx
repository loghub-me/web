import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';

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
    <div className="flex items-center justify-center gap-1 mt-4">
      {currentPage > 1 && (
        <Button variant="ghost" size="icon" asChild>
          <Link to={`${to}${currentPage - 1}`}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Link>
        </Button>
      )}

      {pages.map((page) => (
        <Button key={page} variant="ghost" asChild className={page === currentPage ? 'bg-accent' : ''}>
          <Link to={`${to}${page}`}>{page}</Link>
        </Button>
      ))}

      {currentPage < totalPages && (
        <Button variant="ghost" size="icon" asChild>
          <Link to={`${to}${currentPage + 1}`}>
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}
