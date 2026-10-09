import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const t = useTranslations("Nav");

  const links = [
    { href: "/", label: t("home") },
    { href: "/photography", label: t("photography") },
    { href: "/qa", label: t("qa") },
    { href: "/knowledge", label: t("knowledge") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="border-b border-foreground/10">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Benfice
        </Link>

        <nav aria-label={t("primary")} className="order-3 w-full sm:order-2 sm:w-auto">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-foreground/70 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="order-2 flex items-center gap-2 sm:order-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
