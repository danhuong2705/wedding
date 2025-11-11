import { Timestamp } from 'firebase/firestore';
import React, { useMemo } from 'react';
import { FaHeart } from 'react-icons/fa'; // Icon ghim trái tim
import Masonry from 'react-masonry-css';

import styles from '../../styles/wish-list.module.scss';
// 1. Định nghĩa các màu pastel ngẫu nhiên cho ghim
const pinColors = [
  '#fbc2eb', // Pink
  '#a6d1e6', // Blue
  '#ffadad', // Red pastel
  '#ffd6a5', // Orange pastel
  '#caffbf', // Green pastel
  '#b39ddb', // Violet pastel
];

// 2. Hàm helper lấy màu ngẫu nhiên
const getRandomColor = () => {
  return pinColors[Math.floor(Math.random() * pinColors.length)];
};

// 3. Định nghĩa kiểu dữ liệu (phải khớp với Guestbook.tsx)
interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: Timestamp;
}

interface WishListProps {
  wishes: Wish[];
  isLoading: boolean;
}

const WishList: React.FC<WishListProps> = ({ wishes, isLoading }) => {

  // 4. Gán màu ngẫu nhiên cho mỗi lời chúc
  // Dùng useMemo để màu sắc không bị thay đổi sau mỗi lần re-render
  const wishWithColors = useMemo(() => {
    return wishes.map((wish) => ({
      ...wish,
      pinColor: getRandomColor(),
    }));
  }, [wishes]);
  // 2. ĐỊNH NGHĨA SỐ CỘT CHO MASONRY
  // Đây là các "điểm dừng" (breakpoints)
  const breakpointColumnsObj = {
    default: 5,     // Mặc định 5 cột
    1200: 4,        // 4 cột khi màn hình <= 1200px
    992: 3,         // 3 cột khi màn hình <= 992px
    768: 2,         // 2 cột khi màn hình <= 768px
    576: 1          // 1 cột khi màn hình <= 576px
  };
  // 5. Render nội dung
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.myMasonryGrid}           // Class cho container
      columnClassName={styles.myMasonryGrid_column} // Class cho mỗi cột
    >
      {/* Phần loading và "Be the first" nên được đặt BÊN NGOÀI Masonry
        nếu không nó sẽ bị coi là một "cột".
        Tôi sẽ đặt chúng bên trên.
      */}

      {isLoading && <p>Đang tải lời chúc...</p>}

      {!isLoading && wishes.length === 0 && (
        <p>Hãy là người đầu tiên gửi lời chúc!</p>
      )}

      {/* 5. Vẫn .map() như bình thường */}
      {!isLoading &&
        wishWithColors.map((wish) => (
          <div key={wish.id} className={styles.wishCard}>
            <FaHeart
              className={styles.heartPin}
              style={{ color: wish.pinColor }}
            />
            <p className={styles.wishMessage}>"{wish.message}"</p>
            <span className={styles.wishName}>- {wish.name} -</span>
          </div>
        ))}
    </Masonry>
  );
};

export default WishList;