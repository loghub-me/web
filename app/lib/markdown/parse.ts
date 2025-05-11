import highlightJs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import { linkOpenRule } from '~/lib/markdown/rules/link-open';

const slugify = (text: string) =>
  encodeURIComponent(
    text
      .toLowerCase()
      .replace(/%20/g, '-')
      .replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-z0-9-_]/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '')
  );

const md = MarkdownIt({
  html: false,
  xhtmlOut: false,
  langPrefix: 'language-',
  linkify: true,
  typographer: false,
  highlight: (code, lang) => {
    if (lang && highlightJs.getLanguage(lang)) {
      try {
        return highlightJs.highlight(code, { language: lang }).value;
      } catch (_) {}
    }

    return '';
  },
});
md.use(markdownItAnchor, { slugify });
md.renderer.rules.link_open = linkOpenRule;

const parseMarkdown = (text: string) => md.render(text);

const codeBlockRegex = /```[\s\S]*?```/g;
const parseToc = (text: string): Toc[] =>
  text
    .replace(codeBlockRegex, '')
    .split('\n')
    .filter((line) => line.startsWith('#'))
    .map((line) => ({
      level: line.indexOf('#'),
      title: line.trim().replace(/^#+/, ''),
      slug: slugify(line.trim().replace(/^#+/, '')),
    }));

export { parseMarkdown, parseToc };
