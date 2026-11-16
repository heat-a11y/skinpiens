import { withBase } from "@/lib/base-path";

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
    <footer className="border-t border-foreground/15">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 py-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="micro text-muted-foreground">The house</p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-foreground/80 text-pretty">
              Clinical skincare and botanical science, formulated for sensitive and
              eczema-prone skin. Brightening that never hurts — engineered in
              Malaysia, dermatologist-tested.
            </p>
            <div className="mt-6 flex gap-2">
              {["Instagram", "TikTok", "YouTube"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="micro border border-foreground/20 px-3 py-2 transition-colors hover:bg-foreground hover:text-background"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col, i) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="micro flex items-baseline gap-2 text-muted-foreground">
                <span className="opacity-50">0{i + 1}</span>
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={withBase(link.href)}
                      className="link-draw text-sm text-foreground/75 hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <p className="micro text-muted-foreground">Kuala Lumpur</p>
            <p className="micro mt-4 text-foreground/60">03°08′N</p>
            <p className="micro text-foreground/60">101°41′E</p>
          </div>
        </div>

        <div className="border-t border-foreground/15 pt-4 pb-14">
          <p className="display select-none text-[clamp(3.4rem,14.2vw,14rem)] leading-[0.78] tracking-[-0.05em]">
            Skinpiens<span className="align-top text-[0.22em]">®</span>
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-foreground/15 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="micro text-muted-foreground">
            © {new Date().getFullYear()} Skinpiens Sdn. Bhd.
          </p>
          <div className="micro flex flex-wrap gap-x-5 gap-y-2 text-muted-foreground">
            <a href="mailto:hello@skinpiens.com" className="link-draw">
              hello@skinpiens.com
            </a>
            <span>Privacy</span>
            <span>Terms</span>
            <span className="text-foreground">Made in Malaysia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
