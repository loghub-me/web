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

type TopicArticleSort = 'trending' | 'latest' | 'oldest';
type TopicSeriesSort = 'trending' | 'latest' | 'oldest';
type TopicQuestionSort = 'trending' | 'latest' | 'oldest';
