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

interface UserPost {
  path: string;
  title: string;
  type: UserPostType;
  questionStatus?: QuestionStatus;
  updatedAt: string;
}

interface UserProfile {
  nickname: string;
  readme: string;
}

interface UserPrivacy {
  emailVisible: boolean;
  starVisible: boolean;
}

type UserRole = 'MEMBER' | 'ADMIN' | 'BOT';
type UserPostType = 'ARTICLE' | 'QUESTION';
