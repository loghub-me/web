import { BotIcon, XIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';

export default function FeatureBotAnswer() {
  return (
    <div className="flex items-center justify-center gap-4 p-4 w-full h-full border bg-muted rounded-xl">
      <Card className="p-6 w-full">
        <CardHeader className="p-0 flex flex-col gap-2 text-center sm:text-left">
          <CardTitle className="text-lg leading-none font-semibold">답변 생성 요청</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            답변 생성은 10분에 한 번만 요청할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-0 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost">
            <XIcon /> 취소하기
          </Button>
          <Button type="button">
            <BotIcon /> 요청하기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
