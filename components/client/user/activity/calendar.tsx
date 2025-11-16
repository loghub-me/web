'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import Link from 'next/link';
import { CSSProperties, type ReactNode, useMemo } from 'react';

type UserActivitySummary = { date: string /* "YYYY-MM-DD" */; count: number };

interface UserActivityCalendarProps {
  username: string;
  summaries: UserActivitySummary[];
}

export default function UserActivityCalendar({ username, summaries }: Readonly<UserActivityCalendarProps>) {
  const currentDate = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  const cells = useMemo<ReactNode | null>(() => {
    if (!summaries?.length) return null;

    const MS_PER_DAY = 24 * 60 * 60 * 1000;

    const parseYMDToUTC = (ymd: string) => {
      const [yStr, mStr, dStr] = ymd.split('-');
      const y = Number(yStr);
      const m = Number(mStr);
      const d = Number(dStr);
      return Date.UTC(y, m - 1, d);
    };

    const formatUTCYMD = (ts: number) => {
      const d = new Date(ts);
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(d.getUTCDate()).padStart(2, '0');
      return `${y}-${m}-${dd}`;
    };

    const sorted = [...summaries].sort((a, b) => a.date.localeCompare(b.date));
    const firstTs = parseYMDToUTC(sorted[0].date);
    const lastSummaryTs = parseYMDToUTC(sorted[sorted.length - 1].date);
    const currentTs = parseYMDToUTC(currentDate);
    const lastTs = Math.max(lastSummaryTs, currentTs);

    const daysCount = Math.round((lastTs - firstTs) / MS_PER_DAY) + 1;

    const countsMap = new Map<string, number>(summaries.map((s) => [s.date, s.count]));

    const counts = summaries.map((s) => s.count).sort((a, b) => a - b);
    const quantile = (q: number) => {
      if (!counts.length) return 0;
      const pos = (counts.length - 1) * q;
      const base = Math.floor(pos);
      const rest = pos - base;
      const next = counts[base + 1] ?? counts[base];
      return counts[base] + (next - counts[base]) * rest;
    };
    const q25 = quantile(0.25);
    const q50 = quantile(0.5);
    const q75 = quantile(0.75);
    const avg = counts.reduce((s, a) => s + a, 0) / Math.max(1, counts.length);

    const getColorClass = (activityCount: number) => {
      if (activityCount === 0) return 'bg-muted hover:bg-muted/80';
      if (q25 !== q75) {
        if (activityCount <= q25) return 'bg-primary/25 hover:bg-primary/40';
        if (activityCount <= q50) return 'bg-primary/50 hover:bg-primary/60';
        if (activityCount <= q75) return 'bg-primary/75 hover:bg-primary/90';
        return 'bg-primary hover:bg-primary/80';
      } else {
        const ratio = avg > 0 ? activityCount / avg : 0;
        if (ratio <= 0.25) return 'bg-primary/25 hover:bg-primary/40';
        if (ratio <= 0.5) return 'bg-primary/50 hover:bg-primary/60';
        if (ratio <= 0.75) return 'bg-primary/75 hover:bg-primary/90';
        return 'bg-primary hover:bg-primary/80';
      }
    };

    const firstDayIndex = new Date(firstTs).getUTCDay(); // 0(일)~6(토)

    return Array.from({ length: daysCount }, (_, idx) => {
      const ts = firstTs + idx * MS_PER_DAY;
      const dateString = formatUTCYMD(ts);
      const activityCount = countsMap.get(dateString) ?? 0;
      const colorClass = getColorClass(activityCount);
      const style = idx === 0 ? ({ gridRowStart: firstDayIndex + 1 } as CSSProperties) : undefined;

      return (
        <Link
          key={dateString}
          href={{ pathname: `/${username}`, query: { date: dateString } }}
          prefetch={false}
          className={cn('size-4 rounded-[4px] transition-colors', colorClass)}
          title={`${dateString} — 활동 ${activityCount}`}
          aria-label={`${dateString} 활동 ${activityCount}`}
          style={style}
        />
      );
    });
  }, [summaries, username, currentDate]);

  return (
    <Card className="gap-0 pb-0">
      <CardHeader className="space-y-1.5 pb-4 border-b">
        <CardTitle>@{username}님의 활동 캘린더</CardTitle>
        <CardDescription>
          활동이 많을수록 진한 색으로 표시됩니다. 셀을 클릭하여 해당 날짜의 활동을 확인하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-flow-col grid-rows-7 gap-1 auto-cols-max p-2 w-full max-w-268 h-38 bg-card rounded-xl overflow-x-auto">
        {cells}
      </CardContent>
    </Card>
  );
}
