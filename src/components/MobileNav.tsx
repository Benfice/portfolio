"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type NavLink = { href: string; label: string };

export function MobileNav({ links }: { links: NavLink[] }) {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border transition-colors hover:bg-foreground/5"
      >
        <span className="sr-only">
          {open ? t("closeMenu") : t("openMenu")}
        </span>
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute left-0 right-0 top-16 border-b border-border bg-background"
      >
        <nav aria-label={t("mobile")} className="px-6 py-4">
          <ul className="flex flex-col gap-1 text-base">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className="h-4 w-4"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className="h-4 w-4"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
