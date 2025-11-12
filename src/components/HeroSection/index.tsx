import styles from '../../styles/hero-section.module.scss';
const HeroSection = () => {
  return (
    <div className={styles.container}>
      <img src="/images/pink-bow.png" alt="Pink Bow" className={styles.pinkBow} loading='lazy' />
      <img src="/images/blue-bow.png" alt="Blue Bow" className={styles.blueBow} loading='lazy' />
      <img src="/images/blue-bow.png" alt="Blue Bow" className={styles.blueBowSecond} loading='lazy' />
      <img src="/images/pink-bow.png" alt="Pink Bow" className={styles.pinkBowSecond} loading='lazy' />

      <div className={styles.flowerBorder}>
        <img src="/images/tulip.png" alt='tulip' loading='lazy' />
        <span className={styles.brideLeter}>H</span>
        <span className={styles.groomLetter}>V</span>
      </div>
      <div className={styles.saveTheDate}>
        Save the date
      </div>
      <div className={styles.names}>
        <span className={styles.brideName}>Dắn Hương </span>
        <span className={styles.and}>&</span>
        <span className={styles.groomName}>Nguyễn Viên</span></div>
      <div className={styles.date}> 30 . 11 . 2025</div>
    </div>
  )
}


export default HeroSection