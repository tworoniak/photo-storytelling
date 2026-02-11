import { Outlet } from 'react-router-dom';
import ScrollToTopButton from './components/ScrollToTopButton';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Outlet />
      <ScrollToTopButton />
    </div>
  );
}
