import { Navigate } from 'react-router';

export default function SettingIndex() {
  return <Navigate to={'/settings/account'} />;
}
