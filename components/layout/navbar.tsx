"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Menu, X } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** 상단 메뉴. 메뉴 항목은 site.config.ts 의 nav 에서 바꿉니다. 모바일에서는 햄버거 버튼으로 열림. */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight">
          {/* 로고 앞 아이콘 상자 */}
          <span aria-hidden className="icon-box size-8 rounded-lg">
            <Bell className="size-4" />
          </span>
          {siteConfig.name}
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <Button asChild size="sm">
            <a href={siteConfig.adminButton.href} target="_blank" rel="noopener noreferrer">
              {siteConfig.adminButton.label}
            </a>
          </Button>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full md:hidden"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {/* 모바일 메뉴 펼침 */}
      <nav className={cn("border-t border-border/60 md:hidden", open ? "block" : "hidden")}>
        <Container className="flex flex-col py-2">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={siteConfig.adminButton.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="py-3 text-base font-medium text-foreground"
          >
            {siteConfig.adminButton.label}
          </a>
        </Container>
      </nav>
    </header>
  );
}
