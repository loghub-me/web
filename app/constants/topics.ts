const ALL_TOPICS = {
  c: 'C',
  cpp: 'C++',
  csharp: 'C#',
  java: 'Java',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  nodejs: 'Node.js',
  deno: 'Deno',
  react: 'React',
  nextjs: 'Next.js',
  spring: 'Spring',
  docker: 'Docker',
  kubernetes: 'Kubernetes',
};

export function searchTopicKeys(query: string) {
  return Object.keys(ALL_TOPICS)
    .filter((key) => key.includes(query.trim().toLocaleLowerCase()))
    .slice(0, 5);
}
