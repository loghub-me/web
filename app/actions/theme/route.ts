import type { Route } from './+types/route';
import { serializeTheme } from './server';
import { getTheme } from './utils';
import { redirect } from 'react-router';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const theme = getTheme(formData);
  const returnTo = safeRedirect(formData.get('returnTo'));

  if (!theme) {
    throw new Response('Bad Request', { status: 400 });
  }

  return redirect(returnTo, { headers: { 'Set-Cookie': await serializeTheme(theme) } });
}

function safeRedirect(to: FormDataEntryValue | null) {
  if (!to || typeof to !== 'string') {
    return '/';
  }

  if (!to.startsWith('/') || to.startsWith('//')) {
    return '/';
  }

  return to;
}
