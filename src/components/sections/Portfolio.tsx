import React from 'react';
import Slider from 'react-slick';
import { ProjectCard } from '../ui/ProjectCard';
import { useData } from '../../context/context';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Portfolio() {
  const { data } = useData();
  const portfolioData = data?.siteData?.portfolio;

  if (!portfolioData) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {portfolioData.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            {portfolioData.subtitle}
          </p>
        </div>

        <div className="mt-20">
          <Slider {...settings}>
            {portfolioData.projects.map((project: any, index: number) => (
              <div key={index} className="px-2">
                <ProjectCard title={project.title} description={project.description} image={project.image} technologies={project.tech} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
