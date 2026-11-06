/* ==========================================================================
   ★ 사이트 내용 설정 파일
   --------------------------------------------------------------------------
   사이트에 보이는 글자(이름, 소개, 메뉴, 연락처 등)는 대부분 여기에 있습니다.
   따옴표 " " 안의 글자만 바꾸고 저장하면 화면에 바로 반영됩니다.
   (따옴표, 쉼표, 중괄호 { } 는 지우지 않도록 조심!)
   ========================================================================== */

import type { Item } from "@/lib/types";

export const siteConfig = {
  /* 브라우저 탭 제목과 검색 결과에 보이는 정보 */
  name: "My Studio",
  title: "My Studio — 나의 첫 웹사이트",
  description: "바이브 코딩으로 만든 나의 웹사이트입니다.",

  /* 상단 메뉴 (href 의 /#이름 은 메인 화면 섹션의 id 와 같아야 해당 위치로 이동.
     앞에 / 를 붙여서 수강신청 페이지 같은 다른 페이지에서도 메인 화면으로 돌아옴) */
  nav: [
    { label: "천안AI센터소개", href: "/#profile" },
    { label: "수업과정", href: "/#courses" },
    { label: "수강신청", href: "/apply" },
  ],
  /* 메뉴 오른쪽 버튼 (누르면 새 탭에서 관리자 페이지가 열림) */
  adminButton: { label: "비밀 버튼", href: "/admin" },

  /* 첫 화면(히어로) */
  hero: {
    eyebrow: "AI 크리에이터 클래스",
    title: "상상만 하던 이야기,\n오늘 AI로 완성해요",
    description: "숏츠·인스타툰·웹툰까지, 천안에서 시작하는 3일 완성 창작 수업",
    primaryCta: { label: "과정 둘러보기", href: "#courses" },
    secondaryCta: { label: "수강신청", href: "/apply" },
  },

  /* 수강신청 페이지 (주소: /apply). 희망 과정 목록은 아래 features.cards 의 제목을 씀 */
  apply: {
    eyebrow: "Apply",
    title: "수강신청",
    description: "기본 정보를 남겨 주시면 담당자가 확인한 뒤 입력하신 연락처로 안내드려요.",
    ageGroups: ["청소년 (10대)", "20~30대", "40~50대", "60대 이상"],
    regions: ["천안 동남구", "천안 서북구", "천안 외 지역"],
    consent:
      "수강 안내 연락을 위해 이름·연락처·이메일을 수집하며, 교육 종료 후 1년간 보관한 뒤 파기합니다. 동의하지 않으면 신청할 수 없습니다.",
    success: "신청이 접수됐어요! 확인 후 입력하신 연락처로 안내드릴게요.",
  },

  /* 소개 섹션 */
  about: {
    eyebrow: "About",
    /* 제목 = 앞 + 강조(보라 그라데이션·밑줄) + 뒤 */
    title: { before: "천안 ", highlight: "AI 교육센터", after: " 소개" },
    /* 소개 문장 = 첫 줄 + 노란 강조 + 나머지 */
    intro: "천안 AI 교육센터는",
    introHighlight: "생성형 AI와 디지털 콘텐츠 제작",
    introRest: "을 쉽고, 재미있고, 실생활에 바로 활용할 수 있도록 가르치는 지역 기반 교육 공간입니다.",
    /* 작은 상자 3개 (\n 은 줄바꿈) — 아이콘은 순서대로 화면·사람들·전구 */
    points: ["실습 중심의\n체험형 교육", "누구나 배우는\n맞춤형 과정", "아이디어를 콘텐츠로\n만드는 창작 교육"],
    /* 맨 아래 손글씨 문구 (첫 줄은 노란색) */
    sloganLead: "AI로 배우고,",
    slogan: "직접 만들며, 나만의 콘텐츠를 완성해요!",
    /* 오른쪽 사진 (public 폴더 안) */
    image: "/about-photo.webp",
    imageAlt: "천안 AI 교육센터에서 강사와 시민들이 노트북으로 AI 수업을 들으며 웃고 있는 모습",
  },

  /* 기능(항목) 섹션의 제목 — 카드 목록 자체는 관리자 페이지(/admin)에서 관리 */
  features: {
    eyebrow: "Courses",
    title: "수업과정",
    description: "관리자 페이지에서 카드를 추가·수정·삭제할 수 있는 영역입니다.",
    /* 천안 원통 애니메이션 글자 (지금은 카드에 과정 이미지를 넣어서 쓰지 않음.
       다시 쓰려면 components/sections/features.tsx 에서 <CheonanLoop {...features.loop} /> 로 넣기) */
    loop: {
      words: ["호두과자", "천안삼거리", "뚜쥬르", "흥타령", "독립기념관"],
      ring: "천안을 배우는 AI 수업", // 아래 작은 고리 문구
      top: "CHEONAN AI CLASS", // 위쪽 작은 글씨
      badge: "천안 · 2026",
      chip: "천안을 배우는 AI 수업", // 맨 아래 주황 배지
    },
    /* 카드별 제목·그림·링크 (위에서부터 첫 번째, 두 번째, 세 번째 카드)
       - title: 관리자 페이지에 저장된 제목 대신 이 글자가 보임
       - image: 카드 위쪽 그림 자리에 넣을 이미지 (public 폴더 안, 가로:세로 4:3 이 잘 맞음)
       - link : 누르면 새 탭으로 열릴 수업 안내 페이지 (public/courses 폴더 안) */
    cards: [
      { title: "숏츠 만들기", image: "/courses/card-shorts.webp", link: "/courses/shorts-3day.html" },
      { title: "인스타툰 만들기", image: "/courses/card-instatoon.webp", link: "/courses/instatoon-poster.html" },
      { title: "웹툰 만들기", image: "/courses/card-webtoon.webp", link: "/courses/webtoon-poster.html" },
    ],
  },

  /* 연락처 섹션 */
  contact: {
    eyebrow: "Contact",
    title: "함께 이야기해요",
    description: "궁금한 점이 있다면 언제든 연락 주세요.",
    email: "hello@example.com",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "GitHub", href: "https://github.com" },
    ],
  },

  /* 맨 아래(푸터) */
  footer: {
    copyright: "© 2026 My Studio. All rights reserved.",
  },

  /* 관리자 페이지에서 관리할 섹션 목록.
     key  = 데이터베이스에 저장되는 이름(영문 소문자),
     label = 관리자 화면에 보이는 이름.
     예) 포트폴리오라면 { key: "works", label: "작업물" } 을 추가 */
  adminSections: [{ key: "features", label: "기능" }],
};

/* Supabase를 아직 연결하지 않았을 때 대신 보여줄 예시 카드.
   Supabase를 연결하면 이 내용 대신 관리자 페이지에서 등록한 카드가 보입니다. */
export const sampleItems: Item[] = [
  {
    id: "sample-1",
    section: "features",
    title: "첫 번째 기능",
    description: "카드 하나에 제목, 설명, 이미지, 링크를 넣을 수 있어요.",
    image_url: null,
    link_url: null,
    sort_order: 1,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "sample-2",
    section: "features",
    title: "두 번째 기능",
    description: "관리자 페이지에서 순서를 바꾸거나 숨길 수도 있어요.",
    image_url: null,
    link_url: null,
    sort_order: 2,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "sample-3",
    section: "features",
    title: "세 번째 기능",
    description: "포트폴리오라면 작업물, 가게라면 메뉴처럼 자유롭게 쓰세요.",
    image_url: null,
    link_url: null,
    sort_order: 3,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
];
