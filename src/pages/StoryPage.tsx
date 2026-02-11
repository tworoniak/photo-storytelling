import { useParams } from 'react-router-dom';
import { stories } from '../data/stories';

import StoryHero from '../components/story/StoryHero';
import StorySection from '../components/story/StorySection';
import StoryImage from '../components/story/StoryImage';
import StoryBehindShot from '../components/story/StoryBehindShot';
import StoryAudio from '../components/story/StoryAudio';
import MotionReveal from '../components/motion/MotionReveal';
import ReadingProgress from '../components/motion/ReadingProgress';
import StorySplitSticky from '../components/story/StorySplitSticky';

export default function StoryPage() {
  const { slug } = useParams();

  const story = stories.find((s) => s.slug === slug);

  if (!story) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-3xl font-bold">Story not found</h1>
        <p className="mt-3 text-neutral-400">That story slug doesn’t exist.</p>
      </div>
    );
  }

  return (
    <div>
      <ReadingProgress />
      <StoryHero
        title={story.title}
        description={story.description}
        location={story.location}
        date={story.date}
        heroImageId={story.heroImageId}
      />

      <div className="mx-auto max-w-3xl px-6 py-16">
        {story.blocks.map((block, index) => {
          const delay = Math.min(index * 0.04, 0.18);

          if (block.type === 'text') {
            return (
              <MotionReveal key={index} delay={delay} y={12}>
                <StorySection>
                  <p className="text-lg leading-relaxed text-neutral-200">
                    {block.content}
                  </p>
                </StorySection>
              </MotionReveal>
            );
          }

          if (block.type === 'splitSticky') {
            return (
              <MotionReveal key={index} delay={delay}>
                <StorySection>
                  <StorySplitSticky
                    image={block.image}
                    eyebrow={block.eyebrow}
                    title={block.title}
                    paragraphs={block.paragraphs}
                  />
                </StorySection>
              </MotionReveal>
            );
          }

          if (block.type === 'image') {
            return (
              <MotionReveal key={index} delay={delay}>
                <StorySection>
                  <StoryImage
                    publicId={block.publicId}
                    alt={block.alt}
                    caption={block.caption}
                  />
                </StorySection>
              </MotionReveal>
            );
          }

          if (block.type === 'behindShot') {
            return (
              <MotionReveal key={index} delay={delay} y={12}>
                <StorySection>
                  <StoryBehindShot
                    title={block.title}
                    content={block.content}
                    settings={block.settings}
                  />
                </StorySection>
              </MotionReveal>
            );
          }

          if (block.type === 'audio') {
            return (
              <MotionReveal key={index} delay={delay} y={12}>
                <StorySection>
                  <StoryAudio title={block.title} src={block.src} />
                </StorySection>
              </MotionReveal>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
