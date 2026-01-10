interface User {
  id: number;
  username: string;
}

interface UserDetail {
  id: number;
  email?: string;
  username: string;
  nickname: string;
  role: UserRole;
  meta: UserMeta;
}

interface UserMeta {
  profile: UserProfile;
  github: UserGitHub;
  stats: UserStats;
}

interface UserProfile {
  readme: UserRole;
}

interface UserGitHub {
  username?: string;
  verified: boolean;
}

interface UserStats {
  totalPostedCount: number;
  totalAddedStarCount: number;
  totalGazedStarCount: number;
}

interface UserPrivacy {
  emailPublic: boolean;
}

interface UserStar {
  id: number;
  targetId: number;
  slug: string;
  title: string;
  count: number;
  writer: User;
  topics: Topic[];
  target: UserStarTarget;
}

interface UserActivitySummary {
  date: string;
  count: number;
}

interface UserActivity {
  id: number;
  href: string;
  title: string;
  action: UserActivityAction;
}

type UserRole = 'MEMBER' | 'ADMIN' | 'BOT';
type UserStarTarget = 'ARTICLE' | 'SERIES' | 'QUESTION';
type UserActivityAction =
  | 'PUBLISH_ARTICLE'
  | 'POST_SERIES'
  | 'PUBLISH_SERIES_CHAPTER'
  | 'POST_QUESTION'
  | 'POST_QUESTION_ANSWER';
