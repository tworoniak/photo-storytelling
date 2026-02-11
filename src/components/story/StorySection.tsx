import type { ReactNode } from 'react';

export default function StorySection({ children }: { children: ReactNode }) {
  return <div className="mb-14">{children}</div>;
}
