import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, EyeOff } from "lucide-react";

import { siteConfig } from "@/site.config";
import { isAdmin, isAdminPasswordSet } from "@/lib/admin-auth";
import { getAdminClient } from "@/lib/supabase-admin";
import { getHeroText, HERO_TEXT_FIELDS } from "@/lib/data";
import type { Item } from "@/lib/types";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { logout } from "./actions";
import { LoginForm } from "./_components/login-form";
import { ItemForm } from "./_components/item-form";
import { DeleteButton } from "./_components/delete-button";
import { HeroForm } from "./_components/hero-form";
import { DeleteApplicationButton } from "./_components/delete-application-button";

/** 카드 섹션 탭과 별도로 있는 '히어로 문구' / '수강신청' 탭의 주소 값 */
const HERO_TAB = "hero";
const APPLY_TAB = "applications";

/** 수강신청 1건 (supabase/schema.sql 의 applications 표) */
type Application = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  course: string;
  age_group: string | null;
  region: string | null;
  message: string | null;
  created_at: string;
};

/* 관리자 페이지 (주소: /admin)
   1) 비밀번호가 설정 안 됐으면 → 설정 안내
   2) 로그인 안 했으면 → 로그인 화면
   3) Supabase 연결 안 됐으면 → 연결 안내
   4) 모두 준비됐으면 → 히어로 문구 수정, 섹션별 카드(항목) 관리 */

export const metadata = { title: "관리자" };

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto mt-16 max-w-xl rounded-xl border bg-muted/50 p-8">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

