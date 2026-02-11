import MotionReveal from '../motion/MotionReveal';
import StoryImage from './StoryImage';

type Props = {
  image: {
    publicId: string;
    alt: string;
    caption?: string;
  };
  eyebrow?: string;
  title?: string;
  paragraphs: string[];
};

export default function StorySplitSticky({
  image,
  eyebrow,
  title,
  paragraphs,
}: Props) {
  return (
    <section className="grid gap-10 lg:grid-cols-12 lg:items-start">
      {/* Sticky image column */}
      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-24">
          <MotionReveal y={10}>
            <StoryImage
              publicId={image.publicId}
              alt={image.alt}
              caption={image.caption}
              width={2400}
            />
          </MotionReveal>
        </div>
      </div>

      {/* Text column */}
      <div className="lg:col-span-6">
        <div className="space-y-6">
          {(eyebrow || title) && (
            <div>
              {eyebrow && (
                <p className="text-xs tracking-[0.22em] text-neutral-400 uppercase">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {title}
                </h2>
              )}
            </div>
          )}

          {paragraphs.map((p, idx) => (
            <MotionReveal key={idx} delay={Math.min(idx * 0.05, 0.18)} y={12}>
              <p className="text-lg leading-relaxed text-neutral-200">{p}</p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
