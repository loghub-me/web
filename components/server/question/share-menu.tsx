import { buildWebUrl } from '@/lib/utils';
import { ShareMenu } from '@ui/share-menu';

interface QuestionShareMenuProps {
  question: Pick<QuestionDetail, 'slug' | 'title' | 'writer'>;
}

export default function QuestionShareMenu({ question }: Readonly<QuestionShareMenuProps>) {
  const { slug, title, writer } = question;
  const url = encodeURIComponent(buildWebUrl(`/questions/${writer.username}/${slug}`));
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
