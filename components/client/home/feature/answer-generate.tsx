'use client';

import { TopicIcon } from '../../topic';
import { CHAT_MODEL_OPTIONS } from '@/constants/options';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { ButtonGroup } from '@ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { GlowEffect } from '@ui/glow-effect';
import { Popover, PopoverTrigger, PopoverContent } from '@ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { Textarea } from '@ui/textarea';
import { BotIcon, ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function HomeFeatureAnswerGenerate() {
  const [open, setOpen] = useState(false);
  const [answerGenerating, setAnswerGenerating] = useState(false);

  function onRequestButtonClick() {
    setAnswerGenerating(true);
    setTimeout(() => {
      toast.info('질문을 작성하고 요청해보세요!', { icon: <BotIcon className="size-4" /> });
      setAnswerGenerating(false);
    }, 1000);
  }

  return (
    <div className="p-4 flex items-center justify-center w-full h-full border rounded-xl overflow-hidden">
      <Card className="flex-col md:flex-row items-center gap-4 p-4 rounded-xl">
        <h3 className="flex-1 font-medium">AI가 당신의 질문에 답변을 생성해 드립니다!</h3>
        <ButtonGroup className="relative overflow-hidden rounded-full border-blue-400/40 dark:border-blue-400/40">
          <Button
            variant={'outline'}
            className="rounded-full"
            onClick={onRequestButtonClick}
            disabled={answerGenerating}
          >
            <GlowEffect color={'bg-blue-400'} />
            <BotIcon className={cn('text-blue-400', answerGenerating && 'animate-swing repeat-infinite')} /> 답변 생성
            {answerGenerating && '중...'}
          </Button>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                size="icon"
                className="w-auto pl-2 pr-2.5 rounded-full"
                disabled={answerGenerating}
              >
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="px-0 py-4 flex flex-col gap-2">
              <CardHeader className="space-y-1.5">
                <CardTitle>AI 답변 생성 요청</CardTitle>
                <CardDescription>
                  답변 생성은 <strong>10분에 한 번씩</strong> 요청 가능합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Select name={'chatModel'} defaultValue={'GPT_4_1_MINI'}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={'Chat Model'} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CHAT_MODEL_OPTIONS).map(([value, { label, icon }]) => (
                      <SelectItem key={value} value={value}>
                        <div className="flex items-center gap-2.5 font-mono">
                          <TopicIcon slug={icon} name={icon} /> {label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea name="instruction" placeholder={'추가 요청사항을 입력해보세요.\n(예: 답변 스타일)'} />
              </CardContent>
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      </Card>
    </div>
  );
}
