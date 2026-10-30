import Image from "next/image";
import { ArrowRight, Bell } from "lucide-react";

import { getHeroText } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

/* 첫 화면(히어로).
   - 글자는 관리자 페이지(/admin → 히어로 문구)에서 바꿉니다.
     저장한 적 없는 문구는 site.config.ts 의 hero 기본값이 보입니다.
   - 21st.dev 의 멋진 히어로로 바꾸고 싶다면: 그 컴포넌트를 components/ui 에 넣고,
     이 파일의 <section> 안쪽을 그 컴포넌트로 감싸면 됩니다. (Claude에게 /add-component 로 요청) */
export async function Hero() {
  const hero = await getHeroText();

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* 배경 이미지: 바꾸려면 public/hero-bg.jpg 파일을 다른 사진으로 교체하세요 */}
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover opacity-70"
      />
      {/* 글자가 잘 읽히도록 왼쪽·아래를 배경색으로 살짝 어둡게 덮음 */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/60 to-background/10"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent"
      />
      <Container className="grid min-h-[80svh] items-center gap-14 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div>
          <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-secondary">
            <Bell className="size-4" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl whitespace-pre-line text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {hero.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
