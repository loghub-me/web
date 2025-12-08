interface User {
  id: number;
  username: string;
}

interface UserDetail {
  id: number;
  email?: string;
  username: string;
  profile: UserProfile;
  github: UserGitHub;
  role: UserRole;
}

interface UserGitHub {
  username?: string;
  verified: boolean;
}

interface UserProfile {
  nickname: string;
  readme: UserRole;
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
  | 'POST_ARTICLE'
  | 'POST_SERIES'
  | 'POST_SERIES_CHAPTER'
  | 'POST_QUESTION'
  | 'POST_QUESTION_ANSWER';
