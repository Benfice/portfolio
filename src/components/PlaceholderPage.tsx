export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/70">
        {description}
      </p>
    </section>
  );
}
