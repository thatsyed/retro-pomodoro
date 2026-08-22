import * as React from 'react';

import { cn } from '@/lib/utils';

function Switch({ checked, onCheckedChange, title, className, ...props }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-slot="switch"
      onClick={() => onCheckedChange(!checked)}
      title={title}
      className={cn(
        'relative w-10 h-6 shrink-0 rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        checked ? 'bg-[#30d158]' : 'bg-zinc-600',
        className
      )}
      {...props}
    >
      <span
        className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{ transform: checked ? 'translateX(16px)' : 'translateX(0)' }}
      />
    </button>
  );
}

export { Switch };
