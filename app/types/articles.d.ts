interface Article {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  stats: ArticleStats;
  writerUsername: string;
  topics: Topic[];
  createdAt: string;
  updatedAt: string;
}

interface ArticleDetail extends Article {
  content: string;
  writer: User;
}

interface ArticleStats {
  starCount: number;
  commentCount: number;
}

type ArticleSort = 'latest' | 'oldest' | 'trending';
