import { JumboButtonLink } from '~/components/ui/button';
import { manual } from '~/constants/manual';

export default function ManualIndex() {
  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-8">
      <section className="space-y-2">
        <p className="mt-4">
          <b>LogHub</b>는 개발자들이 지식을 공유하고, 서로의 경험을 나누는 플랫폼입니다.
        </p>
      </section>
      <hr />
      {Object.entries(manual).map(([key, value]) => (
        <section key={key} className="space-y-4">
          <h2 className="text-2xl font-bold">{value.title}</h2>
          <p className="text-sm text-muted-foreground">{value.description}</p>
          <p className="mt-4">{value.content}</p>
          <div className="flex flex-col lg:flex-row gap-4">
            {value.links.map((link, index) => (
              <JumboButtonLink key={index} to={link.to} icon={link.icon}>
                <h3 className="text-lg font-semibold">{link.label}</h3>
                <p className="text-sm text-muted-foreground whitespace-normal">{link.description}</p>
              </JumboButtonLink>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
