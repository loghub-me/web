import type { Route } from './+types/index';
import Logo from '~/components/global/logo';
import Symbol from '~/components/global/symbol';
import { JumboButtonLink } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { manual } from '~/constants/manual';
import { createMetadata } from '~/constants/meta';

export const meta: Route.MetaFunction = () => {
  const title = '매뉴얼';
  const description = '매뉴얼 페이지입니다. 플랫폼 사용법과 기능을 안내합니다.';
  return createMetadata(title, description);
};

export default function ManualIndex() {
  return (
    <main className="container mx-auto p-4 pt-20 lg:px-48 min-h-screen space-y-8">
      <section className="space-y-2">
        <h2 className="text-2xl font-bold">메뉴얼</h2>
        <p className="mt-4">
          <b>LogHub</b>는 개발자들이 지식을 공유하고, 서로의 경험을 나누는 플랫폼입니다.
        </p>
        <div className="flex">
          <Card className="pt-0 flex-1 border-r-0 rounded-r-none overflow-hidden">
            <CardHeader className="p-2 bg-muted">
              <CardTitle className="text-center text-base">로고</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <Logo />
            </CardContent>
          </Card>
          <Card className="pt-0 flex-1 rounded-l-none overflow-hidden">
            <CardHeader className="p-2 bg-muted">
              <CardTitle className="text-center text-base">심볼</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <Symbol />
            </CardContent>
          </Card>
        </div>
      </section>
      {Object.entries(manual).map(([key, value]) => (
        <section key={key} id={key} className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">{value.title}</h3>
            <p className="text-sm text-muted-foreground">{value.description}</p>
          </div>
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
