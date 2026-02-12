import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLightbox } from '../lightbox/lightbox.context';
import type { LightboxImage } from '../lightbox/lightbox.types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cldImage } from '../../utils/cloudinary';

type GalleryImage = {
  publicId: string;
  alt: string;
  caption?: string;
};

type Props = {
  id?: string;
  title?: string;
  subtitle?: string;
  images: GalleryImage[];
};

export default function StoryHorizontalGallery({
  id,
  title,
  subtitle,
  images,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [travel, setTravel] = useState(0);

  const { open } = useLightbox();

  const lightboxImages: LightboxImage[] = useMemo(
    () =>
      images.map((img) => ({
        publicId: img.publicId,
        alt: img.alt,
        caption: img.caption,
      })),
    [images],
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const measure = () => {
      const viewportWidth = section.clientWidth;
      const trackWidth = track.scrollWidth;
      setTravel(Math.max(0, trackWidth - viewportWidth));
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(section);
    ro.observe(track);

    window.addEventListener('load', measure);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('load', measure);
      window.removeEventListener('resize', measure);
    };
  }, [images.length]);

  //   useIsomorphicLayoutEffect(() => {
  //     const section = sectionRef.current;
  //     const track = trackRef.current;
  //     if (!section || !track) return;

  //     const measure = () => {
  //       const viewportWidth = section.clientWidth;
  //       const trackWidth = track.scrollWidth;
  //       setTravel(Math.max(0, trackWidth - viewportWidth));
  //     };

  //     measure();

  //     const ro = new ResizeObserver(measure);
  //     ro.observe(section);
  //     ro.observe(track);

  //     window.addEventListener('load', measure);
  //     window.addEventListener('resize', measure);

  //     return () => {
  //       ro.disconnect();
  //       window.removeEventListener('load', measure);
  //       window.removeEventListener('resize', measure);
  //     };
  //   }, [images.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  const heightPx = useMemo(() => {
    const base = 700;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    return Math.max(base, travel + vh * 0.6);
  }, [travel]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative mb-14 scroll-mt-24"
      style={{ height: heightPx }}
    >
      <div className="sticky top-24">
        {(title || subtitle) && (
          <div className="mx-auto max-w-6xl px-0 pb-6">
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-2 text-sm text-neutral-400">{subtitle}</p>
            )}
          </div>
        )}

        <div className="mx-auto max-w-6xl px-0">
          <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/30">
            <motion.div
              ref={trackRef}
              className="flex gap-4 p-4 will-change-transform"
              style={{ x }}
            >
              {images.map((img, idx) => {
                const url = cldImage(img.publicId, {
                  width: 1600,
                  quality: 'auto',
                });

                return (
                  <figure
                    key={`${img.publicId}-${idx}`}
                    className="relative shrink-0"
                    style={{ width: 700 }}
                  >
                    <button
                      type="button"
                      onClick={() => open(lightboxImages, idx)}
                      className="block w-full cursor-zoom-in text-left focus:ring-2 focus:ring-neutral-500/60 focus:outline-none"
                      aria-label="Open image"
                    >
                      <img
                        src={url}
                        alt={img.alt}
                        className="h-[440px] w-full rounded-xl object-cover transition hover:opacity-95"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </button>

                    {img.caption && (
                      <figcaption className="mt-2 text-xs text-neutral-400">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </motion.div>
          </div>

          <p className="mt-3 text-xs text-neutral-500">
            Tip: keep scrolling — the gallery moves sideways.
          </p>
        </div>
      </div>
    </section>
  );
}
