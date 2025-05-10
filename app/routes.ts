import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  layout('routes/auth/layout.tsx', [
    route('join', 'routes/auth/join/request.tsx'),
    route('join/confirm', 'routes/auth/join/confirm.tsx'),
    route('login', 'routes/auth/login/request.tsx'),
    route('login/confirm', 'routes/auth/login/confirm.tsx'),
  ]),
  ...prefix('search', [layout('routes/search/layout.tsx', [route('articles', 'routes/search/articles.tsx')])]),
] satisfies RouteConfig;
