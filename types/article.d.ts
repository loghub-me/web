interface Article {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  stats: ArticleStats;
  writer: User;
  topics: Topic[];
  publishedAt: string;
}

interface ArticleDetail {
  id: number;
  slug: string;
  title: string;
  content: Content;
  anchors: Anchor[];
  thumbnail: string;
  stats: ArticleStats;
  writer: User;
  topics: Topic[];
  publishedAt: string;
  updatedAt: string;
}

interface ArticleUnpublished {
  id: number;
  title: string;
  topics: Topic[];
  createdAt: string;
}

interface ArticleForImport {
  id: number;
  slug: string;
  title: string;
  topics: Topic[];
}

interface ArticleForEdit {
  id: number;
  title: string;
  content: string;
  draft?: string;
  thumbnail: string;
  topicSlugs: string[];
  published: boolean;
}

interface ArticleStats {
  starCount: number;
  commentCount: number;
}

interface ArticleComment {
  id: number;
  content: string;
  deleted: boolean;
  replyCount: number;
  mention: User | null;
  writer: User;
  createdAt: string;
  updatedAt: string;
}

type ArticleSort = 'latest' | 'oldest' | 'relevant' | 'trending';
type ArticleCommentActionStatus = 'editing' | 'replying';
