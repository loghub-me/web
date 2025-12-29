import { getTrendingTopics } from '@/apis/server/topic';
import '@/app/globals.css';
import GlobalFooter from '@/components/global/footer';
import GlobalHeader from '@/components/global/header';
import ScrollManager from '@/components/global/scroll-manager';
import AuthProvider from '@/providers/auth';
import NotificationProvider from '@/providers/notification';
import ReactQueryProvider from '@/providers/react-query';
import { ThemeProvider } from '@/providers/theme';
import TopicProvider from '@/providers/topic';
import { session as sessionZod } from '@/schemas/auth';
import '@/styles/markdown-it.css';
import { Toaster } from '@ui/sonner';
import type { Metadata } from 'next';
import { unstable_cache as cache } from 'next/cache';
import { IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';

const getTrendingTopicsCache = cache(getTrendingTopics, ['trending-topics'], {
  revalidate: 3600,
  tags: ['topics'],
});

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | LogHub',
    default: '홈 | LogHub',
  },
  description: 'LogHub는 개발자들이 자신의 지식을 공유하고, 서로의 경험을 나누는 공간입니다.',
  openGraph: {
    title: {
      template: '%s | LogHub',
      default: '홈 | LogHub',
    },
    description: 'LogHub는 개발자들이 자신의 지식을 공유하고, 서로의 경험을 나누는 공간입니다.',
    siteName: 'LogHub',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: {
      template: '%s | LogHub',
      default: '홈 | LogHub',
    },
    description: 'LogHub는 개발자들이 자신의 지식을 공유하고, 서로의 경험을 나누는 공간입니다.',
  },
};

async function getSessionFromCookie(): Promise<Session | undefined> {
  const cookieStore = await cookies();
  const encodedSession = cookieStore.get('session');
  if (!encodedSession) {
    return undefined;
  }

  const decodedSession = Buffer.from(encodedSession.value, 'base64').toString('utf-8');
  try {
    const parsedSession = sessionZod.parse(JSON.parse(decodedSession));
    return parsedSession;
  } catch (err) {
    console.error('Failed to parse session from cookie:', err);
  }
  return undefined;
}

export default async function RootLayout({ children }: Readonly<LayoutProps<'/'>>) {
  const trendingTopics = await getTrendingTopicsCache();
  const initialSession = await getSessionFromCookie();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendard.className} ${ibmPlexMono.variable} antialiased flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReactQueryProvider>
            <AuthProvider initialSession={initialSession}>
              <NotificationProvider>
                <TopicProvider trendingTopics={trendingTopics}>
                  <GlobalHeader />
                  {children}
                  <GlobalFooter />
                  <ScrollManager />
                  <Toaster position={'top-center'} expand={true} richColors={true} />
                </TopicProvider>
              </NotificationProvider>
            </AuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
