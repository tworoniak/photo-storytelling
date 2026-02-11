import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Outlet />
    </div>
  );
}
