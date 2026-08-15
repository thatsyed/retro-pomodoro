import React, { useEffect } from 'react';
import { SvgIcon } from './SvgIcon';

export function Modal({ isOpen, onClose, title, children, footer, maxWidth = 'max-w-md' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-[3px] overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`w-full ${maxWidth} bg-gradient-to-b from-[var(--color-chassis)] to-[var(--color-chassis-dark)] border-4 border-[var(--color-border)] rounded-[var(--chassis-radius)] shadow-[0_10px_0_var(--color-btn-shadow),0_20px_40px_rgba(0,0,0,0.5)] p-5 text-[var(--color-border)] my-auto relative transform transition-transform`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-[var(--color-border)] pb-2.5 mb-3.5">
          <h2 id="modal-title" className="font-['VT323',monospace] text-2xl font-normal tracking-wide flex items-center gap-2">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-[var(--color-border)] hover:text-[var(--color-danger)] p-1 cursor-pointer transition-colors"
          >
            <SvgIcon name="X" size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="flex justify-end gap-2.5 border-t-2 border-dashed border-[var(--color-border)] pt-3.5 mt-3.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
