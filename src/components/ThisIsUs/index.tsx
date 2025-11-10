import styles from '../../styles/this-is-us.module.scss';
const ThisIsUs = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>This is us !!</div>
        <div className={styles.imageWrapper}>
          <img src="/images/arrow-wd.png" alt="Arrow" className={styles.arrow} />
          <img src="/images/us.jpg" alt="This is us" className={styles.mainPhoto} />
          <img src="/images/paper-clip.png" alt="Paper Clip" className={styles.paperClip} />
          <img src="/images/arrow-wd.png" alt="Arrow" className={styles.secondArrow} />
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