interface Page<T> {
  content: T[];
  page: { totalPages: number };
}

interface Toc {
  level: number;
  title: string;
  slug: string;
}

interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

type Sort = ArticleSort;
