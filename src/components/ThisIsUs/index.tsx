import styles from '../../styles/this-is-us.module.scss';
import useDeviceDetect from '../../hooks/useDeviceDetect';
const ThisIsUs = () => {
  const { isMobile } = useDeviceDetect();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div data-aos="fade-left">This is us !!</div>
        <div className={styles.imageWrapper}>
          <img src="/images/arrow-wd.png" alt="Arrow" className={styles.arrow} loading='lazy' data-aos="fade-in" />
          <img src={isMobile ? "/images/wedding-photos/TINN8766.webp" : "/images/us.webp"} alt="This is us" className={styles.mainPhoto} loading='lazy' />
          <img src="/images/paper-clip.png" alt="Paper Clip" className={styles.paperClip} loading='lazy' />
          <img src="/images/arrow-wd.png" alt="Arrow" className={styles.secondArrow} loading='lazy' data-aos="fade-in" />
          <div className={styles.textOverlay} data-aos="zoom-in" data-aos-delay="100">
            <div className={styles.getting}>Getting</div>
            <div className={styles.married}> married !!</div>
          </div>
        </div>
        <div data-aos="fade-right">And we're</div>
      </div>
    </div>
  )
}

export default ThisIsUs