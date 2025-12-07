interface Article extends Timestamps {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  stats: ArticleStats;
  writer: User;
  topics: Topic[];
}

interface ArticleDetail extends Timestamps {
  id: number;
  slug: string;
  title: string;
  content: Content;
  anchors: Anchor[];
  thumbnail: string;
  stats: ArticleStats;
  writer: User;
  topics: Topic[];
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
type ArticleCommentActionStatus = 'editing' | 'replying';
