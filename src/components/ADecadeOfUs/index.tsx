import React, { memo, useCallback, useEffect, useRef, useState, useTransition } from 'react';

import styles from '../../styles/a-decade-of-us.module.scss';

import { Milestone, milestones } from '@/constants/data';

import HotAirBalloon from './HotAirBalloon';
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
  id: number; // ID này sẽ cố định (ví dụ: 1, 2, 3...)
  // key: number; // Key này sẽ thay đổi để buộc React re-render
  milestone: Milestone;
  left: number;
  duration: number;
  size: number;
  delay: number;
  graphicUrl: string;
}

const NUM_BALLOONS = 8; // Số lượng khinh khí cầu TỒN TẠI (pool)
const MIN_SEPARATION_PERCENT = 20;

// Component cha sẽ được memo để tránh re-render không cần thiết
const ADecadeOfUs: React.FC = memo(() => {
  const [activeBalloons, setActiveBalloons] = useState<ActiveBalloon[]>([]);
  const [isPending, startTransition] = useTransition();
  // ... (useRef và useState cho shuffle giữ nguyên)
  const [shuffledMilestones] = useState(() => shuffleArray(milestones));
  const nextMilestoneIndex = useRef(0);
  const [shuffledGraphics] = useState(() => shuffleArray(BALLOON_GRAPHIC_URLS));
  const nextGraphicIndex = useRef(0);

  // -------------------------------------------
  // MỚI: Hàm 'getNewBalloonData'
  // Hàm này chỉ lấy dữ liệu, không tạo state
  // -------------------------------------------
  const getNewBalloonData = useCallback(
    (existingBalloons: ActiveBalloon[]): Omit<ActiveBalloon, 'id' | 'key'> => {
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
        milestone: milestone,
        left: newLeft,
        duration: Math.random() * 8 + 12,
        size: Math.random() * 0.4 + 0.8,
        delay: 0,
        graphicUrl: randomGraphicUrl,
      };
    },
    [shuffledGraphics, shuffledMilestones]
  );

  // -------------------------------------------
  // CẬP NHẬT: handleAnimationEnd (Logic tái sử dụng)
  // -------------------------------------------
  const handleAnimationEnd = useCallback(
    (id: number) => {
      // Khi 1 balloon (ID cố định) bay xong,
      // chúng ta cập nhật state cho CHÍNH balloon đó
      setActiveBalloons((currentBalloons) => {
        // Lấy dữ liệu mới, kiểm tra với các balloon *khác*
        const newData = getNewBalloonData(
          currentBalloons.filter((b) => b.id !== id)
        );

        return currentBalloons.map((balloon) => {
          if (balloon.id === id) {
            // TÁI SỬ DỤNG: Gán dữ liệu mới và một 'key' mới
            // 'key' mới sẽ buộc React TÁI TẠO component này
            // mà không làm giật các component khác.
            return {
              ...balloon, // Giữ ID cũ
              ...newData, // Áp dụng dữ liệu mới
              key: Math.random(), // Quan trọng: key mới để restart
            };
          }
          return balloon; // Các balloon khác giữ nguyên
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getNewBalloonData] // Không cần dependency
  );
  const resetBalloon = useCallback(
    (id: number) => {
      // 3. Bọc logic "nặng" (tính toán + set state) trong transition
      startTransition(() => {
        setActiveBalloons((currentBalloons) => {
          const newData = getNewBalloonData(
            currentBalloons.filter((b) => b.id !== id)
          );
          return currentBalloons.map((balloon) => {
            if (balloon.id === id) {
              return {
                ...balloon,
                ...newData,
                key: Math.random(), // Key-swapping vẫn là cách tốt nhất
              };
            }
            return balloon;
          });
        });
      });
    },
    [getNewBalloonData] // Dependency
  );
  // -------------------------------------------
  // CẬP NHẬT: useEffect (Chỉ chạy 1 LẦN)
  // -------------------------------------------
  useEffect(() => {
    if (shuffledMilestones.length === 0 || shuffledGraphics.length === 0) return;
    const initialBalloons: ActiveBalloon[] = [];
    const tempBalloons: ActiveBalloon[] = [];
    for (let i = 0; i < NUM_BALLOONS; i++) {
      const newData = getNewBalloonData(tempBalloons);
      const newBalloon: ActiveBalloon = {
        id: i,
        ...newData,
        // FIX LỖI "FLASH": Dùng delay DƯƠNG (ngắn)
        // (0s, 1.5s, 3s, 4.5s...)
        // Sẽ không bị "flash" và cất cánh so le
        delay: Math.random() * 2, // Cũ: Math.random() * -10
      };
      initialBalloons.push(newBalloon);
      tempBalloons.push(newBalloon);
    }
    setActiveBalloons(initialBalloons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // JSX
  return (
    <section className={styles.decadeOfUs}>
      <h2 className={styles.title} data-aos="flip-up">A Decade of Us</h2>
      <div className={styles.clouds}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={styles.cloud} />
        ))}
      </div>
      <div className={styles.balloonContainer}>
        {activeBalloons.map((balloon) => (
          <HotAirBalloon
            // -------------------------------------------
            // CẬP NHẬT: Key
            // -------------------------------------------
            key={balloon.id} // Dùng 'key' thay đổi thay vì 'id' cố định
            id={balloon.id}
            onAnimationComplete={resetBalloon}
            // -----------------
            milestone={balloon.milestone}
            left={balloon.left}
            duration={balloon.duration}
            size={balloon.size}
            delay={balloon.delay}
            graphicUrl={balloon.graphicUrl}
          />
        ))}
      </div>
    </section>
  );
}); // <-- Bọc component trong 'memo'

export default ADecadeOfUs;