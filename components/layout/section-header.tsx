import { cn } from "@/lib/utils";

/** 섹션 위쪽의 작은 영문 라벨 + 제목 + 설명. 모든 섹션이 같은 모양을 쓰도록 한 곳에 모아 둠. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  inverted = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  /** 진한 색 배경 위에 놓일 때 true (설명 글자를 배경에 맞는 밝은 색으로) */
  inverted?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-bold uppercase tracking-[0.15em] text-secondary-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            inverted ? "opacity-90" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
