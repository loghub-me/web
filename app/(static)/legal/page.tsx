import { TERMS, PRIVACY_POLICIES } from '@/constants/legals';
import { Separator } from '@ui/separator';

export default function LegalPage() {
  return (
    <main className="container mx-auto px-4 py-20 h-screen">
      <section className="py-4">
        <h2 className="text-3xl font-semibold">서비스 이용약관 및 개인정보 처리방침</h2>
      </section>
      <Separator />
      <section id="terms" className="py-4 space-y-4">
        <h3 className="text-2xl font-semibold">이용약관</h3>
        {TERMS.map(({ title, content }, index) => (
          <div key={index} className="space-y-2">
            <h4 className="text-xl font-semibold">{title}</h4>
            <pre className="font-sans whitespace-pre-wrap break-words">{content}</pre>
          </div>
        ))}
      </section>
      <Separator />
      <section id="privacy" className="py-4 space-y-4">
        <h3 className="text-2xl font-semibold">개인정보 처리방침</h3>
        {PRIVACY_POLICIES.map(({ title, content }, index) => (
          <div key={index} className="space-y-2">
            <h4 className="text-xl font-semibold">{title}</h4>
            <pre className="font-sans whitespace-pre-wrap break-words">{content}</pre>
          </div>
        ))}
      </section>
    </main>
  );
}
