import React, { useState } from 'react';

import styles from '../../styles/send-gifts.module.scss';

const SendGifts: React.FC = () => {
  // --- THÔNG TIN CỦA CÔ DÂU VÀ CHÚ RỂ ---
  // Bạn hãy thay thế bằng thông tin và đường dẫn ảnh QR code thật của mình nhé!
  const brideInfo = {
    name: 'Dắn Hương',
    bank: 'Techcombank',
    accountNumber: '2705199721',
    accountName: 'DAN THI DAN HUONG',
    qrCodeSrc: '/images/qr-huongdtt.jpeg', // Đảm bảo đường dẫn này đúng
  };

  const groomInfo = {
    name: 'Nguyễn Viên',
    bank: 'Techcombank',
    accountNumber: '9989621896',
    accountName: 'NGUYEN VAN VIEN',
    qrCodeSrc: '/images/qr-viennv.jpeg', // Đảm bảo đường dẫn này đúng
  };
  const [copiedStatus, setCopiedStatus] = useState<{ [key: string]: boolean }>({});

  const handleCopy = (accountNumber: string, person: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedStatus(prev => ({ ...prev, [person]: true }));
    setTimeout(() => {
      setCopiedStatus(prev => ({ ...prev, [person]: false }));
    }, 2000);
  };

  return (
    <section className={styles.giftsSection}>
      <h2 className={styles.sectionTitle}>
        <img src="/images/gift.png" alt='gift' loading='lazy' />
        Send a Gift
      </h2>
      <div className={styles.giftsContainer}>
        {/* ----- BRIDE'S COLUMN ----- */}
        <div className={`${styles.giftBlock} ${styles.pinkTheme}`} >
          <h3 className={styles.personName}>{brideInfo.name}</h3>
          <div className={styles.qrCode}>
            <img src={brideInfo.qrCodeSrc} alt={`QR Code for ${brideInfo.name}`} loading='lazy' />
          </div>
          <div className={styles.bankInfo}>
            <p> {brideInfo.bank}</p>
            <p>{brideInfo.accountNumber}</p>
            <p> {brideInfo.accountName}</p>
          </div>
          <button
            className={styles.copyButton}
            onClick={() => navigator.clipboard.writeText(brideInfo.accountNumber)}
          >
            Copy
          </button>
        </div>

        {/* ----- GROOM'S COLUMN ----- */}
        <div className={`${styles.giftBlock} ${styles.blueTheme}`} >
          <h3 className={styles.personName}>{groomInfo.name}</h3>
          <div className={styles.qrCode}>
            <img src={groomInfo.qrCodeSrc} alt={`QR Code for ${groomInfo.name}`} loading='lazy' />
          </div>
          <div className={styles.bankInfo}>
            <p> {groomInfo.bank}</p>
            <p>{groomInfo.accountNumber}</p>
            <p> {groomInfo.accountName}</p>
          </div>
          <button
            className={styles.copyButton}
            onClick={() => navigator.clipboard.writeText(groomInfo.accountNumber)}
          >
            Copy
          </button>
        </div>
      </div>
    </section>
  );
};

export default SendGifts;