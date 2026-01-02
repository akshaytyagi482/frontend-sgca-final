import React from 'react';
import { motion } from 'framer-motion';
import { ContactForm } from '../components/ui/ContactForm';
import { ContactInfo } from '../components/ui/ContactInfo';
import { useData } from '../context/context';

export default function Contact() {
  const { data } = useData();
  const contactPageData = data?.contactPageData;

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
              {contactPageData?.hero?.title || 'Get in Touch'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-gray-500"
            >
              {contactPageData?.hero?.subtitle || "Let's discuss how we can help transform your business"}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ContactForm />
            <ContactInfo contactData={contactPageData?.contactInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}
