import { AtSign, Mail, MapPin, MessageCircle, Play } from "lucide-react";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Skin", href: "/#products" },
      { label: "Eczema Range", href: "/#products" },
      { label: "Supplement", href: "/#products" },
      { label: "Build a Routine", href: "/routine" },
    ],
  },
  {
    title: "Skinpiens",
    links: [
      { label: "Journal", href: "/journal" },
      { label: "Our Science", href: "/#science" },
      { label: "Clinical Stories", href: "/journal" },
      { label: "Ingredients", href: "/#ingredients" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping & Delivery", href: "#" },
      { label: "Returns", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Contact Us", href: "mailto:hello@skinpiens.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-heading text-base font-bold text-primary-foreground">
              S
            </span>
            <span className="font-heading text-xl font-bold tracking-[0.08em]">SKINPIENS</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
            Clinical skincare and botanical science, formulated for sensitive and
            eczema-prone skin. Brightening that never hurts — engineered in
            Malaysia, dermatologist-tested.
          </p>
          <div className="mt-5 flex gap-2">
            {[AtSign, MessageCircle, Play].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Skinpiens Sdn. Bhd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> hello@skinpiens.com
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Kuala Lumpur, MY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
