import { getPool } from "@/lib/db";
import BlogPreviewClient from "./BlogPreviewClient";

interface PostRow {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
}

async function getRecentPosts(): Promise<PostRow[]> {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT slug, title, excerpt, cover_image, created_at FROM blog_posts WHERE published = TRUE ORDER BY created_at DESC LIMIT 3"
    );
    return JSON.parse(JSON.stringify(rows));
  } catch {
    return [];
  }
}

export default async function BlogPreview() {
  const posts = await getRecentPosts();
  return <BlogPreviewClient posts={posts} />;
}
