import { createContext, useContext } from 'react';
import type { LightboxImage } from './lightbox.types';

export type LightboxApi = {
  open: (images: LightboxImage[], startIndex?: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
};

export const LightboxContext = createContext<LightboxApi | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider');
  return ctx;
}
