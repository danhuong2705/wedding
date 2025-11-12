import React, { useState, useRef, useEffect } from 'react';

// Bạn có thể dùng icon thật, ở đây tôi dùng text

const MusicPlayer = () => {
  // State để theo dõi nhạc đang BẬT hay TẮT
  const [isPlaying, setIsPlaying] = useState(false);

  // Dùng useRef để giữ tham chiếu đến thẻ <audio>
  const audioRef = useRef(new Audio('/audio/beautiful-in-white.mp3'));

  // Thiết lập cho file nhạc
  useEffect(() => {
    audioRef.current.loop = true;
  }, []);

  // Hàm để bật/tắt nhạc
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      // Dùng .play() có thể bị lỗi (do chính sách autoplay)
      // nên chúng ta dùng promise để "bắt" lỗi nếu có
      audio.play().catch(error => {
        // Có thể người dùng chưa tương tác, nên trình duyệt chặn
        console.warn("Autoplay bị chặn, cần người dùng tương tác.", error);
      });
    }
    setIsPlaying(!isPlaying); // Cập nhật state
  };

  return (
    <button
      onClick={togglePlay}
      style={{
        position: 'fixed', // Nằm cố định trên màn hình
        bottom: '50px',
        right: '20px',     // Cách phải 20px
        zIndex: 1000,      // Nằm trên các lớp khác
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
      }}
    >
      {/* Thay đổi icon dựa trên state */}
      {isPlaying ? <img src="/images/speaker.png" alt='speaker' /> : <img src="/images/mute.png" alt='mute' />}
    </button>
  );
};

export default MusicPlayer;