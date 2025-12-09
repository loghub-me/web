'use client';

import { MarkdownEditor } from '@/components/client/markdown';
import type EasyMDE from 'easymde';
import { useRef } from 'react';

export default function HomeFeatureMarkdownEditor() {
  const easyMDERef = useRef<EasyMDE>(null);

  return (
    <div className="w-full h-full border rounded-xl overflow-hidden">
      <MarkdownEditor editor={{ ref: easyMDERef, title: '마크다운 에디터' }} />
    </div>
  );
}
