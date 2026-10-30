import { Mail } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";

/** 연락처 섹션. 이메일과 링크는 site.config.ts 의 contact 에서 바꿉니다. */
export function Contact() {
  const { contact } = siteConfig;

  return (
    <section id="contact" className="scroll-mt-16 py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-accent px-6 py-16 text-center text-accent-foreground sm:px-12">
          {/* 모서리 장식 도형 */}
          <div aria-hidden className="absolute -left-10 -top-10 size-32 rounded-full bg-secondary" />
          <div aria-hidden className="absolute -bottom-12 -right-6 h-24 w-40 rounded-t-full bg-primary" />
          <SectionHeader
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
            className="relative mx-auto"
            inverted
          />
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <a href={`mailto:${contact.email}`}>
                <Mail />
                {contact.email}
              </a>
            </Button>
            {contact.links.map((link) => (
              <Button
                key={link.href}
                asChild
                size="lg"
                variant="outline"
                className="border-transparent text-foreground"
              >
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
