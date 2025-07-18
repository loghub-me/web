import { Outlet } from 'react-router';
import { ButtonNavLink } from '~/components/ui/button';

export default function ManualIndex() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8 min-h-screen flex flex-col md:flex-row gap-4">
      <aside className="md:max-w-56 w-full space-y-1">
        <ButtonNavLink to={'/manual'} className={'justify-start w-full'} end>
          메뉴얼 홈
        </ButtonNavLink>
        <hr className="py-1" />
        <ButtonNavLink to={'/manual/articles'} className={'justify-start w-full'} end>
          아티클 가이드
        </ButtonNavLink>
        <ButtonNavLink to={'/manual/series'} className={'justify-start w-full'} end>
          시리즈 가이드
        </ButtonNavLink>
        <ButtonNavLink to={'/manual/questions'} className={'justify-start w-full'} end>
          질문 가이드
        </ButtonNavLink>
      </aside>
      <Outlet />
    </div>
  );
}
