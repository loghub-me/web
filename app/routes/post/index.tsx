import { JumboButtonLink } from '~/components/ui/button';
import { POST_LINKS } from '~/constants/nav-links';

export default function PostIndex() {
  return (
    <main className="container max-h-screen h-screen mx-auto p-4 pt-16">
      <div className="p-16 space-y-4 text-center">
        <h1 className="font-bold text-3xl">포스트</h1>
        <p className="text-muted-foreground ">
          글을 작성하고, 다른 사람들과 공유해보세요. <br />
          Markdown 형식으로 작성할 수 있습니다!
        </p>
      </div>
      <div className="flex flex-col lg:flex-row flex-nowrap gap-4">
        {POST_LINKS.map((link) => (
          <JumboButtonLink {...link}>
            <h3 className="text-lg font-semibold">{link.name}</h3>
            <p className="text-sm text-muted-foreground">{link.description}</p>
          </JumboButtonLink>
        ))}
      </div>
    </main>
  );
}
