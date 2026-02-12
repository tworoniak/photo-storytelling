import { cldImage } from '../../utils/cloudinary';
import { useLightbox } from '../lightbox/lightbox.context';
import type { LightboxImage } from '../lightbox/lightbox.types';

type Props = {
  publicId: string;
  alt: string;
  caption?: string;
  width?: number;
};

export default function StoryImage({
  publicId,
  alt,
  caption,
  width = 2000,
}: Props) {
  const { open } = useLightbox();

  const url = cldImage(publicId, { width, quality: 'auto' });

  const lightboxImage: LightboxImage = {
    publicId,
    alt,
    caption,
  };

  return (
    <figure>
      <button
        type="button"
        onClick={() => open([lightboxImage], 0)}
        className="group block w-full text-left"
        aria-label="Open image"
      >
        <img
          src={url}
          alt={alt}
          className="w-full rounded-2xl border border-neutral-800 object-cover shadow-lg transition group-hover:opacity-95"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </button>

      {caption && (
        <figcaption className="mt-3 text-sm text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
