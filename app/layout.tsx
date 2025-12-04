import { getTrendingTopics } from '@/apis/server/topic';
import '@/app/globals.css';
import GlobalFooter from '@/components/global/footer';
import GlobalHeader from '@/components/global/header';
import AuthProvider from '@/providers/auth';
import NotificationProvider from '@/providers/notification';
import ReactQueryProvider from '@/providers/react-query';
import { ThemeProvider } from '@/providers/theme';
import TopicProvider from '@/providers/topic';
import '@/styles/markdown-it.css';
import { Toaster } from '@ui/sonner';
import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | LogHub',
    default: '홈 | LogHub',
  },
  description: 'LogHub는 개발자들이 자신의 지식을 공유하고, 서로의 경험을 나누는 공간입니다.',
};

export default async function RootLayout({ children }: Readonly<LayoutProps<'/'>>) {
  const trendingTopics = await getTrendingTopics();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendard.className} ${ibmPlexMono.variable} antialiased flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReactQueryProvider>
            <AuthProvider>
              <NotificationProvider>
                <TopicProvider trendingTopics={trendingTopics}>
                  <GlobalHeader />
                  {children}
                  <GlobalFooter />
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
