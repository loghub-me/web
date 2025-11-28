import { CardContent } from '@ui/card';

interface SeriesChapterDetailContentProps {
  chapter: Pick<SeriesChapterDetail, 'content'>;
}

export default function SeriesChapterDetailContent({ chapter }: Readonly<SeriesChapterDetailContentProps>) {
  return (
    <CardContent className="space-y-4">
      <div className="markdown-it" dangerouslySetInnerHTML={{ __html: chapter.content.html }} />
    </CardContent>
  );
}
