import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { stories } from '../data/stories';
import StoryCard from '../components/story/StoryCard';

function uniqSorted(arr: string[]) {
  return Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export default function StoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const year = searchParams.get('year') ?? 'All';
  const location = searchParams.get('location') ?? 'All';
  const tag = searchParams.get('tag') ?? 'All';

  const updateParam = useCallback(
    (key: string, value: string, defaultValue = 'All') => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value && value !== defaultValue) next.set(key, value);
        else next.delete(key);
        return next;
      });
    },
    [setSearchParams],
  );

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

  const featuredSlugs = useMemo(
    () => new Set(featured.slice(0, 3).map((s) => s.slug)),
    [featured],
  );

  const clear = () => setSearchParams({});

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
              onChange={(e) => updateParam('q', e.target.value, '')}
              placeholder="Search title, location, tags…"
              aria-label="Search stories"
              className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/40 py-3 pr-10 pl-10 text-sm text-neutral-100 outline-none placeholder:text-neutral-500 focus:border-neutral-600"
            />
            {query && (
              <button
                type="button"
                onClick={() => updateParam('q', '', '')}
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
              onChange={(e) => updateParam('year', e.target.value)}
              aria-label="Filter by year"
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
              onChange={(e) => updateParam('location', e.target.value)}
              aria-label="Filter by location"
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
              onChange={(e) => updateParam('tag', e.target.value)}
              aria-label="Filter by tag"
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
            {filtered
              .filter(
                (s) =>
                  !(
                    featured.length > 0 &&
                    year === 'All' &&
                    location === 'All' &&
                    tag === 'All' &&
                    !query &&
                    featuredSlugs.has(s.slug)
                  ),
              )
              .map((s) => (
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
