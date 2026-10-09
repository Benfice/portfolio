import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto w-full max-w-6xl px-6 py-6 text-sm text-foreground/60">
        <p>{t("rights")}</p>
      </div>
    </footer>
  );
}
