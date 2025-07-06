interface Page<T> {
  content: T[];
  page: { totalPages: number };
}

interface Content {
  html: string;
  markdown: string;
}

interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

interface Toc {
  level: number;
  title: string;
  slug: string;
}

type Sort = ArticleSort | BookSort | QuestionSort;

type Theme = 'light' | 'dark';
