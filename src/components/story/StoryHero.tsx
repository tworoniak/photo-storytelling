import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cldImage } from '../../utils/cloudinary';

type Props = {
  title: string;
  description: string;
  location: string;
  date: string;
  heroImageId: string;
};

export default function StoryHero({
  title,
  description,
  location,
  date,
  heroImageId,
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

  const heroUrl = cldImage(heroImageId, { width: 2800, quality: 'auto:best' });

  return (
    <section ref={ref} className="relative h-[95vh] min-h-[560px] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.img
          src={heroUrl}
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

            <p className="mt-8 text-sm text-neutral-200/80">Scroll to read ↓</p>
          </motion.div>
        </div>
      </div>

      <div className="h-[45vh]" />
    </section>
  );
}
