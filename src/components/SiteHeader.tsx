import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-neutral-800/60 bg-neutral-950/95 backdrop-blur'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-sm font-semibold tracking-[0.18em] text-white uppercase"
        >
          Photo Stories
        </Link>

        <nav>
          <NavLink
            to="/stories"
            className="text-sm text-neutral-300 transition hover:text-white"
          >
            Stories
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
