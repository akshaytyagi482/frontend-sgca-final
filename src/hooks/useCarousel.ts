import { useState } from 'react';

export function useCarousel(length: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 0.95
    },
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      scale: 1.05
    }
  };

  const changeSlide = (moveBy: number) => {
    const newIndex = (currentIndex + length + moveBy) % length;
    setDirection(moveBy);
    setCurrentIndex(newIndex);
  };

  return {
    currentIndex,
    direction,
    changeSlide,
    slideVariants
  };
}