interface Topic {
  name: string;
  slug: string;
}

interface TopicDetail {
  name: string;
  slug: string;
  description: string;
}

interface TopicUsage {
  name: string;
  slug: string;
  count: number;
}

type TopicDetailView = 'articles' | 'series' | 'questions';
