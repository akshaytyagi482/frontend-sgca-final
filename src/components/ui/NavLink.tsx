import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

export function NavLink({ href, children, mobile }: NavLinkProps) {
  const baseStyles = "text-gray-600 hover:text-blue-600 transition-colors duration-200";
  const mobileStyles = "block px-3 py-2";
  const desktopStyles = "inline-block";

  return (
    <a 
      href={href} 
      className={`${baseStyles} ${mobile ? mobileStyles : desktopStyles}`}
    >
      {children}
    </a>
  );
}