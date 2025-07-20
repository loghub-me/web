import { CardContent, CardTitle } from '~/components/ui/card';

interface SeriesChapterDetailContentProps {
  sequence: number;
  title: string;
  content: { html: string };
}

export default function SeriesChapterDetailContent({
  sequence,
  title,
  content,
}: Readonly<SeriesChapterDetailContentProps>) {
  return (
    <CardContent className="pb-4 space-y-4 border-b">
      <CardTitle className="text-3xl">
        <span className="text-primary/80">{sequence}.</span> {title}
      </CardTitle>
      <div className="markdown-it" dangerouslySetInnerHTML={{ __html: content.html }} />
    </CardContent>
  );
}
