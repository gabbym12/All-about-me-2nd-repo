import { useState, useEffect, useRef, type ChangeEvent, type MouseEvent, type DragEvent } from 'react';
import { TabKey, TabConfig, CollageSlotId, MediaItem, SportCard } from './types';
import { X, Square, Music2, Zap, Upload } from 'lucide-react';
import { ScrapbookCollage } from './components/ScrapbookCollage';

const TABS: TabConfig[] = [
  { key: 'home', label: 'Home' },
  { key: 'media', label: 'Media' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'hobbies', label: 'Hobbies' },
];

const DEFAULT_COLLAGE_PHOTOS: Record<CollageSlotId, string> = {
  'top-left': '/sunset_beach.jpg',
  'top-right': '/sunny_selfie.jpg',
  'center': '/center_2026.jpg',
  'bottom-left': '/besties_diner.jpg',
  'bottom-center': '/friends_wall.jpg',
  'bottom-right': '/mirror_selfie.jpg',
};

const DEFAULT_MEDIA_ITEMS: MediaItem[] = [
  { id: '1', name: 'Ashanti', type: 'ARTIST' },
  { id: '2', name: 'Frank Ocean', type: 'ARTIST' },
  { id: '3', name: 'Rap', type: 'GENRE' },
  { id: '4', name: 'R&B', type: 'GENRE' },
];

const DEFAULT_SPORTS_CARDS: SportCard[] = [
  { id: '1', sport: 'BASEBALL', team: 'San Diego Padres', icon: 'baseball' },
  { id: '2', sport: 'FOOTBALL', team: 'Los Angeles Chargers', icon: 'football' },
];

const DEFAULT_HOBBIES_TEXT =
  'I love spending time with my friends and family. I also enjoy playing sports and cheering on my favorite teams. Whether I am on the field or watching a game, sports are always something I look forward to.';

const DEFAULT_BANNER_TEXT = 'My Gallery';

function BaseballIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none">
      <circle cx="18" cy="18" r="16" fill="#ffffff" stroke="#d5d5d5" strokeWidth="1" />
      <path d="M 11 6 A 12 12 0 0 1 11 30" stroke="#d32f2f" strokeWidth="1.8" strokeDasharray="2.5 1.5" />
      <path d="M 25 6 A 12 12 0 0 0 25 30" stroke="#d32f2f" strokeWidth="1.8" strokeDasharray="2.5 1.5" />
    </svg>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  // Home slide main photo
  const [userPhoto, setUserPhoto] = useState<string | null>(() => {
    return localStorage.getItem('gabriella_real_home_photo_v7') || '/mirror_selfie.jpg';
  });

  // Collage photos by slot ID
  const [collagePhotos, setCollagePhotos] = useState<Record<CollageSlotId, string>>(() => {
    try {
      const saved = localStorage.getItem('gabriella_real_collage_photos_v7');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'object' && parsed !== null && Object.keys(parsed).length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_COLLAGE_PHOTOS;
  });

  // Collage banner ribbon title
  const [bannerText, setBannerText] = useState<string>(() => {
    return localStorage.getItem('gabriella_collage_banner_v3') || DEFAULT_BANNER_TEXT;
  });

  // Media items list
  const [mediaItems] = useState<MediaItem[]>(DEFAULT_MEDIA_ITEMS);

  // Sports cards list
  const [sportsCards] = useState<SportCard[]>(DEFAULT_SPORTS_CARDS);

  // Hobbies description text
  const [hobbiesText, setHobbiesText] = useState<string>(() => {
    return localStorage.getItem('gabriella_hobbies_text_v1') || DEFAULT_HOBBIES_TEXT;
  });

  const [homeIsDragging, setHomeIsDragging] = useState(false);
  const homeFileInputRef = useRef<HTMLInputElement>(null);
  const batchFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('gabriella_real_collage_photos_v7', JSON.stringify(collagePhotos));
    } catch {
      // ignore
    }
  }, [collagePhotos]);

  useEffect(() => {
    try {
      localStorage.setItem('gabriella_collage_banner_v3', bannerText);
    } catch {
      // ignore
    }
  }, [bannerText]);

  useEffect(() => {
    try {
      localStorage.setItem('gabriella_hobbies_text_v1', hobbiesText);
    } catch {
      // ignore
    }
  }, [hobbiesText]);

  const handleSmartBatchUpload = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result !== 'string') return;
        const dataUrl = reader.result;
        const name = file.name.toUpperCase();

        if (name.includes('6E500461') || name.includes('MIRROR')) {
          setUserPhoto(dataUrl);
          localStorage.setItem('gabriella_real_home_photo_v7', dataUrl);
          setCollagePhotos(prev => ({ ...prev, 'bottom-right': dataUrl }));
        } else if (name.includes('318A83CA') || name.includes('WALL')) {
          setCollagePhotos(prev => ({ ...prev, 'bottom-center': dataUrl }));
        } else if (name.includes('1864') || name.includes('RESTAURANT')) {
          setCollagePhotos(prev => ({ ...prev, 'bottom-left': dataUrl }));
        } else if (name.includes('2301') || name.includes('SUNNY')) {
          setCollagePhotos(prev => ({ ...prev, 'top-right': dataUrl }));
        } else if (name.includes('2026') || name.includes('FRAME') || name.includes('11.02.38') || name.includes('SCREENSHOT') || name.includes('BOOT')) {
          setCollagePhotos(prev => ({ ...prev, 'center': dataUrl }));
        } else if (name.includes('BEACH') || name.includes('SUNSET')) {
          setCollagePhotos(prev => ({ ...prev, 'top-left': dataUrl }));
        } else {
          // If name doesn't match predefined, place into first available slot
          setCollagePhotos(prev => {
            const slots: CollageSlotId[] = ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];
            const freeSlot = slots.find(s => !prev[s]);
            if (freeSlot) {
              return { ...prev, [freeSlot]: dataUrl };
            }
            return prev;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleHomePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setUserPhoto(reader.result);
        localStorage.setItem('gabriella_real_home_photo_v7', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveHomePhoto = (e: MouseEvent) => {
    e.stopPropagation();
    setUserPhoto(null);
    localStorage.removeItem('gabriella_real_home_photo_v7');
    if (homeFileInputRef.current) {
      homeFileInputRef.current.value = '';
    }
  };

  const handleHomeDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHomeIsDragging(true);
  };

  const handleHomeDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHomeIsDragging(false);
  };

  const handleHomeDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHomeIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    if (files.length > 1) {
      handleSmartBatchUpload(files);
      return;
    }

    const file = files[0];
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setUserPhoto(reader.result);
        localStorage.setItem('gabriella_real_home_photo', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateCollagePhoto = (slotId: CollageSlotId, dataUrl: string) => {
    setCollagePhotos(prev => ({
      ...prev,
      [slotId]: dataUrl,
    }));
  };

  const handleResetCollagePhoto = (slotId: CollageSlotId) => {
    setCollagePhotos(prev => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#faf8f5] flex flex-col text-stone-800">
      {/* Top Navigation Bar: Gabriella | Home, Media, Gallery, Hobbies */}
      <header className="w-full border-b border-stone-200/60 bg-[#faf8f5]/95 backdrop-blur-xs sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo: Gabriella in terracotta italic serif */}
          <button
            onClick={() => setActiveTab('home')}
            className="font-serif-italic font-bold text-3xl sm:text-4xl text-[#cf6d4e] tracking-tight hover:opacity-90 transition-opacity cursor-pointer text-left"
          >
            Gabriella
          </button>

          {/* Navigation Links: Home, Media, Gallery, Hobbies */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
            {TABS.map(tab => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 sm:px-5 py-1.5 rounded-full text-sm sm:text-base transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#faeae1] text-[#cf6d4e] font-semibold'
                      : 'text-stone-700 hover:text-stone-950 font-medium'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Hidden File Input for Home Avatar */}
      <input
        ref={homeFileInputRef}
        type="file"
        accept="image/*"
        onChange={handleHomePhotoUpload}
        className="hidden"
      />

      {/* Hidden Multi-file Input for Smart Upload */}
      <input
        ref={batchFileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={e => {
          if (e.target.files) handleSmartBatchUpload(e.target.files);
        }}
        className="hidden"
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start px-3 sm:px-6 pt-6 sm:pt-10 pb-20 max-w-5xl mx-auto w-full">
        {activeTab === 'home' && (
          /* HOME TAB - Matching Screenshot 1 */
          <div className="flex flex-col items-center justify-center w-full animate-fade-in">
            {/* The Photo Container */}
            <div
              onClick={() => homeFileInputRef.current?.click()}
              onDragOver={handleHomeDragOver}
              onDragLeave={handleHomeDragLeave}
              onDrop={handleHomeDrop}
              className={`w-72 h-72 sm:w-80 sm:h-80 md:w-[340px] md:h-[340px] rounded-[32px] bg-white shadow-xs border flex flex-col items-center justify-center cursor-pointer hover:shadow-sm transition-all overflow-hidden relative group select-none ${
                homeIsDragging ? 'border-[#cf6d4e] ring-4 ring-[#faeae1]' : 'border-stone-200/50'
              }`}
            >
              {userPhoto ? (
                <>
                  <img
                    src={userPhoto || '/mirror_selfie.jpg'}
                    alt="Gabriella"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== '/mirror_selfie.jpg' && !target.src.endsWith('/mirror_selfie.jpg')) {
                        target.src = '/mirror_selfie.jpg';
                      }
                    }}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-[32px]"
                  />
                  {/* Replit-style bottom-right "Change Photo" pill button */}
                  <div className="absolute bottom-3.5 right-3.5 z-10">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        homeFileInputRef.current?.click();
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-md border border-stone-200/60 transition-transform active:scale-95 cursor-pointer"
                    >
                      <Square className="w-3.5 h-3.5 text-stone-600 stroke-[2]" />
                      <span className="font-cursive text-lg sm:text-xl text-stone-800 leading-none pt-0.5">
                        Change Photo
                      </span>
                    </button>
                  </div>
                  {/* Remove button visible on hover at top-right */}
                  <button
                    onClick={handleRemoveHomePhoto}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-rose-600 hover:bg-white shadow-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Remove photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-[#cf6d4e] text-white flex items-center justify-center shadow-xs mb-3 group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="font-bold text-stone-800 text-base sm:text-lg mb-1">
                    Select Your Mirror Selfie
                  </span>
                  <span className="text-stone-500 font-sans text-xs sm:text-sm">
                    Click to pick your photo (6E500461...) from your device
                  </span>
                </div>
              )}
            </div>

            {/* DOB Section in Cursive matching Screenshot 1 */}
            <div className="text-center mt-7 select-none">
              <h2 className="font-cursive text-6xl sm:text-7xl md:text-8xl text-[#cf6d4e] leading-none">
                DOB: 06/15/12
              </h2>
              <p className="font-cursive text-3xl sm:text-4xl text-[#6c5b52] mt-2">
                June 15, 2012
              </p>
              <button
                onClick={() => homeFileInputRef.current?.click()}
                className="font-cursive text-2xl sm:text-3xl text-[#cf6d4e] mt-3 underline underline-offset-4 decoration-[#cf6d4e]/70 hover:opacity-80 transition-opacity cursor-pointer block mx-auto"
              >
                Upload your own picture
              </button>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          /* MEDIA TAB: Artists I Like matching Screenshot 2 */
          <div className="w-full max-w-xl mx-auto flex flex-col items-start animate-fade-in pt-2">
            <div className="w-full text-left mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#cf6d4e] tracking-tight">
                Artists I Like
              </h1>
              <p className="text-[#6c5b52] text-sm sm:text-base mt-1.5">
                Artists and music styles I enjoy.
              </p>
            </div>

            <div className="w-full space-y-3.5">
              {mediaItems.map(item => (
                <div
                  key={item.id}
                  className="w-full bg-white rounded-2xl p-4 sm:p-4.5 border border-stone-200/60 shadow-xs flex items-center justify-between hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#d67252] text-white flex items-center justify-center shadow-xs">
                      <Music2 className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="font-bold text-stone-800 text-base sm:text-lg">
                      {item.name}
                    </span>
                  </div>
                  <span className="bg-[#faeae1] text-[#cf6d4e] font-bold text-xs sm:text-sm px-3.5 py-1 rounded-full uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          /* GALLERY TAB: Scrapbook Collage matching Screenshot 3 */
          <div className="w-full flex flex-col items-center animate-fade-in">
            <ScrapbookCollage
              photos={collagePhotos}
              bannerText={bannerText}
              onUpdatePhoto={handleUpdateCollagePhoto}
              onResetPhoto={handleResetCollagePhoto}
              onUpdateBannerText={setBannerText}
              onBatchUpload={handleSmartBatchUpload}
            />
          </div>
        )}

        {activeTab === 'hobbies' && (
          /* HOBBIES TAB: Sports & Personal bio matching Screenshot 4 */
          <div className="w-full max-w-xl mx-auto flex flex-col items-start animate-fade-in pt-2">
            <div className="w-full text-left mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#cf6d4e] tracking-tight">
                My Hobbies
              </h1>
              <p className="text-[#6c5b52] text-sm sm:text-base mt-1.5">
                Some of the sports teams I like.
              </p>
            </div>

            <div className="w-full space-y-5">
              {sportsCards.map(card => (
                <div
                  key={card.id}
                  className="w-full bg-white rounded-2xl border border-stone-200/60 shadow-xs overflow-hidden"
                >
                  {/* Banner with diagonal stripes pattern */}
                  <div
                    className="w-full h-24 sm:h-28 relative flex flex-col items-center justify-center overflow-hidden"
                    style={{
                      background:
                        card.icon === 'baseball'
                          ? 'repeating-linear-gradient(45deg, #2b496d, #2b496d 8px, #36587f 8px, #36587f 16px, #4a6c92 16px, #4a6c92 24px, #b8860b 24px, #b8860b 32px, #c99818 32px, #c99818 40px)'
                          : 'repeating-linear-gradient(45deg, #007ac2, #007ac2 8px, #0f8cd4 8px, #0f8cd4 16px, #269ee4 16px, #269ee4 24px, #e8a500 24px, #e8a500 32px, #fdb515 32px, #fdb515 40px)',
                    }}
                  >
                    <div
                      className={`absolute inset-0 ${
                        card.icon === 'baseball'
                          ? 'bg-gradient-to-r from-[#203a57]/70 via-transparent to-[#b2820a]/70'
                          : 'bg-gradient-to-r from-[#00629c]/70 via-transparent to-[#e09e00]/70'
                      }`}
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                      {card.icon === 'baseball' ? (
                        <BaseballIcon className="w-8 h-8 drop-shadow-sm" />
                      ) : (
                        <Zap className="w-8 h-8 text-[#ffdf38] fill-[#ffdf38] filter drop-shadow-md" />
                      )}
                      <span className="font-serif font-black text-white text-base sm:text-lg tracking-widest uppercase drop-shadow-md">
                        {card.sport}
                      </span>
                    </div>
                  </div>

                  {/* Team Name Label */}
                  <div className="py-3 sm:py-3.5 text-center">
                    <span className="font-bold text-stone-800 text-base sm:text-lg">
                      {card.team}
                    </span>
                  </div>
                </div>
              ))}

              {/* Bio Paragraph Box */}
              <div className="w-full bg-white rounded-2xl border border-stone-200/60 shadow-xs p-6 sm:p-7 text-stone-700 leading-relaxed text-sm sm:text-base">
                <textarea
                  value={hobbiesText}
                  onChange={e => setHobbiesText(e.target.value)}
                  className="w-full bg-transparent text-stone-700 leading-relaxed text-sm sm:text-base focus:outline-hidden resize-none min-h-[110px]"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
