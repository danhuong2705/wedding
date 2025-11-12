// write useDeviceDetect hook in typescript that detects if the user is on mobile, tablet or desktop
import { useEffect, useState } from 'react';

const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;

    const mobileRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const tabletRegex = /iPad|Tablet|PlayBook|Silk/i;

    if (mobileRegex.test(userAgent)) {
      setIsMobile(true);
      setIsTablet(false);
      setIsDesktop(false);
    } else if (tabletRegex.test(userAgent)) {
      setIsMobile(false);
      setIsTablet(true);
      setIsDesktop(false);
    } else {
      setIsMobile(false);
      setIsTablet(false);
      setIsDesktop(true);
    }
  }, []);

  return { isMobile, isTablet, isDesktop };
};

export default useDeviceDetect;