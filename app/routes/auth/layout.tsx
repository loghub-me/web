import type { Route } from './+types/layout';
import { Outlet } from 'react-router';
import { Card } from '~/components/ui/card';
import { quotes } from '~/constants/quotes';

export function loader() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return { quote: quotes[randomIndex] };
}

export default function AuthRequestLayout({ loaderData }: Route.ComponentProps) {
  const { quote } = loaderData;

  return (
    <div className="w-full h-screen flex">
      <section className="justify-center w-full h-screen border-r bg-secondary hidden sm:flex">
        <Quote {...quote} />
      </section>
      <section className="w-full h-screen flex items-center justify-center pb-10">
        <Outlet />
      </section>
    </div>
  );
}

function Quote({ text, by }: { text: string; by: string }) {
  return (
    <Card className="p-4 m-8 mt-auto gap-1 shadow-md">
      <p className="leading-6">{text}</p>
      <span className="text-right text-muted-foreground">{by}</span>
    </Card>
  );
}
