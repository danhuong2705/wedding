
import type { AppProps } from "next/app";
import { } from 'next/font/google'
import Head from "next/head";
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/globals.scss';
import '../styles/home.css';
import { useEffect } from "react";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config';
const App = ({ Component, pageProps }: AppProps) => {
  const { isDesktop } = useDeviceDetect();
  useEffect(() => {
    replaceCursor();
    AOS.init({ duration: 800, once: true });
  }, []);


  const replaceCursor = () => {
    const heartContainer = document.getElementById('heart-container');
    if (!heartContainer) {
      console.error('Heart container not found in the DOM.');
      return;
    }

    const pastelColors = [
      '#feb2b5', '#fec5e6', '#f2bc9a', '#fdecb6',
      '#c8f0cb', '#8dccd5', '#8ecdf0', '#afcaff', '#b9bdfe', '#bdaae1', '#F38BA0', '#F38BA0', '#BADFDB'
    ];



    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lastHeartTime = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const getRandomPastelColor = () => pastelColors[Math.floor(Math.random() * pastelColors.length)];

    const createHeart = (x: number, y: number) => {
      const heart = document.createElement('div');
      heart.classList.add('heart');

      const size = Math.random() * 4 + 8; // Random size between 8px and 12px
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;

      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;

      heart.style.setProperty('--heart-color', getRandomPastelColor());

      heartContainer.appendChild(heart);

      animateHeart(heart);
    };

    const animateHeart = (heartElement: HTMLDivElement) => {
      const duration = Math.random() * 1500 + 1500; // Duration between 1.5s and 3s
      const travelDistance = Math.random() * 80 + 50; // Travel distance between 50px and 130px
      const initialScale = 0.2;
      const midScale = 1;
      const finalScale = 0.8;

      const angle = Math.random() * Math.PI * 2; // Random angle between 0 and 2π radians
      const endX = travelDistance * Math.cos(angle);
      const endY = travelDistance * Math.sin(angle);

      heartElement.animate([
        {
          opacity: 0,
          transform: `translate(-50%, -50%) scale(${initialScale}) rotate(${Math.random() * 360}deg)`
        },
        {
          opacity: 1,
          transform: `translate(-50%, -50%) scale(${midScale}) rotate(${Math.random() * 360}deg)`,
          offset: 0.2
        },
        {
          opacity: 1,
          offset: 0.8
        },
        {
          opacity: 0,
          transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(${finalScale}) rotate(${Math.random() * 360}deg)`
        }
      ], {
        duration: duration,
        easing: 'ease-out',
        fill: 'forwards'
      }).onfinish = () => {
        heartElement.remove();
      };
    };

    const heartFountainLoop = () => {
      const now = Date.now();

      if (now - lastHeartTime > 30) {
        lastHeartTime = now;
        createHeart(mouseX, mouseY);
      }

      requestAnimationFrame(heartFountainLoop);
    };

    requestAnimationFrame(heartFountainLoop);
  };
  return (
    <main>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <title>Viên - Dắn Wedding</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="We're getting married! Welcome to the official wedding celebration site for Dắn Hương & Nguyễn Viên. Join us on November 30, 2025. All info here!" />

        <meta property="og:title" content="Viên - Dắn Wedding" />

        <meta property="og:description" content="We're getting married! Welcome to the official wedding celebration site for Dắn Hương & Nguyễn Viên. Join us on November 30, 2025. All info here!" />

        <meta property="og:image" content="https://wedding.huongdtt.me/thumbnail.jpeg" />

        <meta property="og:url" content="https://wedding.huongdtt.me" />

        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Viên - Dắn Wedding" />
        <meta name="twitter:description" content="We're getting married! Welcome to the official wedding celebration site for Dắn Hương & Nguyễn Viên. Join us on November 30, 2025. All info here!" />
        <meta name="twitter:image" content="https://wedding.huongdtt.me/thumbnail.jpeg" />
      </Head>
      <div style={{ position: 'relative' }}>
        <div id="heart-container"></div>
        <Component {...pageProps} />
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: "'Montserrat', sans-serif",
          },
        }}
      />

    </main>
  );
}

export default appWithTranslation(App, nextI18NextConfig)