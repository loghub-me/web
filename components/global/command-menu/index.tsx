'use client';

import { COMMAND_LINKS } from '@/constants/links';
import { stripJamoFromString } from '@/lib/hangul';
import { Button } from '@ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@ui/command';
import { Kbd, KbdModifier } from '@ui/kbd';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

export default function GlobalCommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button type={'button'} variant={'outline'} className="hidden lg:flex" onClick={() => setOpen(true)}>
        <SearchIcon className="text-muted-foreground" />
        <span className="mr-4 text-muted-foreground">기능을 검색해주세요...</span>
        <Kbd>
          <KbdModifier /> K
        </Kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        showCloseButton={false}
        filter={(value, search) =>
          value.toLowerCase().includes(stripJamoFromString(search).toLowerCase().trim()) ? 1 : 0
        }
      >
        <CommandInput icon={SearchIcon} placeholder="기능을 검색해주세요..." />
        <CommandList className="border-t h-92 max-h-92">
          <CommandEmpty>결과를 찾을 수 없습니다.</CommandEmpty>
          {COMMAND_LINKS.map(({ heading, links }) => (
            <Fragment key={heading}>
              <CommandGroup key={heading} heading={heading}>
                {links.map(({ href, label, icon: Icon }) => (
                  <CommandItem
                    key={href}
                    value={label}
                    onSelect={() => {
                      setOpen(false);
                      router.push(href);
                    }}
                  >
                    <Icon />
                    {label}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
