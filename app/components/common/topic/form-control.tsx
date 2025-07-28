import { TagIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { TopicImage, TopicTag } from '~/components/topic';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '~/components/ui/command';
import { FormLabel } from '~/components/ui/form';
import { ErrorMessage } from '~/constants/error-messages';
import { TOPICS } from '~/constants/topics';
import { cn } from '~/lib/utils';

interface TopicSlugsFormControlProps {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  showLabel?: boolean;
}

function TopicSlugsFormControl({ topics, setTopics, showLabel = true }: Readonly<TopicSlugsFormControlProps>) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setFocused(query.trim().length > 0);
  }, [query]);

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
      {showLabel && <FormLabel>토픽</FormLabel>}
      <Command className="rounded-md">
        <CommandInput icon={TagIcon} placeholder="토픽을 입력해주세요" value={query} onValueChange={setQuery} />
        <CommandList className={cn(focused ? 'block' : 'hidden')}>
          <CommandEmpty>토픽을 찾을 수 없습니다.</CommandEmpty>
          {TOPICS.map((topic) => (
            <CommandItem key={topic.slug} value={`${topic.slug}:${topic.name}`} onSelect={onSelect}>
              <TopicImage topic={topic} />
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

export { TopicSlugsFormControl };
