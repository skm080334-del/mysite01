"use client";

import { useActionState } from "react";
import Link from "next/link";
import { CircleCheck, Send } from "lucide-react";

import { submitApplication, type ApplyState } from "@/app/apply/actions";
import { Button } from "@/components/ui/button";

const inputClass =
  "h-12 w-full rounded-xl border bg-background/60 px-4 text-base outline-none placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-ring/50";
const labelClass = "grid gap-2 text-sm";
const titleClass = "font-semibold";

/** 수강신청 입력 칸. 고를 수 있는 항목(과정·연령대·지역)과 동의 문구는 page.tsx 에서 site.config.ts 값을 넘겨받음 */
export function ApplyForm({
  courses,
  ageGroups,
  regions,
  consent,
  defaultCourse,
}: {
  courses: string[];
  ageGroups: string[];
  regions: string[];
  consent: string;
  defaultCourse?: string;
}) {
  const [state, action, pending] = useActionState<ApplyState, FormData>(submitApplication, {});

  // 신청에 성공하면 입력 칸 대신 완료 안내를 보여 줌
  if (state.ok) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <span className="icon-box size-16">
          <CircleCheck className="size-8" />
        </span>
        <p className="text-lg font-semibold">{state.message}</p>
        <Button asChild variant="outline">
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-6">
      {/* 사람에게는 안 보이는 칸 (자동 등록 프로그램 막기용) */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          <span className={titleClass}>
            이름 <span className="text-highlight">*</span>
          </span>
          <input name="name" required maxLength={30} autoComplete="name" placeholder="홍길동" className={inputClass} />
        </label>
        <label className={labelClass}>
          <span className={titleClass}>
            연락처 <span className="text-highlight">*</span>
          </span>
          <input
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="010-1234-5678"
            className={inputClass}
          />
        </label>
      </div>

      <label className={labelClass}>
        <span className={titleClass}>이메일 (선택)</span>
        <input
          name="email"
          type="email"
          maxLength={100}
          autoComplete="email"
          placeholder="name@example.com"
          className={inputClass}
        />
      </label>

      {/* 희망 과정: 카드처럼 고르는 버튼 */}
      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm font-semibold">
          희망 과정 <span className="text-highlight">*</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {courses.map((course, i) => (
            <label
              key={course}
              className="glass flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition has-[:checked]:border-accent has-[:checked]:bg-accent/25"
            >
              <input
                type="radio"
                name="course"
                value={course}
                required
                defaultChecked={defaultCourse ? course === defaultCourse : i === 0}
                className="accent-accent"
              />
              {course}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          <span className={titleClass}>연령대</span>
          <select name="age_group" defaultValue="" className={inputClass}>
            <option value="">선택해 주세요</option>
            {ageGroups.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          <span className={titleClass}>거주 지역</span>
          <select name="region" defaultValue="" className={inputClass}>
            <option value="">선택해 주세요</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={labelClass}>
        <span className={titleClass}>하고 싶은 말 (선택)</span>
        <textarea
          name="message"
          rows={4}
          maxLength={1000}
          placeholder="신청 동기나 궁금한 점을 자유롭게 적어 주세요."
          className="w-full rounded-xl border bg-background/60 px-4 py-3 text-base outline-none placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-ring/50"
        />
      </label>

      {/* 개인정보 수집·이용 동의 */}
      <label className="glass flex cursor-pointer items-start gap-3 rounded-xl p-4 text-sm leading-relaxed text-muted-foreground">
        <input type="checkbox" name="agree" required className="mt-1 size-4 shrink-0 accent-accent" />
        <span>
          <b className="text-foreground">[필수] 개인정보 수집·이용에 동의합니다.</b>
          <br />
          {consent}
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={pending}>
          <Send />
          {pending ? "보내는 중..." : "신청하기"}
        </Button>
        {state.message ? <p className="text-sm text-destructive">{state.message}</p> : null}
      </div>
    </form>
  );
}
