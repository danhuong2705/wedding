import React, { useEffect, useState } from 'react';

import styles from '../../styles/countdown.module.scss';

// Định nghĩa kiểu dữ liệu cho thời gian còn lại
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Lấy ngày cưới từ hình ảnh của bạn
const weddingDate = new Date('2025-11-30T11:00:00');

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft | null => {
      const difference = +weddingDate - +new Date();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      // Khi đã qua ngày cưới
      return null;
    };

    // Cập nhật state ngay lập tức khi component mount
    const initialTimeLeft = calculateTimeLeft();
    if (initialTimeLeft) {
      setTimeLeft(initialTimeLeft);
    }

    // Thiết lập interval để cập nhật mỗi giây
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft) {
        setTimeLeft(newTimeLeft);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    // Xóa interval khi component unmount
    return () => clearInterval(timer);
  }, []);

  // Hàm để thêm số 0 đằng trước nếu số < 10 (ví dụ: 09, 08)
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>The countdown</h2>
      <div className={styles.countdownContainer}>
        <div className={`${styles.timeBlock} ${styles.pink}`}>
          <span className={styles.number}>{formatNumber(timeLeft.days)}</span>
          <span className={styles.label}>Ngày</span>
        </div>
        <div className={`${styles.timeBlock} ${styles.blue}`}>
          <span className={styles.number}>{formatNumber(timeLeft.hours)}</span>
          <span className={styles.label}>Giờ</span>
        </div>
        <div className={`${styles.timeBlock} ${styles.pink}`}>
          <span className={styles.number}>{formatNumber(timeLeft.minutes)}</span>
          <span className={styles.label}>Phút</span>
        </div>
        <div className={`${styles.timeBlock} ${styles.blue}`}>
          <span className={styles.number}>{formatNumber(timeLeft.seconds)}</span>
          <span className={styles.label}>Giây</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;