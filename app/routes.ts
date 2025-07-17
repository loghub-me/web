import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home/index.tsx'),
  layout('routes/auth/layout.tsx', [
    route('join', 'routes/auth/join/request.tsx'),
    route('join/confirm', 'routes/auth/join/confirm.tsx'),
    route('login', 'routes/auth/login/request.tsx'),
    route('login/confirm', 'routes/auth/login/confirm.tsx'),
  ]),
  ...prefix('search', [
    route('articles', 'routes/search/articles.tsx'),
    route('series', 'routes/search/series.tsx'),
    route('questions', 'routes/search/questions.tsx'),
  ]),
  ...prefix('post', [
    layout('routes/post/layout.tsx', [
      index('routes/post/index.tsx'),
      route('articles', 'routes/post/articles.tsx'),
      route('series', 'routes/post/series.tsx'),
      route('questions', 'routes/post/questions.tsx'),
    ]),
  ]),
  ...prefix(':username', [
    layout('routes/users/layout.tsx', [
      index('routes/users/index.tsx'),
      route('articles', 'routes/users/articles.tsx'),
      route('series', 'routes/users/series.tsx'),
      route('questions', 'routes/users/questions.tsx'),
      route('stars', 'routes/users/stars.tsx'),
    ]),

    route('articles/:slug', 'routes/users/articles/detail.tsx'),
    route('articles/:slug/edit', 'routes/users/articles/edit.tsx'),

    layout('routes/users/series/layout.tsx', [
      route('series/:slug', 'routes/users/series/detail.tsx'),
      route('series/:slug/:sequence', 'routes/users/series/chapters/detail.tsx'),
    ]),
    route('series/:slug/edit', 'routes/users/series/edit.tsx'),
    route('series/:slug/:sequence/edit', 'routes/users/series/chapters/edit.tsx'),

    route('questions/:slug', 'routes/users/questions/detail.tsx'),
    route('questions/:slug/edit', 'routes/users/questions/edit.tsx'),
  ]),
  ...prefix('settings', [
    layout('routes/settings/layout.tsx', [
      index('routes/settings/index.tsx'),
      route('account', 'routes/settings/account.tsx'),
      route('profile', 'routes/settings/profile.tsx'),
      route('privacy', 'routes/settings/privacy.tsx'),
      route('theme', 'routes/settings/theme.tsx'),
    ]),
  ]),

  route('/theme', 'actions/theme/route.ts'),
] satisfies RouteConfig;
