# Session Log — SEO, Quality & Instagram Feed System Optimizations

## Session Summary
- **Hero Video & Performance Fix**:
  - Re-architected background video in [Hero.tsx](file:///c:/Users/Sharafath/Desktop/Website/A%20Tier%20Exotics/a-tier-exotics/src/components/Hero.tsx) to resolve the source URL synchronously on render (`hero-mobile.mp4` on mobile and `hero.mp4` on desktop) preventing double loading.
  - Replaced manual looping trigger listeners with native `loop` and set `preload="auto"`.
  - Added visibility and touch listeners to play/retry if blocked by iOS Low Power Mode.
  - Overrode WebKit video controls in [index.css](file:///c:/Users/Sharafath/Desktop/Website/A%20Tier%20Exotics/a-tier-exotics/src/index.css) to eliminate iOS play button flashes.
  - Added `preconnect` and `dns-prefetch` link tags in [index.html](file:///c:/Users/Sharafath/Desktop/Website/A%20Tier%20Exotics/a-tier-exotics/index.html) to pre-warm the CDN connections.
- **Instagram Feed System**:
  - Renamed `public/IG POST` to `public/ig-posts` and normalized asset filenames (`ig-01.jpg` to `ig-05.jpg` and `ig-reel-01.mp4`/`ig-reel-02.mp4`).
  - Created [instagramPosts.ts](file:///c:/Users/Sharafath/Desktop/Website/A%20Tier%20Exotics/a-tier-exotics/src/data/instagramPosts.ts) mapping assets, including grouping the 5 images into a single `carousel` type post.
  - Created [InstagramFeed.tsx](file:///c:/Users/Sharafath/Desktop/Website/A%20Tier%20Exotics/a-tier-exotics/src/components/InstagramFeed.tsx) rendering an auto-scrolling Embla carousel with center hover views and bandwidth-friendly video elements.
  - Created an inner carousel slider component for the slide card to scroll through the 5 runway images with overlay navigation buttons (equipped with `stopPropagation` to prevent anchor clicks).
  - Wired `<InstagramFeed />` inside [AboutSection.tsx](file:///c:/Users/Sharafath/Desktop/Website/A%20Tier%20Exotics/a-tier-exotics/src/components/AboutSection.tsx).

## Decisions Made
- **Inner Slider Interaction**: Designed the sub-carousel navigation buttons with `e.stopPropagation()` and `e.preventDefault()` to allow slide navigation inside the card without triggering the anchor tag link redirecting to Instagram.
- **Dynamic Video Mounting**: Configured feed video cards to check `parentInView` before rendering video tags, avoiding concurrent media downloads on page load.

## Verification
- Ran `npm run build` locally. The TypeScript compiler and Vite bundler completed with zero errors.

