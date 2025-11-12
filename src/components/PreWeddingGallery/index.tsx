import React from 'react';
import styles from '../../styles/pre-wedding-gallery.module.scss';
import { FaCameraRetro } from 'react-icons/fa'; // Một icon xinh xắn cho tiêu đề

// 1. Tạo một mảng chứa 10 ảnh của bạn
// Hãy đảm bảo bạn thay thế các đường dẫn này
const imagePaths = [
  '/images/wedding-photos/TINN8991.webp',
  '/images/wedding-photos/TINN8834.webp',
  '/images/wedding-photos/TINN8861.webp',
  '/images/wedding-photos/TINN8926.webp',
  '/images/wedding-photos/TINN8766.webp',
  '/images/wedding-photos/TINN9084.webp',
  '/images/wedding-photos/TINN9151.webp',
  '/images/wedding-photos/TINN9218.webp',
  '/images/wedding-photos/TINN9251.webp',
  '/images/wedding-photos/TINN9262.webp',
];


const heroImage = imagePaths[0]; // Lấy ảnh đầu tiên
const thumbnailImages = imagePaths.slice(1); // Lấy 9 ảnh còn lại

const PreweddingHeroGrid: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.gallerySection}>

        <h2 className={styles.sectionTitle}>
          <FaCameraRetro />
          Our Pre-Wedding Moments
        </h2>
        <p className={styles.sectionDescription}>
          A glimpse into our journey of love.
        </p>

        {/* 3. Cấu trúc layout mới */}
        <div className={styles.galleryContainer}>

          {/* --- CỘT 1: ẢNH HERO --- */}
          <div className={styles.heroWrapper}>
            <img
              src={heroImage}
              alt="Pre-wedding featured"
              className={styles.heroImage}
              loading="lazy"
            />
          </div>

          {/* --- CỘT 2: LƯỚI 9 ẢNH THU NHỎ --- */}
          <div className={styles.thumbnailGrid}>
            {thumbnailImages.map((src, index) => (
              <div key={index} className={styles.thumbWrapper}>
                <img
                  src={src}
                  alt={`Pre-wedding thumbnail ${index + 1}`}
                  className={styles.thumbImage}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreweddingHeroGrid;