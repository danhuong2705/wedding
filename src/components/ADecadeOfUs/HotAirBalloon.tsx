import React, { memo, useCallback, useEffect, useRef, useState } from 'react'; // Thêm useState, useEffect

import styles from '../../styles/hot-air-balloon.module.scss';

import { Milestone } from '@/constants/data';

interface Props {
  id: number;
  onAnimationComplete: (id: number) => void;
  milestone: Milestone;
  left: number;
  duration: number;
  size: number;
  delay: number;
  graphicUrl: string;
}

const HotAirBalloon: React.FC<Props> = ({
  id,
  onAnimationComplete,
  milestone,
  left,
  duration,
  size,
  delay,
  graphicUrl,
}) => {
  const [animationKey, setAnimationKey] = useState(0);

  // 3. Dùng 'useRef' để theo dõi lần render đầu tiên
  const isFirstRun = useRef(true);

  // 4. 'useEffect' này sẽ chạy mỗi khi props thay đổi
  useEffect(() => {
    // 5. Bỏ qua lần render đầu tiên
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    // 6. Nếu không phải lần đầu (tức là được 'tái sử dụng')
    // Tăng 'animationKey' để buộc 'div' bên dưới re-mount
    setAnimationKey((k) => k + 1);

  }, [
    // 7. Theo dõi các props. Khi chúng thay đổi, 'useEffect' này chạy
    milestone,
    left,
    duration,
    size,
    delay,
    graphicUrl,
  ]);

  // 8. Hàm callback ổn định (giữ nguyên)
  const handleEnd = useCallback(() => {
    onAnimationComplete(id);
  }, [id, onAnimationComplete]);

  return (
    <div
      // 9. Dùng 'animationKey' để restart
      key={animationKey}
      className={styles.balloonWrapper}
      style={{
        left: `${left}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
      onAnimationEnd={handleEnd}
    >
      <div className={styles.balloon} style={{ transform: `scale(${size})` }}>
        <img
          src={graphicUrl}
          alt=""
          className={styles.balloonGraphic}
          loading='lazy'
        />
        <img
          src={milestone.imageUrl}
          alt={`Kỷ niệm năm ${milestone.year}`}
          className={styles.milestonePhoto}
          loading="lazy"
        />
        <span className={styles.yearTag}>{milestone.year}</span>
      </div>
    </div>
  );
};

export default memo(HotAirBalloon);