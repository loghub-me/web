'use client';

import { ButtonLink } from '@ui/button-link';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';

interface PageNavProps {
  currentPage: number;
  totalPages: number;
}

export default function PageNav({ currentPage, totalPages }: Readonly<PageNavProps>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const maxPagesToShow = 5;
  const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  function renderPrevButton() {
    const prevSearchParams = new URLSearchParams(searchParams);
    prevSearchParams.set('page', String(currentPage - 1));

    return (
      <ButtonLink href={`${pathname}?${prevSearchParams.toString()}`} size={'icon'}>
        <ChevronLeftIcon className="h-4 w-4" />
      </ButtonLink>
    );
  }

  function renderNextButton() {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('page', String(currentPage + 1));

    return (
      <ButtonLink href={`${pathname}?${nextSearchParams.toString()}`} size={'icon'}>
        <ChevronRightIcon className="h-4 w-4" />
      </ButtonLink>
    );
  }

  function renderPageButton(page: number) {
    const pageSearchParams = new URLSearchParams(searchParams);
    pageSearchParams.set('page', String(page));

    return (
      <ButtonLink
        key={page}
        href={`${pathname}?${pageSearchParams.toString()}`}
        variant={currentPage === page ? 'secondary' : 'ghost'}
        size={'icon'}
      >
        {page}
      </ButtonLink>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1">
      {currentPage > 1 && renderPrevButton()}
      {pages.map((page) => renderPageButton(page))}
      {currentPage < totalPages && renderNextButton()}
    </div>
  );
}
