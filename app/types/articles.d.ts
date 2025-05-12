interface Article extends Timestamps {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  stats: ArticleStats;
  writerUsername: string;
  topics: Topic[];
}

interface ArticleDetail extends Article {
  content: string;
  writer: User;
}

interface ArticleStats {
  starCount: number;
  commentCount: number;
}

interface ArticleComment extends Timestamps {
  id: number;
  content: string;
  deleted: boolean;
  replyCount: number;
  mention: User | null;
  writer: User;
}

type ArticleSort = 'latest' | 'oldest' | 'trending';
