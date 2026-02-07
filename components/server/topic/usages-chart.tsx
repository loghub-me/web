import { TopicLink } from '@/components/client/topic';
import { Field, FieldLabel } from '@ui/field';
import { Progress } from '@ui/progress';

interface TopicUsagesChartProps {
  topicUsages: TopicUsage[];
}

export default function TopicUsagesChart({ topicUsages }: Readonly<TopicUsagesChartProps>) {
  const maxCount = Math.max(...topicUsages.map((u) => u.count), 1); // 0 나누기 방지

  return (
    <div className="flex flex-col gap-3">
      {topicUsages.map((topic) => (
        <TopicUsageBar key={topic.slug} topic={topic} maxCount={maxCount} />
      ))}
    </div>
  );
}

interface TopicUsageBarProps {
  topic: TopicUsage;
  maxCount: number;
}

function TopicUsageBar({ topic, maxCount }: Readonly<TopicUsageBarProps>) {
  const progress = (topic.count / maxCount) * 100;

  return (
    <Field key={topic.slug} className="w-full">
      <FieldLabel htmlFor="progress-usage">
        <TopicLink topic={topic} variant={'ghost'} className="-ml-1" />
        <span className="ml-auto text-xs">{topic.count} 건</span>
      </FieldLabel>
      <Progress value={progress} id="progress-usage" />
    </Field>
  );
}
