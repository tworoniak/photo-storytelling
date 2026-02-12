import type { ReactNode } from 'react';

export default function StorySection({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="mb-14 scroll-mt-24">
      {children}
    </div>
  );
}
