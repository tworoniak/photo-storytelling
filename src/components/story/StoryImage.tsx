import { cldImage } from '../../utils/cloudinary';

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
  const url = cldImage(publicId, { width, quality: 'auto' });

  return (
    <figure>
      <img
        src={url}
        alt={alt}
        className="w-full rounded-2xl border border-neutral-800 object-cover shadow-lg"
        loading="lazy"
      />

      {caption && (
        <figcaption className="mt-3 text-sm text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
