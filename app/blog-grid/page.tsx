

import Layout from "@/components/layout/Layout"
import dynamic from "next/dynamic";
const Blogs = dynamic(()=>import("@/components/blogs/blog"))

const Blog_Card=dynamic(()=>import ("@/components/blogs/blogs_card")) 
export default function BlogGrid() {
 
  return (
    <Layout footerStyle={1}>
      <Blogs/>
      <Blog_Card/>
    </Layout>
  )
}
