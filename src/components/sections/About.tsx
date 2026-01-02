import React from 'react';
import { StatsCard } from '../ui/StatsCard';
import { ValueCard } from '../ui/ValueCard';
import { useData } from '../../context/context';

export default function About() {
  const { data } = useData();
  const aboutData = data?.siteData?.about;

  // debug: verify imports are defined
  // eslint-disable-next-line no-console
  console.log('About imports', { StatsCardType: typeof StatsCard, ValueCardType: typeof ValueCard, useDataType: typeof useData });

  if (!aboutData) return null;

  return (
    <div id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {aboutData.title}
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              {aboutData.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {(aboutData.stats || []).map((stat: any, index: number) => (
                <StatsCard key={index} label={stat.label} value={stat.value} icon={stat.icon} />
              ))}
            </div>
          </div>

          <div className="mt-10 lg:mt-0 space-y-6">
            {aboutData.values.map((value: any, index: number) => (
              <ValueCard key={index} title={value.title} description={value.description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
