// src/data/blogs/blog-1.ts

import { BlogContent } from "@/types/blogContent-types";

const blog1: BlogContent = {
  meta: {
    category: "Industry News",
    title: "How to Choose the Right Rental Car for Your Needs",
    author: {
      name: "Jimmy Dave",
      avatar: "/assets/imgs/blog/blog-grid/avatar2.png",
    },
    date: "15 Sep 2024",
    readTime: "5 mins",
    commentsCount: 38,
  },
  banner: {
    backgroundImage: "/assets/imgs/blog/blog-details/banner-img.png",
    overlayCarImage: "/assets/imgs/blog/blog-details/banner-car.png",
    heading: "Need a Car? Rent now!",
    subheading: "Find the perfect vehicle for your journey today.",
    buttonText: "Get started",
    buttonLink: "#",
  },
  sections: [
    {
      paragraphs: [
        "Choosing the right rental car can make or break your trip, whether it's a weekend getaway, a business trip, or an extended vacation...",
      ],
    },
    {
      heading: "Determine Your Trip Purpose",
      paragraphs: [
        "The first step in choosing the right rental car is to clearly define the purpose of your trip...",
      ],
      images: [
        { src: "/assets/imgs/blog/blog-details/img-1.png", alt: "Carento" },
        { src: "/assets/imgs/blog/blog-details/img-2.png", alt: "Carento" },
      ],
    },
    // more sections...
    {
      heading: "Conclusion",
      paragraphs: [
        "Choosing the right rental car involves more than just picking a vehicle that looks good...",
      ],
    },
  ],
  tags: ["Travel", "Car Rental", "Tips"],
};

export default blog1;
