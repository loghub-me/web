interface Page<T> {
  content: T[];
  page: { totalPages: number };
}

type Sort = ArticleSort;
