export const TOPICS = [
  { slug: 'c', name: 'C' },
  { slug: 'cpp', name: 'C++' },
  { slug: 'csharp', name: 'C#' },
  { slug: 'deno', name: 'Deno' },
  { slug: 'bun', name: 'bun' },
  { slug: 'docker', name: 'Docker' },
  { slug: 'github', name: 'GitHub' },
  { slug: 'gitlab', name: 'GitLab' },
  { slug: 'bitbucket', name: 'Bitbucket' },
  { slug: 'google', name: 'Google' },
  { slug: 'java', name: 'Java' },
  { slug: 'javascript', name: 'JavaScript' },
  { slug: 'typescript', name: 'TypeScript' },
  { slug: 'python', name: 'Python' },
  { slug: 'go', name: 'Go' },
  { slug: 'rust', name: 'Rust' },
  { slug: 'php', name: 'PHP' },
  { slug: 'ruby', name: 'Ruby' },
  { slug: 'swift', name: 'Swift' },
  { slug: 'kotlin', name: 'Kotlin' },
  { slug: 'scala', name: 'Scala' },
  { slug: 'lua', name: 'Lua' },
  { slug: 'haskell', name: 'Haskell' },
  { slug: 'clojure', name: 'Clojure' },
  { slug: 'fsharp', name: 'F#' },
  { slug: 'dart', name: 'Dart' },
  { slug: 'nodejs', name: 'Node.js' },
  { slug: 'nextjs', name: 'Next.js' },
  { slug: 'nuxt', name: 'Nuxt.js' },
  { slug: 'react', name: 'React' },
  { slug: 'vue', name: 'Vue.js' },
  { slug: 'angular', name: 'Angular' },
  { slug: 'svelte', name: 'Svelte' },
  { slug: 'react-router', name: 'React Router' },
  { slug: 'solidjs', name: 'SolidJS' },
  { slug: 'astro', name: 'Astro' },
  { slug: 'spring', name: 'Spring' },
  { slug: 'spring-boot', name: 'Spring Boot' },
  { slug: 'quarkus', name: 'Quarkus' },
  { slug: 'express', name: 'Express.js' },
  { slug: 'fastify', name: 'Fastify' },
  { slug: 'nestjs', name: 'NestJS' },
  { slug: 'elysia', name: 'ElysiaJS' },
  { slug: 'flask', name: 'Flask' },
  { slug: 'django', name: 'Django' },
  { slug: 'fastapi', name: 'FastAPI' },
  { slug: 'rails', name: 'Ruby on Rails' },
  { slug: 'laravel', name: 'Laravel' },
  { slug: 'kubernetes', name: 'Kubernetes' },
  { slug: 'helm', name: 'Helm' },
  { slug: 'terraform', name: 'Terraform' },
  { slug: 'ansible', name: 'Ansible' },
  { slug: 'aws', name: 'AWS' },
  { slug: 'azure', name: 'Azure' },
  { slug: 'gcp', name: 'Google Cloud' },
  { slug: 'cloudflare', name: 'Cloudflare' },
  { slug: 'vercel', name: 'Vercel' },
  { slug: 'heroku', name: 'Heroku' },
  { slug: 'supabase', name: 'Supabase' },
  { slug: 'firebase', name: 'Firebase' },
  { slug: 'mongodb', name: 'MongoDB' },
  { slug: 'postgresql', name: 'PostgreSQL' },
  { slug: 'mysql', name: 'MySQL' },
  { slug: 'sqlite', name: 'SQLite' },
  { slug: 'redis', name: 'Redis' },
  { slug: 'cassandra', name: 'Cassandra' },
  { slug: 'elasticsearch', name: 'Elasticsearch' },
  { slug: 'prettier', name: 'Prettier' },
  { slug: 'eslint', name: 'ESLint' },
  { slug: 'babel', name: 'Babel' },
  { slug: 'webpack', name: 'Webpack' },
  { slug: 'vite', name: 'Vite' },
  { slug: 'rollup', name: 'Rollup' },
  { slug: 'storybook', name: 'Storybook' },
  { slug: 'jest', name: 'Jest' },
  { slug: 'selenium', name: 'Selenium' },
  { slug: 'postman', name: 'Postman' },
  { slug: 'insomnia', name: 'Insomnia' },
  { slug: 'grafana', name: 'Grafana' },
  { slug: 'prometheus', name: 'Prometheus' },
  { slug: 'apache', name: 'Apache' },
  { slug: 'nginx', name: 'NGINX' },
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

export function getRandomTopics(count = 5) {
  const shuffled = [...TOPICS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
