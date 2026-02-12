# React + TypeScript + Vite

# Interactive Photo Storytelling 📸✨

A scroll-driven, digital magazine-style photo storytelling experience built with **React + TypeScript**, featuring cinematic parallax hero sections, animated chapter reveals, embedded audio moments, and an editorial chapter navigation system.

This project is designed as a premium, portfolio-ready showcase of modern frontend UI engineering — combining performance, layout design, and motion-driven storytelling.

---

## ✨ Features

### 📰 Digital Magazine Layout

A long-form editorial page structure designed for immersive photo stories:

- Full-screen hero cover
- Captioned photography blocks
- “Behind the Shot” callouts
- Sticky image + scrolling text chapter sections

### 🎞 Scroll-Based Animations

Smooth, subtle scroll interactions powered by **Framer Motion**:

- fade-in reveal blocks
- scroll-driven parallax hero motion
- cinematic zoom/overlay transitions

### 📍 Chapter Navigation / Table of Contents

A desktop-friendly sticky TOC system:

- auto-generated chapter links
- smooth scrolling to sections
- active chapter highlighting while scrolling

### 📊 Reading Progress Indicator

A minimal progress bar that tracks story scroll position for an editorial reading experience.

### 🔊 Embedded Audio Blocks

Support for audio “sound postcards” to add atmosphere:

- ambient crowd noise
- backstage moments
- ritual / cinematic sound elements

### ☁️ Cloudinary Image Delivery

All photography is served via Cloudinary for performance and scalability:

- optimized image delivery
- automatic format conversion (`f_auto`)
- quality control (`q_auto` / `auto:best`)
- responsive sizing support

---

## 🧰 Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **TailwindCSS**
- **Framer Motion**
- **React Router DOM**
- **Cloudinary (image hosting + optimization)**

---

## 📂 Project Structure

```txt
src/
  app/
    router.tsx

  pages/
    HomePage.tsx
    StoryPage.tsx

  data/
    stories.ts

  components/
    motion/
      MotionReveal.tsx
      ReadingProgress.tsx

    story/
      StoryHero.tsx
      StorySection.tsx
      StoryImage.tsx
      StoryBehindShot.tsx
      StoryAudio.tsx
      StorySplitSticky.tsx
      StoryTOC.tsx

  utils/
    cloudinary.ts

  App.tsx
  main.tsx
  index.css

```
