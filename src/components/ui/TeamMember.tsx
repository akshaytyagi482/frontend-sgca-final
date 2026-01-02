import React, { useState, useEffect } from 'react';
import { Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

// Simple in-memory cache for fetched image object URLs
const imageCache = new Map<string, string>();

const buildBackendImageUrl = (img?: string) => {
  if (!img) return '';
  if (img.startsWith('http')) return img;
  let path = img.replace(/^\/+/, '');
  path = path.replace(/^api\/images\//i, '');
  path = path.replace(/^images\//i, '');
  const base = (import.meta.env as any).VITE_BACKEND_URL || '';
  return `${base.replace(/\/$/, '')}/api/images/${path}`;
};

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  index: number;
}

export function TeamMember({ name, role, image, bio, linkedin, twitter }: TeamMemberProps) {
  const [isColored, setIsColored] = useState(false);
  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => setIsColored(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!image) {
      setSrc('');
      return;
    }

    const backendUrl = buildBackendImageUrl(image);

    // If it's already cached, use cached object URL
    if (imageCache.has(backendUrl)) {
      setSrc(imageCache.get(backendUrl) as string);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(backendUrl, { signal: controller.signal });
        if (!res.ok) throw new Error('Image fetch failed');
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        imageCache.set(backendUrl, objectUrl);
        if (!cancelled) setSrc(objectUrl);
      } catch (err) {
        // If fetch fails, fall back to backendUrl (so <img> may still try to load)
        if (!cancelled) setSrc(backendUrl);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [image]);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto px-4">
      <motion.div whileHover={{ scale: 1.05 }} className="relative group">
        <img
          src={src || ''}
          alt={name}
          className={`w-48 h-48 rounded-full object-cover filter ${isColored ? '' : 'grayscale'} transition-all duration-300`}
        />
      </motion.div>

      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-blue-600 font-medium">{role}</p>
        <p className="mt-2 text-gray-500">{bio}</p>

        <div className="mt-4 flex justify-center space-x-4">
          {linkedin && (
            <motion.a whileHover={{ scale: 1.2 }} href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Linkedin className="h-5 w-5" />
            </motion.a>
          )}
          {twitter && (
            <motion.a whileHover={{ scale: 1.2 }} href={twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Twitter className="h-5 w-5" />
            </motion.a>
          )}
        </div>
      </div>
    </div>
  );
}