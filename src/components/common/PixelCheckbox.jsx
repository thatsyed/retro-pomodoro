import React from 'react';
import { SvgIcon } from './SvgIcon';

export function PixelCheckbox({ checked, onChange, ariaLabel = 'Toggle item', className = '' }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      className={`w-5 h-5 border-2 border-[var(--color-border)] rounded-xs flex items-center justify-center cursor-pointer flex-shrink-0 transition-colors ${
        checked
          ? 'bg-[var(--color-primary)] text-[var(--color-white)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]'
          : 'bg-white hover:bg-[var(--color-card)]'
      } ${className}`}
    >
      {checked && <SvgIcon name="Check" size={13} strokeWidth={3} />}
    </button>
  );
}
