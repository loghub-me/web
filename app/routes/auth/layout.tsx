import type { Route } from './+types/layout';
import { Outlet } from 'react-router';
import { Card } from '~/components/ui/card';
import { getRandomQuote } from '~/constants/quotes';
import GuestGuard from '~/guards/guest-guard';

export function loader() {
  const quote = getRandomQuote();
  return { quote };
}

export default function AuthRequestLayout({ loaderData }: Route.ComponentProps) {
  const { quote } = loaderData;

  return (
    <GuestGuard>
      <div className="w-full h-screen flex">
        <section className="justify-center w-full h-screen border-r bg-secondary hidden md:flex">
          <Quote {...quote} />
        </section>
        <section className="w-full h-screen flex items-center justify-center pb-10">
          <Outlet />
        </section>
      </div>
    </GuestGuard>
  );
}

function Quote({ text, by }: { text: string; by: string }) {
  return (
    <Card className="p-4 m-8 mt-auto gap-1 shadow-xl">
      <p className="leading-6">{text}</p>
      <span className="text-right text-muted-foreground">{by}</span>
    </Card>
  );
}
