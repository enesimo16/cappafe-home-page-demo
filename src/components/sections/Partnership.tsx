"use client";

import { useId, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/hooks/useLanguage";

function FormField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        placeholder={label}
        {...props}
        className="w-full rounded-[10px] border border-white/20 bg-white/7 px-3.75 py-3.25 font-sans text-sm text-[#FBFAF8] outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}

export default function Partnership() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const volumeId = useId();
  const notesId = useId();

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
          subject: `Cappafe Distribütörlük Başvurusu - ${payload.company}`,
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
          body: JSON.stringify({ formType: "partnership", ...payload }),
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
    <section id="ortaklik" aria-label={t.partner.kicker} className="pt-10 pb-[clamp(70px,11vw,130px)]">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-[#141517] p-[clamp(36px,6vw,88px)] text-[#FBFAF8]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(252deg,rgba(255,232,210,0.45)_0%,rgba(255,235,215,0.12)_32%,rgba(255,238,224,0)_58%)]" />
            <div className="pointer-events-none absolute -top-35 -right-35 h-130 w-130 rounded-full bg-[radial-gradient(circle,rgba(255,214,178,0.4)_0%,rgba(210,35,42,0.14)_45%,rgba(210,35,42,0)_70%)]" />

            <div className="relative grid grid-cols-1">
              {/* Intro */}
              <div
                className="col-start-1 row-start-1 max-w-[720px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
                style={{
                  opacity: showForm ? 0 : 1,
                  transform: showForm ? "translateX(-50px)" : "translateX(0)",
                  pointerEvents: showForm ? "none" : "auto",
                }}
              >
                <div className="mb-5 font-mono text-xs tracking-[0.22em] text-accent-light [text-shadow:-8px_6px_14px_rgba(0,0,0,0.7)]">
                  {t.partner.kicker}
                </div>
                <h2 className="mb-5.5 text-[clamp(1.75rem,3.8vw,3.25rem)] leading-[1.05] font-black tracking-[-0.02em] uppercase [text-shadow:-28px_20px_36px_rgba(0,0,0,0.9),-10px_8px_14px_rgba(0,0,0,0.55)]">
                  {t.partner.title}
                </h2>
                <p className="mb-9 max-w-[560px] text-balance text-[17px] leading-[1.65] text-[#FBFAF8]/72 [text-shadow:-14px_10px_22px_rgba(0,0,0,0.8)]">
                  {t.partner.sub}
                </p>
                <div className="mb-10 flex flex-wrap gap-3">
                  {t.partner.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-white/22 px-4 py-2 font-mono text-xs tracking-[0.08em] text-[#FBFAF8]/85 shadow-[-12px_10px_22px_rgba(0,0,0,0.45)]"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="rounded-full bg-accent px-9 py-4.5 text-base font-bold text-white shadow-[-16px_14px_34px_rgba(0,0,0,0.5),0_12px_30px_rgba(210,35,42,0.35)] transition-transform duration-[250ms] hover:-translate-y-[3px]"
                >
                  {t.partner.cta}
                </button>
              </div>

              {/* Form */}
              <div
                className="col-start-1 row-start-1 mx-auto w-full max-w-[640px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] [transition-delay:150ms]"
                style={{
                  opacity: showForm ? 1 : 0,
                  transform: showForm ? "translateX(0)" : "translateX(60px)",
                  pointerEvents: showForm ? "auto" : "none",
                }}
              >
                <div className="mb-6.5 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 font-mono text-xs tracking-[0.22em] text-accent-light [text-shadow:-8px_6px_14px_rgba(0,0,0,0.7)]">
                      {t.partner.formKicker}
                    </div>
                    <h2 className="m-0 text-[clamp(1.5rem,2.6vw,2.125rem)] font-black tracking-[-0.01em] uppercase [text-shadow:-20px_14px_30px_rgba(0,0,0,0.85)]">
                      {t.partner.formTitle}
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="rounded-full border border-white/25 px-4.5 py-2.25 font-mono text-[11px] tracking-[0.12em] text-[#FBFAF8] transition-colors hover:border-accent hover:text-accent-light"
                  >
                    {t.partner.back}
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <FormField label={t.partner.name} name="name" required />
                    <FormField label={t.partner.company} name="company" required />
                    <FormField label={t.partner.email} name="email" type="email" required />
                    <FormField label={t.partner.phone} name="phone" type="tel" />
                    <FormField label={t.partner.country} name="country" required />
                    <FormField label={t.partner.region} name="region" />
                    <div>
                      <label htmlFor={volumeId} className="sr-only">
                        {t.partner.volumes[0]}
                      </label>
                      <select
                        id={volumeId}
                        name="volume"
                        defaultValue={t.partner.volumes[0]}
                        className="w-full cursor-pointer rounded-[10px] border border-white/20 bg-panel2 px-3.75 py-3.25 font-sans text-sm text-[#FBFAF8] outline-none"
                      >
                        {t.partner.volumes.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <label htmlFor={notesId} className="sr-only">
                    {t.partner.message}
                  </label>
                  <textarea
                    id={notesId}
                    name="notes"
                    placeholder={t.partner.message}
                    rows={4}
                    className="mb-4.5 w-full resize-y rounded-[10px] border border-white/20 bg-white/7 px-3.75 py-3.25 font-sans text-sm text-[#FBFAF8] outline-none focus:border-accent"
                  />
                  <div className="flex flex-wrap items-center gap-3.5">
                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-full bg-accent px-8 py-3.75 text-[15px] font-bold text-white shadow-[-14px_12px_28px_rgba(0,0,0,0.45)] transition-colors hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Gönderiliyor..." : t.partner.submit}
                    </button>
                    {sent && <span className="font-mono text-xs text-[#6BCB98]">{t.partner.sent}</span>}
                    {errorMsg && <span className="font-mono text-xs text-accent">{errorMsg}</span>}
                  </div>
                </form>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {t.partner.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/18 px-3 py-1.25 font-mono text-[10.5px] tracking-[0.08em] text-[#FBFAF8]/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
