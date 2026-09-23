import { useState, useRef, useEffect, type ChangeEvent, type MouseEvent, type DragEvent } from 'react';
import { CollageSlotId } from '../types';
import { Plus, X, Camera } from 'lucide-react';

interface ScrapbookCollageProps {
  photos: Record<CollageSlotId, string>;
  bannerText: string;
  onUpdatePhoto: (slotId: CollageSlotId, dataUrl: string) => void;
  onResetPhoto: (slotId: CollageSlotId) => void;
  onUpdateBannerText: (text: string) => void;
  onBatchUpload: (files: FileList) => void;
}

const SLOT_HINTS: Record<CollageSlotId, string> = {
  'center': 'Center photo (2026 frame)',
  'top-left': 'Top left (Beach sunset)',
  'top-right': 'Top right (IMG_2301)',
  'bottom-left': 'Bottom left (IMG_1864)',
  'bottom-center': 'Bottom center (318A83CA)',
  'bottom-right': 'Bottom right (6E500461)',
};

const DEFAULT_FALLBACKS: Record<CollageSlotId, string> = {
  'top-left': '/sunset_beach.jpg',
  'top-right': '/sunny_selfie.jpg',
  'center': '/center_2026.jpg',
  'bottom-left': '/besties_diner.jpg',
  'bottom-center': '/friends_wall.jpg',
  'bottom-right': '/mirror_selfie.jpg',
};

