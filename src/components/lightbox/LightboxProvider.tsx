import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import { cldImage } from '../../utils/cloudinary';
import { LightboxContext } from './lightbox.context';
import type { LightboxApi } from './lightbox.context';
import type { LightboxImage } from './lightbox.types';

type LightboxState = {
  isOpen: boolean;
  index: number;
  images: LightboxImage[];
};

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return (i + len) % len;
}

export default function LightboxProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<LightboxState>({
    isOpen: false,
    index: 0,
    images: [],
  });

  const close = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
    if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
    }
    triggerRef.current = null;
  }, []);

  const open = useCallback((images: LightboxImage[], startIndex = 0) => {
    triggerRef.current = document.activeElement;
    setState({
      isOpen: true,
      images,
      index: clampIndex(startIndex, images.length),
    });
  }, []);

  const next = useCallback(() => {
    setState((s) => ({
      ...s,
      index: clampIndex(s.index + 1, s.images.length),
    }));
  }, []);

  const prev = useCallback(() => {
    setState((s) => ({
      ...s,
      index: clampIndex(s.index - 1, s.images.length),
    }));
  }, []);

  useEffect(() => {
    if (!state.isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [state.isOpen]);

  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!state.isOpen) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key === 'ArrowRight') { next(); return; }
      if (e.key === 'ArrowLeft') { prev(); return; }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => !el.hasAttribute('disabled'));

        if (focusable.length === 0) { e.preventDefault(); return; }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state.isOpen, close, next, prev]);

  const preloadCache = useRef<HTMLImageElement[]>([]);
  const triggerRef = useRef<Element | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!state.isOpen || state.images.length <= 1) return;

    const len = state.images.length;
    const current = state.index;

    const toPreload = [
      clampIndex(current + 1, len),
      clampIndex(current - 1, len),
    ];

    preloadCache.current = toPreload.map((i) => {
      const img = state.images[i];
      const url = cldImage(img.publicId, { width: 2400, quality: 'auto' });
      const pre = new Image();
      pre.src = url;
      return pre;
    });
  }, [state.isOpen, state.index, state.images]);

  const api = useMemo<LightboxApi>(
    () => ({ open, close, next, prev }),
    [open, close, next, prev],
  );

  const active = state.images[state.index];

  return (
    <LightboxContext.Provider value={api}>
      {children}

      <AnimatePresence>
        {state.isOpen && active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <motion.div
              ref={dialogRef}
              className="relative w-full max-w-6xl"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="text-xs text-neutral-200/80">
                  {state.index + 1} / {state.images.length}
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-950/60 p-2 text-neutral-100 hover:bg-neutral-900"
                  aria-label="Close lightbox"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/40">
                <motion.img
                  key={active.publicId}
                  src={cldImage(active.publicId, {
                    width: 3000,
                    quality: 'auto:best',
                  })}
                  alt={active.alt}
                  className="max-h-[75vh] w-full object-contain select-none"
                  draggable={false}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {(active.caption || active.alt) && (
                <div className="mt-3 text-sm text-neutral-200/85">
                  {active.caption ?? active.alt}
                </div>
              )}

              {state.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute top-1/2 left-2 -translate-y-1/2 rounded-2xl border border-neutral-700 bg-neutral-950/60 p-3 text-neutral-100 hover:bg-neutral-900"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded-2xl border border-neutral-700 bg-neutral-950/60 p-3 text-neutral-100 hover:bg-neutral-900"
                    aria-label="Next image"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
