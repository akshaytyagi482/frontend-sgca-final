import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';
import { useData } from '../context/context';

export default function Leadership() {
  const { data } = useData();
  const members = data?.leadershipPageData?.members || [];



// Simple cache to avoid re-fetching blobs repeatedly
const _leadershipImageCache: Map<string, string> = new Map();

function isExternalUrl(src?: string) {
  if (!src) return false;
  return /^https?:\/\//i.test(src) || src.startsWith('data:') || src.startsWith('blob:');
}

function buildBackendUrl(src: string) {
  const cleaned = src.replace(/^\/+/, '').replace(/^(api\/images\/|images\/?)/i, '');
  const base = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');
  return base ? `${base}/api/images/${cleaned}` : `/api/images/${cleaned}`;
}

function MemberImage({ src, alt, className }: { src?: string; alt?: string; className?: string }) {
  const [imageSrc, setImageSrc] = useState<string | undefined>(() => (isExternalUrl(src) ? src : undefined));

  useEffect(() => {
    if (!src) {
      setImageSrc(undefined);
      return;
    }

    if (isExternalUrl(src)) {
      setImageSrc(src);
      return;
    }

    const url = buildBackendUrl(src);
    if (_leadershipImageCache.has(url)) {
      setImageSrc(_leadershipImageCache.get(url));
      return;
    }

    const controller = new AbortController();
    let cancelled = false;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Image fetch failed');
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        const obj = URL.createObjectURL(blob);
        _leadershipImageCache.set(url, obj);
        setImageSrc(obj);
      })
      .catch(() => {
        if (!cancelled) setImageSrc(buildBackendUrl(src));
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [src]);

  return <img src={imageSrc} alt={alt || ''} className={className} />;
}
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            >
              {data?.leadershipPageData?.hero?.title || 'Our Leadership Team'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-gray-500"
            >
              {data?.leadershipPageData?.hero?.subtitle || 'Meet the visionaries driving innovation at SGCA Technologies'}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member: any, index: number) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center group hover:shadow-xl transition-shadow"
              >
                <div className="relative mb-6 inline-block">
                  <div className="w-48 h-48 mx-auto relative">
                    <MemberImage
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover filter group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 mb-4">{member.bio}</p>

                <div className="flex justify-center space-x-4">
                  {member.socials?.linkedin && (
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                  )}
                  {member.socials?.twitter && (
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
