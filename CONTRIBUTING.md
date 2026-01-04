# Contributing

LogHub Web에 기여해 주셔서 감사합니다. 이 문서는 버그 리포트, 기능 제안, 코드 기여를 일관되고 건강하게 진행하기 위한 가이드입니다.

> [!TIP]
> 만약 이 글을 읽고 계신 분이 개발자가 아니거나 GitHub 사용에 익숙하지 않다면, [LogHub 지원](https://loghub.me/support) 페이지를 통해 문의를 남겨 주셔도 좋습니다. :)

## 1. Issue 등록

버그 리포트 및 기능 제안은 [GitHub Issues](https://github.com/loghub-me/web/issues)에 등록해 주세요. 다음과 같은 정보를 포함하면 문제를 더 빠르게 이해하고 해결하는 데 도움이 됩니다:

- **버그 리포트**:
  - 재현 방법
  - 기대 결과 vs 실제 결과
  - 사용 환경 (OS, Node.js 버전 등)
  - 관련 로그 또는 스크린샷
- **기능 제안**:
  - 해결하고자 하는 문제
  - 제안하는 해결 방식

## 2. Pull Request 제출

저장소에 Pull Request(PR)를 제출하기 위한 권장 절차입니다:

1. 저장소를 포크합니다.
2. 새로운 브랜치를 생성합니다.
   - 기능 개발: `feat/<short-description>`
   - 버그 수정: `fix/<short-description>`
   - 리팩토링: `refactor/<short-description>`
   - 문서: `docs/<short-description>`
3. 변경 사항을 커밋합니다. 커밋 메시지는 명확하고 간결하게 작성해 주세요.
4. 포크한 저장소에 브랜치를 푸시합니다.
5. 원본 저장소에 PR을 생성합니다. PR 설명에는 변경 사항에 대한 충분한 정보를 포함해 주세요.

> PR이 검토되고 병합되기 전에 자동화된 테스트를 통과해야 합니다.

## 3. 코드 스타일

이 프로젝트는 포맷팅을 위해 `prettier`를 사용하고 있습니다. PR을 제출하기 전에 코드를 포맷팅하지 않으면, CI에 실패할 수 있습니다. `pnpm prettier --write .` 명령어를 사용하여 코드를 포맷팅할 수 있습니다.
