import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { ApplyForm } from "./_components/apply-form";

/* 수강신청 페이지 (주소: /apply)
   - 글자와 고를 수 있는 항목: site.config.ts 의 apply (희망 과정은 features.cards 의 제목)
   - 접수된 신청: 관리자 페이지 → 수강신청 탭에서 확인
   - /apply?course=웹툰 만들기 처럼 주소에 과정 이름을 붙이면 그 과정이 미리 선택됨 */

export const metadata = { title: "수강신청" };

export default async function ApplyPage(props: PageProps<"/apply">) {
  const { apply, features } = siteConfig;
  const searchParams = await props.searchParams;
  const courses = features.cards.map((c) => c.title);
  const requested = typeof searchParams.course === "string" ? searchParams.course : undefined;

  return (
    <>
      <Navbar />
      <main className="flex-1 py-16 sm:py-24">
        <Container className="max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            홈으로
          </Link>

          <SectionHeader
            eyebrow={apply.eyebrow}
            title={apply.title}
            description={apply.description}
            className="mt-8"
          />

          <div className="glass mt-10 rounded-[2rem] p-6 sm:p-10">
            <ApplyForm
              courses={courses}
              ageGroups={apply.ageGroups}
              regions={apply.regions}
              consent={apply.consent}
              defaultCourse={courses.includes(requested ?? "") ? requested : undefined}
            />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
