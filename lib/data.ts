import { sampleItems, siteConfig } from "@/site.config";
import { getPublicClient } from "@/lib/supabase";
import type { Item } from "@/lib/types";

/**
 * 특정 섹션의 카드 목록을 가져옵니다.
 * - Supabase가 연결 안 됐으면: site.config.ts 의 예시 카드를 보여줌
 * - 연결됐으면: 데이터베이스에서 '보이기'로 설정된 카드만 순서대로 가져옴
 */
export async function getItems(section: string): Promise<Item[]> {
  const supabase = getPublicClient();
  const samples = sampleItems.filter((item) => item.section === section);
  if (!supabase) return samples;

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("section", section)
    .eq("is_visible", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[getItems] Supabase 읽기 실패:", error.message);
    return samples;
  }
  return (data ?? []) as Item[];
}

/** 관리자 페이지에서 고칠 수 있는 히어로 문구 7개 (key 는 site_texts 표의 key 와 같음) */
export const HERO_TEXT_FIELDS = [
  { key: "hero.eyebrow", label: "위 작은 글씨", kind: "text" },
  { key: "hero.title", label: "제목 (Enter로 줄바꿈)", kind: "multiline" },
  { key: "hero.description", label: "설명", kind: "multiline" },
  { key: "hero.primaryCta.label", label: "첫 번째 버튼 글자", kind: "text" },
  { key: "hero.primaryCta.href", label: "첫 번째 버튼 이동 주소", kind: "link" },
  { key: "hero.secondaryCta.label", label: "두 번째 버튼 글자", kind: "text" },
  { key: "hero.secondaryCta.href", label: "두 번째 버튼 이동 주소", kind: "link" },
] as const;

export type HeroTextKey = (typeof HERO_TEXT_FIELDS)[number]["key"];

/**
 * 히어로 문구를 가져옵니다.
 * - 관리자 페이지에서 저장한 문구가 있으면 그것을, 없으면 site.config.ts 의 기본 문구를 씀
 * - Supabase가 연결 안 됐거나 읽기에 실패하면 기본 문구만 씀
 */
export async function getHeroText() {
  const { hero } = siteConfig;
  const saved: Partial<Record<HeroTextKey, string>> = {};

  const supabase = getPublicClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("site_texts")
      .select("key, value")
      .like("key", "hero.%");
    if (error) {
      console.error("[getHeroText] Supabase 읽기 실패:", error.message);
    } else {
      for (const row of data ?? []) saved[row.key as HeroTextKey] = row.value;
    }
  }

  return {
    eyebrow: saved["hero.eyebrow"] ?? hero.eyebrow,
    title: saved["hero.title"] ?? hero.title,
    description: saved["hero.description"] ?? hero.description,
    primaryCta: {
      label: saved["hero.primaryCta.label"] ?? hero.primaryCta.label,
      href: saved["hero.primaryCta.href"] ?? hero.primaryCta.href,
    },
    secondaryCta: {
      label: saved["hero.secondaryCta.label"] ?? hero.secondaryCta.label,
      href: saved["hero.secondaryCta.href"] ?? hero.secondaryCta.href,
    },
  };
}
