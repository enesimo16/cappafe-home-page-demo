import type { MetadataRoute } from "next";
import { getPool } from "@/lib/db";

const siteUrl = "https://www.cappafe.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT slug, updated_at FROM blog_posts WHERE published = TRUE ORDER BY created_at DESC"
    );
    const posts = rows as { slug: string; updated_at: string }[];

    return [
      ...staticEntries,
      ...posts.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    // never let a DB hiccup break the sitemap - serve the static pages at least
    return staticEntries;
  }
}
