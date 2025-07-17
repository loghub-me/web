import { createCookie } from 'react-router';

const cookie = createCookie('theme', {
  maxAge: 34560000,
  sameSite: 'lax',
});

export async function parseTheme(request: Request) {
  const header = request.headers.get('Cookie');
  const vals = await cookie.parse(header);
  return vals ? vals.theme : 'system';
}

export function serializeTheme(theme: Theme) {
  const eatCookie = theme === 'system';
  if (eatCookie) {
    return cookie.serialize({}, { expires: new Date(0), maxAge: 0 });
  } else {
    return cookie.serialize({ theme: theme });
  }
}
