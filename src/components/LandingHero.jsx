import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import thumb1 from '../assets/images/bathroom.jpg';
import thumb2 from '../assets/images/thumb-2.webp';
import thumb3 from '../assets/images/thumb-3.webp';
import thumb4 from '../assets/images/thumb-4.webp';
import thumb5 from '../assets/images/thumb-5.webp';
import thumb6 from '../assets/images/thumb-6.webp';
import thumb7 from '../assets/images/thumb-7.webp';
import thumb8 from '../assets/images/thumb-8.webp';
import thumb9 from '../assets/images/thumb-9.webp';
import thumb10 from '../assets/images/thumb-10.webp';

const LandingHero = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const thumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6, thumb7, thumb8, thumb9, thumb10];

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % thumbnails.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width;
        const yPos = (e.clientY - rect.top) / rect.height;
        mouseX.set((xPos - 0.5) * 50);
        mouseY.set((yPos - 0.5) * 50);
        setMousePosition({ x: xPos, y: yPos });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartProject = () => {
    navigate('/contact');
  };

  const handleLearnMore = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-background text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          x: useTransform(x, (v) => v * 0.3),
          y: useTransform(y, (v) => v * 0.3),
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          key={currentImageIndex}
          src={thumbnails[currentImageIndex]}
          alt="Interior Design"
          className="w-full h-full object-cover opacity-40"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
      </motion.div>

      {/* Floating Image Showcase */}
      <motion.div
        className="absolute top-1/2 right-[10%] -translate-y-1/2 z-20 hidden md:block"
        style={{
          x: useTransform(x, (v) => v * 1.5),
          y: useTransform(y, (v) => v * 1.5),
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="relative w-96 h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
          <motion.img
            key={currentImageIndex}
            src={thumbnails[currentImageIndex]}
            alt="Featured Design"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Image Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {thumbnails.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1 rounded-full ${
                  index === currentImageIndex ? 'bg-white w-8' : 'bg-white/40 w-1'
                }`}
                initial={false}
                animate={{
                  width: index === currentImageIndex ? 32 : 4,
                  opacity: index === currentImageIndex ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-16 py-20">
        {/* Top Section - Logo/Brand */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-mozilla font-bold tracking-tight"
            style={{
              x: useTransform(x, (v) => v * 0.5),
              y: useTransform(y, (v) => v * 0.5),
            }}
          >
            <motion.span
              className="block text-beige-light"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              RR
            </motion.span>
            <motion.span
              className="block -mt-2 text-beige"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            >
              DESIGNS
            </motion.span>
          </motion.div>

          <motion.div
            className="text-right hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm  tracking-[0.3em] text-beige/70">
              2016<br />Established
            </p>
            <p className="text-xs text-beige/60 mt-1">Design & Build Experts</p>
          </motion.div>
        </motion.div>

        {/* Center Section - Tagline */}
        <motion.div
          className="flex-1 flex items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="max-w-2xl">
            <motion.h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-mozilla font-semibold leading-tight mb-4 sm:mb-6 text-beige-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Design Your <span className="text-beige">Dream Home</span> With Us
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-beige/80 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Transform your living spaces into extraordinary experiences. 
              Where elegance meets functionality, and every detail tells your story.
            </motion.p>
          </div>
        </motion.div>

        {/* Bottom Section - CTA & Navigation */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={handleStartProject}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-beige text-background rounded-full font-semibold overflow-hidden text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <motion.span
                  className="material-symbols-outlined"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  arrow_forward
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-beige-light"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={handleLearnMore}
              className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-beige/40 rounded-full font-semibold hover:border-beige/80 transition-all text-sm sm:text-base text-beige-light"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Explore Our Work
                <motion.span
                  className="material-symbols-outlined"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  arrow_downward
                </motion.span>
              </span>
            </motion.button>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center gap-2 text-beige/60 text-sm"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="uppercase tracking-[0.2em] text-xs">Scroll</span>
            <motion.span
              className="material-symbols-outlined"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              mouse
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 rounded-full bg-beige/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          x: useTransform(x, (v) => v * 0.5),
          y: useTransform(y, (v) => v * 0.5),
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-beige-light/10 blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{
          x: useTransform(x, (v) => v * -0.3),
          y: useTransform(y, (v) => v * -0.3),
        }}
      />

      {/* Mobile Image Showcase */}
      <div className="md:hidden absolute bottom-20 left-0 right-0 px-6">
        <motion.div
          className="relative w-full h-64 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <motion.img
            key={currentImageIndex}
            src={thumbnails[currentImageIndex]}
            alt="Featured Design"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* Image Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {thumbnails.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1 rounded-full ${
                  index === currentImageIndex ? 'bg-white w-8' : 'bg-white/40 w-1'
                }`}
                initial={false}
                animate={{
                  width: index === currentImageIndex ? 32 : 4,
                  opacity: index === currentImageIndex ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingHero;

