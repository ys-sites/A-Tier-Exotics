export type IgPost = {
  id: string;
  type: "image" | "video" | "carousel";
  src: string | string[];
  permalink: string;
  alt: string;
};

export const IG_PROFILE_URL = "https://www.instagram.com/atierexotics";

export const instagramPosts: IgPost[] = [
  {
    id: "ig-1",
    type: "video",
    src: "/ig-posts/ig-reel-01.mp4",
    permalink: IG_PROFILE_URL,
    alt: "A-Tier Exotics reel"
  },
  {
    id: "ig-2",
    type: "carousel",
    src: [
      "/ig-posts/ig-01.jpg",
      "/ig-posts/ig-02.jpg",
      "/ig-posts/ig-03.jpg",
      "/ig-posts/ig-04.jpg",
      "/ig-posts/ig-05.jpg"
    ],
    permalink: "https://www.instagram.com/p/DYu7ZQciZTK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    alt: "A-Tier Exotics Instagram carousel post"
  },
  {
    id: "ig-3",
    type: "video",
    src: "/ig-posts/ig-reel-02.mp4",
    permalink: IG_PROFILE_URL,
    alt: "A-Tier Exotics reel"
  }
];
