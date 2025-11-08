# LogHub - web

![node](https://img.shields.io/badge/node-20+-green?style=plastic)
![pnpm](https://img.shields.io/badge/pnpm-10+-orange?style=plastic)
![GitHub License](https://img.shields.io/github/license/loghub-me/web?style=plastic&logo=github&color=lightgray)
![GitHub Tag](https://img.shields.io/github/tag/loghub-me/web?style=plastic&logo=github&color=lightgray)
[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/loghub-me/web/ci.yml?style=plastic&logo=github&label=CI)](https://github.com/loghub-me/web/actions)

#### Repositories

[![GitHub Repo](https://img.shields.io/badge/GitHub-Web-f94949?style=plastic&logo=github)](https://github.com/loghub-me/web)
[![GitHub Repo](https://img.shields.io/badge/GitHub-API-6db240?style=plastic&logo=github)](https://github.com/loghub-me/api)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Task_API-aab2ff?style=plastic&logo=github)](https://github.com/loghub-me/task-api)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Markdown_Renderer-2d79c7?style=plastic&logo=github)](https://github.com/loghub-me/markdown-renderer)

## 개발 환경 설정

### 개발 환경

- Node.js v20+
- pnpm

### 환경 변수

|               변수명               | 설명                                | 예시                           |
| :--------------------------------: | ----------------------------------- | ------------------------------ |
|             `SITE_URL`             | LogHub 웹 서버 주소(sitemap 생성용) | `https://loghub.me`            |
| `API_HOST`, `NEXT_PUBLIC_API_HOST` | LogHub API 서버 주소                | `http://localhost:8080`        |
|     `NEXT_PUBLIC_ASSETS_HOST`      | LogHub 에셋 서버 주소               | `http://localhost:4000`        |
|      `NEXT_PUBLIC_GITHUB_URL`      | GitHub 리포지토리                   | `https://github.com/loghub-me` |
|     `NEXT_PUBLIC_DISCORD_URL`      | Discord 초대 링크                   | `https://discord.gg/xxxxxx`    |

> `.env` 파일을 생성하여 위 환경 변수를 설정해주세요.

### 의존성 프로젝트

> [!IMPORTANT]
> 이 프로젝트는 [api](https://github.com/loghub-me/api)와 [task-api](https://github.com/loghub-me/task-api) 프로젝트에 의존합니다. 해당 프로젝트를 Docker 또는 로컬 환경에서 먼저 실행해주세요.

`docker-compose.yml`

```yaml
services:
  loghub-me-api:
    container_name: loghub-me-api
    image: ghcr.io/loghub-me/api:x.x.x # 필요한 버전으로 교체
    ports:
      - '8080:8080/tcp'
    env_file: .env.api
  loghub-me-task-api:
    container_name: loghub-me-task-api
    image: ghcr.io/loghub-me/task-api:x.x.x # 필요한 버전으로 교체
    env_file: .env.task-api
  loghub-me-postgres:
    container_name: loghub-me-postgres
    image: ghcr.io/loghub-me/postgres:0.1.0 # from groonga/pgroonga:4.0.4-alpine-18
    shm_size: 128mb
    env_file: .env.postgres
    restart: always
  loghub-me-redis:
    container_name: loghub-me-redis
    image: redis:latest
    restart: always
```

### 설치 및 실행

```bash
$ pnpm install --frozen-lockfile
$ pnpm dev
```
