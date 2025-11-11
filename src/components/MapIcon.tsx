import React from 'react';

// Định nghĩa props cho component
interface PrettyMapIconProps {
  primaryColor: '#fbc2eb' | '#a6d1e6';
  secondaryColor: '#fbc2eb' | '#a6d1e6';
  className?: string;
}

/**
 * Icon bản đồ được vẽ theo phong cách
 * lãng mạn với nơ và trái tim.
 */
export const PrettyMapIcon: React.FC<PrettyMapIconProps> = ({
  primaryColor,
  secondaryColor,
  className,
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 80 104" // Tinh chỉnh viewBox
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true" // Icon này mang tính trang trí
    >
      {/* 1. Chiếc nơ (Màu phụ) */}
      <g className="bow">
        <path
          d="M32 15C22 5 12 5 12 15C12 25 22 25 32 15Z"
          fill={secondaryColor}
        />
        <path
          d="M48 15C58 5 68 5 68 15C68 25 58 25 48 15Z"
          fill={secondaryColor}
        />
        <path
          d="M40 28C38 28 36 26 36 24C36 21 38 19 40 19C42 19 44 21 44 24C44 26 42 28 40 28Z"
          fill={secondaryColor}
          stroke="#fff"
          strokeWidth="1.5"
        />
        <path
          d="M34 22C30 32 28 40 30 45"
          stroke={secondaryColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M46 22C50 32 52 40 50 45"
          stroke={secondaryColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* 2. Thân pin (Màu chính) - Bắt đầu từ y=32 */}
      <path
        d="M40 32C23.4 32 10 45.4 10 62C10 87 40 104 40 104C40 104 70 87 70 62C70 45.4 56.6 32 40 32Z"
        fill={primaryColor}
      />

      {/* 3. Trái tim (Màu trắng) - Căn giữa trong thân pin */}
      <path
        d="M40 58C37 55 33 55 30 58C27 61 27 65 30 68L40 78L50 68C53 65 53 61 50 58C47 55 43 55 40 58Z"
        fill="#FFFFFF"
      />
    </svg>
  );
};