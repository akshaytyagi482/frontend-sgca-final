import React from 'react';
import { ContactForm } from '../ui/ContactForm';
import { ContactInfo } from '../ui/ContactInfo';
import { useData } from '../../context/context';

export default function Contact() {
  const { data } = useData();
  const contactData = data?.siteData?.contact;

  if (!contactData) return null;

  return (
    <div id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {contactData.title}
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            {contactData.subtitle}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
