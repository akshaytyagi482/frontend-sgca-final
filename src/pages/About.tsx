import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/context';

const iconMap = {
  award: Award,
  users: Users,
  globe: Globe,
  zap: Zap,
};

// Debug exported icon components
// eslint-disable-next-line no-console
console.log('About page icons:', { AwardType: typeof Award, UsersType: typeof Users, GlobeType: typeof Globe, ZapType: typeof Zap });

export default function About() {
  const { data } = useData();
  const aboutData = data?.aboutPageData;

  const stats = aboutData?.stats || [
    { label: 'Years of Experience', value: '3+', icon: 'award' },
    { label: 'Global Clients', value: '20+', icon: 'globe' },
    { label: 'Team Members', value: '50+', icon: 'users', link: '/leadership' },
    { label: 'Projects Delivered', value: '100+', icon: 'zap', link: '/portfolio' }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = aboutData?.coreServices?.items || [
    {
      title: 'Website Development',
      points: [
        'Crafting modern and visually appealing websites tailored to client needs.',
        'Ensuring 100% secure pages to protect data and transactions.'
      ]
    },
    {
      title: 'Mobile Application Development',
      points: [
        'Designing and developing user-friendly mobile applications for both Android and iOS platforms.',
        'Implementing cutting-edge designs to provide a fresh and engaging experience for users.'
      ]
    },
    {
      title: 'Payment Gateway Integration (PG Services)',
      points: [
        'Partnering with top payment gateway companies to deliver seamless and secure payment solutions.',
        'Offering the best commercial deals across all categories to maximize value for our clients.'
      ]
    },
    {
      title: 'ERP and SaaS Solutions',
      points: [
        'Developing custom ERP and SaaS products for diverse industries, including:',
        'Hospitality (Hotels), Education (Schools), Retail (Shops, Malls), and more.',
        'Enhancing operational efficiency and streamlining workflows for businesses of all sizes.'
      ]
    }
  ];

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
              {aboutData?.hero?.title || 'About SGCA Technologies'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-gray-500"
            >
              {aboutData?.hero?.subtitle || 'Driving digital transformation through innovative solutions and expert services'}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ref} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat:any, index:number) => {
              const Icon = typeof stat.icon === 'string' ? iconMap[stat.icon as keyof typeof iconMap] : stat.icon;
              const StatContent = (
                <>
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100">
                    {Icon ? (
                      <Icon className="w-6 h-6 text-blue-600" />
                    ) : (
                      <span className="w-6 h-6 block bg-blue-300 rounded-full" />
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="mt-2 text-sm text-gray-500">{stat.label}</p>
                </>
              );

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white p-6 rounded-lg shadow-lg text-center ${stat.link ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''}`}
                >
                  {stat.link ? (
                    <Link to={stat.link} className="block">
                      {StatContent}
                    </Link>
                  ) : (
                    StatContent
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Company Description Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">About SGCA Pvt. Ltd.</h2>
            <p className="text-gray-600 mb-6">
              SGCA Pvt. Ltd. is a dynamic and innovative solutions provider specializing in a wide array of digital
              and technological services. We are committed to delivering excellence in every project we undertake, focusing on enhancing
              user experience, security, and business efficiency.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Our Core Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service: any, index: number) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-lg"
                >
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">{index + 1}. {service.title}</h4>
                  <ul className="space-y-2">
                    {service.points.map((point:any, i:number) => (
                      <li key={i} className="text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-600 mt-8"
          >
            {aboutData?.closingNote || 'At SGCA Pvt. Ltd., we pride ourselves on being a one-stop solution for all technological needs. Our goal is to empower businesses by providing innovative and reliable solutions that drive growth and success.'}
          </motion.p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {(aboutData?.missionVision || [
              {
                title: 'Our Mission',
                description: 'To empower businesses through innovative software solutions that drive efficiency, growth, and digital transformation. We strive to deliver excellence in every project while maintaining the highest standards of quality and customer satisfaction.'
              },
              {
                title: 'Our Vision',
                description: 'To be the leading global technology partner known for delivering transformative digital solutions that create lasting value for our clients. We aim to shape the future of technology while fostering innovation and sustainable growth.'
              }
            ]).map((item: any, index: number) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}