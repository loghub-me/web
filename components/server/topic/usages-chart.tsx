import Link from 'next/link';

const percentageFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

interface TopicUsagesChartProps {
  topicUsages: TopicUsage[];
}

export default function TopicUsagesChart({ topicUsages }: Readonly<TopicUsagesChartProps>) {
  const totalCount = topicUsages.reduce((sum, topic) => sum + topic.count, 0);
  const usages = topicUsages
    .filter((topic) => topic.count > 0)
    .map((topic, index) => {
      const percentage = totalCount > 0 ? (topic.count / totalCount) * 100 : 0;

      return {
        ...topic,
        color: getTopicUsageColor(topic.slug, index),
        percentage,
        percentageLabel: formatPercentage(percentage),
      };
    });

  if (usages.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-muted flex h-3 w-full overflow-hidden rounded-full divide-x divide-background/60" role="img">
        {usages.map((topic) => (
          <div
            key={topic.slug}
            aria-hidden
            className="first:rounded-l-full last:rounded-r-full h-full basis-0"
            style={{
              backgroundColor: topic.color,
              flexGrow: topic.count,
            }}
            title={`${topic.name} ${topic.percentageLabel}%`}
          />
        ))}
      </div>

      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {usages.map((topic) => (
          <li key={topic.slug} className="flex min-w-0 items-center gap-1.5">
            <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: topic.color }} />
            <Link
              className="text-foreground hover:text-primary font-medium transition-colors"
              href={`/topics/${topic.slug}`}
              prefetch={false}
            >
              {topic.name}
            </Link>
            <span className="tabular-nums text-foreground">{topic.percentageLabel}%</span>
            <span className="tabular-nums text-xs text-muted-foreground/80">
              {topic.count.toLocaleString('ko-KR')}건
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatPercentage(value: number) {
  return percentageFormatter.format(value);
}

function getTopicUsageColor(seed: string, index: number) {
  let hash = index + 1;

  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) % 360;
  }

  const hue = hash % 360;
  const saturation = 68 + (index % 3) * 6;
  const lightness = 52 + (index % 2) * 6;

  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}
