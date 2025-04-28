// src/data/blogs/allBlogs.ts

import blog1 from "./blog-1";
// Later you can import blog2, blog3, etc.

import { BlogContent } from "@/types/blogContent-types";

const allBlogs: BlogContent[] = [
  blog1,
  // blog2,
  // blog3,
];

export default allBlogs;
