import type { Route } from './+types/profile';
import { UserThemeUpdateForm } from '~/components/user';
import { createMetadata } from '~/constants/meta';

export const meta: Route.MetaFunction = () => {
  const title = '테마 설정';
  const description = '테마 설정을 통해 LogHub의 외관을 개인 취향에 맞게 변경할 수 있습니다.';
  return createMetadata(title, description);
};

export default function SettingThemeRoute() {
  return (
    <main className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">테마 설정</h3>
        <p className="text-sm text-muted-foreground">
          테마 설정을 통해 LogHub의 외관을 개인 취향에 맞게 변경할 수 있습니다.
        </p>
      </div>
      <UserThemeUpdateForm />
    </main>
  );
}
