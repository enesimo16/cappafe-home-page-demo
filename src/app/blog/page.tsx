import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BlogListClient from "@/components/blog/BlogListClient";
import { getPool } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Cappafe'den güncel haberler, üretim ve otomotiv aksesuar sektörüne dair yazılar.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Blog — Cappafe",
    description:
      "Cappafe'den güncel haberler, üretim ve otomotiv aksesuar sektörüne dair yazılar.",
  },
};

interface PostRow {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
}

async function getPosts(): Promise<PostRow[]> {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT slug, title, excerpt, cover_image, created_at FROM blog_posts WHERE published = TRUE ORDER BY created_at DESC"
  );
  return JSON.parse(JSON.stringify(rows));
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main className="relative z-[1]">
        <BlogListClient posts={posts} />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
