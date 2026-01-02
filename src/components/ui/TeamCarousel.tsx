import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TeamMember } from './TeamMember';
import { useCarousel } from '../../hooks/useCarousel';

interface TeamCarouselProps {
  members: Array<{
    name: string;
    role: string;
    image: string;
    bio: string;
    linkedin?: string;
    twitter?: string;
  }>;
}

export function TeamCarousel({ members }: TeamCarouselProps) {
  const { currentIndex, changeSlide, slideVariants } = useCarousel(members.length);

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 6000); // 6 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [changeSlide]);

  return (
    <div className="relative">
      <div className="overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              duration: 0.4,
              ease: "easeInOut"
            }}
            className="flex items-center justify-center absolute inset-0"
          >
            <TeamMember {...members[currentIndex]} index={currentIndex} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
        <button
          onClick={() => changeSlide(-1)}
          className="pointer-events-auto -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <button
          onClick={() => changeSlide(1)}
          className="pointer-events-auto translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {members.map((_, index) => (
          <button
            key={index}
            onClick={() => changeSlide(index - currentIndex)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-blue-600 scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}