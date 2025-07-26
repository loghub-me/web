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
    <div className="pb-4 space-y-4">
      <h2 className="text-3xl font-bold">
        <span className="text-primary/80">{sequence}.</span> {title}
      </h2>
      <hr />
      <div className="markdown-it" dangerouslySetInnerHTML={{ __html: content.html }} />
    </div>
  );
}
