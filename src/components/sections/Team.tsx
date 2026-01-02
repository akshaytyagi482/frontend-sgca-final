import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TeamCarousel } from '../ui/TeamCarousel';
import { useData } from '../../context/context';

export default function Team() {
  const { data } = useData();
  const teamData = data?.siteData?.team;

  if (!teamData) return null;

  return (
    <div id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {teamData.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            {teamData.subtitle}
          </p>
        </div>

        <div className="mt-20">
          <TeamCarousel members={teamData.members} />
        </div>
      </div>
    </div>
  );
}