export function ScrapbookCollage({
  photos,
  bannerText,
  onUpdatePhoto,
  onResetPhoto,
  onUpdateBannerText,
  onBatchUpload,
}: ScrapbookCollageProps) {
  const [activeSlotForUpload, setActiveSlotForUpload] = useState<CollageSlotId | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<CollageSlotId | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const batchFileInputRef = useRef<HTMLInputElement>(null);

  // Global clipboard paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                onUpdatePhoto(activeSlotForUpload || 'center', reader.result);
              }
            };
            reader.readAsDataURL(file);
            e.preventDefault();
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [activeSlotForUpload, onUpdatePhoto]);

  const handleSlotClick = (slotId: CollageSlotId) => {
    setActiveSlotForUpload(slotId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeSlotForUpload) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdatePhoto(activeSlotForUpload, reader.result);
      }
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBatchFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onBatchUpload(e.target.files);
    }
    if (batchFileInputRef.current) {
      batchFileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: DragEvent, slotId: CollageSlotId) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverSlot(slotId);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverSlot(null);
  };

  const handleDrop = (e: DragEvent, slotId: CollageSlotId) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverSlot(null);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    if (files.length > 1) {
      onBatchUpload(files);
      return;
    }

    const file = files[0];
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdatePhoto(slotId, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const renderCardContent = (slotId: CollageSlotId) => {
    const photoUrl = photos[slotId] || DEFAULT_FALLBACKS[slotId];
    const isDragging = dragOverSlot === slotId;

    if (photoUrl) {
      return (
        <div className="relative w-full h-full group overflow-hidden">
          <img
            src={photoUrl}
            alt={SLOT_HINTS[slotId]}
            onError={(e) => {
              const fallback = DEFAULT_FALLBACKS[slotId];
              const target = e.currentTarget;
              if (target.src !== fallback && !target.src.endsWith(fallback)) {
                target.src = fallback;
              }
            }}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform group-hover:scale-102"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-stone-900/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 text-[#cf6d4e] text-xs font-medium shadow-xs">
              <Camera className="w-3.5 h-3.5" />
              Change Photo
            </span>
            <button
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                onResetPhoto(slotId);
              }}
              className="p-1 rounded-full bg-white/95 text-rose-600 hover:bg-white shadow-xs cursor-pointer"
              title="Remove photo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-3 select-none transition-colors ${
          isDragging ? 'bg-[#ebd0be]' : 'bg-[#f4ebe1] hover:bg-[#ede1d5]'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-[#cf6d4e] text-white flex items-center justify-center shadow-xs mb-1.5 group-hover:scale-105 transition-transform">
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </div>
        <span className="text-xs font-semibold text-[#8c6754] text-center leading-tight">
          Click to add photo
        </span>
        <span className="text-[10px] text-stone-500 text-center mt-0.5 max-w-[120px] truncate">
          {SLOT_HINTS[slotId]}
        </span>
      </div>
    );
  };

  const renderGoldenPin = () => (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#edd588] via-[#c69a3b] to-[#8d691f] shadow-md ring-1 ring-[#e6c97a] pointer-events-none flex items-center justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-white/75 -translate-y-0.5 -translate-x-0.5" />
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none pt-2 pb-16 px-3">
      {/* Hidden single file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Hidden batch file input */}
      <input
        ref={batchFileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleBatchFileChange}
        className="hidden"
      />

      {/* Ribbon Folded Banner at Top: "My Gallery" */}
      <div className="relative w-full max-w-lg mb-6 sm:mb-8 flex justify-center">
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="relative bg-[#d6b49e] px-8 sm:px-14 py-3 sm:py-4 shadow-md w-full max-w-md text-center transform -rotate-1">
            {/* Left folded back end */}
            <div
              className="absolute -left-5 sm:-left-7 top-1 bottom-1 w-6 sm:w-8 bg-[#c59d85] -z-10 shadow-sm"
              style={{ clipPath: 'polygon(100% 0%, 100% 100%, 0% 50%)' }}
            />
            {/* Right folded back end */}
            <div
              className="absolute -right-5 sm:-right-7 top-1 bottom-1 w-6 sm:w-8 bg-[#c59d85] -z-10 shadow-sm"
              style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 50%)' }}
            />

            <input
              type="text"
              value={bannerText}
              onChange={e => onUpdateBannerText(e.target.value)}
              className="font-cursive text-4xl sm:text-5xl md:text-6xl text-center bg-transparent text-[#442c1f] focus:outline-hidden cursor-text w-full leading-tight"
              title="Click to edit banner title"
            />
          </div>
        </div>
      </div>

      {/* Collage Container */}
      <div className="relative w-full max-w-xl flex flex-col items-center">
        {/* TOP ROW: Two Polaroid Cards */}
        <div className="w-full flex justify-between items-start px-1 sm:px-4 z-10">
          {/* Top-Left Card: Sunset Beach */}
          <div
            onClick={() => handleSlotClick('top-left')}
            onDragOver={e => handleDragOver(e, 'top-left')}
            onDragLeave={handleDragLeave}
            onDrop={e => handleDrop(e, 'top-left')}
            className="group relative cursor-pointer -rotate-6 hover:rotate-0 hover:scale-102 transition-all duration-300 w-[46%] aspect-[4/3] max-w-[215px]"
          >
            {renderGoldenPin()}
            <div className="w-full h-full bg-white p-2 sm:p-2.5 shadow-lg border border-stone-200/50">
              {renderCardContent('top-left')}
            </div>
          </div>

          {/* Top-Right Card: Three Girls Sunlit Selfie (IMG_2301) */}
          <div
            onClick={() => handleSlotClick('top-right')}
            onDragOver={e => handleDragOver(e, 'top-right')}
            onDragLeave={handleDragLeave}
            onDrop={e => handleDrop(e, 'top-right')}
            className="group relative cursor-pointer rotate-6 hover:rotate-0 hover:scale-102 transition-all duration-300 w-[44%] aspect-[4/3] max-w-[210px]"
          >
            {renderGoldenPin()}
            <div className="w-full h-full bg-white p-2 sm:p-2.5 shadow-lg border border-stone-200/50">
              {renderCardContent('top-right')}
            </div>
          </div>
        </div>

        {/* CENTER BIG CARD: Three girls holding 2026 frame */}
        <div
          onClick={() => handleSlotClick('center')}
          onDragOver={e => handleDragOver(e, 'center')}
          onDragLeave={handleDragLeave}
          onDrop={e => handleDrop(e, 'center')}
          className="group relative cursor-pointer z-20 -my-6 sm:-my-9 w-[78%] sm:w-[74%] aspect-[16/11] max-w-[380px] hover:scale-102 transition-all duration-300"
        >
          {renderGoldenPin()}
          <div className="w-full h-full bg-white p-2.5 sm:p-3 shadow-xl border border-stone-200/50">
            {renderCardContent('center')}
          </div>
        </div>

        {/* BOTTOM SECTION: Left Card, Right Card, and Low-Center Card */}
        <div className="w-full relative z-10 mt-2 sm:mt-4">
          <div className="w-full flex justify-between items-start px-1 sm:px-4">
            {/* Bottom-Left Card: Besties restaurant peace sign (IMG_1864) */}
            <div
              onClick={() => handleSlotClick('bottom-left')}
              onDragOver={e => handleDragOver(e, 'bottom-left')}
              onDragLeave={handleDragLeave}
              onDrop={e => handleDrop(e, 'bottom-left')}
              className="group relative cursor-pointer -rotate-6 hover:rotate-0 hover:scale-102 transition-all duration-300 w-[45%] aspect-[4/3] max-w-[215px]"
            >
              {renderGoldenPin()}
              <div className="w-full h-full bg-white p-2 sm:p-2.5 shadow-lg border border-stone-200/50">
                {renderCardContent('bottom-left')}
              </div>
            </div>

            {/* Bottom-Right Card: Vanity mirror selfie (6E500461) */}
            <div
              onClick={() => handleSlotClick('bottom-right')}
              onDragOver={e => handleDragOver(e, 'bottom-right')}
              onDragLeave={handleDragLeave}
              onDrop={e => handleDrop(e, 'bottom-right')}
              className="group relative cursor-pointer rotate-6 hover:rotate-0 hover:scale-102 transition-all duration-300 w-[45%] aspect-[4/3] max-w-[215px]"
            >
              {renderGoldenPin()}
              <div className="w-full h-full bg-white p-2 sm:p-2.5 shadow-lg border border-stone-200/50">
                {renderCardContent('bottom-right')}
              </div>
            </div>
          </div>

          {/* Bottom-Center Card: Friends against wall (318A83CA) */}
          <div className="w-full flex justify-center -mt-6 sm:-mt-8">
            <div
              onClick={() => handleSlotClick('bottom-center')}
              onDragOver={e => handleDragOver(e, 'bottom-center')}
              onDragLeave={handleDragLeave}
              onDrop={e => handleDrop(e, 'bottom-center')}
              className="group relative cursor-pointer rotate-1 hover:rotate-0 hover:scale-102 transition-all duration-300 w-[48%] sm:w-[44%] aspect-[4/3] max-w-[220px] z-20"
            >
              {renderGoldenPin()}
              <div className="w-full h-full bg-white p-2 sm:p-2.5 shadow-xl border border-stone-200/50">
                {renderCardContent('bottom-center')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
