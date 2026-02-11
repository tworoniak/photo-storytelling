import { Link } from 'react-router-dom';
import { stories } from '../data/stories';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Photo Stories</h1>
      <p className="mt-3 text-neutral-300">
        Scroll-based storytelling experiments. Digital magazine energy.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {stories.map((story) => (
          <Link
            key={story.slug}
            to={`/stories/${story.slug}`}
            className="group rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 transition hover:border-neutral-600 hover:bg-neutral-900/60"
          >
            <h2 className="text-xl font-semibold group-hover:text-white">
              {story.title}
            </h2>

            <p className="mt-2 text-sm text-neutral-400">
              {story.location} • {story.date}
            </p>

            <p className="mt-4 text-neutral-300">{story.description}</p>

            <p className="mt-6 text-sm font-medium text-neutral-200">
              Read story →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
