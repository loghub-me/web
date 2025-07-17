import type { Route } from './+types/root';
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { parseTheme } from '~/actions/theme/server';
import { ThemeScript, useTheme } from '~/actions/theme/utils';
import '~/app.css';
import GlobalFooter from '~/components/global/footer';
import GlobalHeader from '~/components/global/header';
import { Toaster } from '~/components/ui/sonner';
import { fonts } from '~/constants/fonts';
import { cn } from '~/lib/utils';
import AuthProvider from '~/providers/auth-provider';
import QueryProvider from '~/providers/query-provider';
import '~/styles/easymde.css';
import '~/styles/markdown-it.css';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: fonts.sans.origin, crossOrigin: 'anonymous' },
  { rel: 'preload', href: `${fonts.sans.origin}${fonts.sans.path}`, as: 'style', crossOrigin: 'anonymous' },
  { rel: 'stylesheet', href: `${fonts.sans.origin}${fonts.sans.path}`, crossOrigin: 'anonymous' },

  // TODO: Implement mono font
  // { rel: 'preconnect', href: fonts.mono.origin, crossOrigin: 'anonymous' },
  // { rel: 'preload', href: `${fonts.mono.origin}${fonts.mono.path}`, as: 'style', crossOrigin: 'anonymous' },
  // { rel: 'stylesheet', href: `${fonts.mono.origin}${fonts.mono.path}`, crossOrigin: 'anonymous' },
];

export async function loader({ request }: Route.LoaderArgs) {
  return { theme: await parseTheme(request) };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <html lang="en" className={cn(theme === 'dark' && 'dark')} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryProvider>
          <AuthProvider>
            <GlobalHeader />
            {children}
            <GlobalFooter />
            <Toaster position={'top-center'} richColors />
          </AuthProvider>
        </QueryProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
