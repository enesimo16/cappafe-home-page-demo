import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BlogPostClient from "@/components/blog/BlogPostClient";
import { getPool } from "@/lib/db";

export const dynamic = "force-dynamic";

interface PostRow {
  title: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
}

async function getPost(slug: string): Promise<PostRow | null> {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT title, content, excerpt, cover_image, created_at FROM blog_posts WHERE slug = ? AND published = TRUE LIMIT 1",
    [slug]
  );
  const list = JSON.parse(JSON.stringify(rows)) as PostRow[];
  return list[0] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Blog" };

  const description = post.excerpt ?? post.content.slice(0, 160);

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${slug}`,
      title: post.title,
      description,
      publishedTime: post.created_at,
      ...(post.cover_image ? { images: [{ url: post.cover_image }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="relative z-[1]">
        <BlogPostClient post={post} />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
