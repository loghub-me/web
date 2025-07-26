import { parseHTML } from 'linkedom';

function parseHTMLToc(html: string): Toc[] {
  const items: Toc[] = [];

  const { document } = parseHTML(html);
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1), 10);
    const title = heading.textContent?.trim() || '';
    const slug = heading.getAttribute('id');

    if (!slug) {
      return;
    }

    items.push({ level, title, slug });
  });

  return items;
}

export { parseHTMLToc };
