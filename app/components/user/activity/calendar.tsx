import { type ReactNode, useMemo } from 'react';
import { Link } from 'react-router';
import { cn } from '~/lib/utils';

interface UserActivityCalendarProps {
  username: string;
  summaries: UserActivitySummary[];
}

export default function UserActivityCalendar({ username, summaries }: Readonly<UserActivityCalendarProps>) {
  const cells = useMemo(() => {
    if (!summaries?.length) return null;
    const tempCells: ReactNode[] = [];

    const firstDate = new Date(summaries[0].createdDate);
    const lastDate = new Date(summaries[summaries.length - 1].createdDate);
    const summariesMap = new Map(summaries.map((a) => [a.createdDate, a.count]));

    const totalCount = summaries.reduce((sum, a) => sum + a.count, 0);
    const avgCount = summaries.length ? totalCount / summaries.length : 0;

    for (let i = 0; i < firstDate.getDay(); i++) {
      const dummyDate = new Date(firstDate);
      dummyDate.setDate(dummyDate.getDate() - i - 1);
      tempCells.push(<span key={`dummy-${i}`} />);
    }

    for (const date = new Date(firstDate); date <= lastDate; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().slice(0, 10);
      const activityCount = summariesMap.get(dateString) ?? 0;

      let colorClass = 'bg-muted hover:bg-muted/80';
      if (activityCount > 0 && avgCount > 0) {
        const ratio = activityCount / avgCount;

        if (ratio <= 0.25) {
          colorClass = 'bg-primary/25 hover:bg-primary/40';
        } else if (ratio <= 0.5) {
          colorClass = 'bg-primary/50 hover:bg-primary/60';
        } else if (ratio <= 0.75) {
          colorClass = 'bg-primary/75 hover:bg-primary/90';
        } else {
          colorClass = 'bg-primary hover:bg-primary/80';
        }
      }

      tempCells.push(
        <Link
          key={dateString}
          to={`/@${username}?date=${dateString}`}
          className={cn('size-4 rounded-[4px] transition-colors', colorClass)}
          title={dateString}
        />
      );
    }

    return tempCells;
  }, [summaries, username]);

  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1 auto-cols-max p-2 w-full max-w-268 h-38 bg-card border rounded-xl overflow-x-auto">
      {cells}
    </div>
  );
}
