const TOPICS = [
  // === 프로그래밍 언어 ===
  { slug: 'c', name: 'C' },
  { slug: 'cpp', name: 'C++' },
  { slug: 'csharp', name: 'C#' },
  { slug: 'java', name: 'Java' },
  { slug: 'kotlin', name: 'Kotlin' },
  { slug: 'scala', name: 'Scala' },
  { slug: 'groovy', name: 'Groovy' },
  { slug: 'python', name: 'Python' },
  { slug: 'ruby', name: 'Ruby' },
  { slug: 'perl', name: 'Perl' },
  { slug: 'php', name: 'PHP' },
  { slug: 'javascript', name: 'JavaScript' },
  { slug: 'typescript', name: 'TypeScript' },
  { slug: 'dart', name: 'Dart' },
  { slug: 'go', name: 'Go' },
  { slug: 'rust', name: 'Rust' },
  { slug: 'swift', name: 'Swift' },
  { slug: 'objective-c', name: 'Objective-C' },
  { slug: 'haskell', name: 'Haskell' },
  { slug: 'elixir', name: 'Elixir' },
  { slug: 'erlang', name: 'Erlang' },
  { slug: 'clojure', name: 'Clojure' },
  { slug: 'r', name: 'R' },
  { slug: 'matlab', name: 'MATLAB' },
  { slug: 'julia', name: 'Julia' },
  { slug: 'fortran', name: 'Fortran' },
  { slug: 'cobol', name: 'COBOL' },
  { slug: 'fsharp', name: 'F#' },
  { slug: 'nim', name: 'Nim' },
  { slug: 'zig', name: 'Zig' },
  { slug: 'ocaml', name: 'OCaml' },
  { slug: 'lua', name: 'Lua' },
  { slug: 'powershell', name: 'PowerShell' },
  { slug: 'bash', name: 'Bash' },

  // === 런타임 ===
  { slug: 'nodejs', name: 'Node.js' },
  { slug: 'deno', name: 'Deno' },
  { slug: 'bun', name: 'Bun' },
  { slug: 'graalvm', name: 'GraalVM' },
  { slug: 'jvm', name: 'JVM' },
  { slug: 'llvm', name: 'LLVM' },

  // === 웹 프레임워크 ===
  { slug: 'spring-boot', name: 'Spring Boot' },
  { slug: 'nestjs', name: 'NestJS' },
  { slug: 'express', name: 'Express' },
  { slug: 'ktor', name: 'Ktor' },
  { slug: 'fastify', name: 'Fastify' },
  { slug: 'adonisjs', name: 'AdonisJS' },
  { slug: 'rails', name: 'Ruby on Rails' },
  { slug: 'django', name: 'Django' },
  { slug: 'flask', name: 'Flask' },
  { slug: 'fastapi', name: 'FastAPI' },
  { slug: 'laravel', name: 'Laravel' },
  { slug: 'cakephp', name: 'CakePHP' },
  { slug: 'phoenix', name: 'Phoenix' },
  { slug: 'elysiajs', name: 'ElysiaJS' },

  // === 프론트엔드 ===
  { slug: 'react', name: 'React' },
  { slug: 'nextjs', name: 'Next.js' },
  { slug: 'react-router', name: 'React Router' },
  { slug: 'vue', name: 'Vue.js' },
  { slug: 'nuxt', name: 'Nuxt.js' },
  { slug: 'svelte', name: 'Svelte' },
  { slug: 'sveltekit', name: 'SvelteKit' },
  { slug: 'angular', name: 'Angular' },
  { slug: 'solidjs', name: 'SolidJS' },
  { slug: 'qwik', name: 'Qwik' },
  { slug: 'alpinejs', name: 'Alpine.js' },
  { slug: 'ember', name: 'Ember.js' },
  { slug: 'backbone', name: 'Backbone.js' },

  // === 데이터베이스 ===
  { slug: 'mysql', name: 'MySQL' },
  { slug: 'postgresql', name: 'PostgreSQL' },
  { slug: 'sqlite', name: 'SQLite' },
  { slug: 'mariadb', name: 'MariaDB' },
  { slug: 'oracle-db', name: 'Oracle Database' },
  { slug: 'sqlserver', name: 'SQL Server' },
  { slug: 'mongodb', name: 'MongoDB' },
  { slug: 'redis', name: 'Redis' },
  { slug: 'cassandra', name: 'Cassandra' },
  { slug: 'couchdb', name: 'CouchDB' },
  { slug: 'elasticsearch', name: 'Elasticsearch' },

  // === DevOps ===
  { slug: 'docker', name: 'Docker' },
  { slug: 'kubernetes', name: 'Kubernetes' },
  { slug: 'terraform', name: 'Terraform' },
  { slug: 'ansible', name: 'Ansible' },
  { slug: 'jenkins', name: 'Jenkins' },
  { slug: 'git', name: 'Git' },
  { slug: 'github-actions', name: 'GitHub Actions' },
  { slug: 'gitlab-ci', name: 'GitLab CI/CD' },
  { slug: 'circle-ci', name: 'CircleCI' },
  { slug: 'travis-ci', name: 'Travis CI' },
  { slug: 'argo-cd', name: 'Argo CD' },

  // === 클라우드 ===
  { slug: 'aws', name: 'AWS' },
  { slug: 'gcp', name: 'GCP' },
  { slug: 'azure', name: 'Azure' },
  { slug: 'cloudflare', name: 'Cloudflare' },
  { slug: 'vercel', name: 'Vercel' },
  { slug: 'heroku', name: 'Heroku' },
  { slug: 'digitalocean', name: 'DigitalOcean' },

  // === 머신러닝 / AI ===
  { slug: 'tensorflow', name: 'TensorFlow' },
  { slug: 'pytorch', name: 'PyTorch' },
  { slug: 'keras', name: 'Keras' },
  { slug: 'scikit-learn', name: 'scikit-learn' },

  // === 빌드 시스템 ===
  { slug: 'maven', name: 'Maven' },
  { slug: 'gradle', name: 'Gradle' },
  { slug: 'webpack', name: 'Webpack' },
  { slug: 'rollup', name: 'Rollup' },
  { slug: 'vite', name: 'Vite' },
  { slug: 'cmake', name: 'CMake' },

  // === 패키지 매니저 ===
  { slug: 'npm', name: 'npm' },
  { slug: 'yarn', name: 'Yarn' },
  { slug: 'pnpm', name: 'pnpm' },
  { slug: 'pip', name: 'pip' },
  { slug: 'poetry', name: 'Poetry' },
  { slug: 'cargo', name: 'Cargo' },
  { slug: 'composer', name: 'Composer' },
  { slug: 'gem', name: 'RubyGems' },
  { slug: 'nuget', name: 'NuGet' },

  // === 툴 ===
  { slug: 'prettier', name: 'Prettier' },
  { slug: 'eslint', name: 'ESLint' },
  { slug: 'babel', name: 'Babel' },
  { slug: 'postman', name: 'Postman' },
  { slug: 'insomnia', name: 'Insomnia' },
  { slug: 'grafana', name: 'Grafana' },
  { slug: 'prometheus', name: 'Prometheus' },

  // === 웹 서버 ===
  { slug: 'apache', name: 'Apache' },
  { slug: 'nginx', name: 'NGINX' },

  // === 에디터 & IDE ===
  { slug: 'vscode', name: 'VSCode' },
  { slug: 'intellij', name: 'IntelliJ IDEA' },
  { slug: 'vim', name: 'Vim' },
  { slug: 'neovim', name: 'Neovim' },
  { slug: 'emacs', name: 'Emacs' },

  // === 기타 ===
  { slug: 'github', name: 'GitHub' },
  { slug: 'gitlab', name: 'GitLab' },
  { slug: 'bitbucket', name: 'Bitbucket' },
] as Topic[];

const TOPIC_MAP = TOPICS.reduce((acc, topic) => acc.set(topic.slug, topic), new Map<string, Topic>());

export function getTopicSetBySlugs(slugs: Set<string>): Topic[] {
  const topics: Topic[] = [];
  slugs.forEach((slug) => {
    const topic = TOPIC_MAP.get(slug);
    if (topic) {
      topics.push(topic);
    }
  });
  return topics;
}

export function searchTopics(query: string) {
  if (query.trim().length === 0) {
    return TOPICS.slice(40);
  }

  const lowerQuery = query.toLowerCase();
  return TOPICS.filter((topic) => `${topic.slug} ${topic.name}`.toLowerCase().includes(lowerQuery));
}

export { TOPICS };
