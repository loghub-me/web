export const USER_ACTIVITY_ACTION_LABELS: Record<UserActivityAction, string> = {
  POST_ARTICLE: '게시글 작성',
  POST_SERIES: '시리즈 작성',
  POST_QUESTION: '질문 작성',
};

export const USER_ACTIVITY_ACTION_PATH: Record<UserActivityAction, string> = {
  POST_ARTICLE: '/@%s/articles/%s',
  POST_SERIES: '/@%s/series/%s',
  POST_QUESTION: '/@%s/questions/%s',
};

export const USER_STAR_TARGET_LABELS: Record<UserStarTarget, string> = {
  ARTICLE: '아티클',
  SERIES: '시리즈',
  QUESTION: '질문',
};

export const USER_STAR_TARGET_PATH: Record<UserStarTarget, string> = {
  ARTICLE: '/@%s/articles/%s',
  SERIES: '/@%s/series/%s',
  QUESTION: '/@%s/questions/%s',
};
