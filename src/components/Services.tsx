import React from 'react';
import { Code, Globe, Database, Smartphone } from 'lucide-react';

const services = [
  {
    title: 'Custom Software Development',
    description: 'Tailored software solutions designed to meet your specific business needs and requirements.',
    icon: Code
  },
  {
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with the latest technologies.',
    icon: Globe
  },
  {
    title: 'Database Solutions',
    description: 'Efficient database design and management to handle your data securely and effectively.',
    icon: Database
  },
  {
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile applications for iOS and Android devices.',
    icon: Smartphone
  }
];

export default function Services() {
  return (
    <div id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Comprehensive software solutions to drive your business forward
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}