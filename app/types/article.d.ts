interface Article extends Timestamps {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  stats: ArticleStats;
  writer: UserSimple;
  topics: Topic[];
}

interface ArticleDetail extends Timestamps {
  id: number;
  slug: string;
  title: string;
  content: Content;
  thumbnail: string;
  stats: ArticleStats;
  writer: User;
  topics: Topic[];
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

type ArticleSort = 'latest' | 'oldest' | 'relevant' | 'trending';
