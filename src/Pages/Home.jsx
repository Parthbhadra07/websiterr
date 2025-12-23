import React from 'react'
import { motion } from 'framer-motion'
import LandingHero from '../components/LandingHero.jsx'
import ProjectStats from '../components/ProjectStats.jsx'
import VideoSection from '../components/VideoSection.jsx'
import ServicesList from '../components/ServicesList.jsx'
import GallarySlider from '../components/GallerySlider.jsx'
import StartProject from '../components/StartProject.jsx'
import Collections from "../components/collections.jsx"

function Home() {
  return (
    <div className='bg-background select-none w-full overflow-x-hidden relative'>
      {/* Hero Section - Full Width */}
      <LandingHero />
      
      {/* Main Content Sections with Modern Spacing */}
      <div className='relative'>
        {/* Decorative Gradient Overlay */}
        <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-10' />
        
        {/* Project Stats Section - Enhanced Spacing */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='relative z-20'
        >
          <div className='px-4 sm:px-6 md:px-8 lg:px-16 py-16 md:py-24'>
            <ProjectStats />
          </div>
        </motion.section>

        {/* Video Section - With Background Accent */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className='relative z-20'
        >
          <div className='px-4 sm:px-6 md:px-8 lg:px-16 py-16 md:py-24 bg-gradient-to-b from-transparent via-background/50 to-transparent'>
            <VideoSection />
          </div>
        </motion.section>

        {/* Services Section - Full Width Dark Accent */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className='relative z-20'
        >
          <div className='px-4 sm:px-6 md:px-8 lg:px-16 py-20 md:py-32'>
            <ServicesList />
          </div>
        </motion.section>

        {/* Gallery Slider - Enhanced Visual Impact */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className='relative z-20'
        >
          <div className='px-4 sm:px-6 md:px-8 lg:px-16 py-16 md:py-24'>
            <GallarySlider />
          </div>
        </motion.section>

        {/* Collections - Masonry Layout Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className='relative z-20'
        >
          <div className='px-4 sm:px-6 md:px-8 lg:px-16 py-16 md:py-24 bg-gradient-to-b from-transparent via-background/30 to-transparent'>
            <Collections />
          </div>
        </motion.section>

        {/* Start Project - Call to Action Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className='relative z-20'
        >
          <div className='px-4 sm:px-6 md:px-8 lg:px-16 py-20 md:py-32'>
            <StartProject />
          </div>
        </motion.section>
      </div>

      {/* Floating Decorative Elements */}
      <div className='fixed top-1/4 right-0 w-96 h-96 bg-beige/5 rounded-full blur-3xl pointer-events-none z-0' />
      <div className='fixed bottom-1/4 left-0 w-96 h-96 bg-beige-light/5 rounded-full blur-3xl pointer-events-none z-0' />
    </div>
  )
}

export default Home
