"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/hooks/useLanguage";
import { useIsMobile } from "@/hooks/useIsMobile";
import { trackEvent } from "@/lib/track";
import { COMPANY_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/constants";

const EASE = [0.2, 0.7, 0.2, 1] as const;

function MapVisual({ pinLabel, isMobile }: { pinLabel: string; isMobile: boolean }) {
  return (
    <motion.div
      className="absolute -inset-[10%]"
      style={{ transformOrigin: isMobile ? "50% 50%" : "52% 46%" }}
      initial={{ scale: 0.52 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: isMobile ? 0.85 : 1.7, ease: [0.3, 0, 0.2, 1] }}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(20,21,23,0.045)_0px,rgba(20,21,23,0.045)_1px,transparent_1px,transparent_48px),repeating-linear-gradient(90deg,rgba(20,21,23,0.045)_0px,rgba(20,21,23,0.045)_1px,transparent_1px,transparent_48px)]" />
      <div className="absolute top-[12%] left-[6%] h-[24%] w-[30%] rounded-2xl bg-[rgba(20,21,23,0.05)]" />
      <div className="absolute top-[62%] left-[12%] h-[26%] w-[22%] rounded-2xl bg-[rgba(20,21,23,0.04)]" />
      <div className="absolute top-[8%] right-[8%] h-[20%] w-[26%] rounded-2xl bg-[rgba(20,21,23,0.04)]" />
      <div className="absolute right-[14%] bottom-[10%] h-[22%] w-[30%] rounded-2xl bg-[rgba(20,21,23,0.05)]" />
      <div className="absolute top-[20%] left-[40%] h-[14%] w-[16%] rounded-[40%_60%_55%_45%/55%_45%_60%_40%] bg-[rgba(43,111,74,0.12)]" />
      <div className="absolute top-[47%] -left-[20%] h-7.5 w-[150%] rotate-[-13deg] rounded-full bg-[#E6E2DA]" />
      <div className="absolute top-[49.4%] -left-[20%] h-0.75 w-[150%] rotate-[-13deg] bg-[repeating-linear-gradient(90deg,#FBFAF8_0px,#FBFAF8_16px,transparent_16px,transparent_34px)]" />
      <div className="absolute -top-[20%] left-[30%] h-[150%] w-4.5 rotate-[14deg] rounded-full bg-[#EAE7DF]" />
      <div className="absolute -top-[20%] left-[66%] h-[150%] w-3.5 rotate-[-6deg] rounded-full bg-[#EAE7DF]" />
      <div className="absolute top-[40%] left-[24%] rotate-[-13deg] font-mono text-xs tracking-[0.2em] text-[#A6A199]">
        İSTANBUL CADDESİ
      </div>
      <div className="absolute top-[30%] left-[8%] font-mono text-[11px] tracking-[0.18em] text-[#B5B1A8]">
        OVAAKÇA
      </div>
      <div className="absolute right-[10%] bottom-[32%] font-mono text-[11px] tracking-[0.18em] text-[#B5B1A8]">
        OSMANGAZİ
      </div>

      <div
        className={`absolute h-17.5 w-17.5 -translate-x-1/2 -translate-y-1/2 ${
          isMobile ? "top-1/2 left-1/2" : "top-[46%] left-[52%]"
        }`}
      >
        <span className="animate-flow-pulse-ring absolute inset-0 rounded-full border-2 border-accent/50" />
        <span className="animate-flow-pulse-ring absolute inset-0 rounded-full border-2 border-accent/50 [animation-delay:1.1s]" />
      </div>

      <motion.div
        className={`absolute h-6.5 w-6.5 -translate-x-1/2 -translate-y-1/2 ${
          isMobile ? "top-1/2 left-1/2" : "top-[46%] left-[52%]"
        }`}
        initial={{ opacity: 0, y: -70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: isMobile ? 0.25 : 1.35, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-accent shadow-[0_10px_24px_rgba(210,35,42,0.5)]">
          <span className="block h-2 w-2 rounded-full bg-white" />
        </div>
        <div className="absolute top-[-44px] left-1/2 -translate-x-1/2 rounded-full bg-[#141517] px-3.5 py-2 font-mono text-[11px] tracking-[0.12em] whitespace-nowrap text-[#FBFAF8] shadow-[0_10px_26px_rgba(20,21,23,0.3)]">
          {pinLabel}
        </div>
      </motion.div>

      <div className="absolute top-5.5 right-6.5 font-mono text-xs tracking-[0.14em] text-[#A6A199]">K ↑</div>
      <div className="absolute right-6.5 bottom-5 font-mono text-[10px] tracking-[0.1em] text-[#A6A199]">
        |—— 200 m ——|
      </div>
    </motion.div>
  );
}

function AddressChip({ isMobile }: { isMobile: boolean }) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={isMobile ? { duration: 0.6, delay: 0.15, ease: EASE } : { duration: 0.8, delay: 2.1, ease: EASE }}
      className="relative z-[5] mx-4 mt-4 max-w-none rounded-2xl border border-hair bg-glass p-5.5 shadow-[0_16px_40px_rgba(20,21,23,0.14)] backdrop-blur-md min-[820px]:absolute min-[820px]:bottom-6.5 min-[820px]:left-6.5 min-[820px]:mx-0 min-[820px]:mt-0 min-[820px]:max-w-[330px]"
    >
      <div className="mb-2.5 flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-accent">
        <span className="inline-block h-2 w-2 rounded-full bg-accent" />
        {t.contact.factory}
      </div>
      <div className="text-[13.5px] leading-[1.6] text-ink">
        {COMPANY_ADDRESS.line1}
        <br />
        {COMPANY_ADDRESS.line2}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-3.5">
        <a
          href={`tel:${CONTACT_PHONE_TEL}`}
          onClick={() => trackEvent("phone_click", { location: "contact" })}
          className="text-[13px] font-bold text-accent no-underline"
        >
          {CONTACT_PHONE_DISPLAY}
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          onClick={() => trackEvent("email_click", { location: "contact" })}
          className="text-[13px] font-bold text-accent no-underline"
        >
          {CONTACT_EMAIL}
        </a>
        <a
          href={COMPANY_ADDRESS.mapsUrl}
          target="_blank"
          rel="noopener"
          onClick={() => trackEvent("maps_click")}
          className="text-[13px] font-semibold text-muted no-underline hover:text-accent"
        >
          {t.contact.maps}
        </a>
      </div>
    </motion.div>
  );
}

