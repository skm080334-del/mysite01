import { ArrowRight } from "lucide-react";

import { getHeroText } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ShapePattern, ShapeTile, stripTiles } from "@/components/ui/shapes";

/* 첫 화면(히어로).
   - 글자는 관리자 페이지(/admin → 히어로 문구)에서 바꿉니다.
     저장한 적 없는 문구는 site.config.ts 의 hero 기본값이 보입니다.
   - 21st.dev 의 멋진 히어로로 바꾸고 싶다면: 그 컴포넌트를 components/ui 에 넣고,
     이 파일의 <section> 안쪽을 그 컴포넌트로 감싸면 됩니다. (Claude에게 /add-component 로 요청) */
export async function Hero() {
  const hero = await getHeroText();

  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="grid min-h-[80svh] items-center gap-12 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
        <div>
          <p className="inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-bold uppercase tracking-[0.15em] text-secondary-foreground">
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

        {/* 오른쪽 도형 바둑판 (모바일에서는 글 아래) */}
        <ShapePattern columns={3} rows={3} className="mx-auto w-full max-w-md rounded-[2rem]" />
      </Container>

      {/* 맨 아래 도형 띠 */}
      <div className="grid grid-cols-6 lg:grid-cols-12">
        {[...stripTiles, ...stripTiles].map((t, i) => (
          <ShapeTile key={i} {...t} className={i >= stripTiles.length ? "hidden lg:flex" : undefined} />
        ))}
      </div>
    </section>
  );
}
