import type { Route } from './+types/layout';
import { Outlet } from 'react-router';
import Logo from '~/components/global/logo';
import { Card } from '~/components/ui/card';
import { getRandomQuote } from '~/constants/quotes';
import GuestGuard from '~/guards/guest-guard';

export function loader() {
  const quote = getRandomQuote();
  return { quote };
}

export default function AuthLayout({ loaderData }: Route.ComponentProps) {
  const { quote } = loaderData;

  return (
    <GuestGuard>
      <div className="w-full h-screen flex">
        <section className="w-full h-screen relative hidden md:flex items-center justify-center border-r bg-secondary">
          <Logo width={256} height={64} />
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
    <Card className="absolute bottom-8 p-4 max-w-sm w-full space-y-2">
      <p className="leading-6">{text}</p>
      <h5 className="text-sm text-right text-muted-foreground font-medium">{by}</h5>
    </Card>
  );
}
