import { LetterTextIcon, WandSparklesIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { TopicSlugsFormControl } from '~/components/common/topic/form-control';
import { GlowButton } from '~/components/ui/glow-button';
import { IconInput } from '~/components/ui/icon-input';
import { getRandomQuote } from '~/constants/quotes';
import { getRandomTopics } from '~/constants/topics';

export default function FeatureAutoFill() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [topics, setTopics] = useState<Topic[]>([]);

  function onClickAutoFill() {
    if (inputRef.current) {
      inputRef.current.value = getRandomQuote().text;
    }
    setTopics(getRandomTopics());
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 w-full h-full border bg-muted rounded-xl">
      <p className="text-sm text-muted-foreground">UI 예시입니다.</p>
      <div className="w-full space-y-2">
        <IconInput ref={inputRef} icon={LetterTextIcon} placeholder="제목을 입력해주세요" className="bg-card" />
        <TopicSlugsFormControl topics={topics} setTopics={setTopics} showLabel={false} />
        <div className="flex justify-end">
          <GlowButton type="button" variant="outline" onClick={onClickAutoFill}>
            <WandSparklesIcon /> 자동완성
          </GlowButton>
        </div>
      </div>
    </div>
  );
}
