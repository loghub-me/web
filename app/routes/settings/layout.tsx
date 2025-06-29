import { Outlet } from 'react-router';
import SettingHeader from '~/components/setting/header';
import AuthGuard from '~/guards/auth-guard';

export default function SettingLayout() {
  return (
    <AuthGuard>
      <div className="container mx-auto p-4 pt-16 min-h-screen space-y-4">
        <SettingHeader />
        <hr />
        <Outlet />
      </div>
    </AuthGuard>
  );
}
