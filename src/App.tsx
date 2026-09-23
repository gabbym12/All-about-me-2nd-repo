import { useState, useEffect, useRef, type ChangeEvent, type MouseEvent } from 'react';
import { TabKey, TabConfig, SectionContent, CollageSlotId } from './types';
import { Plus, X } from 'lucide-react';
import { ScrapbookCollage } from './components/ScrapbookCollage';

const TABS: TabConfig[] = [
  { key: 'home', label: 'Home' },
  { key: 'media', label: 'Media' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'hobbies', label: 'Hobbies' },
];

const DEFAULT_SECTIONS: Record<'media' | 'hobbies', SectionContent> = {
  media: { title: 'Media & Entertainment', notes: '' },
  hobbies: { title: 'Hobbies & Interests', notes: '' },
};

const DEFAULT_BANNER_TEXT = 'My Gallery';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [userPhoto, setUserPhoto] = useState<string | null>(() => {
    return localStorage.getItem('gabriella_portfolio_photo');
  });

  const [sections, setSections] = useState<Record<'media' | 'hobbies', SectionContent>>(() => {
    try {
      const saved = localStorage.getItem('gabriella_portfolio_sections_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_SECTIONS, ...parsed };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SECTIONS;
  });

  // Collage photos by slot ID
  const [collagePhotos, setCollagePhotos] = useState<Record<CollageSlotId, string>>(() => {
    try {
      const saved = localStorage.getItem('gabriella_collage_photos_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'object' && parsed !== null) return parsed;
      }
    } catch {
      // ignore
    }
    return {} as Record<CollageSlotId, string>;
  });

  // Collage banner ribbon title
  const [bannerText, setBannerText] = useState<string>(() => {
    return localStorage.getItem('gabriella_collage_banner_v2') || DEFAULT_BANNER_TEXT;
  });

  const homeFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('gabriella_portfolio_sections_v3', JSON.stringify(sections));
    } catch {
      // ignore
    }
  }, [sections]);

  useEffect(() => {
    try {
      localStorage.setItem('gabriella_collage_photos_v1', JSON.stringify(collagePhotos));
    } catch {
      // ignore
    }
  }, [collagePhotos]);

  useEffect(() => {
    try {
      localStorage.setItem('gabriella_collage_banner_v2', bannerText);
    } catch {
      // ignore
    }
  }, [bannerText]);

  const handleHomePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setUserPhoto(reader.result);
        try {
          localStorage.setItem('gabriella_portfolio_photo', reader.result);
        } catch {
          // ignore
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveHomePhoto = (e: MouseEvent) => {
    e.stopPropagation();
    setUserPhoto(null);
    try {
      localStorage.removeItem('gabriella_portfolio_photo');
    } catch {
      // ignore
    }
    if (homeFileInputRef.current) {
      homeFileInputRef.current.value = '';
    }
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

  const handleUpdateSection = (key: 'media' | 'hobbies', updates: Partial<SectionContent>) => {
    setSections(prev => ({
      ...prev,
      [key]: { ...prev[key], ...updates },
    }));
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start px-3 sm:px-6 pt-8 sm:pt-12 pb-20 max-w-5xl mx-auto w-full">
        {activeTab === 'home' && (
          /* HOME TAB - Matching screenshot */
          <div className="flex flex-col items-center justify-center w-full animate-fade-in">
            {/* The Photo Container */}
            <div
              onClick={() => homeFileInputRef.current?.click()}
              className="w-72 h-72 sm:w-80 sm:h-80 md:w-[330px] md:h-[330px] rounded-[36px] bg-white shadow-xs border border-stone-200/50 flex flex-col items-center justify-center cursor-pointer hover:shadow-sm transition-all overflow-hidden relative group select-none"
            >
              {userPhoto ? (
                <>
                  <img
                    src={userPhoto}
                    alt="Gabriella"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-[36px]"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-white/95 text-[#cf6d4e] font-medium text-sm shadow-xs">
                      Change Photo
                    </span>
                    <button
                      onClick={handleRemoveHomePhoto}
                      className="p-2 rounded-full bg-white/95 text-rose-600 hover:bg-white shadow-xs"
                      title="Remove photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Terracotta Circular Plus Button */}
                  <div className="w-12 h-12 rounded-full bg-[#cf6d4e] text-white flex items-center justify-center shadow-xs mb-3.5 group-hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  {/* "Add one photo" label */}
                  <span className="text-stone-400 font-sans text-sm sm:text-base font-normal">
                    Add one photo
                  </span>
                </>
              )}
            </div>

            {/* DOB Section in Cursive */}
            <div className="text-center mt-8 select-none">
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

        {activeTab === 'gallery' && (
          /* GALLERY TAB: Scrapbook Collage matching screenshot */
          <div className="w-full flex flex-col items-center animate-fade-in">
            <ScrapbookCollage
              photos={collagePhotos}
              bannerText={bannerText}
              onUpdatePhoto={handleUpdateCollagePhoto}
              onResetPhoto={handleResetCollagePhoto}
              onUpdateBannerText={setBannerText}
            />
          </div>
        )}

        {(activeTab === 'media' || activeTab === 'hobbies') && (
          /* MEDIA & HOBBIES TABS */
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center animate-fade-in">
            <div className="w-full text-center mb-6">
              <input
                type="text"
                value={sections[activeTab].title}
                onChange={e => handleUpdateSection(activeTab, { title: e.target.value })}
                className="font-serif-italic font-bold text-3xl sm:text-4xl md:text-5xl text-[#cf6d4e] text-center bg-transparent border-b border-transparent hover:border-stone-200 focus:border-[#cf6d4e] focus:outline-hidden py-1 px-3 transition-all w-full"
                placeholder={TABS.find(t => t.key === activeTab)?.label}
              />
            </div>

            <div className="w-full bg-white rounded-[32px] p-8 sm:p-10 shadow-xs border border-stone-200/50 min-h-[420px] flex flex-col">
              <textarea
                value={sections[activeTab].notes}
                onChange={e => handleUpdateSection(activeTab, { notes: e.target.value })}
                placeholder={`Share your thoughts, favorites, and ideas about ${TABS.find(t => t.key === activeTab)?.label}...`}
                className="w-full flex-1 min-h-[340px] bg-transparent text-stone-800 text-base sm:text-lg leading-relaxed placeholder:text-stone-400 focus:outline-hidden resize-none"
              />

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 select-none">
                <span className="capitalize">{activeTab} section</span>
                <span className="italic text-[#cf6d4e]">
                  {sections[activeTab].notes.trim().length > 0 ? 'Saved automatically' : 'Ready for your ideas'}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
