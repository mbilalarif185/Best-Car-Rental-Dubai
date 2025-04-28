// src/types/blogContent-types.ts

export interface BlogMeta {
    category: string;
    title: string;
    author: {
      name: string;
      avatar: string;
    };
    date: string;
    readTime: string;
    commentsCount: number;
  }
  
  export interface BlogSection {
    heading?: string;
    paragraphs: string[];
    images?: { src: string; alt: string }[];
  }
  
  export interface BlogBanner {
    backgroundImage: string;
    overlayCarImage?: string;
    heading: string;
    subheading: string;
    buttonText: string;
    buttonLink: string;
  }
  
  export interface BlogContent {
    meta: BlogMeta;
    banner: BlogBanner;
    sections: BlogSection[];
    tags: string[];
  }
  