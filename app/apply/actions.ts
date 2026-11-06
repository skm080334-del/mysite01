"use server";

/* 수강신청서의 '신청하기' 버튼이 실제로 하는 일 (서버에서 실행됨)
   - 입력값을 확인한 뒤 Supabase 의 applications 표에 저장
   - 저장은 서버의 비밀 키로만 가능 (방문자가 표를 직접 읽거나 쓸 수 없음) */

import { revalidatePath } from "next/cache";

import { siteConfig } from "@/site.config";
import { getAdminClient } from "@/lib/supabase-admin";

export type ApplyState = { ok?: boolean; message?: string };

const PHONE = /^0\d{1,2}-?\d{3,4}-?\d{4}$/; // 예: 010-1234-5678, 01012345678
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitApplication(_prev: ApplyState, formData: FormData): Promise<ApplyState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  // 자동 등록 프로그램 막기: 사람에게는 안 보이는 칸이 채워져 있으면 저장하지 않음
  if (get("website")) return { ok: true, message: siteConfig.apply.success };

  const name = get("name");
  const phone = get("phone");
  const email = get("email");
  const course = get("course");
  const ageGroup = get("age_group");
  const region = get("region");
  const message = get("message");
  const agreed = formData.get("agree") === "on";

  if (!name || name.length > 30) return { message: "이름을 30자 이내로 입력해 주세요." };
  if (!PHONE.test(phone)) return { message: "연락처를 010-1234-5678 형식으로 입력해 주세요." };
  if (email && (email.length > 100 || !EMAIL.test(email))) {
    return { message: "이메일 주소를 다시 확인해 주세요." };
  }
  if (!siteConfig.features.cards.some((c) => c.title === course)) {
    return { message: "희망 과정을 선택해 주세요." };
  }
  if (ageGroup && !siteConfig.apply.ageGroups.includes(ageGroup)) {
    return { message: "연령대를 다시 선택해 주세요." };
  }
  if (region && !siteConfig.apply.regions.includes(region)) {
    return { message: "거주 지역을 다시 선택해 주세요." };
  }
  if (message.length > 1000) return { message: "하고 싶은 말은 1000자 이내로 적어 주세요." };
  if (!agreed) return { message: "개인정보 수집·이용에 동의해 주세요." };

  const supabase = getAdminClient();
  if (!supabase) return { message: "지금은 신청을 받을 수 없어요. 잠시 후 다시 시도해 주세요." };

  const { error } = await supabase.from("applications").insert({
    name,
    phone,
    email: email || null,
    course,
    age_group: ageGroup || null,
    region: region || null,
    message: message || null,
  });

  if (error) {
    console.error("[submitApplication] 저장 실패:", error.message);
    return { message: "신청을 저장하지 못했어요. 잠시 후 다시 시도해 주세요." };
  }

  revalidatePath("/admin");
  return { ok: true, message: siteConfig.apply.success };
}
