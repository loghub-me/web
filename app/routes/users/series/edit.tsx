import type { Route } from './+types/edit';
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { changeSeriesChapterSequence } from '~/apis/client/series';
import { getSeries } from '~/apis/server/series';
import { SeriesChapterEditList, SeriesEditForm } from '~/components/series';
import SeriesChapterEditListItem from '~/components/series/chapter/edit/list-item';
import { parseParams } from '~/lib/parse';
import { compositeKeySchema } from '~/schemas/common';
import { seriesPostSchema } from '~/schemas/series';

export async function loader({ params }: Route.LoaderArgs) {
  const { username, slug } = parseParams(params, compositeKeySchema);
  const series = await getSeries(username, slug);
  return { series };
}

export default function EditSeriesRoute({ loaderData }: Route.ComponentProps) {
  const { series } = loaderData;
  const form = useForm<z.infer<typeof seriesPostSchema>>({
    resolver: zodResolver(seriesPostSchema),
    defaultValues: { ...series, topicSlugs: series.topics.map((topic) => topic.slug) },
  });
  const [chapters, setChapters] = useState(series.chapters);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || !active) return;

    setChapters(() => {
      const oldIndex = chapters.findIndex((chapter) => chapter.sequence === active.id);
      const newIndex = chapters.findIndex((chapter) => chapter.sequence === over.id);

      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        return chapters; // No change needed
      }

      toast.promise(
        () => changeSeriesChapterSequence(series.id, chapters[oldIndex].sequence, chapters[newIndex].sequence),
        {
          loading: '챕터 순서를 변경하는 중...',
          success: '챕터 순서가 변경되었습니다.',
          error: '챕터 순서 변경에 실패했습니다.',
        }
      );

      return arrayMove(chapters, oldIndex, newIndex);
    });
  }

  return (
    <main className="container mx-auto p-4 pt-16 min-h-screen space-y-4 flex flex-col md:flex-row gap-4">
      <div className="mt-4 md:mt-16 mx-auto max-w-md w-full">
        <div className="flex flex-col items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">시리즈 수정</h2>
          <p className="text-sm text-secondary-foreground">시리즈를 수정하려면 아래 양식을 작성해주세요.</p>
        </div>
        <SeriesEditForm form={form} id={series.id} />
      </div>
      <hr />
      <div className="mt-4 md:mt-16 mx-auto max-w-md w-full">
        <div className="flex flex-col items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">챕터 수정</h2>
          <p className="text-sm text-secondary-foreground">챕터를 수정하려면 아래 양식을 작성해주세요.</p>
        </div>
        <SeriesChapterEditList>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={chapters} strategy={verticalListSortingStrategy}>
              {chapters.map((chapter, index) => (
                <SeriesChapterEditListItem key={index + 1} chapter={{ ...chapter, sequence: index + 1 }} {...series} />
              ))}
            </SortableContext>
          </DndContext>
        </SeriesChapterEditList>
      </div>
    </main>
  );
}
