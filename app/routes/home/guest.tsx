import Logo from '~/components/global/logo';
import { HomeAuthLinks, HomeDescription, HomeHelpButton, HomeIntroduceVideo } from '~/components/home';
import { BlurFade } from '~/components/ui/blur-fade';
import { GlowEffect } from '~/components/ui/glow-effect';
import { Particles } from '~/components/ui/particles';

export default function GuestHomeRoute() {
  return (
    <main className="container mx-auto px-4 min-h-screen space-y-8">
      <Particles className="fixed -z-10 left-0 top-0 w-screen h-full" size={1} quantity={100} />
      <section className="py-4 pt-24 h-screen flex flex-col gap-16">
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <BlurFade delay={0.1} className="flex justify-center gap-2">
            <HomeHelpButton />
          </BlurFade>
          <BlurFade as="h1" delay={0.2}>
            <Logo width={256} height={64} />
          </BlurFade>
          <BlurFade as={'p'} delay={0.3} className="text-center text-muted-foreground font-medium leading-snug">
            <HomeDescription />
          </BlurFade>
          <BlurFade delay={0.4} className="flex justify-center gap-2">
            <HomeAuthLinks />
          </BlurFade>
        </div>
        <BlurFade
          delay={0.5}
          direction={'up'}
          offset={10}
          className="relative mx-auto p-1 max-w-6xl w-full border-2 rounded-xl"
        >
          <GlowEffect mode={'breathe'} duration={10} className="-z-10 scale-105 opacity-80" />
          <HomeIntroduceVideo />
        </BlurFade>
      </section>
    </main>
  );
}
