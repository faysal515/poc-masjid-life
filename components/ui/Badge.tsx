import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'gold' | 'slate' | 'success' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

const variantClasses = {
  brand:   'bg-brand-100 text-brand-800',
  gold:    'bg-gold-100 text-gold-600',
  slate:   'bg-slate-100 text-slate-700',
  success: 'bg-green-100 text-green-700',
  danger:  'bg-danger-100 text-danger-600',
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
};

export default function Badge({ children, variant = 'brand', size = 'sm', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
}
