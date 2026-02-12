import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cldImage } from '../../utils/cloudinary';

type StoryRef = {
  slug: string;
  title: string;
  description: string;
  heroImageId: string;
};

function StoryEndcapCard({
  story,
  kind,
}: {
  story: StoryRef;
  kind: 'prev' | 'next';
}) {
  const href = `/stories/${story.slug}`;
  const label = kind === 'next' ? 'Read next' : 'Previous story';
  const Icon = kind === 'next' ? ArrowRight : ArrowLeft;

  const bg = cldImage(story.heroImageId, { width: 2200, quality: 'auto' });

  return (
    <Link
      to={href}
      className="group relative block overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/30"
    >
      <div className="absolute inset-0">
        <img
          src={bg}
          alt={story.title}
          className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-70"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.55)]" />
      </div>

      <div className="relative z-10 p-7 md:p-10">
        <div className="flex items-center gap-2 text-xs tracking-[0.22em] text-neutral-300/90 uppercase">
          <span>{label}</span>
          <Icon size={16} className="opacity-90" />
        </div>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
          {story.title}
        </h3>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-200/85 md:text-base">
          {story.description}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/60 px-4 py-2 text-sm text-neutral-100 backdrop-blur transition group-hover:bg-neutral-900">
          Open story <Icon size={16} />
        </div>
      </div>
    </Link>
  );
}

export default function StoryEndcap({
  prev,
  next,
}: {
  prev?: StoryRef;
  next?: StoryRef;
}) {
  if (!prev && !next) return null;

  return (
    <section className="mt-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.22em] text-neutral-400 uppercase">
              Continue reading
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              More stories
            </h2>
          </div>

          <Link
            to="/stories"
            className="hidden rounded-full border border-neutral-800 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-900 md:inline-block"
          >
            Browse all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {prev ? <StoryEndcapCard story={prev} kind="prev" /> : <div />}
          {next ? <StoryEndcapCard story={next} kind="next" /> : <div />}
        </div>

        <div className="mt-6 md:hidden">
          <Link
            to="/stories"
            className="inline-block rounded-full border border-neutral-800 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-900"
          >
            Browse all stories
          </Link>
        </div>
      </div>
    </section>
  );
}
