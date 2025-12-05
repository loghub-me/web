import { buildWebUrl } from '@/lib/utils';
import { ShareMenu } from '@ui/share-menu';

interface SeriesChapterShareMenuProps {
  series: Pick<Series, 'slug' | 'writer'>;
  chapter: Pick<SeriesChapter, 'title' | 'sequence'>;
}

export default function SeriesChapterShareMenu({ series, chapter }: Readonly<SeriesChapterShareMenuProps>) {
  const { slug, writer } = series;
  const { title, sequence } = chapter;
  const url = encodeURIComponent(buildWebUrl(`/series/${writer.username}/${slug}/${sequence}`));
  const text = encodeURIComponent(title);

  const shareURLs = [
    {
      // X (Twitter)
      href: `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=loghub`,
      icon: 'x',
    },
    {
      // Bluesky
      href: `https://bsky.app/intent/compose?text=${text}%20${url}&hashtags=loghub`,
      icon: 'bluesky',
    },
    {
      // Reddit
      href: `https://www.reddit.com/submit?url=${url}&title=${text}`,
      icon: 'reddit',
    },
  ];

  return <ShareMenu shareURLs={shareURLs} />;
}
