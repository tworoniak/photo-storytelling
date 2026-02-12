import { Outlet } from 'react-router-dom';
import ScrollToTopButton from './components/ScrollToTopButton';
import LightboxProvider from './components/lightbox/LightboxProvider';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <LightboxProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <ScrollToTop />
        <Outlet />
        <ScrollToTopButton />
      </div>
    </LightboxProvider>
  );
}
