import ThemedImage from '@/components/global/themed-image';
import { buildAssetsUrl } from '@/lib/utils';
import { Button } from '@ui/button';
import { ButtonGroup } from '@ui/button-group';
import { ButtonLink } from '@ui/button-link';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@ui/dropdown-menu';
import { Share2Icon } from 'lucide-react';

interface ShareMenuProps {
  shareURLs: {
    href: string;
    icon: string;
  }[];
}

function ShareMenu({ shareURLs }: Readonly<ShareMenuProps>) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={<Button variant={'ghost'} size={'icon'} className="size-10 data-[state=open]:[&_svg]:rotate-90" />}
      >
        <Share2Icon className="transition-transform" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 min-w-auto ring-0 bg-transparent">
        <ButtonGroup orientation={'vertical'}>
          {shareURLs.map(({ href, icon }) => (
            <ButtonLink
              key={icon}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              size="icon"
              variant="outline"
              className="size-10 bg-secondary/50 backdrop-blur-sm"
            >
              <ThemedImage
                src={{
                  light: buildAssetsUrl(`icons/${icon}.svg`),
                  dark: buildAssetsUrl(`icons/${icon}-dark.svg`),
                }}
                alt={icon}
                width={16}
                height={16}
              />
            </ButtonLink>
          ))}
        </ButtonGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ShareMenu };
