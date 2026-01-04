import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/context';

export default function Footer() {
  const { data } = useData();
  const footer = data?.footer;

  if (!footer) return null;

  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* ABOUT */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-4">
              {footer.about?.title}
            </h3>
            <p className="text-gray-400">
              {footer.about?.description}
            </p>
          </div>

          {/* QUICK LINKS */}
         <ul className="space-y-2">
  {footer.quickLinks?.links?.map((link: any, index: number) => (
    <li key={index}>
      <Link to={link?.href} className="text-gray-400 hover:text-white">
        {link?.label}
      </Link>
    </li>
  ))}
</ul>

          {/* CONTACT */}
          <ul className="space-y-2 text-gray-400">
  {footer.contact?.items?.map((item: any, index: number) => (
    <li key={index}>
      {typeof item === 'string' ? item : item?.value}
    </li>
  ))}
</ul>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {footer.copyright?.showYear ? year : ''}
            {' '}
            {footer.copyright?.company}. {footer.copyright?.text}
          </p>

          <p className="mt-2 text-gray-400 flex items-center justify-center">
            {footer.credit?.text}
            <Heart className="h-4 w-4 mx-1 text-red-500" />
            by {footer.credit?.by}
          </p>
        </div>
      </div>
    </footer>
  );
}
