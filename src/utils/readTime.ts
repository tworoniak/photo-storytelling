import type { Story } from '../data/stories';

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function readTime(story: Story): number {
  const words = story.blocks.reduce((total, block) => {
    if (block.type === 'text') return total + countWords(block.content);
    if (block.type === 'splitSticky')
      return total + block.paragraphs.reduce((s, p) => s + countWords(p), 0);
    if (block.type === 'behindShot') return total + countWords(block.content);
    return total;
  }, 0);
  return Math.max(1, Math.ceil(words / 200));
}
