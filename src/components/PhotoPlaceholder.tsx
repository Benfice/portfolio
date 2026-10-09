function seedFromId(id: string): number {
  let sum = 0;
  for (let index = 0; index < id.length; index += 1) {
    sum += id.charCodeAt(index) * (index + 1);
  }
  return sum;
}

export function PhotoPlaceholder({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const seed = seedFromId(id);
  const hue = 28 + (seed % 36);
  const from = `hsl(${hue} 18% 84%)`;
  const to = `hsl(${(hue + 24) % 360} 14% 58%)`;
  const gradientId = `photo-${id}`;

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gradientId})`} />
      <circle
        cx={(seed % 280) + 60}
        cy={(seed % 140) + 70}
        r="72"
        fill="#ffffff"
        opacity="0.18"
      />
    </svg>
  );
}
