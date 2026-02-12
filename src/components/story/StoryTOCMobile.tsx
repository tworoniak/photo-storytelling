import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { List, X } from 'lucide-react';
// import type { TocItem } from './StoryTOC';

type TocItem = {
  id: string;
  label: string;
  sublabel?: string;
};

export default function StoryTOCMobile({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);

  if (!items.length) return null;

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/80 px-4 py-3 text-sm font-medium text-neutral-100 shadow-lg backdrop-blur hover:bg-neutral-900 xl:hidden"
      >
        <List size={18} />
        Chapters
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              className="absolute right-0 bottom-0 left-0 rounded-t-3xl border-t border-neutral-800 bg-neutral-950 p-6"
              initial={{ y: 400 }}
              animate={{ y: 0 }}
              exit={{ y: 400 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-neutral-100">
                  Chapters
                </p>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-neutral-700 bg-neutral-950/60 p-2 text-neutral-100 hover:bg-neutral-900"
                  aria-label="Close chapters"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 space-y-2">
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToId(item.id)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/30 px-4 py-3 text-left hover:bg-neutral-900/60"
                  >
                    <div className="text-sm font-medium text-neutral-100">
                      {item.label}
                    </div>

                    {item.sublabel && (
                      <div className="mt-1 text-xs text-neutral-400">
                        {item.sublabel}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <p className="mt-4 text-xs text-neutral-500">
                Tap a chapter to jump.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
