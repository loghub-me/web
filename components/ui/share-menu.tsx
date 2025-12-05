import { Button, ButtonLink } from './button';
import { ButtonGroup } from './button-group';
import ThemedImage from '@/components/global/themed-image';
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
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className="size-10 data-[state=open]:[&_svg]:rotate-90">
          <Share2Icon className="transition-transform" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 border-0 bg-transparent shadow-none">
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
                  light: `/icons/${icon}.svg`,
                  dark: `/icons/${icon}-dark.svg`,
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
