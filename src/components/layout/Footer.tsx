import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-4">About SGCA Technologies</h3>
            <p className="text-gray-400">
              Leading software solutions provider specializing in custom development,
              web applications, and digital transformation services.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-white">Portfolio</Link></li>
              <li><Link to="/leadership" className="text-gray-400 hover:text-white">Leadership</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Noida One</li>
              <li>Sector 62, Noida 201309</li>
              <li>info@sgca.live</li>
              <li>+91 7289892009</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} SGCA Technologies Pvt Ltd. All rights reserved.
          </p>
          <p className="mt-2 text-gray-400 flex items-center justify-center">
            Designed with <Heart className="h-4 w-4 mx-1 text-red-500" /> by SGCA Technologies
          </p>
        </div>
      </div>
    </footer>
  );
}