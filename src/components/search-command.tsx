'use client';

import { useUser } from '@clerk/clerk-react';
import {
  CommandDialog,
  Command,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './ui/command';
import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useSearch } from '@/hooks/use-search';
import { useEffect, useState } from 'react';
import { File } from 'lucide-react';

export const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onOpen = useSearch((store) => store.onOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggle();
      }
    };
    document.addEventListener('keydown', down);

    return () => {
      document.removeEventListener('keydown', down);
    };
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  if (!isMounted) return null;

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s Jotion..`} />
      <CommandList>
        <CommandEmpty>No results foudn</CommandEmpty>
        <CommandGroup heading="documents">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
