import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { profile } from "@/content/profile";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/nav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const t = useTranslations("Nav");

  const links = navItems.map((item) => ({
    href: item.href,
    label: t(item.key),
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-serif text-lg tracking-tight">
          {profile.name}
        </Link>

        <nav aria-label={t("primary")} className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileNav links={links} />
        </div>
      </Container>
    </header>
  );
}
