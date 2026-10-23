"use client";

import { useActionState } from "react";

import { saveHeroText, type ActionState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

const inputClass =
  "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50";
const textareaClass =
  "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/50";

type Field = {
  key: string;
  label: string;
  kind: "text" | "multiline" | "link";
  /** 지금 사이트에 보이는 값 */
  value: string;
};

/** 히어로 문구 7개를 한 번에 고치는 입력 칸 */
export function HeroForm({ fields }: { fields: Field[] }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveHeroText, {});

  return (
    <form action={action} className="grid gap-4">
      {fields.map((field) => (
        <label key={field.key} className="grid gap-1.5 text-sm">
          <span className="font-medium">{field.label}</span>
          {field.kind === "multiline" ? (
            <textarea
              name={field.key}
              rows={field.key === "hero.title" ? 2 : 3}
              defaultValue={field.value}
              className={textareaClass}
            />
          ) : (
            <input
              name={field.key}
              defaultValue={field.value}
              placeholder={field.kind === "link" ? "#features, /admin, https://..." : undefined}
              className={inputClass}
            />
          )}
        </label>
      ))}

      <p className="text-xs text-muted-foreground">
        칸을 비우고 저장하면 처음 기본 문구(site.config.ts)로 돌아갑니다.
      </p>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "저장 중..." : "저장"}
        </Button>
        {state.message ? (
          <p className={state.ok ? "text-sm text-muted-foreground" : "text-sm text-destructive"}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
