import { Separator } from '@ui/separator';
import { MarkdownRenderer } from 'loghub-me-markdown-renderer';
import { Fragment } from 'react/jsx-runtime';

const renderer = new MarkdownRenderer({ enabledPlugins: ['anchor', 'safeLink', 'captionedImage'] });
const MARKDOWN_MANUALS = [
  MarkdownManualTitle,
  MarkdownManualList,
  MarkdownManualAnchor,
  MarkdownManualImage,
  MarkdownManualCaptionedImage,
  MarkdownManualTable,
  MarkdownManualCodeBlock,
  MarkdownManualInlineCode,
  MarkdownManualQuote,
];

export default function MarkdownManual() {
  return (
    <section id="markdown" className="space-y-4">
      <div className="space-y-1.5">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary/70 to-primary">
          마크다운 작성 메뉴얼
        </h2>
        <p className="text-secondary-foreground mt-2">
          LogHub에서는 마크다운(Markdown) 형식을 사용하여 포스트를 작성할 수 있습니다.
          <br />
          마크다운은 간단한 문법으로 텍스트를 서식화할 수 있는 경량 마크업 언어입니다. 아래는 자주 사용되는 마크다운
          문법에 대한 간단한 가이드입니다.
        </p>
      </div>
      <div className="space-y-4">
        {MARKDOWN_MANUALS.map((ManualComponent, index) => (
          <Fragment key={index}>
            <Separator />
            <ManualComponent />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function MarkdownManualTitle() {
  const markdown = '# 제목1\n## 제목2\n### 제목3\n#### 제목4';

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold">제목</h3>
        <p className="text-secondary-foreground">
          제목을 작성할 때는 <strong>#</strong> 기호를 사용합니다. <strong>#</strong>의 개수에 따라 제목의 수준이
          결정됩니다.
        </p>
      </div>
      <pre className="bg-code overflow-x-auto rounded-md border p-4">
        <code className="text-sm">{markdown}</code>
      </pre>
    </div>
  );
}

function MarkdownManualList() {
  const markdown =
    '- 항목 1\n- 항목 2\n  - 하위 항목 2.1\n  - 하위 항목 2.2\n- 항목 3\n\n1. 첫 번째\n2. 두 번째\n3. 세 번째';

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold">목록</h3>
        <p className="text-secondary-foreground">
          순서 없는 목록은 <strong>-</strong>를 사용하고, 순서 있는 목록은 <strong>숫자.</strong>를 사용합니다.
        </p>
      </div>
      <pre className="bg-code overflow-x-auto rounded-md border p-4">
        <code className="text-sm">{markdown}</code>
      </pre>
    </div>
  );
}

function MarkdownManualAnchor() {
  const markdown = '[링크 설명](https://loghub.me)';

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold">링크</h3>
        <p className="text-secondary-foreground">
          링크를 삽입할 때는 대괄호 <strong>[]</strong> 안에 링크 텍스트를 작성하고, 소괄호 <strong>()</strong> 안에
          URL을 작성합니다.
        </p>
      </div>
      <pre className="bg-code overflow-x-auto rounded-md border p-4">
        <code className="text-sm">{markdown}</code>
      </pre>
    </div>
  );
}

function MarkdownManualImage() {
  const markdown = '![대체 텍스트](https://loghub.me/symbol.png)';

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold">이미지</h3>
        <p className="text-secondary-foreground">
          이미지를 삽입할 때는 느낌표 <strong>!</strong>를 사용하고, 대괄호 <strong>[]</strong> 안에 대체 텍스트(alt)를
          작성합니다.
        </p>
      </div>
      <pre className="bg-code overflow-x-auto rounded-md border p-4">
        <code className="text-sm">{markdown}</code>
      </pre>
      <div className="space-y-2">
        <h5 className="font-semibold">렌더링 결과 예시</h5>
        <div className="markdown-it" dangerouslySetInnerHTML={{ __html: renderer.render(markdown) }}></div>
      </div>
    </div>
  );
}

function MarkdownManualCaptionedImage() {
  const markdown = '![대체 텍스트](https://loghub.me/symbol.png "이미지 제목")';

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold">캡션 이미지</h3>
        <p className="text-secondary-foreground">
          캡션이 있는 이미지를 삽입할 때는 이미지 URL 뒤에 큰따옴표 <strong>&quot;&quot;</strong> 안에 캡션(제목)을
          작성합니다.
          <br />
          캡션을 작성한 이미지는 가운데 정렬됩니다.
        </p>
      </div>
      <pre className="bg-code overflow-x-auto rounded-md border p-4">
        <code className="text-sm">{markdown}</code>
      </pre>
      <div className="space-y-2">
        <h5 className="font-semibold">렌더링 결과 예시</h5>
        <div className="markdown-it" dangerouslySetInnerHTML={{ __html: renderer.render(markdown) }}></div>
      </div>
    </div>
  );
}

