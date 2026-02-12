export type Story = {
  slug: string;
  title: string;
  description: string;
  location: string;
  date: string;
  heroImageId: string;
  tags?: string[]; // ✅ new
  featured?: boolean; // ✅ new
  blocks: StoryBlock[];
};

export type StoryBlock =
  | { type: 'text'; content: string }
  | { type: 'image'; publicId: string; alt: string; caption?: string }
  | {
      type: 'behindShot';
      id?: string;
      title: string;
      content: string;
      settings?: string;
    }
  | { type: 'audio'; title: string; src: string; subtitle?: string }
  | {
      type: 'splitSticky';
      id?: string;
      image: { publicId: string; alt: string; caption?: string };
      eyebrow?: string;
      title?: string;
      paragraphs: string[];
    }
  | {
      type: 'horizontalGallery';
      id?: string;
      title?: string;
      subtitle?: string;
      images: { publicId: string; alt: string; caption?: string }[];
    };

export const stories: Story[] = [
  // Story 001
  {
    slug: 'heilung-red-rocks-2024',
    title: 'Ritual at Red Rocks - Heilung',
    description:
      'Smoke, drumhead light, and antlers against the night — Maria Franz and Heilung turn Red Rocks into a living ceremony.',
    location: 'Red Rocks Amphitheatre — Morrison, CO',
    date: '2024',
    heroImageId: '_TPW5805-DxO_DeepPRIME_XD2s_swr4ok',
    featured: true,
    tags: ['Concert', 'Editorial', 'Ritual', 'Red Rocks', 'Heilung'],

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
        id: 'behind-the-shot',
        title: 'Behind the shot',
        content:
          'This moment hits fast: the drum comes up, the backlight blooms, and the costume turns into geometry. I shot for shape first — letting the smoke simplify the scene — and waited for the drumhead to catch the light like a small, burning moon.',
        settings: '24-70mm • f/4.0 • 1/200 • ISO 6400',
      },
      {
        type: 'horizontalGallery',
        id: 'gallery-ritual-details',
        title: 'Details & Atmosphere',
        subtitle:
          'Textures, smoke, light, and symbols — the stuff the crowd feels before they can name it.',
        images: [
          {
            publicId: '_TPW5810-DxO_DeepPRIME_XD2s_oz6f7n',
            alt: 'Maria Franz of Heilung at Red Rocks',
            caption: 'Smoke and backlight turning costume into silhouette.',
          },
          {
            publicId: '_TPW5756-DxO_DeepPRIME_XD2s_tw9c2y',
            alt: 'Maria Franz of Heilung at Red Rocks',
            caption: 'Smoke and backlight turning costume into silhouette.',
          },
          {
            publicId: '_TPW5797-DxO_DeepPRIME_3_smxqxp',
            alt: 'Maria Franz of Heilung at Red Rocks',
            caption: 'Smoke and backlight turning costume into silhouette.',
          },
          {
            publicId: '_TPW5804-DxO_DeepPRIME_3_hfttd3',
            alt: 'Maria Franz of Heilung at Red Rocks',
            caption: 'Smoke and backlight turning costume into silhouette.',
          },
          // Add more Cloudinary publicIds here
          // { publicId: '...', alt: '...', caption: '...' },
        ],
      },
      {
        type: 'splitSticky',
        id: 'chapter-ceremony',
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
      {
        type: 'audio',
        title: 'Audio',
        src: '/audio/majestic-sonata.mp3',
        subtitle: 'Recorded at Red Rocks (2024)',
      },
    ],
  },
  // Story 002
  {
    slug: 'heilung-test',
    title: 'Ritual at Red Rocks - Heilung',
    description:
      'Smoke, drumhead light, and antlers against the night — Maria Franz and Heilung turn Red Rocks into a living ceremony.',
    location: 'Red Rocks Amphitheatre — Morrison, CO',
    date: '2024',
    heroImageId: '_TPW5805-DxO_DeepPRIME_XD2s_swr4ok',
    featured: true,
    tags: ['Concert', 'Editorial', 'Ritual', 'Red Rocks', 'Heilung'],
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
        id: 'behind-the-shot',
        title: 'Behind the shot',
        content:
          'This moment hits fast: the drum comes up, the backlight blooms, and the costume turns into geometry. I shot for shape first — letting the smoke simplify the scene — and waited for the drumhead to catch the light like a small, burning moon.',
        settings: '24-70mm • f/4.0 • 1/200 • ISO 6400',
      },
      {
        type: 'horizontalGallery',
        id: 'gallery-ritual-details',
        title: 'Details & Atmosphere',
        subtitle:
          'Textures, smoke, light, and symbols — the stuff the crowd feels before they can name it.',
        images: [
          {
            publicId: '_TPW5810-DxO_DeepPRIME_XD2s_oz6f7n',
            alt: 'Maria Franz of Heilung at Red Rocks',
            caption: 'Smoke and backlight turning costume into silhouette.',
          },
          {
            publicId: '_TPW5756-DxO_DeepPRIME_XD2s_tw9c2y',
            alt: 'Maria Franz of Heilung at Red Rocks',
            caption: 'Smoke and backlight turning costume into silhouette.',
          },
          {
            publicId: '_TPW5797-DxO_DeepPRIME_3_smxqxp',
            alt: 'Maria Franz of Heilung at Red Rocks',
            caption: 'Smoke and backlight turning costume into silhouette.',
          },
          {
            publicId: '_TPW5804-DxO_DeepPRIME_3_hfttd3',
            alt: 'Maria Franz of Heilung at Red Rocks',
            caption: 'Smoke and backlight turning costume into silhouette.',
          },
          // Add more Cloudinary publicIds here
          // { publicId: '...', alt: '...', caption: '...' },
        ],
      },
      {
        type: 'text',
        content:
          'There are shows that feel like performances — and shows that feel like thresholds. Heilung at Red Rocks was the latter: a space where the crowd quieted into witness, and the stage became altar.',
      },
      {
        type: 'splitSticky',
        id: 'chapter-ceremony',
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
      {
        type: 'audio',
        title: 'Audio',
        src: '/audio/majestic-sonata.mp3',
        subtitle: 'Recorded at Red Rocks (2024)',
      },
    ],
  },
  // Story 003
  // {
  //   slug: 'heilung-test2',
  //   title: 'Ritual at Red Rocks - Heilung',
  //   description:
  //     'Smoke, drumhead light, and antlers against the night — Maria Franz and Heilung turn Red Rocks into a living ceremony.',
  //   location: 'Red Rocks Amphitheatre — Morrison, CO',
  //   date: '2024',
  //   heroImageId: '_TPW5805-DxO_DeepPRIME_XD2s_swr4ok',
  //   featured: true,
  //   tags: ['Concert', 'Editorial', 'Ritual', 'Red Rocks', 'Heilung'],
  //   blocks: [
  //     {
  //       type: 'text',
  //       content:
  //         'There are shows that feel like performances — and shows that feel like thresholds. Heilung at Red Rocks was the latter: a space where the crowd quieted into witness, and the stage became altar.',
  //     },
  //     {
  //       type: 'image',
  //       publicId: '_TPW5805-DxO_DeepPRIME_XD2s_swr4ok',
  //       alt: 'Maria Franz of Heilung performing with antlers and drum at Red Rocks Amphitheatre',
  //       caption:
  //         'Maria Franz framed in smoke and backlight — antlers like a silhouette of myth against the night.',
  //     },
  //     {
  //       type: 'behindShot',
  //       id: 'behind-the-shot',
  //       title: 'Behind the shot',
  //       content:
  //         'This moment hits fast: the drum comes up, the backlight blooms, and the costume turns into geometry. I shot for shape first — letting the smoke simplify the scene — and waited for the drumhead to catch the light like a small, burning moon.',
  //       settings: '24-70mm • f/4.0 • 1/200 • ISO 6400',
  //     },
  //     {
  //       type: 'horizontalGallery',
  //       id: 'gallery-ritual-details',
  //       title: 'Details & Atmosphere',
  //       subtitle:
  //         'Textures, smoke, light, and symbols — the stuff the crowd feels before they can name it.',
  //       images: [
  //         {
  //           publicId: '_TPW5810-DxO_DeepPRIME_XD2s_oz6f7n',
  //           alt: 'Maria Franz of Heilung at Red Rocks',
  //           caption: 'Smoke and backlight turning costume into silhouette.',
  //         },
  //         {
  //           publicId: '_TPW5756-DxO_DeepPRIME_XD2s_tw9c2y',
  //           alt: 'Maria Franz of Heilung at Red Rocks',
  //           caption: 'Smoke and backlight turning costume into silhouette.',
  //         },
  //         {
  //           publicId: '_TPW5797-DxO_DeepPRIME_3_smxqxp',
  //           alt: 'Maria Franz of Heilung at Red Rocks',
  //           caption: 'Smoke and backlight turning costume into silhouette.',
  //         },
  //         {
  //           publicId: '_TPW5804-DxO_DeepPRIME_3_hfttd3',
  //           alt: 'Maria Franz of Heilung at Red Rocks',
  //           caption: 'Smoke and backlight turning costume into silhouette.',
  //         },
  //         // Add more Cloudinary publicIds here
  //         // { publicId: '...', alt: '...', caption: '...' },
  //       ],
  //     },
  //     {
  //       type: 'text',
  //       content:
  //         'There are shows that feel like performances — and shows that feel like thresholds. Heilung at Red Rocks was the latter: a space where the crowd quieted into witness, and the stage became altar.',
  //     },
  //     {
  //       type: 'splitSticky',
  //       id: 'chapter-ceremony',
  //       eyebrow: 'Chapter I',
  //       title: 'Ceremony, not spectacle',
  //       image: {
  //         publicId: '_TPW5805-DxO_DeepPRIME_XD2s_swr4ok',
  //         alt: 'Maria Franz with drum and ceremonial costume',
  //         caption:
  //           'Hard edges (antlers, drum circle) against soft haze — the whole frame reads like ritual iconography.',
  //       },
  //       paragraphs: [
  //         'Red Rocks is already a cathedral — stone, wind, and a sky that feels close enough to touch. Heilung understands that kind of room.',
  //         'The sound isn’t just loud; it’s physical. You feel it in your ribs before you can name it.',
  //         'When the smoke rolls in and the light drops, the costumes stop being wardrobe and become symbol.',
  //       ],
  //     },
  //     {
  //       type: 'text',
  //       content:
  //         'Photographing Heilung is a balancing act: the instinct is to chase detail — beads, fringe, paint — but the stronger choice is often silhouette. Let the light tell the truth first.',
  //     },
  //     {
  //       type: 'audio',
  //       title: 'Audio',
  //       src: '/audio/majestic-sonata.mp3',
  //       subtitle: 'Recorded at Red Rocks (2024)',
  //     },
  //   ],
  // },
];
