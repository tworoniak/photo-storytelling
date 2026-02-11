type Props = {
  title: string;
  content: string;
  settings?: string;
};

export default function StoryBehindShot({ title, content, settings }: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-3 leading-relaxed text-neutral-200">{content}</p>

      {settings && (
        <p className="mt-4 text-sm text-neutral-400">⚙️ {settings}</p>
      )}
    </div>
  );
}
