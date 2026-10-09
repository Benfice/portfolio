import { getTranslations, setRequestLocale } from "next-intl/server";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Pages.contact");

  return <PlaceholderPage title={t("title")} description={t("description")} />;
}
