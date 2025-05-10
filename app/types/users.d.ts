interface User {
  username: string;
  nickname: string;
  role: UserRole;
}

type UserRole = 'MEMBER' | 'ADMIN' | 'BOT';
