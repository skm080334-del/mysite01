import Image from "next/image";
import { CircleCheck, Lightbulb, MonitorPlay, Users } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";

/** 소개 섹션 (왼쪽 글 + 오른쪽 사진). 글자와 사진은 site.config.ts 의 about 에서 바꿉니다. */
const pointIcons = [MonitorPlay, Users, Lightbulb];

export function About() {
  const { about } = siteConfig;

  return (
    <section id="profile" className="scroll-mt-16 py-24">
      <Container>
        <div className="glass grid overflow-hidden rounded-[2rem] md:grid-cols-[1.1fr_1fr]">
          {/* 왼쪽: 글 */}
          <div className="relative z-10 p-8 sm:p-12">
            <p className="glass inline-block rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-[0.15em] text-secondary">
              {about.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {about.title.before}
              <span className="relative inline-block">
                <span className="text-gradient">{about.title.highlight}</span>
                <span
                  aria-hidden
                  className="bg-brand-gradient absolute -bottom-1.5 left-0 h-1.5 w-full rounded-full opacity-80"
                />
              </span>
              {about.title.after}
            </h2>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {about.intro}
              <br />
              <strong className="font-bold text-highlight">{about.introHighlight}</strong>
              {about.introRest}
            </p>

            {/* 특징 상자 3개 */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {about.points.map((text, i) => {
                const Icon = pointIcons[i % pointIcons.length];
                return (
                  <li
                    key={i}
                    className="glass flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold leading-snug"
                  >
                    <Icon className="size-7 shrink-0 text-secondary" />
                    <span className="whitespace-pre-line">{text}</span>
                  </li>
                );
              })}
            </ul>

            {/* 손글씨 문구 */}
            <div className="mt-8 flex items-start gap-3">
              <CircleCheck className="mt-1 size-8 shrink-0 text-secondary" />
              <p className="font-hand text-2xl leading-snug sm:text-3xl">
                <span className="text-highlight">{about.sloganLead}</span>
                <br />
                <span className="border-b-2 border-highlight/80 pb-0.5">{about.slogan}</span>
              </p>
            </div>
          </div>

          {/* 오른쪽: 사진 (모바일에서는 글 아래) */}
          <div className="relative min-h-72 sm:min-h-96">
            <Image
              src={about.image}
              alt={about.imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            {/* 글 쪽 가장자리를 카드 색으로 부드럽게 이어 줌 */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-card/80 via-transparent to-transparent md:bg-gradient-to-r"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
