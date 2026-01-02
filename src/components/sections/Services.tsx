import React from 'react';
import { Code, Globe, Database, Shield, Brain, Users } from 'lucide-react';
import { ServiceCard } from '../ui/ServiceCard';
import { useData } from '../../context/context';

export default function Services() {
  const { data } = useData();
  const servicesData = data?.siteData?.services;

  if (!servicesData) return null;

  const iconMap = {
    code: Code,
    globe: Globe,
    database: Database,
    shield: Shield,
    brain: Brain,
    users: Users,
  };

  return (
    <div id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {servicesData.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            {servicesData.subtitle}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.items.map((service: any, index: number) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code;
            return (
              <ServiceCard key={index} index={index} title={service.title} description={service.description} icon={IconComponent} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
