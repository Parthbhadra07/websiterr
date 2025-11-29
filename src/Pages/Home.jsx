import React from 'react'
import LandingHero from '../components/LandingHero.jsx'
import ProjectStats from '../components/ProjectStats.jsx'
import VideoSection from '../components/VideoSection.jsx'
import ServicesList from '../components/ServicesList.jsx'
import GallarySlider from '../components/GallerySlider.jsx'
import StartProject from '../components/StartProject.jsx'
import Collections from "../components/collections.jsx"


function Home() {
  return (
    <div className='bg-background select-none w-[100vw] overflow-hidden'>
      <LandingHero />
      <div className='px-6'>
        <ProjectStats />
        <VideoSection />
        <ServicesList />
        <GallarySlider />
        <Collections />
        <StartProject />
      </div>
    </div>
  )
}

export default Home
