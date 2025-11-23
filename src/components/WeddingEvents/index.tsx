import React from 'react';

import styles from '../../styles/wedding-events.module.scss';


const WeddingEventsNew: React.FC = () => {
  const pinkColor = '#fbc2eb';
  const blueColor = '#a6d1e6';

  const brideEvent = {
    title: "Bride's Home",
    date: 'Sunday, November 30, 2025',
    time: '10:30',
    location: "Minh Quan 7, Tran Yen, Lao Cai",
    mapLink: 'https://maps.app.goo.gl/3qzb3bqmU3svjytaA', // Thay link Google Map thật
    image: '/images/flower-gate.png', // Sử dụng ảnh đã import
    imageAlt: "Bride's Home decorated for the ceremony",
  };

  const groomEvent = {
    title: "Groom's Home",
    date: 'Sunday, November 30, 2025',
    time: '16:00',
    location: "Vong Nguyet, Tam Giang, Bac Ninh",
    mapLink: 'https://maps.app.goo.gl/fXTuKMqVFv39BUr69', // Thay link Google Map thật
    image: '/images/table.png', // Sử dụng ảnh đã import
    imageAlt: "Groom's Home decorated for the reception",
  };

  return (
    <section className={styles.weddingEventsSection}>
      <h2 className={styles.sectionTitle} data-aos="flip-up">Wedding Ceremony</h2>
      <p className={styles.sectionDescription} data-aos="flip-up">
        We warmly invite you to share our joy at these special events.
      </p>

      {/* --- BLOCK 1: BRIDE'S HOME (Thông tin trái, ảnh phải) --- */}
      <div className={`${styles.eventBlock} ${styles.brideEventBlock}`}>
        <div className={styles.infoContent}>
          <h3 className={styles.eventTitle}>{brideEvent.title}</h3>
          <p className={styles.eventDetail}>
            <strong>Date:</strong> {brideEvent.date}
          </p>
          <p className={styles.eventDetail}>
            <strong>Time:</strong> {brideEvent.time}
          </p>
          <p className={styles.eventDetail}>
            <strong>Location:</strong> {brideEvent.location}
          </p>
          <a
            href={brideEvent.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapButton}
            aria-label="View map to bride's home"
          >
            <img src="/images/location-icon.png" alt="Map Icon" className={styles.mapIcon}
              loading='lazy'
            />
            <span>View Map</span>
          </a>
          <div className={styles.note}>* For directions or if you cannot reach the bride, <br /> please contact: <a href='tel:0982208272'><strong>0982 208 272</strong></a> (Mr. Nam - Bride's Brother)</div>

        </div>
        <div className={styles.imageContent} data-aos="fade-left" data-aos-duration="1000">
          <img src={brideEvent.image} alt={brideEvent.imageAlt} className={styles.eventImage}
            loading='lazy'
          />
        </div>
      </div>

      {/* --- BLOCK 2: GROOM'S HOME (Ảnh trái, thông tin phải) --- */}
      <div className={`${styles.eventBlock} ${styles.groomEventBlock}`}>
        <div className={styles.imageContent} data-aos="fade-right" data-aos-duration="1000">
          <img src={groomEvent.image} alt={groomEvent.imageAlt} className={styles.eventImage} loading='lazy' />
        </div>
        <div className={styles.infoContent}>
          <h3 className={styles.eventTitle}>{groomEvent.title}</h3>
          <p className={styles.eventDetail}>
            <strong>Date:</strong> {groomEvent.date}
          </p>
          <p className={styles.eventDetail}>
            <strong>Time:</strong> {groomEvent.time}
          </p>
          <p className={styles.eventDetail}>
            <strong>Location:</strong> {groomEvent.location}
          </p>
          <a
            href={groomEvent.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapButton}
            aria-label="View map to groom's home"
          >
            <img src="/images/location-icon.png" alt="Map Icon" className={styles.mapIcon} loading='lazy'
            />
            <span>View Map</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WeddingEventsNew;