export default async function AdminPage(props: PageProps<"/admin">) {
  const searchParams = await props.searchParams;

  if (!isAdminPasswordSet()) {
    return (
      <Container>
        <Notice title="관리자 비밀번호를 먼저 설정하세요">
          <p>
            1. 프로젝트 폴더의 <code>.env.example</code> 파일을 복사해서 이름을{" "}
            <code>.env.local</code> 로 바꿉니다.
          </p>
          <p>
            2. <code>ADMIN_PASSWORD=</code> 뒤에 원하는 비밀번호를 적고 저장합니다.
          </p>
          <p>3. 개발 서버를 껐다가(Ctrl + C) 다시 켭니다(npm run dev).</p>
        </Notice>
      </Container>
    );
  }

  if (!(await isAdmin())) {
    return (
      <Container>
        <LoginForm />
      </Container>
    );
  }

  const supabase = getAdminClient();
  if (!supabase) {
    return (
      <Container>
        <Notice title="Supabase 연결이 필요합니다">
          <p>로그인은 됐어요! 이제 카드를 저장할 데이터베이스를 연결할 차례입니다.</p>
          <p>
            README.md 의 <b>「Supabase 연결하기」</b> 순서대로 <code>.env.local</code> 에 주소와
            키를 넣고, 개발 서버를 다시 켜 주세요.
          </p>
        </Notice>
      </Container>
    );
  }

  const sections = siteConfig.adminSections;
  const requested = typeof searchParams.section === "string" ? searchParams.section : undefined;
  const isHeroTab = requested === HERO_TAB;
  const isApplyTab = requested === APPLY_TAB;
  const current = sections.find((s) => s.key === requested) ?? sections[0];

  // 상단 바 + 탭 (모든 탭에서 같이 씀)
  const header = (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" aria-label="사이트로 돌아가기">
            <Link href="/">
              <ArrowLeft />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold">관리자</h1>
        </div>
        <form action={logout}>
          <Button type="submit" variant="outline" size="sm">
            로그아웃
          </Button>
        </form>
      </div>

      {/* 탭: 히어로 문구 + 카드 섹션들 (site.config.ts 의 adminSections) */}
      <nav className="mt-8 flex flex-wrap gap-2">
        <Button asChild size="sm" variant={isHeroTab ? "default" : "outline"}>
          <Link href={`/admin?section=${HERO_TAB}`}>히어로 문구</Link>
        </Button>
        {sections.map((s) => (
          <Button
            key={s.key}
            asChild
            size="sm"
            variant={!isHeroTab && !isApplyTab && s.key === current.key ? "default" : "outline"}
          >
            <Link href={`/admin?section=${s.key}`}>{s.label}</Link>
          </Button>
        ))}
        <Button asChild size="sm" variant={isApplyTab ? "default" : "outline"}>
          <Link href={`/admin?section=${APPLY_TAB}`}>수강신청</Link>
        </Button>
      </nav>
    </>
  );

  if (isHeroTab) {
    const hero = await getHeroText();
    const values: Record<string, string> = {
      "hero.eyebrow": hero.eyebrow,
      "hero.title": hero.title,
      "hero.description": hero.description,
      "hero.primaryCta.label": hero.primaryCta.label,
      "hero.primaryCta.href": hero.primaryCta.href,
      "hero.secondaryCta.label": hero.secondaryCta.label,
      "hero.secondaryCta.href": hero.secondaryCta.href,
    };
    const { error: tableError } = await supabase.from("site_texts").select("key").limit(1);

    return (
      <Container className="py-10">
        {header}
        {tableError ? (
          <p className="mt-6 rounded-lg border border-destructive/40 p-4 text-sm text-destructive">
            문구 표를 불러오지 못했습니다: {tableError.message}
            <br />
            supabase/schema.sql 을 Supabase SQL Editor 에서 다시 실행하세요.
          </p>
        ) : null}
        <section className="mt-8 max-w-2xl rounded-xl border p-6">
          <h2 className="mb-5 text-lg font-semibold">히어로(첫 화면) 문구</h2>
          <HeroForm fields={HERO_TEXT_FIELDS.map((f) => ({ ...f, value: values[f.key] }))} />
        </section>
      </Container>
    );
  }

  if (isApplyTab) {
    const { data: appData, error: appError } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    const applications = (appData ?? []) as Application[];

    return (
      <Container className="py-10">
        {header}
        {appError ? (
          <p className="mt-6 rounded-lg border border-destructive/40 p-4 text-sm text-destructive">
            수강신청 표를 불러오지 못했습니다: {appError.message}
            <br />
            supabase/schema.sql 을 Supabase SQL Editor 에서 다시 실행하세요.
          </p>
        ) : null}
        <section className="mt-8">
          <h2 className="mb-5 text-lg font-semibold">
            접수된 수강신청 <span className="text-muted-foreground">({applications.length})</span>
          </h2>
          {applications.length === 0 ? (
            <p className="text-sm text-muted-foreground">아직 접수된 신청이 없습니다.</p>
          ) : (
            <ul className="space-y-3">
              {applications.map((a) => (
                <li key={a.id} className="rounded-xl border p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold">
                        {a.name} <span className="ml-2 text-sm font-normal text-muted-foreground">{a.course}</span>
                      </p>
                      <p className="mt-1 text-sm">
                        <a href={`tel:${a.phone}`} className="underline-offset-4 hover:underline">
                          {a.phone}
                        </a>
                        {a.email ? (
                          <>
                            {" · "}
                            <a href={`mailto:${a.email}`} className="underline-offset-4 hover:underline">
                              {a.email}
                            </a>
                          </>
                        ) : null}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {[a.age_group, a.region].filter(Boolean).join(" · ") || "연령대·지역 미선택"}
                        {" · "}
                        {new Date(a.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })} 접수
                      </p>
                    </div>
                    <DeleteApplicationButton id={a.id} name={a.name} />
                  </div>
                  {a.message ? (
                    <p className="mt-3 whitespace-pre-line rounded-lg bg-muted/50 p-3 text-sm">{a.message}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>
      </Container>
    );
  }

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("section", current.key)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  const items = (data ?? []) as Item[];

  return (
    <Container className="py-10">
      {header}

      {error ? (
        <p className="mt-6 rounded-lg border border-destructive/40 p-4 text-sm text-destructive">
          데이터를 불러오지 못했습니다: {error.message}
          <br />
          supabase/schema.sql 을 Supabase SQL Editor 에서 실행했는지 확인하세요.
        </p>
      ) : null}

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* 새 항목 추가 */}
        <section className="h-fit rounded-xl border p-6">
          <h2 className="mb-5 text-lg font-semibold">{current.label} 추가</h2>
          <ItemForm section={current.key} />
        </section>

        {/* 등록된 항목 목록 */}
        <section>
          <h2 className="mb-5 text-lg font-semibold">
            등록된 {current.label} <span className="text-muted-foreground">({items.length})</span>
          </h2>
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">아직 없습니다. 왼쪽에서 추가해 보세요.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="rounded-xl border">
                  <div className="flex items-center gap-4 p-4">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {item.image_url ? (
                        <Image src={item.image_url} alt="" fill sizes="56px" className="object-cover" />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 font-medium">
                        <span className="truncate">{item.title}</span>
                        {!item.is_visible ? (
                          <EyeOff className="size-4 shrink-0 text-muted-foreground" aria-label="숨김" />
                        ) : null}
                      </p>
                      <p className="text-xs text-muted-foreground">순서 {item.sort_order}</p>
                    </div>
                    <DeleteButton id={item.id} imageUrl={item.image_url} />
                  </div>
                  <details className="border-t px-4 py-3">
                    <summary className="cursor-pointer text-sm text-muted-foreground">수정하기</summary>
                    <div className="pt-4">
                      <ItemForm section={current.key} item={item} />
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Container>
  );
}
