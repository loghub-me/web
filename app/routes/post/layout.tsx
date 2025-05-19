import { Outlet } from 'react-router';
import AuthGuard from '~/guards/auth-guard';

export default function PostLayout() {
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
}
