'use client';

import { TopicIcon } from '@/components/client/topic';
import Logo from '@/components/global/logo';
import { FOOTER_LINKS, LEGAL_LINKS } from '@/constants/links';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@ui/button-link';
import { Separator } from '@ui/separator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GlobalFooter() {
  const pathname = usePathname();
  const isPostEditPage = pathname.startsWith('/post/') || pathname.startsWith('/edit/');

  return (
    <footer className={cn('mt-auto w-full', isPostEditPage && 'hidden')}>
      <div className="border-t py-12 bg-card/50">
        <div className="flex flex-col md:flex-row gap-4 md:gap-16 container mx-auto px-4">
          <div className="max-w-64 lg:max-w-128 space-y-2">
            <Logo width={96} height={24} />
            <p className="text-sm text-muted-foreground">
              LogHub는 개발자들이 자신의 지식을 공유하고, 서로의 경험을 나누는 공간입니다.
            </p>
            <div className="-ml-2">
              <ButtonLink
                variant={'ghost'}
                href={process.env.NEXT_PUBLIC_GITHUB_URL!}
                target={'_blank'}
                size={'icon'}
                prefetch={false}
              >
                <TopicIcon slug="github" name="GitHub" />
              </ButtonLink>
              <ButtonLink
                variant={'ghost'}
                href={process.env.NEXT_PUBLIC_DISCORD_URL!}
                target={'_blank'}
                size={'icon'}
                prefetch={false}
              >
                <TopicIcon slug="discord" name="Discord" />
              </ButtonLink>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_LINKS.map((section) => (
              <div key={section.label} className="space-y-2 text-center md:text-left">
                <h5 className="text-primary font-semibold">{section.label}</h5>
                <div className="flex flex-col gap-0.5">
                  {section.links.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm hover:underline" prefetch={false}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Separator />
      <div className="py-4 bg-card">
        <div className="flex items-center container mx-auto px-4">
          <p className="flex-1 text-sm">&copy; {new Date().getFullYear()} LogHub.</p>
          {LEGAL_LINKS.map(({ label, href }) => (
            <ButtonLink key={href} href={href} size={'sm'} prefetch={false}>
              {label}
            </ButtonLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
