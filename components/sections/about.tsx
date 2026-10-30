import { Bell } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/** 소개 섹션. 글자는 site.config.ts 의 about 에서 바꿉니다. */
export function About() {
  const { about } = siteConfig;

  return (
    <section id="profile" className="scroll-mt-16 py-24">
      <Container>
        <div className="glass grid gap-10 rounded-[2rem] p-8 sm:p-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeader eyebrow={about.eyebrow} title={about.title} />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              {about.paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
          {/* 이미지 자리: 사진을 쓰려면 public 폴더에 넣고 아래 장식을 <img src="/사진이름.jpg" /> 로 바꿔 보세요 */}
          <div className="bg-brand-gradient relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl">
            <span className="glass relative size-28 rounded-3xl sm:size-32">
              <span className="flex size-full items-center justify-center text-white">
                <Bell className="size-14 sm:size-16" />
              </span>
              {/* 알림 숫자 배지 */}
              <span className="absolute -right-3 -top-3 flex size-10 items-center justify-center rounded-full bg-secondary font-display text-lg font-extrabold text-secondary-foreground shadow-lg">
                1
              </span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
