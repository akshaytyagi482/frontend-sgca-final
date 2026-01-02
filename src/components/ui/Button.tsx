import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline';
  onClick?: () => void;
}

export function Button({ children, href, variant = 'primary', onClick }: ButtonProps) {
  const baseStyles = "inline-flex items-center px-6 py-3 border text-base font-medium rounded-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow";
  const variants = {
    primary: "border-transparent text-white bg-blue-600 hover:bg-blue-700",
    outline: "border-blue-600 text-blue-600 hover:bg-blue-50"
  };

  const className = `${baseStyles} ${variants[variant]}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}