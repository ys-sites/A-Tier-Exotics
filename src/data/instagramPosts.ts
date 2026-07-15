export type IgPost = {
  id: string;
  type: "image" | "video" | "carousel";
  src: string | string[];
  permalink: string;
  alt: string;
  maxDuration?: number;
};

export const IG_PROFILE_URL = "https://www.instagram.com/atierexotics";

export const instagramPosts: IgPost[] = [
  {
    id: "ig-1",
    type: "video",
    src: "/ig-posts/ig-reel-01.mp4",
    permalink: "https://www.instagram.com/frenchmontana/",
    alt: "A-Tier Exotics reel"
  },
  {
    id: "ig-2",
    type: "carousel",
    src: [
      "/fleet/cullinan-01.webp",
      "/fleet/cullinan-02.webp",
      "/fleet/cullinan-03.webp",
      "/fleet/cullinan-04.webp",
      "/fleet/cullinan-05.webp"
    ],
    permalink: "https://www.instagram.com/p/DYu7ZQciZTK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    alt: "A-Tier Exotics Instagram carousel post"
  },
  {
    id: "ig-4",
    type: "video",
    src: "/ig-posts/ig-reel-03.mp4",
    permalink: "https://www.instagram.com/reel/DZaXbDFuBOJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    alt: "A-Tier Exotics reel",
    maxDuration: 10
  },
  {
    id: "ig-3",
    type: "video",
    src: "/ig-posts/ig-reel-02.mp4",
    permalink: "https://www.instagram.com/frenchmontana/",
    alt: "A-Tier Exotics reel"
  }
];
