type Props = {
  title: string;
  src: string;
};

export default function StoryAudio({ title, src }: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
      <p className="text-sm font-semibold text-neutral-200">{title}</p>

      <audio controls className="mt-4 w-full">
        <source src={src} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