function ContactCard({ isMobile }: { isMobile: boolean }) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const nameId = useId();
  const companyId = useId();
  const emailId = useId();
  const phoneId = useId();
  const subjectId = useId();
  const messageId = useId();

  const inputClass =
    "w-full min-w-[120px] rounded-[10px] border border-line bg-chip-w px-3.5 py-3 font-sans text-sm text-ink outline-none focus:border-accent";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setErrorMsg("");
    setSent(false);
    
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          from_name: payload.name,
          subject: payload.subject || "Cappafe İletişim Formu Başvurusu",
          ...payload,
        }),
      });
      
      const result = await response.json();
      if (response.ok && result.success) {
        setSent(true);
        form.reset();
        fetch("/api/emails/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formType: "contact", ...payload }),
          keepalive: true,
        }).catch(() => {});
      } else {
        setErrorMsg(result.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch {
      setErrorMsg("Bağlantı hatası. Lütfen internetinizi kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, x: 70 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={isMobile ? { duration: 0.6, delay: 0.1, ease: EASE } : { duration: 0.9, delay: 1.9, ease: EASE }}
      className="relative z-[6] m-4 rounded-[20px] border border-hair bg-glass p-6 shadow-[0_20px_50px_rgba(20,21,23,0.12)] backdrop-blur-lg min-[820px]:absolute min-[820px]:right-6.5 min-[820px]:top-1/2 min-[820px]:bottom-auto min-[820px]:left-auto min-[820px]:w-[min(400px,calc(100%-52px))] min-[820px]:-translate-y-1/2 min-[820px]:m-0 min-[820px]:p-7"
    >
      <h3 className="mb-1.5 text-xl font-extrabold text-ink">{t.contact.formTitle}</h3>
      <p className="mb-5 text-[13px] text-muted">{t.contact.formSub}</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2.75"
      >
        <div className="flex flex-wrap gap-2.75">
          <div className="flex-1">
            <label htmlFor={nameId} className="sr-only">
              {t.contact.name}
            </label>
            <input id={nameId} name="name" placeholder={t.contact.name} required className={inputClass} />
          </div>
          <div className="flex-1">
            <label htmlFor={companyId} className="sr-only">
              {t.contact.company}
            </label>
            <input id={companyId} name="company" placeholder={t.contact.company} className={inputClass} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2.75">
          <div className="flex-1">
            <label htmlFor={emailId} className="sr-only">
              {t.contact.email}
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              placeholder={t.contact.email}
              required
              className={inputClass}
            />
          </div>
          <div className="flex-1">
            <label htmlFor={phoneId} className="sr-only">
              {t.contact.phone}
            </label>
            <input id={phoneId} name="phone" type="tel" placeholder={t.contact.phone} className={inputClass} />
          </div>
        </div>
        <label htmlFor={subjectId} className="sr-only">
          {t.contact.subject}
        </label>
        <input id={subjectId} name="subject" placeholder={t.contact.subject} className={inputClass} />
        <label htmlFor={messageId} className="sr-only">
          {t.contact.message}
        </label>
        <textarea
          id={messageId}
          name="message"
          placeholder={t.contact.message}
          rows={3}
          required
          className={`${inputClass} resize-y`}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-1 rounded-full bg-accent px-5 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Gönderiliyor..." : t.contact.send}
        </button>
        {sent && (
          <div className="pt-1 text-center font-mono text-xs text-[#1F8A5B]">{t.contact.sent}</div>
        )}
        {errorMsg && (
          <div className="pt-1 text-center font-mono text-xs text-accent">{errorMsg}</div>
        )}
      </form>
    </motion.div>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section id="iletisim" aria-label={t.contact.kicker} className="pt-10 pb-[clamp(70px,11vw,130px)]">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
        <Reveal className="mb-4.5 font-mono text-xs tracking-[0.22em] text-accent">
          {t.contact.kicker}
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-12 text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-black tracking-[-0.02em] uppercase">
            {t.contact.title}
          </h2>
        </Reveal>

        <div className="relative flex flex-col min-[820px]:block min-[820px]:h-[620px] overflow-hidden rounded-[26px] border border-line2 bg-[#F1EFE9]">
          <div className="relative h-[250px] w-full select-none bg-[#EDECE8] opacity-[0.92] overflow-hidden min-[820px]:absolute min-[820px]:inset-0 min-[820px]:h-full">
            <MapVisual pinLabel={t.contact.pin} isMobile={isMobile} />
          </div>
          <AddressChip isMobile={isMobile} />
          <ContactCard isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}
