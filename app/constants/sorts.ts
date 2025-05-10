const ARTICLE_SORT_OPTIONS: Record<ArticleSort, string> = {
  latest: '최신순',
  oldest: '오래된순',
  trending: '인기순',
};

export const SORT_OPTIONS: Record<string, Record<Sort, string>> = {
  '/search/articles': ARTICLE_SORT_OPTIONS,
};
