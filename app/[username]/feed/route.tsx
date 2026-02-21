import { getUserPosts } from '@/apis/server/user';
import { parseObject } from '@/lib/parse';
import { userDetailSchema } from '@/schemas/user';

export async function GET(request: Request, ctx: RouteContext<'/[username]/feed'>) {
  const { username } = parseObject(await ctx.params, userDetailSchema);
  const posts = await getUserPosts(username);

  return new Response(buildRSS(username, posts), {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
}

function buildRSS(username: string, posts: Awaited<ReturnType<typeof getUserPosts>>) {
  const title = `${username}님의 피드`;
  const description = `${username}님의 최신 게시물 피드입니다.`;
  const link = `${process.env.NEXT_PUBLIC_WEB_HOST}/${username}`;

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    tag('title', title),
    tag('description', description),
    tag('link', link),
    posts.map((post) => buildItem(username, post)).join(''),
    '</channel>',
    '</rss>',
  ].join('');
}

function buildItem(
  username: string,
  post: {
    title: string;
    link: string;
    publishedAt: string | Date;
  }
) {
  return [
    '<item>',
    tag('title', post.title),
    tag('link', post.link),
    tag('guid', post.link, { isPermaLink: 'true' }),
    tag('pubDate', new Date(post.publishedAt).toUTCString()),
    tag('author', username),
    '</item>',
  ].join('');
}

function tag(name: string, value: string, attributes?: Record<string, string>) {
  if (attributes) {
    const attrs = Object.entries(attributes)
      .map(([key, val]) => `${key}="${escapeXML(val)}"`)
      .join(' ');
    return `<${name} ${attrs}>${escapeXML(value)}</${name}>`;
  }
  return `<${name}>${escapeXML(value)}</${name}>`;
}

function escapeXML(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
