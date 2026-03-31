import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { type Story } from '../../data/stories';
import { cldImage } from '../../utils/cloudinary';
import { readTime } from '../../utils/readTime';

const isFinePointer =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;

export default function StoryCard({
  story,
  featured,
}: {
  story: Story;
  featured?: boolean;
}) {
  const navigate = useNavigate();
  const cover = cldImage(story.heroImageId, { width: 1400, quality: 'auto' });
  const storyReadTime = useMemo(() => readTime(story), [story]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 180, damping: 18, mass: 0.3 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const bgScale = useTransform(sx, [-0.5, 0.5], [1.04, 1.08]);

  const onMove: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!isFinePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mx.set(px - 0.5);
    my.set(py - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="will-change-transform"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    >
      <Link
        to={`/stories/${story.slug}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative block overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/30"
        style={{ perspective: 1000 }}
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
            style={{ scale: bgScale, transform: 'translateZ(-1px)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
          <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.55)]" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col justify-end p-6"
          style={{
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
            {story.location} • {story.date} • ~{storyReadTime} min
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
                <button
                  key={t}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/stories?tag=${encodeURIComponent(t)}`);
                  }}
                  className="rounded-full border border-neutral-700 bg-neutral-950/50 px-3 py-1 text-xs text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-900"
                  style={{ transform: 'translateZ(14px)' }}
                >
                  {t}
                </button>
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
