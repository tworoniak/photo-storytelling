import { useScrollPosition } from '../hooks/useScrollPosition';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton: React.FC = () => {
  const isVisible = useScrollPosition(300);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top hover:bg-graphite hover:border-text right-5 bottom-5 z-20 border border-neutral-700 bg-neutral-950/80 transition ${isVisible ? 'show' : ''}`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
