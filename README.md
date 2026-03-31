# Lumina

Long-form editorial photography platform. Each story is a curated photo essay with scroll-driven layout, motion, atmosphere, and behind-the-shot notes. Dark-themed, cinematic aesthetic — built for the floor, the pit, and the stage.

---

## Stack

| | |
|---|---|
| React 19 + TypeScript | UI + type safety |
| Vite | Build tooling |
| Tailwind CSS v4 | Styling via `@tailwindcss/vite` plugin |
| Framer Motion v12 | Scroll animations, parallax, entrance reveals |
| React Router v7 | Client-side routing |
| Cloudinary | Image hosting + responsive delivery (no SDK — raw URL helper) |

---

## Features

### Cinematic homepage
Full-viewport hero section using the featured story's cover image. Parallax scroll, gradient overlays, entrance animations, and a transparent-to-solid site header that reacts to scroll position.

### Story reader
Long-form page layout with support for six block types:

| Block | Description |
|---|---|
| `text` | Prose paragraph |
| `image` | Single Cloudinary image with optional caption + lightbox |
| `behindShot` | Callout with title, notes, and camera settings |
| `audio` | Embedded audio player (ambient / backstage moments) |
| `splitSticky` | Sticky image left, scrolling text right |
| `horizontalGallery` | Horizontal-scroll photo gallery with progress dots |

### Navigation & TOC
- Sticky desktop TOC sidebar (xl+ breakpoints) with `IntersectionObserver` active-section tracking
- Floating mobile TOC button
- Reading progress bar

### Stories index (`/stories`)
- Full-bleed image cards with 3D tilt effect (fine-pointer only)
- Featured story slot
- Search + filter by year, location, and tag — all state in URL search params for bookmarkable links
- Tag click-through from story cards

### Performance
- Cloudinary `srcset` on hero images (640 / 1080 / 1800 / 2800w)
- `f_auto` format conversion + `q_auto` quality on all images
- Lightbox image preloading with ref-held `Image` objects to prevent GC
- Debounced resize handlers

### Accessibility
- Full focus trap in lightbox (captures trigger element, constrains Tab, restores focus on close)
- Descriptive `aria-label` on all image trigger buttons
- Labelled filter controls on stories index
- Semantic `<article>` / `<section>` landmark structure in story reader

---

## Project structure

```
src/
  app/
    router.tsx

  pages/
    HomePage.tsx          — cinematic landing page
    StoriesPage.tsx       — filterable story index
    StoryPage.tsx         — full story reader

  components/
    SiteHeader.tsx        — fixed nav, scroll-aware transparency

    story/
      StoryCard.tsx       — image card with 3D tilt (used on home + stories)
      StoryHero.tsx       — parallax hero section
      StorySection.tsx    — text block renderer
      StoryImage.tsx      — single image + lightbox trigger
      StoryBehindShot.tsx — behind-the-shot callout
      StoryAudio.tsx      — embedded audio player
      StorySplitSticky.tsx
      StoryHorizontalGallery.tsx
      StoryTOCDesktop.tsx
      StoryTOCMobile.tsx
      StoryEndcap.tsx

    lightbox/
      LightboxProvider.tsx

    motion/
      MotionReveal.tsx    — whileInView fade+slide reveal
      ReadingProgress.tsx — scroll progress bar

    ScrollToTop.tsx
    ScrollToTopButton.tsx

  data/
    stories.ts            — all story content (acts as the CMS)

  utils/
    cloudinary.ts         — cldImage() + cldSrcSet() URL builders
    readTime.ts           — word-count based read time estimate

  App.tsx
  main.tsx
  index.css
```

---

## Environment

```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

---

## Routes

| Path | Page |
|---|---|
| `/` | Homepage — hero + featured + recent stories |
| `/stories` | Story index with search + filters |
| `/stories/:slug` | Full story reader |
