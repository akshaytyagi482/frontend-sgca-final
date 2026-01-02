import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ClientLogoProps {
  name: string;
  logo: string;
  url: string;
  index: number;
}

export function ClientLogo({ name, logo, url, index }: ClientLogoProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const resolveLogoUrl = (img?: string) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    let path = img.replace(/^\/+/, '');
    path = path.replace(/^api\/images\//i, '');
    path = path.replace(/^images\//i, '');
    const base = (import.meta.env as any).VITE_BACKEND_URL || '';
    return `${base.replace(/\/$/, '')}/api/images/${path}`;
  };

  return (
    <motion.a
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center p-4"
    >
      <motion.img
        whileHover={{ scale: 1.05 }}
        src={resolveLogoUrl(logo)}
        alt={`${name} logo`}
        className="h-12 object-contain opacity-70 hover:opacity-100 transition-all duration-300"
      />
    </motion.a>
  );
}