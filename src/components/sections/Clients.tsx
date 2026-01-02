import React from 'react';
import { ClientLogo } from '../ui/ClientLogo';
import { useData } from '../../context/context';

export default function Clients() {
  const { data } = useData();
  const partnersData = data?.siteData?.partners;

  if (!partnersData) return null;

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {partnersData.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            {partnersData.subtitle}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {partnersData.logos.map((logo: any, index: number) => (
            <ClientLogo key={index} name={logo.name} logo={logo.image} url={logo.url} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
