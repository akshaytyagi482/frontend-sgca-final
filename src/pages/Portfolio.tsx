import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';
import { useData } from '../context/context';



export default function Portfolio() {
  const { data } = useData();
  const portfolioData = data?.portfolioPageData;

  const projects = portfolioData?.projects || [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce solution with real-time inventory management.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
      technologies: ['JS', 'PHP', 'MySQL'],
      externalLink: null
    },
    {
      title: 'Hospital Management System',
      description: 'Integrated healthcare platform for patient management and scheduling.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      technologies: ['PHP', 'HTML', 'MySQL'],
      externalLink: null
    },
    {
      title: 'CRM Software',
      description: 'Business intelligence platform with predictive analytics capabilities.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      technologies: ['Laravel', 'MySQL', 'PHP'],
      externalLink: null
    },
    {
      title: 'School Management System',
      description: 'School management system with student and teacher management.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      technologies: ['Laravel', 'MySQL', 'PHP'],
      externalLink: null
    },
    {
      title: 'College Management System',
      description: 'Comprehensive platform for managing academic programs, student records, and faculty administration.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'Node.js', 'MongoDB'],
      externalLink: null
    },
    {
      title: 'HRMS',
      description: 'Human Resource Management System with payroll, attendance, and employee performance tracking.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'Express', 'PostgreSQL'],
      externalLink: null
    },
    {
      title: 'Accounting Management',
      description: 'Financial management solution with invoicing, expense tracking, and financial reporting.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      tech: ['Angular', 'Django', 'PostgreSQL'],
      externalLink: null
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Persistent cache to avoid refetching blobs and creating duplicate object URLs
  const imageCacheRef = useRef<Map<string, string | null>>(new Map());

  function isExternalUrl(src?: string) {
    if (!src) return false;
    return /^https?:\/\//i.test(src) || src.startsWith('data:') || src.startsWith('blob:');
  }

  function buildBackendUrl(src: string) {
    const cleaned = src.replace(/^\/+/, '').replace(/^(api\/images\/|images\/?)/, '');
    const base = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');
    return base ? `${base}/api/images/${cleaned}` : `/api/images/${cleaned}`;
  }

  function ProjectImage({ src, alt, className }: { src?: string; alt?: string; className?: string }) {
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
      if (imageCacheRef.current.has(url)) {
        const cached = imageCacheRef.current.get(url);
        if (cached) setImageSrc(cached);
        else setImageSrc(src);
        return;
      }

      let cancelled = false;
      const controller = new AbortController();

      fetch(url, { signal: controller.signal })
        .then((res) => {
          if (!res.ok) throw new Error('Image fetch failed');
          return res.blob();
        })
        .then((blob) => {
          if (cancelled) return;
          const obj = URL.createObjectURL(blob);
          imageCacheRef.current.set(url, obj);
          setImageSrc(obj);
        })
        .catch(() => {
          // record failure to avoid retry loops and fallback to original src
          if (!cancelled) {
            imageCacheRef.current.set(url, null);
            setImageSrc(src);
          }
        });

      return () => {
        cancelled = true;
        controller.abort();
      };
    }, [src]);

    return (
      // eslint-disable-next-line jsx-a11y/img-redundant-alt
      <img src={imageSrc} alt={alt || 'project image'} className={className} />
    );
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
              {portfolioData?.hero?.title || 'Our Portfolio'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-gray-500"
            >
              {portfolioData?.hero?.subtitle || 'Discover our latest projects and success stories'}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ref} className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {projects.map((project:any, index:number) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <ProjectImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    {project.externalLink && (
                      <a
                        href={project.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-500 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(project.tech)
                      ? project.tech
                      : Array.isArray(project.technologies)
                      ? project.technologies
                      : []).map((tech: any) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}