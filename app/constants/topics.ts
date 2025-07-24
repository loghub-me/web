export const TOPICS = [
  { slug: 'c', name: 'C' },
  { slug: 'cpp', name: 'C++' },
  { slug: 'csharp', name: 'C#' },
  { slug: 'deno', name: 'Deno' },
  { slug: 'docker', name: 'Docker' },
  { slug: 'github', name: 'GitHub' },
  { slug: 'google', name: 'Google' },
  { slug: 'java', name: 'Java' },
  { slug: 'javascript', name: 'JavaScript' },
  { slug: 'kubernetes', name: 'Kubernetes' },
  { slug: 'nextjs', name: 'Next.js' },
  { slug: 'nodejs', name: 'Node.js' },
  { slug: 'prettier', name: 'Prettier' },
  { slug: 'python', name: 'Python' },
  { slug: 'react', name: 'React' },
  { slug: 'spring', name: 'Spring' },
  { slug: 'typescript', name: 'TypeScript' },
] as Topic[];

const TOPIC_MAP = TOPICS.reduce((acc, topic) => acc.set(topic.slug, topic), new Map<string, Topic>());

export function getTopicBySlugs(slugs: string[]) {
  return slugs.map((slug) => TOPIC_MAP.get(slug)).filter((topic): topic is Topic => !!topic);
}

export function searchTopics(query: string) {
  if (query.trim().length === 0) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  return TOPICS.filter((topic) => `${topic.slug} ${topic.name}`.toLowerCase().includes(lowerQuery));
}
