import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { ShapePattern } from "@/components/ui/shapes";

/** 소개 섹션. 글자는 site.config.ts 의 about 에서 바꿉니다. */
export function About() {
  const { about } = siteConfig;

  return (
    <section id="about" className="scroll-mt-16 py-24">
      <Container>
        <div className="grid gap-10 rounded-[2rem] bg-primary p-8 text-primary-foreground sm:p-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeader eyebrow={about.eyebrow} title={about.title} inverted />
            <div className="mt-6 space-y-4 text-base leading-relaxed opacity-90">
              {about.paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
          {/* 이미지 자리: 사진을 쓰려면 public 폴더에 넣고 아래 도형 무늬를 <img src="/사진이름.jpg" /> 로 바꿔 보세요 */}
          <ShapePattern columns={4} rows={3} className="w-full rounded-3xl" />
        </div>
      </Container>
    </section>
  );
}
