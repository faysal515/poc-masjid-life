'use client';

import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  external?: boolean;
}

const variantClasses = {
  primary:   'bg-brand-800 hover:bg-brand-700 text-white',
  secondary: 'bg-brand-100 hover:bg-brand-200 text-brand-900',
  gold:      'bg-gold-500 hover:bg-gold-400 text-white font-bold',
  outline:   'border-2 border-white text-white hover:bg-white hover:text-brand-900',
  ghost:     'text-brand-800 hover:bg-brand-50',
  danger:    'bg-danger-600 hover:bg-red-700 text-white',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  className = '',
  disabled = false,
  type = 'button',
  external = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
