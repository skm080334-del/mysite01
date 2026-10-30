import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import styles from "./cheonan-loop.module.css";

/* 천안 단어들이 원통 둘레를 따라 계속 도는 루프 애니메이션.
   글자는 site.config.ts 의 features.loop 에서 바꿉니다.
   사용 예) <CheonanLoop words={["호두과자", "뚜쥬르"]} ring="천안을 배우는 AI 수업" ... /> */

type Props = {
  words: readonly string[];
  ring: string;
  top: string;
  badge: string;
  chip: string;
  className?: string;
};

// 원통 둘레에 글자를 같은 간격으로 배치 (둘레 = 글자 수 × 글자 폭 → 반지름 = 둘레 ÷ 2π)
function Ring({
  chars,
  charWidthEm,
  className,
  style,
}: {
  chars: string[];
  charWidthEm: number;
  className: string;
  style?: CSSProperties;
}) {
  const radius = (chars.length * charWidthEm) / (2 * Math.PI);
  return (
    <div className={cn(styles.ring, className)} style={style}>
      {chars.map((c, i) => (
        <div
          key={i}
          className={cn(styles.ch, c === "✦" && styles.dot)}
          style={{ "--a": `${(i * 360) / chars.length}deg`, "--r": `${radius}em` } as CSSProperties}
        >
          <span className={styles.front}>{c}</span>
          <span className={styles.back}>{c}</span>
        </div>
      ))}
    </div>
  );
}

function Cube({ style }: { style: CSSProperties }) {
  return (
    <div className={styles.cube} style={style}>
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

export function CheonanLoop({ words, ring, top, badge, chip, className }: Props) {
  const mainChars = words.flatMap((w) => [...w, "✦"]);
  const subChars = [...`${ring} ✦ `.repeat(3)].map((c) => (c === " " ? " " : c));

  return (
    <div aria-label={words.join(", ")} role="img" className={cn(styles.scene, className)}>
      <div className={styles.wall} />
      <div className={styles.floor} />
      <div className={styles.streak} />
      <div className={cn(styles.streak, styles.streakTwo)} />

      <div className={styles.top}>
        {top}
        <br />
        <span className={styles.badge}>{badge}</span>
      </div>

      <div className={styles.stage}>
        <Ring chars={mainChars} charWidthEm={1.1} className={styles.main} />
        <Ring
          chars={subChars}
          charWidthEm={1}
          className={cn(styles.sub, styles.reverse)}
          style={{ "--t": "22s", "--y": "12cqw" } as CSSProperties}
        />
      </div>

      <Cube style={{ "--s": "9cqw", "--d": "7s", "--c": "linear-gradient(135deg,#ffffff,#9fc3ff)", top: "22%", right: "9%" } as CSSProperties} />
      <Cube style={{ "--s": "6cqw", "--d": "5s", "--c": "linear-gradient(135deg,#ff9a1f,#e53228)", bottom: "30%", left: "8%" } as CSSProperties} />
      <Cube style={{ "--s": "4cqw", "--d": "6s", "--c": "linear-gradient(135deg,#d4c2fc,#a855f7)", top: "30%", left: "16%" } as CSSProperties} />

      <span className={styles.spark} style={{ top: "10%", left: "8%" }}>✦</span>
      <span className={styles.spark} style={{ top: "16%", right: "6%", "--dl": ".5s", "--z": "5cqw" } as CSSProperties}>✦</span>
      <span className={styles.spark} style={{ bottom: "22%", right: "14%", "--dl": "1s", "--z": "3cqw" } as CSSProperties}>✦</span>
      <span className={styles.spark} style={{ bottom: "12%", left: "20%", "--dl": ".8s", "--z": "3.5cqw" } as CSSProperties}>✦</span>

      <div className={styles.chip}>{chip}</div>
    </div>
  );
}
