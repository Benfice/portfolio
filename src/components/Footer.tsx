import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { profile } from "@/content/profile";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/nav";

export function Footer() {
  const t = useTranslations("Nav");
  const tFooter = useTranslations("Footer");

  const links = navItems.map((item) => ({
    href: item.href,
    label: t(item.key),
  }));

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-serif text-lg tracking-tight">{profile.name}</p>
          <p className="mt-2 text-sm text-muted">{tFooter("rights")}</p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          <nav aria-label={tFooter("nav")}>
            <ul className="flex flex-col gap-2 text-sm">
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

          <ul className="flex flex-col gap-2 text-sm">
            {profile.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
