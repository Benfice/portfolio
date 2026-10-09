"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";

export type GalleryPhoto = {
  id: string;
  title: string;
  location: string;
  year: string;
  ratio: "portrait" | "landscape" | "square";
  src?: string | null;
};

const ratioClass: Record<GalleryPhoto["ratio"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
};

export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const t = useTranslations("Photography");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) =>
        current === null ? current : (current + delta + photos.length) % photos.length,
      );
    },
    [photos.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = () =>
      dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

    const previousFocus = document.activeElement as HTMLElement | null;

    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "Escape":
          event.preventDefault();
          close();
          break;
        case "ArrowLeft":
          event.preventDefault();
          step(-1);
          break;
        case "ArrowRight":
          event.preventDefault();
          step(1);
          break;
        case "Tab": {
          const items = Array.from(focusable()).filter(
            (node) => !node.hasAttribute("disabled"),
          );
          if (items.length === 0) break;
          const first = items[0];
          const last = items[items.length - 1];
          if (
            event.shiftKey &&
            (document.activeElement === first ||
              !dialogRef.current?.contains(document.activeElement))
          ) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
          break;
        }
      }
    }

    focusable()[0]?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : photos[openIndex];
  const label =
    active === null ? "" : `${active.title} — ${active.location}, ${active.year}`;

  return (
    <>
      <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {photos.map((photo, index) => (
          <GalleryTile
            key={photo.id}
            photo={photo}
            label={t("openPhoto", { title: photo.title })}
            onOpen={() => setOpenIndex(index)}
          />
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="flex max-h-full w-full max-w-4xl flex-col items-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex w-full items-center justify-end">
              <button
                type="button"
                onClick={close}
                className="inline-flex items-center justify-center rounded-md border border-white/25 px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/10"
              >
                {t("close")}
              </button>
            </div>

            <div className="relative w-full">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={t("previous")}
                className="absolute -left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-stone-950/60 text-white transition-colors hover:bg-stone-950 sm:-left-4"
              >
                <ChevronIcon direction="left" />
              </button>
              <div
                className={`relative overflow-hidden rounded-xl border border-white/20 ${ratioClass[active.ratio]}`}
              >
                <LightboxMedia photo={active} label={label} />
              </div>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={t("next")}
                className="absolute -right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-stone-950/60 text-white transition-colors hover:bg-stone-950 sm:-right-4"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>

            <p
              id={titleId}
              className="text-center text-sm text-white sm:text-base"
            >
              {label}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function GalleryTile({
  photo,
  label,
  onOpen,
}: {
  photo: GalleryPhoto;
  label: string;
  onOpen: () => void;
}) {
  const caption = `${photo.title} — ${photo.location}, ${photo.year}`;

  return (
    <figure className="mb-6 break-inside-avoid">
      <button
        type="button"
        onClick={onOpen}
        aria-label={label}
        title={label}
        className={`relative block w-full overflow-hidden rounded-xl border border-border transition-opacity hover:opacity-90 ${ratioClass[photo.ratio]}`}
      >
        <GalleryMedia photo={photo} label={caption} />
      </button>
      <figcaption className="mt-3 text-sm">
        <span>{photo.title}</span>
        <span className="text-muted"> · {photo.location}, {photo.year}</span>
      </figcaption>
    </figure>
  );
}

function GalleryMedia({
  photo,
  label,
}: {
  photo: GalleryPhoto;
  label: string;
}) {
  if (!photo.src) {
    return <PhotoPlaceholder id={photo.id} label={label} />;
  }
  return (
    <Image
      src={photo.src}
      alt={label}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover"
    />
  );
}

function LightboxMedia({
  photo,
  label,
}: {
  photo: GalleryPhoto;
  label: string;
}) {
  if (!photo.src) {
    return (
      <div className="h-full w-full">
        <PhotoPlaceholder id={photo.id} label={label} />
      </div>
    );
  }
  return (
    <Image
      src={photo.src}
      alt={label}
      fill
      sizes="(max-width: 896px) 100vw, 56rem"
      className="object-contain"
    />
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  const points = direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <polyline points={points} />
    </svg>
  );
}