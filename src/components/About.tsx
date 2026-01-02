import React from 'react';

export default function About() {
  return (
    <div id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About SGCA Technologies
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              With over a decade of experience in software development, SGCA Technologies 
              has been at the forefront of digital innovation. We combine technical expertise 
              with industry knowledge to deliver solutions that drive business growth.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Our Mission</h3>
                <p className="mt-2 text-base text-gray-500">
                  To empower businesses through innovative software solutions that drive 
                  efficiency and growth.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Our Vision</h3>
                <p className="mt-2 text-base text-gray-500">
                  To be the leading software solutions provider, recognized for excellence 
                  and innovation.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <img 
              className="rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
            />
          </div>
        </div>
      </div>
    </div>
  );
}