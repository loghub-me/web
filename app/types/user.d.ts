interface UserSimple {
  id: number;
  username: string;
}

interface User {
  id: number;
  username: string;
  nickname: string;
  role: UserRole;
}

interface UserDetail extends User {
  readme: string;
}

interface UserProfile {
  nickname: string;
  readme: string;
}

interface UserPrivacy {
  emailVisible: boolean;
  starVisible: boolean;
}

interface UserStar {
  id: number;
  slug: string;
  title: string;
  writer: UserSimple;
  topics: Topic[];
  target: UserStarTarget;
}

interface UserActivitySummary {
  createdDate: string;
  count: number;
}

interface UserActivity {
  id: number;
  slug: string;
  title: string;
  action: UserActivityAction;
}

type UserStarTarget = 'ARTICLE' | 'SERIES' | 'QUESTION';
type UserActivityAction = 'POST_ARTICLE' | 'POST_SERIES' | 'POST_QUESTION';

type UserRole = 'MEMBER' | 'ADMIN' | 'BOT';
