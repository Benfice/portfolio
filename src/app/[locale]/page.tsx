import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
      <p className="text-sm font-medium uppercase tracking-widest text-foreground/60">
        {t("eyebrow")}
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/70">
        {t("lead")}
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/qa"
          className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {t("exploreQa")}
        </Link>
        <Link
          href="/photography"
          className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          {t("explorePhotography")}
        </Link>
      </div>
    </section>
  );
}
