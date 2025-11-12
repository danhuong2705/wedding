import styles from '../../styles/this-is-us.module.scss';
const ThisIsUs = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>This is us !!</div>
        <div className={styles.imageWrapper}>
          <img src="/images/arrow-wd.png" alt="Arrow" className={styles.arrow} loading='lazy' />
          <img src="/images/wedding-photos/TINN8766.webp" alt="This is us" className={styles.mainPhoto} loading='lazy' />
          <img src="/images/paper-clip.png" alt="Paper Clip" className={styles.paperClip} loading='lazy' />
          <img src="/images/arrow-wd.png" alt="Arrow" className={styles.secondArrow} loading='lazy' />
          <div className={styles.textOverlay}>
            <div className={styles.getting}>Getting</div>
            <div className={styles.married}> married !!</div>
          </div>
        </div>
        <div>And we're</div>
      </div>
    </div>
  )
}

export default ThisIsUs