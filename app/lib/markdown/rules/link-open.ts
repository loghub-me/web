import { type RenderRule } from 'markdown-it/lib/renderer.mjs';
import type Token from 'markdown-it/lib/token.mjs';

export const linkOpenRule: RenderRule = (tokens, idx, opts, env, renderer) => {
  const token = tokens[idx];
  safeLinkify(token);
  return renderer.renderToken(tokens, idx, opts);
};

function safeLinkify(token: Token) {
  const href = token.attrGet('href');
  if (href) {
    const safeLink = `/safe-link/${href}`;
    token.attrSet('href', safeLink);
    token.attrSet('target', '_blank');
  }
}
