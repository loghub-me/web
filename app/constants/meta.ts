import type { MetaDescriptor } from 'react-router';

const DEFAULT_META: MetaDescriptor[] = [
  { name: 'charset', content: 'UTF-8' },
  { property: 'og:url', content: 'https://loghub.me' },
  { property: 'og:type', content: 'website' },
  { property: 'og:image', content: 'https://loghub.me/logo.svg' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:image', content: 'https://loghub.me/logo.svg' },
  { name: 'canonical', content: 'https://loghub.me' },
  { name: 'theme-color', content: '#3A97FA' },
];

export function createMetadata(title?: string, description?: string): MetaDescriptor[] {
  if (!title) title = 'Unknown';
  if (!description) description = '';

  return [
    ...DEFAULT_META,
    { title: `${title} | LogHub` },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { name: 'twitter:title', content: `${title} | LogHub` },
    { name: 'twitter:description', content: description },
  ];
}
