function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16.6 3c.3 1.9 1.5 3.3 3.4 3.6v3c-1.3 0-2.5-.4-3.4-1.1v6.3c0 3.2-2.5 5.2-5.3 5.2-2.7 0-5.3-2-5.3-5.1 0-3.3 3-5.6 6.1-5.1v3.1c-.3-.1-.6-.2-1-.2-1.2 0-2.2 1-2.2 2.2 0 1.3 1 2.2 2.4 2.2 1.4 0 2.4-1 2.4-2.5V3h2.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.3c0-.8.3-1.4 1.5-1.4h1.4V5.4c-.6-.1-1.4-.2-2.3-.2-2.3 0-3.8 1.4-3.8 3.9v2.1H8v2.8h2.3v7h3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7.8" cy="8.2" r="1.4" fill="currentColor" />
      <path d="M6.7 11h2.2v7H6.7v-7Z" fill="currentColor" />
      <path
        d="M11.2 11h2.1v1c.5-.7 1.3-1.2 2.3-1.2 1.8 0 2.9 1.2 2.9 3.3v3.9h-2.2v-3.6c0-1-.4-1.7-1.3-1.7-.7 0-1.2.5-1.4 1-.1.2-.1.4-.1.7v3.6h-2.2v-7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cappafe/?originalSubdomain=tr", Icon: LinkedInIcon },
  { label: "Instagram", href: "https://www.instagram.com/cappafe/", Icon: InstagramIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@cappafe.car.parts", Icon: TikTokIcon },
  { label: "Facebook", href: "https://www.facebook.com/cappafe/?locale=tr_TR", Icon: FacebookIcon },
];
