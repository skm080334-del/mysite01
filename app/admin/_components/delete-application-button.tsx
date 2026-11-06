"use client";

import { Trash2 } from "lucide-react";

import { deleteApplication } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

/** 수강신청 삭제 버튼 — 실수 방지를 위해 한 번 더 물어봅니다. */
export function DeleteApplicationButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteApplication}
      onSubmit={(e) => {
        if (!window.confirm(`${name} 님의 신청을 삭제할까요? 되돌릴 수 없습니다.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="ghost" size="sm" className="text-destructive">
        <Trash2 />
        삭제
      </Button>
    </form>
  );
}
