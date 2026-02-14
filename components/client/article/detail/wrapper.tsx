'use client';

import { ArticleAsideLeft } from '@/components/client/article';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { PanelRightCloseIcon } from 'lucide-react';
import { useState } from 'react';

interface ArticleDetailWrapperProps {
  children: React.ReactNode;
}

export default function ArticleDetailWrapper({ children }: Readonly<ArticleDetailWrapperProps>) {
  const [compact, setCompact] = useState(false);
  const toggleCompact = () => setCompact((prev) => !prev);

  return (
    <div className="flex gap-4">
      <ArticleAsideLeft compact={compact}>
        <Button type={'button'} variant={'outline'} size={'icon'} onClick={toggleCompact} className={'w-12 h-18'}>
          <PanelRightCloseIcon className={cn('size-5 transition-transform', compact && 'rotate-180')} />
        </Button>
      </ArticleAsideLeft>
      {children}
    </div>
  );
}
