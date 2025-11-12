import { useEffect, useState } from "react";

// import ADecadeOfUs from "@/components/ADecadeOfUs";
// import Guestbook from "@/components/GuestBooks";
import HeroSection from "@/components/HeroSection";
import Loading from "@/components/Loading";
// import RsvpSection from "@/components/RSVP";
// import SendGifts from "@/components/SendGifts";
// import ThisIsUs from "@/components/ThisIsUs";
// import WeddingEvent from "@/components/WeddingEvents";
// import PreweddingGallery from "@/components/PreWeddingGallery";
import dynamic from 'next/dynamic'

// const HeroSection = dynamic(() => import('@/components/HeroSection'), {
//   loading: () => <p>Loading...</p>,
// })
const RsvpSection = dynamic(() => import('@/components/RSVP'), {
  loading: () => <p>Loading...</p>,
})
const SendGifts = dynamic(() => import('@/components/SendGifts'), {
  loading: () => <p>Loading...</p>,
})
const Guestbook = dynamic(() => import('@/components/GuestBooks'), {
  loading: () => <p>Loading...</p>,
})
const WeddingEvent = dynamic(() => import('@/components/WeddingEvents'), {
  loading: () => <p>Loading...</p>,
})
const PreweddingGallery = dynamic(() => import('@/components/PreWeddingGallery'), {
  loading: () => <p>Loading...</p>,
})

const ThisIsUs = dynamic(() => import('@/components/ThisIsUs'), {
  loading: () => <p>Loading...</p>,
})
const ADecadeOfUs = dynamic(() => import('@/components/ADecadeOfUs'), {
  loading: () => <p>Loading...</p>,
})


const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);


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
          <PreweddingGallery />
          <Guestbook />
          <RsvpSection />
          <SendGifts />
        </>}
    </div>

  );
}

export default HomePage;