"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Marquee from "@/components/ui/Marquee";
import { SOCIALS } from "@/components/ui/SocialIcons";
import { useLanguage } from "@/hooks/useLanguage";
import { trackEvent } from "@/lib/track";
import { NAV_IDS, COMPANY_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/constants";

/** Two slightly-tilted overlapping ticker bands (dark + red). */
function BandTicker() {
  const { t } = useLanguage();

  return (
    <div className="relative h-32 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-x-[-4%] top-1/2 -translate-y-1/2 rotate-[-1.8deg] bg-panel py-3 shadow-[0_10px_30px_rgba(20,21,23,0.25)]">
        <Marquee durationSec={34} reverse>
          <span className="flex items-center gap-8 pr-8 font-mono text-xs tracking-[0.18em] whitespace-nowrap text-[#FBFAF8]/55">
            {t.hero.ticker.map((item) => (
              <span key={item} className="flex items-center gap-8">
                {item}
                <span className="text-accent-light/70">◆</span>
              </span>
            ))}
          </span>
        </Marquee>
      </div>
      <div className="absolute inset-x-[-4%] top-1/2 -translate-y-1/2 rotate-[1.1deg] bg-accent py-3.5 shadow-[0_14px_34px_rgba(210,35,42,0.4)]">
        <Marquee durationSec={24} pauseOnHover>
          <span className="flex items-center gap-8 pr-8 font-mono text-[13px] tracking-[0.18em] whitespace-nowrap text-white">
            {t.ticker.map((item) => (
              <span key={item} className="flex items-center gap-8">
                {item}
                <span className="opacity-60">✦</span>
              </span>
            ))}
          </span>
        </Marquee>
      </div>
    </div>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const anchorHref = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);

  const navLabels: Record<string, string> = {
    top: t.nav.home,
    urunler: t.nav.products,
    akis: t.nav.about,
    grup: t.nav.group,
    ortaklik: t.nav.partner,
    iletisim: t.nav.contact,
  };

  return (
    <>
      <BandTicker />

      <footer id="footer" aria-label={t.footer.menu} className="border-t border-hair bg-bg py-20 pb-10">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
          <div className="mb-14 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            <div className="col-span-2 sm:col-span-1">
              <div className="mb-4.5 inline-flex items-center">
                <Image
                  src="/logo-new.png"
                  alt="Cappafe"
                  width={450}
                  height={64}
                  className="logo-theme-invert h-[15px] w-auto sm:h-[17px]"
                />
              </div>
              <p className="mb-5 max-w-[280px] text-balance text-sm leading-[1.7] text-muted">
                {t.footer.about}
              </p>
              <div className="flex gap-2.5">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    title={label}
                    onClick={() => trackEvent("social_click", { platform: label, location: "footer" })}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg2 text-ink transition-[background,color,border-color,transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:border-accent hover:bg-accent hover:text-white hover:shadow-[0_10px_24px_rgba(210,35,42,0.35)]"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4.5 font-mono text-[11px] tracking-[0.18em] text-soft">
                {t.footer.menu}
              </div>
              <div className="flex flex-col gap-3">
                {NAV_IDS.map((link) => (
                  <Link
                    key={link.id}
                    href={anchorHref(link.id)}
                    onClick={() => trackEvent("nav_click", { section: link.id, location: "footer" })}
                    className="text-sm font-medium text-ink no-underline hover:text-accent"
                  >
                    {navLabels[link.id]}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4.5 font-mono text-[11px] tracking-[0.18em] text-soft">
                {t.footer.contactTitle}
              </div>
              <p className="mb-3 text-sm leading-[1.7] text-ink">
                {COMPANY_ADDRESS.line1}
                <br />
                {COMPANY_ADDRESS.line2}
              </p>
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                onClick={() => trackEvent("phone_click", { location: "footer" })}
                className="mb-1.5 block text-sm font-semibold text-accent no-underline"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => trackEvent("email_click", { location: "footer" })}
                className="text-sm font-semibold text-accent no-underline"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div>
              <div className="mb-4.5 font-mono text-[11px] tracking-[0.18em] text-soft">
                {t.footer.regions}
              </div>
              <p className="mb-3 text-sm leading-[1.7] text-ink">
                {t.footer.ukEurope}
                <br />
                <a href="https://uk.cappafe.com" className="font-semibold text-accent no-underline">
                  uk.cappafe.com
                </a>
              </p>
              <div className="font-mono text-[11px] tracking-[0.06em] text-soft">
                TR · EN · AR · DE · ES · FR · RU
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-4 border-t border-hair pt-7">
            <span className="font-mono text-[11px] tracking-[0.06em] text-soft">
              © {new Date().getFullYear()} CAPPAFE — {t.footer.rights}
            </span>
            <span className="font-mono text-[11px] tracking-[0.06em] text-soft">
              ISO 9001 · 14001 · 45001
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
