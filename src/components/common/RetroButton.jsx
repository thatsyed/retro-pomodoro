import React from 'react';

export function RetroButton({
  children,
  variant = 'primary', // 'primary' | 'warning' | 'danger' | 'ghost' | 'preset'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  onClick,
  active = false,
  ...props
}) {
  const variantClass = {
    primary: 'btn-primary',
    warning: 'btn-warning',
    danger: 'btn-danger',
    ghost: 'bg-white hover:bg-[var(--color-warning)] text-[var(--color-border)]',
    preset: active
      ? 'bg-[var(--color-warning)] shadow-[1px_1px_0_var(--color-btn-shadow)] translate-y-px text-[var(--color-border)]'
      : 'bg-white hover:bg-[var(--color-warning)] text-[var(--color-border)] shadow-[2px_2px_0_var(--color-btn-shadow)]'
  }[variant] || 'btn-primary';

  const sizeClass = {
    sm: 'btn-sm text-xs py-1 px-2.5',
    md: 'py-2.5 px-3.5 text-sm',
    lg: 'py-3.5 px-5 text-base'
  }[size] || '';

  return (
    <button
      className={`retro-btn ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
