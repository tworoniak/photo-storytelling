import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { stories, type Story } from '../data/stories';
import { cldImage } from '../utils/cloudinary';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function uniqSorted(arr: string[]) {
  return Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function StoryCard({ story, featured }: { story: Story; featured?: boolean }) {
  const cover = cldImage(story.heroImageId, { width: 1800, quality: 'auto' });

  // Motion values (raw)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Smooth springs (so it feels “buttery”)
  const sx = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 180, damping: 18, mass: 0.3 });

  // Tilt in degrees (subtle)
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);

  // Lift + background zoom
  //   const lift = useTransform(sy, [-0.5, 0.5], [1, 1]); // keeps stable; we lift via variants
  const bgScale = useTransform(sx, [-0.5, 0.5], [1.04, 1.08]);

  const isFinePointer =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;

  const onMove: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!isFinePointer) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    // Normalize to -0.5..0.5
    mx.set(px - 0.5);
    my.set(py - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="will-change-transform"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    >
      <Link
        to={`/stories/${story.slug}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative block overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/30"
        style={{
          // perspective belongs on the element *containing* the 3D children
          perspective: 1000,
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <motion.img
            src={cover}
            alt={story.title}
            className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:opacity-85"
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{
              scale: bgScale,
              // tiny “depth” so overlays feel layered
              transform: 'translateZ(-1px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
          <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.55)]" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col justify-end p-6"
          style={{
            // push text slightly forward for depth
            transform: 'translateZ(20px)',
            minHeight: featured ? 460 : 320,
          }}
        >
          {featured && (
            <div className="mb-3 inline-flex w-fit rounded-full border border-neutral-700 bg-neutral-950/70 px-3 py-1 text-xs tracking-[0.22em] text-neutral-200 uppercase backdrop-blur">
              Featured Story
            </div>
          )}

          <div className="text-xs tracking-[0.22em] text-neutral-300/90 uppercase">
            {story.location} • {story.date}
          </div>

          <h3 className="mt-3 text-2xl font-semibold tracking-tight">
            {story.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-200/85">
            {story.description}
          </p>

          {story.tags?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {story.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-neutral-700 bg-neutral-950/50 px-3 py-1 text-xs text-neutral-200"
                  style={{ transform: 'translateZ(14px)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          <div
            className="mt-6 inline-flex w-fit rounded-full border border-neutral-700 bg-neutral-950/60 px-4 py-2 text-sm text-neutral-100 backdrop-blur transition group-hover:bg-neutral-900"
            style={{ transform: 'translateZ(16px)' }}
          >
            Read story →
          </div>
        </motion.div>

        {/* Subtle outer shadow lift on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/0 transition group-hover:ring-white/5" />
      </Link>
    </motion.div>
  );
}

export default function StoriesPage() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState<string>('All');
  const [location, setLocation] = useState<string>('All');
  const [tag, setTag] = useState<string>('All');

  const years = useMemo(
    () => ['All', ...uniqSorted(stories.map((s) => s.date))],
    [],
  );

  const locations = useMemo(
    () => ['All', ...uniqSorted(stories.map((s) => s.location))],
    [],
  );

  const tags = useMemo(() => {
    const all = stories.flatMap((s) => s.tags ?? []);
    return ['All', ...uniqSorted(all)];
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query);

    return stories.filter((s) => {
      if (year !== 'All' && s.date !== year) return false;
      if (location !== 'All' && s.location !== location) return false;
      if (tag !== 'All' && !(s.tags ?? []).includes(tag)) return false;

      if (!q) return true;

      const haystack = normalize(
        [s.title, s.description, s.location, s.date, ...(s.tags ?? [])].join(
          ' ',
        ),
      );

      return haystack.includes(q);
    });
  }, [query, year, location, tag]);

  const featured = useMemo(() => stories.filter((s) => s.featured), []);

  const clear = () => {
    setQuery('');
    setYear('All');
    setLocation('All');
    setTag('All');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="mx-auto max-w-6xl px-6 pt-14 pb-10">
        <p className="text-xs tracking-[0.22em] text-neutral-400 uppercase">
          Photo Stories
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Stories
        </h1>
        <p className="mt-4 max-w-2xl text-neutral-300/90">
          Long-form photo features with motion, atmosphere, and behind-the-shot
          notes.
        </p>

        {/* Controls */}
        <div className="mt-8 grid gap-3 md:grid-cols-12">
          {/* Search */}
          <div className="relative md:col-span-5">
            <Search
              size={18}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, location, tags…"
              className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/40 py-3 pr-10 pl-10 text-sm text-neutral-100 outline-none placeholder:text-neutral-500 focus:border-neutral-600"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-xl p-2 text-neutral-300 hover:bg-neutral-900"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Year */}
          <div className="md:col-span-2">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/40 px-3 py-3 text-sm outline-none focus:border-neutral-600"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="md:col-span-3">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/40 px-3 py-3 text-sm outline-none focus:border-neutral-600"
            >
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Tag */}
          <div className="md:col-span-2">
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/40 px-3 py-3 text-sm outline-none focus:border-neutral-600"
            >
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-12">
            <button
              type="button"
              onClick={clear}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-900"
            >
              Reset filters
            </button>

            <span className="ml-3 text-sm text-neutral-400">
              Showing {filtered.length}{' '}
              {filtered.length === 1 ? 'story' : 'stories'}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-16">
        {featured.length > 0 &&
          year === 'All' &&
          location === 'All' &&
          tag === 'All' &&
          !query && (
            <section className="mb-12">
              <p className="mb-4 text-xs tracking-[0.22em] text-neutral-400 uppercase">
                Featured
              </p>

              <div className="grid gap-6 lg:grid-cols-12">
                {/* Big cover */}
                <div className="lg:col-span-7">
                  <StoryCard story={featured[0]} featured />
                </div>

                {/* Side covers */}
                <div className="grid gap-6 lg:col-span-5">
                  {featured[1] && <StoryCard story={featured[1]} />}
                  {featured[2] && <StoryCard story={featured[2]} />}
                </div>
              </div>
            </section>
          )}

        <section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-950/30 p-8 text-neutral-300">
              No stories match those filters. Try resetting or broadening your
              search.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
