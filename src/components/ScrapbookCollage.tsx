import { useState, useRef, type ChangeEvent, type MouseEvent } from 'react';
import { CollageSlotId } from '../types';
import { Plus, X, Camera } from 'lucide-react';

interface ScrapbookCollageProps {
  photos: Record<CollageSlotId, string>;
  bannerText: string;
  onUpdatePhoto: (slotId: CollageSlotId, dataUrl: string) => void;
  onResetPhoto: (slotId: CollageSlotId) => void;
  onUpdateBannerText: (text: string) => void;
}

export function ScrapbookCollage({
  photos,
  bannerText,
  onUpdatePhoto,
  onResetPhoto,
  onUpdateBannerText,
}: ScrapbookCollageProps) {
  const [activeSlotForUpload, setActiveSlotForUpload] = useState<CollageSlotId | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const renderCardContent = (slotId: CollageSlotId) => {
    const photoUrl = photos[slotId];

    if (photoUrl) {
      return (
        <div className="relative w-full h-full group overflow-hidden">
          <img
            src={photoUrl}
            alt="Collage photo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform group-hover:scale-102"
          />
          {/* Hover overlay with Change and Delete */}
          <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 text-[#cf6d4e] text-xs font-medium shadow-xs">
              <Camera className="w-3.5 h-3.5" />
              Change
            </span>
            <button
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                onResetPhoto(slotId);
              }}
              className="p-1.5 rounded-full bg-white/95 text-rose-600 hover:bg-white shadow-xs"
              title="Remove photo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full bg-[#f2e6dc] flex flex-col items-center justify-center p-3 select-none group-hover:bg-[#ebded4] transition-colors">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#cf6d4e] text-white flex items-center justify-center shadow-xs mb-1.5 group-hover:scale-105 transition-transform">
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </div>
        <span className="text-xs sm:text-sm font-normal text-[#8c6754]">
          Add photo
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
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none pt-1 pb-16 px-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Ribbon Folded Banner at Top: "My Gallery" */}
      <div className="relative w-full max-w-lg mb-8 sm:mb-12 flex justify-center">
        {/* Banner with 3D folded ends */}
        <div className="relative z-10 w-full flex items-center justify-center">
          {/* Main tape center */}
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

      {/* Collage Container matching Screenshot */}
      <div className="relative w-full max-w-xl flex flex-col items-center">
        {/* TOP ROW: Two Polaroid Cards (Left tilted -6deg, Right tilted +6deg) */}
        <div className="w-full flex justify-between items-start px-2 sm:px-6 z-10">
          {/* Top-Left Card */}
          <div
            onClick={() => handleSlotClick('top-left')}
            className="group relative cursor-pointer -rotate-6 hover:rotate-0 hover:scale-102 transition-all duration-300 w-[44%] aspect-[4/3] max-w-[210px]"
          >
            {renderGoldenPin()}
            <div className="w-full h-full bg-white p-2 sm:p-2.5 shadow-lg border border-stone-200/40">
              {renderCardContent('top-left')}
            </div>
          </div>

          {/* Top-Right Card */}
          <div
            onClick={() => handleSlotClick('top-right')}
            className="group relative cursor-pointer rotate-6 hover:rotate-0 hover:scale-102 transition-all duration-300 w-[44%] aspect-[4/3] max-w-[210px]"
          >
            {renderGoldenPin()}
            <div className="w-full h-full bg-white p-2 sm:p-2.5 shadow-lg border border-stone-200/40">
              {renderCardContent('top-right')}
            </div>
          </div>
        </div>

        {/* CENTER BIG CARD: Overlapping slightly in the middle */}
        <div
          onClick={() => handleSlotClick('center')}
          className="group relative cursor-pointer z-20 -my-6 sm:-my-10 w-[78%] sm:w-[74%] aspect-[16/11] max-w-[380px] hover:scale-102 transition-all duration-300"
        >
          {renderGoldenPin()}
          <div className="w-full h-full bg-white p-2.5 sm:p-3 shadow-xl border border-stone-200/50">
            {renderCardContent('center')}
          </div>
        </div>

        {/* BOTTOM SECTION: Left Card, Right Card, and Low-Center Card */}
        <div className="w-full relative z-10 mt-2 sm:mt-4">
          {/* Bottom Left and Bottom Right */}
          <div className="w-full flex justify-between items-start px-2 sm:px-6">
            {/* Bottom-Left Card */}
            <div
              onClick={() => handleSlotClick('bottom-left')}
              className="group relative cursor-pointer -rotate-6 hover:rotate-0 hover:scale-102 transition-all duration-300 w-[44%] aspect-[4/3] max-w-[210px]"
            >
              {renderGoldenPin()}
              <div className="w-full h-full bg-white p-2 sm:p-2.5 shadow-lg border border-stone-200/40">
                {renderCardContent('bottom-left')}
              </div>
            </div>

            {/* Bottom-Right Card */}
            <div
              onClick={() => handleSlotClick('bottom-right')}
              className="group relative cursor-pointer rotate-6 hover:rotate-0 hover:scale-102 transition-all duration-300 w-[44%] aspect-[4/3] max-w-[210px]"
            >
              {renderGoldenPin()}
              <div className="w-full h-full bg-white p-2 sm:p-2.5 shadow-lg border border-stone-200/40">
                {renderCardContent('bottom-right')}
              </div>
            </div>
          </div>

          {/* Bottom-Center Card (Lower, centered between bottom-left & bottom-right) */}
          <div className="w-full flex justify-center -mt-6 sm:-mt-8">
            <div
              onClick={() => handleSlotClick('bottom-center')}
              className="group relative cursor-pointer rotate-1 hover:rotate-0 hover:scale-102 transition-all duration-300 w-[48%] sm:w-[44%] aspect-[4/3] max-w-[220px] z-20"
            >
              {renderGoldenPin()}
              <div className="w-full h-full bg-white p-2 sm:p-2.5 shadow-xl border border-stone-200/40">
                {renderCardContent('bottom-center')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
