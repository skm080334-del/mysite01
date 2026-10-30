import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/* 살짝 기울어진 유리 카드를 겹쳐 쌓은 장식 (시안의 "Plan Your Day / Stay on Track / Achieve More" 모양).
   사용 예) <GlassStack items={[{ title: "첫 번째", icon: Bell }]} /> */

export type GlassStackItem = { title: string; icon: LucideIcon };

// 카드 순서대로: 어두운 유리 → 연보라 → 그라데이션 (4번째부터 반복)
const looks = [
  { card: "glass text-foreground", box: "icon-box", tilt: "rotate-0" },
  { card: "bg-secondary text-secondary-foreground shadow-2xl", box: "icon-box", tilt: "-rotate-2" },
  { card: "bg-brand-gradient text-primary-foreground shadow-2xl", box: "glass", tilt: "rotate-1" },
];

export function GlassStack({ items, className }: { items: GlassStackItem[]; className?: string }) {
  return (
    <div className={cn("relative flex flex-col", className)}>
      {items.map((item, i) => {
        const look = looks[i % looks.length];
        const Icon = item.icon;
        return (
          <div
            key={i}
            className={cn(
              "relative flex items-center gap-4 rounded-3xl p-4 sm:gap-6 sm:p-6",
              i > 0 && "-mt-3",
              look.card,
              look.tilt
            )}
            style={{ zIndex: i + 1 }}
          >
            <span className={cn("size-14 shrink-0 sm:size-16", look.box)}>
              <Icon className="size-7 sm:size-8" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
