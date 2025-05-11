interface Page<T> {
  content: T[];
  page: { totalPages: number };
}

interface Toc {
  level: number;
  title: string;
  slug: string;
}

type Sort = ArticleSort;
