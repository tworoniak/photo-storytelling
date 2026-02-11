export type Story = {
  slug: string;
  title: string;
  description: string;
  location: string;
  date: string;
  heroImageId: string; // ✅ Cloudinary publicId
  blocks: StoryBlock[];
};

export type StoryBlock =
  | { type: 'text'; content: string }
  | { type: 'image'; publicId: string; alt: string; caption?: string }
  | { type: 'behindShot'; title: string; content: string; settings?: string }
  | { type: 'audio'; title: string; src: string }
  | {
      type: 'splitSticky';
      image: { publicId: string; alt: string; caption?: string };
      eyebrow?: string;
      title?: string;
      paragraphs: string[];
    };

export const stories: Story[] = [
  {
    slug: 'heilung-red-rocks-2024',
    title: 'Ritual at Red Rocks - Heilung',
    description:
      'Smoke, drumhead light, and antlers against the night — Maria Franz and Heilung turn Red Rocks into a living ceremony.',
    location: 'Red Rocks Amphitheatre — Morrison, CO',
    date: '2024',
    heroImageId: '_TPW5805-DxO_DeepPRIME_XD2s_swr4ok',
    blocks: [
      {
        type: 'text',
        content:
          'There are shows that feel like performances — and shows that feel like thresholds. Heilung at Red Rocks was the latter: a space where the crowd quieted into witness, and the stage became altar.',
      },
      {
        type: 'image',
        publicId: '_TPW5805-DxO_DeepPRIME_XD2s_swr4ok',
        alt: 'Maria Franz of Heilung performing with antlers and drum at Red Rocks Amphitheatre',
        caption:
          'Maria Franz framed in smoke and backlight — antlers like a silhouette of myth against the night.',
      },
      {
        type: 'behindShot',
        title: 'Behind the shot',
        content:
          'This moment hits fast: the drum comes up, the backlight blooms, and the costume turns into geometry. I shot for shape first — letting the smoke simplify the scene — and waited for the drumhead to catch the light like a small, burning moon.',
        settings: '24-70mm • f/4.0 • 1/200 • ISO 6400',
      },
      {
        type: 'splitSticky',
        eyebrow: 'Chapter I',
        title: 'Ceremony, not spectacle',
        image: {
          publicId: '_TPW5805-DxO_DeepPRIME_XD2s_swr4ok',
          alt: 'Maria Franz with drum and ceremonial costume',
          caption:
            'Hard edges (antlers, drum circle) against soft haze — the whole frame reads like ritual iconography.',
        },
        paragraphs: [
          'Red Rocks is already a cathedral — stone, wind, and a sky that feels close enough to touch. Heilung understands that kind of room.',
          'The sound isn’t just loud; it’s physical. You feel it in your ribs before you can name it.',
          'When the smoke rolls in and the light drops, the costumes stop being wardrobe and become symbol.',
        ],
      },
      {
        type: 'text',
        content:
          'Photographing Heilung is a balancing act: the instinct is to chase detail — beads, fringe, paint — but the stronger choice is often silhouette. Let the light tell the truth first.',
      },
    ],
  },
];
