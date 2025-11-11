import { useEffect, useState } from "react";

import ADecadeOfUs from "@/components/ADecadeOfUs";
import Guestbook from "@/components/GuestBooks";
import HeroSection from "@/components/HeroSection";
import Loading from "@/components/Loading";
import RsvpSection from "@/components/RSVP";
import SendGifts from "@/components/SendGifts";
import ThisIsUs from "@/components/ThisIsUs";
import WeddingEvent from "@/components/WeddingEvents";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    replaceCursor();
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
    <div className="content">

      {isLoading ?
        <Loading setLoading={setIsLoading} />
        :
        <>
          <HeroSection />
          <ThisIsUs />
          <ADecadeOfUs />
          <WeddingEvent />
          <Guestbook />
          <RsvpSection />
          <SendGifts />
        </>}
    </div>

  );
}

export default HomePage;