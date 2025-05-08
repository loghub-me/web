interface Session {
  id: number;
  email: string;
  username: string;
  nickname: string;
  role: UserRole;
}

interface CustomJwtPayload {
  exp: number;
  iat: number;
  iss: string;
  sub: number;
  email: string;
  username: string;
  nickname: string;
  role: UserRole;
}

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';
type UserRole = 'MEMBER' | 'ADMIN' | 'BOT';
