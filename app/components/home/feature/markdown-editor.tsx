import type EasyMDE from 'easymde';
import { useRef } from 'react';
import { EasyMDEEditor } from '~/components/common/easymde';

export default function FeatureMarkdownEditor() {
  const easyMDERef = useRef<EasyMDE>(null);

  return (
    <div className="h-64 lg:h-full border rounded-xl overflow-hidden">
      <EasyMDEEditor ref={easyMDERef} title={'마크다운 에디터'} />
    </div>
  );
}
