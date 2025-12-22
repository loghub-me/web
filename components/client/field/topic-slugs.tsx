'use client';

import { TopicIcon, TopicBadge } from '@/components/client/topic';
import { ErrorMessage } from '@/constants/messages';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useTopic } from '@/hooks/use-topic';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@ui/command';
import { Field, FieldError, FieldLabel } from '@ui/field';
import { TagIcon } from 'lucide-react';
import { useState } from 'react';
import { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { toast } from 'sonner';

interface TopicSlugsFieldProps<T extends { topicSlugs: string[] }> {
  id: string;
  control: Control<T>;
  topicSlugs: Set<string>;
  setTopicSlugs: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export default function TopicSlugsField<T extends { topicSlugs: string[] }>({
  id,
  control,
  topicSlugs,
  setTopicSlugs,
}: TopicSlugsFieldProps<T>) {
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebouncedValue(query, 200);
  const { searchTopics, getTopicSetBySlugs } = useTopic();
  const { data: topics, isPending } = useQuery({
    queryKey: ['searchTopics', debouncedQuery],
    queryFn: () => searchTopics(debouncedQuery).slice(0, 10),
  });

  function onSelect(value: string) {
    const [slug] = value.split(':');
    if (topicSlugs.has(slug)) {
      toast.error(ErrorMessage.TOPIC_ALREADY_EXISTS);
      return;
    }
    if (topicSlugs.size >= 10) {
      toast.error(ErrorMessage.TOPIC_SELECTION_LIMIT);
      return;
    }

    setTopicSlugs((prev) => {
      const newSet = new Set(prev);
      newSet.add(slug);
      return newSet;
    });
    setQuery('');
  }

  function onRemove(topicSlug: string) {
    setTopicSlugs((prev) => {
      const newSet = new Set(prev);
      newSet.delete(topicSlug);
      return newSet;
    });
  }

  return (
    <Controller
      name={'topicSlugs' as Path<T>}
      control={control}
      render={({ fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="max-w-lg">
          <FieldLabel htmlFor={id}>토픽</FieldLabel>
          <Command className="relative border-input border overflow-visible">
            {topicSlugs.size > 0 && (
              <div className="p-1.5 pb-0 flex gap-1 flex-wrap">
                {getTopicSetBySlugs(topicSlugs).map((topic) => (
                  <TopicBadge key={topic.slug} topic={topic} onClick={() => onRemove(topic.slug)} />
                ))}
              </div>
            )}
            <CommandInput
              icon={TagIcon}
              value={query}
              onValueChange={setQuery}
              placeholder="토픽을 입력해주세요"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
            <CommandList
              className={cn(
                'z-10 absolute border-t top-full mt-2 w-full max-h-48 bg-popover border rounded-md',
                !focus && 'hidden'
              )}
            >
              <CommandEmpty>{isPending ? '검색 중...' : '검색된 토픽이 없습니다.'}</CommandEmpty>
              <CommandGroup heading="검색된 토픽">
                {topics?.map((topic) => (
                  <CommandItem
                    key={topic.slug}
                    value={`${topic.slug}:${topic.name}`}
                    onSelect={onSelect}
                    onMouseDown={(e) => e.preventDefault()}
                    className="my-0.5 first:mt-0 last:mb-0"
                  >
                    <TopicIcon {...topic} />
                    <span>{topic.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
