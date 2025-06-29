import { TagIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { TopicTag } from '~/components/topic';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '~/components/ui/command';
import { ErrorMessage } from '~/constants/error-messages';
import { ALL_TOPICS } from '~/constants/topics';
import { cn } from '~/lib/utils';

interface TopicSlugsFormControlProps {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

export default function TopicSlugsFormControl({ topics, setTopics }: Readonly<TopicSlugsFormControlProps>) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const commandInputRef = useRef<HTMLInputElement>(null);

  function onSelect(value: string) {
    const [slug, name] = value.split(':');
    if (topics.some((topic) => topic.slug === slug)) {
      toast.error(ErrorMessage.TOPIC_ALREADY_EXISTS);
      return;
    }
    if (topics.length >= 10) {
      toast.error(ErrorMessage.TOPIC_SELECTION_LIMIT);
      return;
    }
    setTopics((prev) => [...prev, { slug, name }]);
    setQuery('');
  }

  return (
    <div className="space-y-2">
      <Command>
        <CommandInput
          ref={commandInputRef}
          icon={TagIcon}
          placeholder="토픽을 입력해주세요"
          value={query}
          onValueChange={setQuery}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <CommandList className={cn(focused ? 'block' : 'hidden')}>
          <CommandEmpty>토픽을 찾을 수 없습니다.</CommandEmpty>
          {ALL_TOPICS.map((topic) => (
            <CommandItem key={topic.slug} value={`${topic.slug}:${topic.name}`} onSelect={(value) => onSelect(value)}>
              <img className="size-4" src={`/icons/${topic.slug}.svg`} alt={topic.name} />
              <span>{topic.name}</span>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
      {topics.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {topics.map((topic, index) => (
            <TopicTag
              key={topic.slug}
              topic={topic}
              remove={() => setTopics((prev) => prev.filter((_, i) => i !== index))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
