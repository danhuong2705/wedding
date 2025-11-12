import { useEffect } from "react";

import styles from '../../styles/loading.module.scss';
interface LoadingProps {
  setLoading: (loading: boolean) => void;
}
const Loading = ({ setLoading }: LoadingProps) => {
  useEffect(() => {
    loading();
  }, []);

  const loading = () => {
    const path = document.getElementById('heartStrokeFill') as SVGPathElement | null;
    const text = document.getElementById('heartText') as HTMLSpanElement | null;

    if (!path || !text) {
      console.error('Required elements are missing in the DOM.');
      return;
    }

    const totalLength = path.getTotalLength();
    let currentPercent = 0;
    let progressInterval: NodeJS.Timeout | null = null;

    function startAnimation() {
      if (!path || !text) return;

      path.style.strokeDasharray = totalLength.toString();
      path.style.strokeDashoffset = totalLength.toString();

      currentPercent = 0;
      text.innerText = '0%';

      runProgress();
    }

    function runProgress() {
      if (!path || !text) return;

      const increment = 1; // Define increment value
      const offset = totalLength - (totalLength * currentPercent / 100);

      path.style.strokeDashoffset = offset.toString();
      text.innerText = Math.floor(currentPercent) + '%';

      currentPercent += increment;

      if (currentPercent > 100) {
        currentPercent = 100;
        text.innerText = '100%';
        setTimeout(() => {
          setLoading(false);
        }, 500);

        return;
      }

      const randomDelay = Math.random() * 100 + 10;
      progressInterval = setTimeout(runProgress, randomDelay);
    }


    startAnimation();
  }
  return (
    <div className={styles["loading-wrapper"]}>
      <div className={styles["heart-progress-container"]} >
        <svg className={styles["heart-svg"]} viewBox="10 0 180 190">
          <path className={styles["heart-path-bg"]}
            d="M100 180 C 120 160, 180 120, 180 70 C 180 30, 150 0, 100 30 C 50 0, 20 30, 20 70 C 20 120, 80 160, 100 180 Z" />

          <path id="heartStrokeFill" className={styles["heart-path-fill"]}
            d="M100 30 C 150 0, 180 30, 180 70 C 180 120, 120 160, 100 180 C 80 160, 20 120, 20 70 C 20 30, 50 0, 100 30" />
        </svg>
        <span className={styles["heart-text"]} id="heartText">0%</span>
      </div>
    </div>
  )
}

export default Loading