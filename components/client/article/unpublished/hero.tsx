import { Alert, AlertTitle, AlertDescription } from '@ui/alert';
import { InfoIcon } from 'lucide-react';

export default function ArticleUnpublishedHero() {
  return (
    <div className="py-4 space-y-4">
      <div className="space-y-4">
        <h2 className="font-semibold text-2xl">비공개 아티클</h2>
        <p className="text-muted-foreground">
          비공개 아티클을 확인할 수 있는 페이지입니다. 작성 중인 아티클을 검색하고 관리해보세요.
        </p>
      </div>
      <Alert>
        <InfoIcon />
        <AlertTitle>비공개 아티클은 작성자 본인만 확인할 수 있습니다.</AlertTitle>
        <AlertDescription>아티클을 완성한 후 공개 설정을 변경하여 다른 사용자들과 공유할 수 있습니다.</AlertDescription>
      </Alert>
    </div>
  );
}
