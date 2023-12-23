'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from '../ui/dialog';

import { useSettings } from '@/hooks/use-settings';
import { Label } from '../ui/label';

import { ModeToggle } from '../mode-toggle';
import { useEffect } from 'react';

export const SettingsModal = () => {
  const settings = useSettings();

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === 'x' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        settings.onOpen();
      }
    };

    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
    };
  }, []);

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Jotion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};
