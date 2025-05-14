

import Layout from "@/components/layout/Layout"
import dynamic from "next/dynamic";
const Blogs = dynamic(()=>import("@/components/blogs/blog"))

export default function BlogGrid() {
 
  return (
    <Layout footerStyle={1}>
      <Blogs/>
    </Layout>
  )
}
