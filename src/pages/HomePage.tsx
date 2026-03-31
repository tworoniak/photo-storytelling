import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { stories } from '../data/stories';
import { cldImage, cldSrcSet } from '../utils/cloudinary';
import StoryCard from '../components/story/StoryCard';
import MotionReveal from '../components/motion/MotionReveal';
import SiteHeader from '../components/SiteHeader';

export default function HomePage() {
  const heroRef = useRef<HTMLElement | null>(null);

  const heroStory = useMemo(
    () => stories.find((s) => s.featured) ?? stories[0],
    [],
  );
  const recentStories = useMemo(
    () => stories.filter((s) => s.slug !== heroStory?.slug).slice(0, 4),
    [heroStory],
  );

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const heroOverlayOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [0.7, 0.55],
  );
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, -18]);

  const locationCount = useMemo(
    () => new Set(stories.map((s) => s.location)).size,
    [],
  );
  const earliestYear = useMemo(
    () => Math.min(...stories.map((s) => parseInt(s.date, 10))),
    [],
  );

  const heroImageUrl = heroStory
    ? cldImage(heroStory.heroImageId, { width: 1800, quality: 'auto:best' })
    : '';
  const heroSrcSet = heroStory
    ? cldSrcSet(heroStory.heroImageId, [640, 1080, 1800, 2800], 'auto:best')
    : '';

  return (
    <>
      <SiteHeader />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[560px] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {heroStory && (
            <>
              <motion.img
                src={heroImageUrl}
                srcSet={heroSrcSet}
                sizes="100vw"
                alt={heroStory.title}
                className="absolute inset-0 h-[110%] w-full object-cover"
                style={{ y: heroImgY, scale: heroImgScale }}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
                style={{ opacity: heroOverlayOpacity }}
              />
              <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.55)]" />

              <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-end px-6 pb-16">
                {/* Entrance animation wraps the scroll-parallax layer */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                >
                  <motion.div style={{ y: heroContentY }}>
                    <p className="text-xs tracking-[0.28em] text-neutral-300/90 uppercase">
                      {heroStory.location} • {heroStory.date}
                    </p>

                    <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
                      Long-form editorial
                      <br />
                      photography.
                    </h1>

                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-100/80">
                      From the floor, the pit, and the stage. Stories told in
                      light, motion, and detail.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                      <Link
                        to={`/stories/${heroStory.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
                      >
                        Read featured story
                      </Link>
                      <Link
                        to="/stories"
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-600 px-6 py-3 text-sm text-neutral-200 transition hover:border-neutral-400 hover:text-white"
                      >
                        Browse all →
                      </Link>
                    </div>

                    <p className="mt-8 text-sm text-neutral-400">
                      Scroll to explore ↓
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </>
          )}
        </div>
        <div className="h-[45vh]" />
      </section>

      {/* ── Identity strip ───────────────────────────────────────── */}
      <MotionReveal>
        <section className="border-t border-b border-neutral-800 py-10">
          <div className="mx-auto flex max-w-5xl flex-col gap-5 px-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl leading-relaxed text-neutral-300">
              Long-form editorial photography from the floor, the pit, and the
              stage. Each story is a curated photo essay with motion, atmosphere,
              and behind-the-shot notes.
            </p>

            <div className="flex shrink-0 gap-4 text-sm text-neutral-400">
              <span>{stories.length} {stories.length === 1 ? 'story' : 'stories'}</span>
              <span className="text-neutral-700">·</span>
              <span>
                {locationCount} {locationCount === 1 ? 'location' : 'locations'}
              </span>
              <span className="text-neutral-700">·</span>
              <span>Since {earliestYear}</span>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* ── Featured + recent grid ───────────────────────────────── */}
      <main className="mx-auto max-w-6xl px-6 py-16">
        {heroStory && (
          <MotionReveal delay={0.05}>
            <section className="mb-14">
              <p className="mb-5 text-xs tracking-[0.22em] text-neutral-400 uppercase">
                Featured
              </p>
              <StoryCard story={heroStory} featured />
            </section>
          </MotionReveal>
        )}

        {recentStories.length > 0 && (
          <section>
            <p className="mb-5 text-xs tracking-[0.22em] text-neutral-400 uppercase">
              Recent Stories
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {recentStories.map((story, i) => (
                <MotionReveal key={story.slug} delay={i * 0.07}>
                  <StoryCard story={story} />
                </MotionReveal>
              ))}
            </div>
          </section>
        )}

        <MotionReveal delay={0.1}>
          <div className="mt-12 text-center">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/40 px-6 py-3 text-sm text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-900"
            >
              Browse all stories →
            </Link>
          </div>
        </MotionReveal>
      </main>
    </>
  );
}
