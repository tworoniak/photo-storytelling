import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cldImage, cldSrcSet } from '../../utils/cloudinary';

type Props = {
  title: string;
  description: string;
  location: string;
  date: string;
  heroImageId: string;
  readTime?: number;
};

export default function StoryHero({
  title,
  description,
  location,
  date,
  heroImageId,
  readTime,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.75, 0.55]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);

  const heroUrl = cldImage(heroImageId, { width: 1800, quality: 'auto:best' });
  const heroSrcSet = cldSrcSet(heroImageId, [640, 1080, 1800, 2800], 'auto:best');

  return (
    <section ref={ref} className="relative h-[95vh] min-h-[560px] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.img
          src={heroUrl}
          srcSet={heroSrcSet}
          sizes="100vw"
          alt={title}
          className="absolute inset-0 h-[110%] w-full object-cover"
          style={{ y, scale }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
          style={{ opacity: overlayOpacity }}
        />

        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.55)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-end px-6 pb-16">
          <motion.div style={{ y: titleY, opacity: titleOpacity }}>
            <p className="text-sm tracking-widest text-neutral-200/90 uppercase">
              {location} • {date}
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-100/90">
              {description}
            </p>

            <div className="mt-8 flex items-center gap-4 text-sm text-neutral-200/80">
              <span>Scroll to read ↓</span>
              {readTime && (
                <>
                  <span className="text-neutral-600">·</span>
                  <span>~{readTime} min read</span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="h-[45vh]" />
    </section>
  );
}
