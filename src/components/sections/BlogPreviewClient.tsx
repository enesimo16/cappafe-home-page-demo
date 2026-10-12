"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/hooks/useLanguage";

interface PostRow {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
}

export default function BlogPreviewClient({ posts }: { posts: PostRow[] }) {
  const { t, lang } = useLanguage();

  if (posts.length === 0) return null;

  return (
    <section id="blog" aria-label={t.blog.kicker} className="py-[clamp(70px,11vw,130px)]">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal className="mb-4.5 font-mono text-xs tracking-[0.22em] text-accent">{t.blog.kicker}</Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-black tracking-[-0.02em] text-ink uppercase">
                {t.blog.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Link
              href="/blog"
              className="rounded-full border border-line bg-bg2 px-6 py-2.5 text-[13px] font-semibold text-ink no-underline transition-[border-color,transform] duration-[250ms] hover:-translate-y-[3px] hover:border-accent"
            >
              {t.blog.title} →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={100 + i * 60}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-[20px] border border-line2 bg-bg2 no-underline transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_20px_44px_rgba(20,21,23,0.1)]"
              >
                <div className="relative h-[210px] overflow-hidden bg-[repeating-linear-gradient(-45deg,var(--stripe-a)_0px,var(--stripe-a)_10px,var(--stripe-b)_10px,var(--stripe-b)_20px)]">
                  {post.cover_image && (
                    // eslint-disable-next-line @next/next/no-img-element -- arbitrary external URLs from the ERP, no domain allowlist to maintain
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-7">
                  <span className="mb-3 block font-mono text-[11px] tracking-[0.16em] text-soft">
                    {new Date(post.created_at).toLocaleDateString(lang)}
                  </span>
                  <h3 className="mb-2.5 text-xl leading-[1.25] font-extrabold text-ink">{post.title}</h3>
                  {post.excerpt && <p className="text-[13.5px] leading-[1.6] text-muted">{post.excerpt}</p>}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
