# LogHub - web

![Node.js](https://img.shields.io/badge/node-20-green?style=plastic)
![pnpm](https://img.shields.io/badge/pnpm-10-orange?style=plastic)

![GitHub License](https://img.shields.io/github/license/loghub-me/web?style=plastic&logo=github&color=white)
![GitHub Release](https://img.shields.io/github/release/loghub-me/web?style=plastic&logo=github&color=white)
[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/loghub-me/web/ci.yml?style=plastic&logo=github&label=CI)](https://github.com/loghub-me/web/actions)

#### Repositories

| Repository                                                                                                                                                  | Description                              | Links                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![GitHub Repo](https://img.shields.io/badge/loghub--me-web-f94949?style=plastic&logo=github)](https://github.com/loghub-me/web)                            | 웹 애플리케이션<br/>Next.js + TypeScript | - [소개](https://github.com/loghub-me/web#소개)<br/>- [구조](https://github.com/loghub-me/web#구조)<br/>- [개발](https://github.com/loghub-me/web#개발)<br/>- [기여](https://github.com/loghub-me/web#기여)                                                         |
| [![GitHub Repo](https://img.shields.io/badge/loghub--me-api-6db240?style=plastic&logo=github)](https://github.com/loghub-me/api)                            | API 서버<br/>Spring Boot + Kotlin        | - [소개](https://github.com/loghub-me/api#소개)<br/>- [구조](https://github.com/loghub-me/api#구조)<br/>- [개발](https://github.com/loghub-me/api#개발)<br/>- [기여](https://github.com/loghub-me/api#기여)                                                         |
| [![GitHub Repo](https://img.shields.io/badge/loghub--me-task--api-aab2ff?style=plastic&logo=github)](https://github.com/loghub-me/task-api)                 | 보조 API 서버<br/>Elysia + TypeScript    | - [소개](https://github.com/loghub-me/task-api#소개)<br/>- [구조](https://github.com/loghub-me/task-api#구조)<br/>- [개발](https://github.com/loghub-me/task-api#개발)<br/>- [기여](https://github.com/loghub-me/task-api#기여)                                     |
| [![GitHub Repo](https://img.shields.io/badge/loghub--me-markdown--render-2d79c7?style=plastic&logo=github)](https://github.com/loghub-me/markdown-renderer) | 마크다운 렌더러                          | - [소개](https://github.com/loghub-me/markdown-renderer#소개)<br/>- [구조](https://github.com/loghub-me/markdown-renderer#구조)<br/>- [개발](https://github.com/loghub-me/markdown-renderer#개발)<br/>- [기여](https://github.com/loghub-me/markdown-renderer#기여) |

## 소개

이 레포지토리는 LogHub 웹 애플리케이션의 소스 코드를 포함합니다. Next.js와 TypeScript로 작성되었으며, 일반 사용자가 접근할 수 있는 웹 인터페이스를 제공합니다.

## 구조

- `apis/` : API 호출 관련 함수들을 포함합니다.
- `app/` : Next.js의 앱 라우터 디렉토리로, 페이지와 레이아웃을 포함합니다.
- `components/` : 재사용 가능한 컴포넌트들을 포함합니다.
  - `server/` : 서버 컴포넌트들을 포함합니다.
  - `client/` : 클라이언트 컴포넌트들을 포함합니다
  - `ui/` : UI 관련 컴포넌트들을 포함합니다.
- `constants/` : 애플리케이션 전반에서 사용되는 상수들을 포함합니다.
- `guard/` : 페이지 접근 제어 관련 로직을 포함합니다.
- `hooks/` : 커스텀 React 훅들을 포함합니다.
- `lib/` : 유틸리티 및 헬퍼 함수들을 포함합니다.
- `providers/` : 컨텍스트 프로바이더들을 포함합니다.
- `schemas/` : 유효성 검사 스키마들을 포함합니다.
- `styles/` : 전역 스타일 및 테마 설정을 포함합니다.
- `utils/` : 다양한 유틸리티 함수들을 포함합니다.

## 개발

### 개발 환경

- Node.js v20
- pnpm v10

### 의존성 프로젝트 세팅

> [!IMPORTANT]
> 이 프로젝트는 [loghub-me/api](https://github.com/loghub-me/api)와 [loghub-me/task-api](https://github.com/loghub-me/task-api) 프로젝트에 의존합니다. 해당 프로젝트를 로컬 환경에서 먼저 실행해주세요. 각 프로젝트의 Dockerfile을 활용하여 로컬에서 컨테이너로 실행할 수 있습니다.

```sh
$ git clone git@github.com:loghub-me/api.git
# 참고: https://github.com/loghub-me/api#개발
$ git clone git@github.com:loghub-me/task-api.git
# 참고: https://github.com/loghub-me/task-api#개발
```

### 요구 환경 변수

> [!NOTE]
> `.env` 파일을 생성하여 위 환경 변수를 설정해주세요.

|               변수명               | 설명                  | 예시                           |
| :--------------------------------: | --------------------- | ------------------------------ |
| `WEB_HOST`, `NEXT_PUBLIC_WEB_HOST` | LogHub 웹 서버 주소   | `https://loghub.me`            |
| `API_HOST`, `NEXT_PUBLIC_API_HOST` | LogHub API 서버 주소  | `http://localhost:8080`        |
|     `NEXT_PUBLIC_ASSETS_HOST`      | LogHub 에셋 서버 주소 | `http://localhost:4000`        |
|      `NEXT_PUBLIC_GITHUB_URL`      | GitHub 리포지토리     | `https://github.com/loghub-me` |
|     `NEXT_PUBLIC_DISCORD_URL`      | Discord 초대 링크     | `https://discord.gg/xxxxxx`    |

### 설치 및 실행

```sh
$ pnpm install --frozen-lockfile
$ pnpm dev
```

## 기여

기여는 언제나 환영합니다! 버그 리포트, 기능 제안, PR 등 다양한 방법으로 기여할 수 있습니다. 자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고해주세요.
