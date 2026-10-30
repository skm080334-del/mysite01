import { cn } from "@/lib/utils";

/* 기하학 도형 장식 (동그라미, 반달, 아치, 마름모 등).
   색은 디자인 토큰을 따르므로 app/globals.css 의 primary/accent/secondary 를 바꾸면 같이 바뀝니다.
   사용 예) <ShapeTile shape="circle" tile="blue" color="yellow" /> */

export type Tone = "blue" | "red" | "yellow" | "cream";
export type Shape = "circle" | "ring" | "half" | "arch" | "diamond" | "leaf";

const toneBg: Record<Tone, string> = {
  blue: "bg-primary",
  red: "bg-accent",
  yellow: "bg-secondary",
  cream: "bg-background",
};

/** 정사각형 칸 하나 + 그 안의 도형 하나 */
export function ShapeTile({
  shape,
  tile,
  color,
  className,
}: {
  shape: Shape;
  tile: Tone;
  color: Tone;
  className?: string;
}) {
  const fg = toneBg[color];
  const bg = toneBg[tile];

  return (
    <div
      aria-hidden
      className={cn("flex aspect-square items-center justify-center p-[16%]", bg, className)}
    >
      {shape === "circle" && <div className={cn("size-full rounded-full", fg)} />}
      {shape === "ring" && (
        <div className={cn("flex size-full items-center justify-center rounded-full", fg)}>
          <div className={cn("size-1/2 rounded-full", bg)} />
        </div>
      )}
      {shape === "half" && <div className={cn("h-1/2 w-full rounded-b-full", fg)} />}
      {shape === "arch" && (
        <div className={cn("flex size-full items-end justify-center rounded-t-full", fg)}>
          <div className={cn("h-1/2 w-1/3 rounded-t-full", bg)} />
        </div>
      )}
      {shape === "diamond" && (
        <div className={cn("flex size-full items-center justify-center rounded-full", fg)}>
          <div className={cn("size-[55%] rotate-45", bg)} />
        </div>
      )}
      {shape === "leaf" && <div className={cn("size-full rounded-r-full", fg)} />}
    </div>
  );
}

type TileSpec = { shape: Shape; tile: Tone; color: Tone };

/** 시안 맨 위처럼 도형 칸 6개를 한 줄로 */
export const stripTiles: TileSpec[] = [
  { shape: "leaf", tile: "blue", color: "cream" },
  { shape: "circle", tile: "yellow", color: "red" },
  { shape: "diamond", tile: "cream", color: "blue" },
  { shape: "half", tile: "blue", color: "yellow" },
  { shape: "ring", tile: "cream", color: "yellow" },
  { shape: "arch", tile: "red", color: "yellow" },
];

/** 도형 칸을 바둑판처럼 반복 (columns × rows) */
export function ShapePattern({
  columns,
  rows,
  className,
}: {
  columns: number;
  rows: number;
  className?: string;
}) {
  const shapes: Shape[] = ["leaf", "circle", "diamond", "half", "ring", "arch"];
  const pairs: [Tone, Tone][] = [
    ["blue", "cream"],
    ["yellow", "red"],
    ["cream", "blue"],
    ["red", "yellow"],
    ["cream", "yellow"],
    ["yellow", "blue"],
  ];
  const tiles = Array.from({ length: columns * rows }, (_, i) => {
    const [tile, color] = pairs[(i + Math.floor(i / columns)) % pairs.length];
    return { shape: shapes[(i * 5) % shapes.length], tile, color };
  });

  return (
    <div
      className={cn("grid overflow-hidden", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {tiles.map((t, i) => (
        <ShapeTile key={i} {...t} />
      ))}
    </div>
  );
}
