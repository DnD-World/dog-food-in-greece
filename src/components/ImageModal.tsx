import React from 'react';
import { X, ExternalLink, ZoomIn } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  subtitle?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  subtitle,
}) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-950">
          <div>
            <h3 className="text-sm font-bold text-white">{title}</h3>
            {subtitle && <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              title="Open full-resolution image in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image container */}
        <div className="p-4 bg-zinc-950/60 flex items-center justify-center min-h-[360px] max-h-[70vh] overflow-auto">
          <img
            src={imageUrl}
            alt={title}
            referrerPolicy="no-referrer"
            className="max-h-[65vh] w-auto object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Bottom hint */}
        <div className="px-5 py-2.5 bg-zinc-950 border-t border-zinc-800/80 text-[11px] text-zinc-400 flex items-center justify-between">
          <span>High-definition packaging and composition label reference</span>
          <span className="text-zinc-500">Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};
