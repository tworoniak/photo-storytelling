import { useEffect, useState } from 'react';

type TocItem = {
  id: string;
  label: string;
  sublabel?: string;
};

export default function StoryTOCDesktop({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0 },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav aria-label="Table of contents" className="hidden xl:block">
      <div className="sticky top-24 w-48">
        <p className="mb-4 text-xs tracking-[0.18em] text-neutral-500 uppercase">
          Contents
        </p>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollToId(item.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                  activeId === item.id
                    ? 'bg-neutral-900 text-neutral-100'
                    : 'text-neutral-500 hover:bg-neutral-900/50 hover:text-neutral-300'
                }`}
              >
                {item.sublabel && (
                  <div className="mb-0.5 text-xs text-neutral-600">
                    {item.sublabel}
                  </div>
                )}
                <div className={activeId === item.id ? 'font-medium' : ''}>
                  {item.label}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
