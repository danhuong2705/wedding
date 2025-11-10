import React, { useState, useEffect, useRef, useCallback, useTransition } from 'react';
import HotAirBalloon from './HotAirBalloon';
import styles from '../../styles/a-decade-of-us.module.scss';
import { Milestone, milestones } from '@/constants/data';
const BALLOON_GRAPHIC_URL = '/images/air-balloon.png';
const BALLOON_GRAPHIC_URL_2 = '/images/air-balloon-2.png';
const BALLOON_GRAPHIC_URL_3 = '/images/air-balloon-3.png';
const BALLOON_GRAPHIC_URLS = [
  BALLOON_GRAPHIC_URL,
  BALLOON_GRAPHIC_URL_2,
  BALLOON_GRAPHIC_URL_3,
];

const shuffleArray = <T,>(array: T[]): T[] => {
  let currentIndex = array.length,
    randomIndex;
  const newArray = [...array];

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
};

interface ActiveBalloon {
  id: number;
  milestone: Milestone;
  left: number;
  duration: number;
  size: number;
  delay: number;
  graphicUrl: string;
}

const NUM_BALLOONS = 7;
const MIN_SEPARATION_PERCENT = 20;

const ADecadeOfUs: React.FC = () => {
  // State (giữ nguyên)
  const [activeBalloons, setActiveBalloons] = useState<ActiveBalloon[]>([]);
  const [isPending, startTransition] = useTransition();
  // Shuffle Milestones (giữ nguyên)
  const [shuffledMilestones] = useState(() => shuffleArray(milestones));
  const nextMilestoneIndex = useRef(0);

  // Shuffle mảng ảnh khinh khí cầu (giữ nguyên)
  const [shuffledGraphics] = useState(() => shuffleArray(BALLOON_GRAPHIC_URLS));
  const nextGraphicIndex = useRef(0);

  // --- Logic tạo Balloon ---
  const createRandomBalloon = useCallback(
    (
      existingBalloons: ActiveBalloon[],
      isInitial: boolean = false // Thêm flag, mặc định là 'false'
    ): ActiveBalloon => {

      // ... (Logic tìm 'left', milestone, graphicUrl giữ nguyên)
      let newLeft: number;
      let isTooClose: boolean;
      let attempts = 0;
      do {
        newLeft = Math.random() * 94 - 2;
        isTooClose = false;
        for (const balloon of existingBalloons) {
          if (Math.abs(newLeft - balloon.left) < MIN_SEPARATION_PERCENT) {
            isTooClose = true;
            break;
          }
        }
        attempts++;
      } while (isTooClose && attempts < 10);
      const milestone = shuffledMilestones[nextMilestoneIndex.current];
      nextMilestoneIndex.current =
        (nextMilestoneIndex.current + 1) % shuffledMilestones.length;
      const randomGraphicUrl = shuffledGraphics[nextGraphicIndex.current];
      nextGraphicIndex.current =
        (nextGraphicIndex.current + 1) % shuffledGraphics.length;

      return {
        id: Date.now() + Math.random(),
        milestone: milestone,
        left: newLeft,
        duration: Math.random() * 8 + 12,
        size: Math.random() * 0.4 + 0.8,

        // -------------------------------------------
        // CẬP NHẬT QUAN TRỌNG:
        // Nếu là 'ban đầu' (isInitial) thì delay (0-5s)
        // Nếu là 'thay thế' thì delay 0
        // -------------------------------------------
        delay: isInitial ? Math.random() * 5 : 0,

        graphicUrl: randomGraphicUrl,
      };
    },
    [shuffledGraphics, shuffledMilestones]
  );

  // --- useEffect (giữ nguyên) ---
  useEffect(() => {
    if (shuffledMilestones.length === 0 || shuffledGraphics.length === 0) return;
    const initialBalloons: ActiveBalloon[] = [];

    for (let i = 0; i < NUM_BALLOONS; i++) {
      // -------------------------------------------
      // CẬP NHẬT: Truyền 'true' cho các balloon ban đầu
      // -------------------------------------------
      const newBalloon = createRandomBalloon(initialBalloons, true);
      initialBalloons.push(newBalloon);
    }
    setActiveBalloons(initialBalloons);
  }, [shuffledMilestones, shuffledGraphics, createRandomBalloon]);

  const handleAnimationEnd = useCallback(
    (id: number) => {
      startTransition(() => {
        setActiveBalloons((currentBalloons) => {
          const remainingBalloons = currentBalloons.filter((b) => b.id !== id);
          // -------------------------------------------
          // CẬP NHẬT: Không truyền gì (isInitial sẽ là false)
          // -------------------------------------------
          const newBalloon = createRandomBalloon(remainingBalloons);
          return [...remainingBalloons, newBalloon];
        });
      });
    },
    [createRandomBalloon]
  );
  // --- JSX (giữ nguyên) ---
  return (
    <section className={styles.decadeOfUs}>
      <h2 className={styles.title}>A Decade of Us</h2>

      <div className={styles.clouds}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={styles.cloud} />
        ))}
      </div>

      <div className={styles.balloonContainer}>
        {activeBalloons.map((balloon) => (
          <HotAirBalloon
            key={balloon.id}
            milestone={balloon.milestone}
            left={balloon.left}
            duration={balloon.duration}
            size={balloon.size}
            delay={balloon.delay}
            graphicUrl={balloon.graphicUrl}
            onAnimationEnd={() => handleAnimationEnd(balloon.id)}

          />
        ))}
      </div>
    </section>
  );
};

export default ADecadeOfUs;