import React, { useEffect, useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
}

const imageObjectUrlCache = new Map<string, string>();

const buildBackendImageUrl = (img?: string) => {
  if (!img) return '';
  if (img.startsWith('http')) return img;
  let path = img.replace(/^\/+/, '');
  path = path.replace(/^api\/images\//i, '');
  path = path.replace(/^images\//i, '');
  return `${import.meta.env.VITE_BACKEND_URL}/api/images/${path}`;
};

export function ProjectCard({ title, description, image, technologies }: ProjectCardProps) {
  const [src, setSrc] = useState<string>(() => buildBackendImageUrl(image));

  useEffect(() => {
    let cancelled = false;
    const backendUrl = buildBackendImageUrl(image);
    if (!backendUrl) {
      setSrc('');
      return;
    }

    // Use cached object URL if available
    const cached = imageObjectUrlCache.get(backendUrl);
    if (cached) {
      setSrc(cached);
      return;
    }

    const controller = new AbortController();
    fetch(backendUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Image fetch failed');
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        const objectUrl = URL.createObjectURL(blob);
        imageObjectUrlCache.set(backendUrl, objectUrl);
        setSrc(objectUrl);
      })
      .catch(() => {
        if (!cancelled) setSrc(backendUrl); // fallback to direct URL
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [image]);

  const techs = Array.isArray(technologies) ? technologies : [];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={src}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {techs.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}