"use client";

import { useTranslations } from "next-intl";
import { useId, useMemo, useState } from "react";

export type MapConcept = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
};

export type MapTheme = {
  id: string;
  title: string;
  concepts: MapConcept[];
};

type NodeKind = "theme" | "concept" | "tag";

type MapNode = {
  id: string;
  kind: NodeKind;
  label: string;
  x: number;
  y: number;
  data?: MapConcept;
};

type MapEdge = {
  id: string;
  from: string;
  to: string;
};

type MapLayout = {
  nodes: MapNode[];
  edges: MapEdge[];
  adjacency: Record<string, string[]>;
};

function buildLayout(themes: MapTheme[]): MapLayout {
  const nodes: MapNode[] = [];
  const edges: MapEdge[] = [];
  const adjacency: Record<string, string[]> = {};

  function connect(from: string, to: string) {
    edges.push({ id: `${from} -> ${to}`, from, to });
    adjacency[from] ??= [];
    adjacency[to] ??= [];
    adjacency[from].push(to);
    adjacency[to].push(from);
  }

  const margin = 0.12;
  const usable = 1 - margin * 2;
  const themeX = 0.16;
  const conceptX = 0.48;
  const tagX = 0.8;

  const conceptTotal =
    themes.reduce((sum, theme) => sum + theme.concepts.length, 0) || 1;

  let cursor = margin;
  for (const theme of themes) {
    const size = (theme.concepts.length / conceptTotal) * usable;
    const start = cursor;
    const end = cursor + size;
    const count = theme.concepts.length;

    const themeId = `t-${theme.id}`;
    nodes.push({
      id: themeId,
      kind: "theme",
      label: theme.title,
      x: themeX,
      y: (start + end) / 2,
    });

    theme.concepts.forEach((concept, index) => {
      const conceptId = `c-${concept.id}`;
      const cy =
        count === 1
          ? (start + end) / 2
          : start + ((end - start) * (index + 1)) / (count + 1);
      nodes.push({
        id: conceptId,
        kind: "concept",
        label: concept.title,
        x: conceptX,
        y: cy,
        data: concept,
      });
      connect(themeId, conceptId);
    });

    cursor = end;
  }

  const tags = [
    ...new Set(themes.flatMap((theme) => theme.concepts.flatMap((c) => c.tags))),
  ];
  tags.forEach((tag, index) => {
    const tagId = `tag-${tag}`;
    nodes.push({
      id: tagId,
      kind: "tag",
      label: tag,
      x: tagX,
      y: margin + ((index + 0.5) / tags.length) * usable,
    });
  });
  for (const theme of themes) {
    for (const concept of theme.concepts) {
      for (const tag of concept.tags) {
        connect(`c-${concept.id}`, `tag-${tag}`);
      }
    }
  }

  return { nodes, edges, adjacency };
}

export function KnowledgeMap({ themes }: { themes: MapTheme[] }) {
  const t = useTranslations("Knowledge");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const titleId = useId();

  const layout = useMemo(() => buildLayout(themes), [themes]);
  const nodeById = useMemo(
    () => new Map(layout.nodes.map((node) => [node.id, node])),
    [layout],
  );

  const activeId = hoverId ?? selectedId;
  const highlighted = useMemo(() => {
    if (!activeId) return null;
    const set = new Set<string>([activeId]);
    for (const neighbor of layout.adjacency[activeId] ?? []) {
      set.add(neighbor);
    }
    return set;
  }, [activeId, layout.adjacency]);

  const selected = selectedId ? nodeById.get(selectedId) : undefined;
  const selectedConcept =
    selected && selected.kind === "concept" && selected.data
      ? selected.data
      : undefined;
  const parentTheme = selectedConcept
    ? themes.find((theme) =>
        theme.concepts.some((concept) => concept.id === selectedConcept.id),
      )
    : undefined;
  const siblings =
    selectedConcept && parentTheme
      ? parentTheme.concepts.filter(
          (concept) => concept.id !== selectedConcept.id,
        )
      : [];

  function toggle(id: string) {
    setSelectedId((current) => (current === id ? null : id));
  }

  return (
    <div className="mt-10">
      <div
        role="group"
        aria-label={t("mapTitle")}
        className="relative mx-auto aspect-[3/4] w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface sm:aspect-[16/10]"
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full text-foreground"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
        >
          {layout.edges.map((edge) => {
            const from = nodeById.get(edge.from);
            const to = nodeById.get(edge.to);
            if (!from || !to) return null;
            const midX = (from.x + to.x) / 2;
            const dimmed =
              highlighted !== null &&
              (!highlighted.has(edge.from) || !highlighted.has(edge.to));
            return (
              <path
                key={edge.id}
                d={`M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.004"
                strokeOpacity={dimmed ? 0.08 : 0.28}
                className="transition-opacity duration-200"
              />
            );
          })}
          {layout.nodes.map((node) => {
            const dimmed = highlighted !== null && !highlighted.has(node.id);
            return (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r={node.kind === "tag" ? 0.008 : 0.011}
                fill="currentColor"
                opacity={dimmed ? 0.08 : 0.35}
                className="transition-opacity duration-200"
              />
            );
          })}
        </svg>

        {layout.nodes.map((node) => {
          const dimmed = highlighted !== null && !highlighted.has(node.id);
          const selectedThis = selectedId === node.id;

          return (
            <button
              key={node.id}
              type="button"
              aria-pressed={selectedThis}
              title={node.label}
              onMouseEnter={() => setHoverId(node.id)}
              onMouseLeave={() => setHoverId(null)}
              onFocus={() => setHoverId(node.id)}
              onBlur={() => setHoverId(null)}
              onClick={() => toggle(node.id)}
              style={{
                left: `${node.x * 100}%`,
                top: `${node.y * 100}%`,
              }}
              className={`absolute inline-flex max-w-[38%] -translate-x-1/2 -translate-y-1/2 items-center justify-center truncate rounded-full border px-3 py-1 text-center text-xs transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:max-w-[32%] sm:text-sm ${
                node.kind === "theme"
                  ? "border-accent/40 bg-accent/10 font-medium text-foreground"
                  : node.kind === "tag"
                    ? "border-border/60 text-muted"
                    : "border-border bg-surface text-foreground"
              } ${dimmed ? "opacity-25" : "opacity-100"} ${
                selectedThis ? "ring-2 ring-accent" : ""
              }`}
            >
              {node.label}
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-6 max-w-4xl">
        {selectedConcept ? (
          <section
            aria-labelledby={titleId}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h3 id={titleId} className="text-xl">
              {selectedConcept.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {selectedConcept.summary}
            </p>
            {selectedConcept.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {selectedConcept.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            {siblings.length > 0 && (
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-medium">{t("relatedConcepts")}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {siblings.map((concept) => (
                    <li key={concept.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(`c-${concept.id}`)}
                        className="rounded-full border border-border px-3 py-1 text-xs text-foreground transition-colors hover:bg-foreground/5"
                      >
                        {concept.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ) : (
          <p className="text-center text-sm text-muted">{t("mapHint")}</p>
        )}

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="inline-flex items-center justify-center rounded-md border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:bg-foreground/5"
          >
            {t("mapReset")}
          </button>
        </div>
      </div>
    </div>
  );
}