function MarkdownManualTable() {
  const markdown = `| 헤더1 | 헤더2 | 헤더3 |
|-----|-----|-----|
| 셀1 | 셀2 | 셀3 |
| 셀4 | 셀5 | 셀6 |`;

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold">테이블</h3>
        <p className="text-secondary-foreground">
          테이블을 작성할 때는 파이프 <strong>|</strong> 기호를 사용하여 열을 구분하고, 하이픈 <strong>-</strong>을
          사용하여 헤더와 본문을 구분합니다.
        </p>
      </div>
      <pre className="bg-code overflow-x-auto rounded-md border p-4">
        <code className="text-sm">{markdown}</code>
      </pre>
      <div className="space-y-2">
        <h5 className="font-semibold">렌더링 결과 예시</h5>
        <div className="markdown-it" dangerouslySetInnerHTML={{ __html: renderer.render(markdown) }}></div>
      </div>
    </div>
  );
}

function MarkdownManualCodeBlock() {
  const markdown = '```ts\nconst greeting = "Hello, LogHub!";\nconsole.log(greeting);\n```';

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold">코드 블록</h3>
        <p className="text-secondary-foreground">
          코드 블록을 작성할 때는 백틱 <strong>```</strong> 기호를 사용하여 코드의 시작과 끝을 표시합니다.
          <br />
          언어를 지정하여 구문 강조를 적용할 수도 있습니다. 지정하지 않을 시, 자동으로 감지합니다.
        </p>
      </div>
      <pre className="bg-code overflow-x-auto rounded-md border p-4">
        <code className="text-sm">{markdown}</code>
      </pre>
      <div className="space-y-2">
        <h5 className="font-semibold">렌더링 결과 예시</h5>
        <div className="markdown-it" dangerouslySetInnerHTML={{ __html: renderer.render(markdown) }} />
      </div>
    </div>
  );
}

function MarkdownManualInlineCode() {
  const markdown = '인라인 코드는 백틱 기호인 를 사용하여 작성합니다. 예: `const x = 10;`';

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold">인라인 코드</h3>
        <p className="text-secondary-foreground">
          인라인 코드는 백틱 <strong>`</strong> 기호를 사용하여 작성합니다.
        </p>
      </div>
      <pre className="bg-code overflow-x-auto rounded-md border p-4">
        <code className="text-sm">{markdown}</code>
      </pre>
      <div className="space-y-2">
        <h5 className="font-semibold">렌더링 결과 예시</h5>
        <div className="markdown-it" dangerouslySetInnerHTML={{ __html: renderer.render(markdown) }} />
      </div>
    </div>
  );
}

function MarkdownManualQuote() {
  const markdown = '> 인용문은 이렇게 작성합니다.\n> 여러 줄에 걸쳐 작성할 수도 있습니다.';

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold">인용문</h3>
        <p className="text-secondary-foreground">
          인용문을 작성할 때는 꺾쇠 <strong>&gt;</strong> 기호를 사용합니다.
        </p>
      </div>
      <pre className="bg-code overflow-x-auto rounded-md border p-4">
        <code className="text-sm">{markdown}</code>
      </pre>
      <div className="space-y-2">
        <h5 className="font-semibold">렌더링 결과 예시</h5>
        <div className="markdown-it" dangerouslySetInnerHTML={{ __html: renderer.render(markdown) }} />
      </div>
    </div>
  );
}
