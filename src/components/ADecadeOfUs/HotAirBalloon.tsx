import React, { memo } from 'react';
import styles from '../../styles/hot-air-balloon.module.scss';
import { Milestone } from '@/constants/data';


interface Props {
  milestone: Milestone;
  left: number; // Vị trí ngang (%)
  duration: number; // Thời gian bay (giây)
  size: number; // Tỷ lệ kích thước (ví dụ: 0.8, 1, 1.2)
  delay: number;
  graphicUrl: string;
  onAnimationEnd: () => void; // Callback khi bay xong

}

const HotAirBalloon: React.FC<Props> = ({
  milestone,
  left,
  duration,
  size,
  delay,
  graphicUrl,
  onAnimationEnd,
}) => {
  return (
    <div
      className={styles.balloonWrapper}
      style={{
        left: `${left}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
      // Lắng nghe sự kiện kết thúc animation
      onAnimationEnd={onAnimationEnd}
    >
      <div className={styles.balloon} style={{ transform: `scale(${size})` }}>
        {/* Ảnh khinh khí cầu của bạn */}
        <img
          src={graphicUrl}
          alt=""
          className={styles.balloonGraphic}
        />

        {/* Ảnh milestone, được lồng vào phần quả cầu */}
        <img
          src={milestone.imageUrl}
          alt={`Kỷ niệm năm ${milestone.year}`}
          className={styles.milestonePhoto}
        />

        {/* Tag năm, được lồng vào phần giỏ */}
        <span className={styles.yearTag}>{milestone.year}</span>
      </div>
    </div>
  );
};

export default memo(HotAirBalloon)