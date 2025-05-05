import { FileQuestionIcon, PaperclipIcon } from 'lucide-react';

export const headerNavLinks = [
  { name: '아티클', to: '/search/articles', icon: PaperclipIcon },
  { name: '질문', to: '/search/questions', icon: FileQuestionIcon },
];

export const footerNavLinks = [
  {
    name: 'About',
    links: [
      { name: 'About Us', to: '/about' },
      { name: 'Our Team', to: '/team' },
      { name: 'Careers', to: '/careers' },
    ],
  },
  {
    name: 'Services',
    links: [
      { name: 'Articles', to: '/how-to-use/articles' },
      { name: 'Snippets', to: '/how-to-use/snippets' },
      { name: 'Questions', to: '/how-to-use/questions' },
    ],
  },
  {
    name: 'Legal',
    links: [
      { name: 'Privacy Policy', to: '/privacy' },
      { name: 'Terms of Service', to: '/terms' },
    ],
  },
  {
    name: 'Contact',
    links: [
      // TODO: Implement links
      { name: 'Contact Us', to: '/contact' },
      { name: 'Discord', to: 'https://discord.gg' },
      { name: 'GitHub', to: 'https://github.com' },
      { name: 'X', to: 'https://x.com' },
    ],
  },
];
