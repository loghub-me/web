'use client';

import { MarkdownEditor } from '@/components/client/markdown';
import { Card } from '@ui/card';
import { useRef } from 'react';

const MARKDOWN_EXAMPLE = `
# 제목1
## 제목2
### 제목3

제목을 작성할 때는 # 기호를 사용합니다. #의 개수에 따라 제목의 수준이 결정됩니다.

- 항목 1
- 항목 2
  - 하위 항목 2.1
  - 하위 항목 2.2
- 항목 3

1. 첫 번째
2. 두 번째
3. 세 번째

목록을 작성할 때는 - 기호를 사용하여 순서 없는 목록을 만들고, 숫자. 형식을 사용하여 순서 있는 목록을 만듭니다.

다음과 같이 텍스트 서식을 적용할 수 있습니다:  
**굵은 텍스트** *기울인 텍스트* ~~취소선 텍스트~~ \`인라인 코드\`

[링크 설명](https://loghub.me)

링크를 삽입할 때는 대괄호 [] 안에 링크 텍스트를 작성하고, 소괄호 () 안에 URL을 작성합니다.

![대체 텍스트](https://loghub.me/symbol.png "이미지 제목")

이미지를 삽입할 때는 느낌표 !를 사용하고, 대괄호 [] 안에 대체 텍스트(alt)를 작성한 후, 소괄호 () 안에 이미지 URL과 선택적으로 큰따옴표 "" 안에 캡션(제목)을 작성합니다.

\`\`\`ts
const greeting = "Hello, LogHub!";
console.log(greeting);
\`\`\`

코드 블록을 작성할 때는 백틱 \`\`\` 기호를 사용하여 코드의 시작과 끝을 표시합니다. 언어를 지정하여 구문 강조를 적용할 수도 있습니다.

> 인용문은 이렇게 작성합니다.
> 여러 줄에 걸쳐 작성할 수도 있습니다.

인용문을 작성할 때는 꺾쇠 > 기호를 사용합니다.

| 헤더1 | 헤더2 | 헤더3 |
|-----|-----|-----|
| 셀1 | 셀2 | 셀3 |
| 셀4 | 셀5 | 셀6 |

테이블을 작성할 때는 파이프 | 기호를 사용하여 열을 구분하고, 하이픈 -을 사용하여 헤더와 본문을 구분합니다.
`.trim();

export default function MarkdownManual() {
  const easyMDERef = useRef<EasyMDE>(null);

  return (
    <section id="markdown" className="space-y-4">
      <div className="space-y-1.5">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary/70 to-primary">
          마크다운 작성 매뉴얼
        </h2>
        <p className="text-secondary-foreground mt-2">
          LogHub에서는 마크다운(Markdown) 형식을 사용하여 포스트를 작성할 수 있습니다.
          <br />
          마크다운은 간단한 문법으로 텍스트를 서식화할 수 있는 경량 마크업 언어입니다. 아래는 자주 사용되는 마크다운
          문법에 대한 간단한 가이드입니다.
        </p>
        <Card className="mt-4 p-0 overflow-hidden">
          <MarkdownEditor editor={{ ref: easyMDERef, title: '마크다운 문법 예제', defaultValue: MARKDOWN_EXAMPLE }} />
        </Card>
      </div>
    </section>
  );
}
