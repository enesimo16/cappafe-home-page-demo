"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/hooks/useLanguage";

interface PostRow {
  title: string;
  content: string;
  cover_image: string | null;
  created_at: string;
}

export default function BlogPostClient({ post }: { post: PostRow }) {
  const { t, lang } = useLanguage();

  return (
    <section className="pt-[110px] pb-[clamp(70px,11vw,130px)] sm:pt-[130px] lg:pt-[140px]">
      <div className="mx-auto max-w-[820px] px-5 sm:px-6 lg:px-10">
        <Reveal>
          <Link
            href="/blog"
            className="mb-8 inline-block font-mono text-xs font-bold tracking-[0.1em] text-accent no-underline uppercase"
          >
            {t.blog.back}
          </Link>
        </Reveal>

        <Reveal delay={60}>
          <span className="mb-4.5 block font-mono text-xs tracking-[0.16em] text-soft">
            {new Date(post.created_at).toLocaleDateString(lang)}
          </span>
          <h1 className="mb-10 text-[clamp(1.8rem,4.2vw,3.2rem)] leading-[1.05] font-black tracking-[-0.02em] text-ink uppercase">
            {post.title}
          </h1>
        </Reveal>

        {post.cover_image && (
          <Reveal delay={120}>
            {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary external URLs from the ERP, no domain allowlist to maintain */}
            <img
              src={post.cover_image}
              alt={post.title}
              className="mb-12 h-auto w-full rounded-[22px] object-cover"
            />
          </Reveal>
        )}

        <Reveal delay={post.cover_image ? 180 : 120}>
          <div className="max-w-none text-balance text-[16.5px] leading-[1.85] whitespace-pre-wrap text-ink">
            {post.content}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
