import React from 'react';

// Định nghĩa màu
const pinkColor = '#fbc2eb';
const blueColor = '#a6d1e6';
const textColor = '#555';

/**
 * Hình ảnh sáng tạo cho section RSVP,
 * vẽ một lá thư mời.
 */
export const PrettyRsvpIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Nền xanh nhạt */}
      <rect
        x="10"
        y="30"
        width="130"
        height="100"
        rx="10"
        fill="#e8f3f9"
        stroke={blueColor}
        strokeWidth="2"
      />
      {/* Phong bì (màu hồng) */}
      <g>
        <path
          d="M20 50 L130 50 L130 120 L20 120 Z"
          fill={pinkColor}
          stroke="#fff"
          strokeWidth="3"
        />
        <path
          d="M20 50 L75 90 L130 50"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Tấm thiệp bên trong (màu trắng) */}
      <rect
        x="30"
        y="10"
        width="90"
        height="100"
        rx="5"
        fill="#ffffff"
        stroke={textColor}
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* Trái tim trên thiệp */}
      <path
        d="M75 35C72 32 68 32 65 35C62 38 62 42 65 45L75 55L85 45C88 42 88 38 85 35C82 32 78 32 75 35Z"
        fill={pinkColor}
        stroke={pinkColor}
        strokeWidth="1.5"
      />

      {/* Các dòng text giả (trên thiệp) */}
      <line x1="50" y1="65" x2="100" y2="65" stroke={textColor} strokeWidth="1.5" />
      <line x1="50" y1="75" x2="100" y2="75" stroke={textColor} strokeWidth="1.5" />
      <line x1="50" y1="85" x2="80" y2="85" stroke={textColor} strokeWidth="1.5" />
    </svg>
  );
};