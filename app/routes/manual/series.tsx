import { MoveUpRightIcon, PencilIcon, SearchIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';

export default function ManualSeries() {
  return (
    <main className="px-4 w-full space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">시리즈 작성 가이드</h2>
        <p className="text-muted-foreground">이 페이지는 블로그 시리즈 작성 시 참고할 수 있는 가이드를 제공합니다.</p>
        <p className="mt-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged.
        </p>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">시리즈 검색 가이드</h2>
        <p className="text-muted-foreground">
          이 페이지는 블로그 시리즈을 검색할 때 참고할 수 있는 가이드를 제공합니다.
        </p>
        <p className="mt-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <ButtonLink
          to={'/search/series'}
          variant={'outline'}
          size={'custom'}
          className="relative flex-1 flex-col items-start p-4 h-auto gap-4 group"
        >
          <MoveUpRightIcon className="absolute top-4 right-4 group-hover:top-3 group-hover:right-3 transition-all text-muted-foreground" />
          <SearchIcon className="size-6" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">시리즈 검색</h3>
            <p className="text-muted-foreground whitespace-normal">
              키워드로 검색하거나 카테고리별로 필터링할 수 있습니다.
            </p>
          </div>
        </ButtonLink>
        <ButtonLink
          to={'/post/series'}
          variant={'outline'}
          className="relative flex-1 flex-col items-start p-4 h-auto gap-4"
        >
          <MoveUpRightIcon className="absolute top-4 right-4 group-hover:top-3 group-hover:right-3 transition-all text-muted-foreground" />
          <PencilIcon className="size-6" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">시리즈 작성</h3>
            <p className="text-muted-foreground whitespace-normal">새로운 시리즈을 작성할 수 있습니다.</p>
          </div>
        </ButtonLink>
      </div>
    </main>
  );
}
