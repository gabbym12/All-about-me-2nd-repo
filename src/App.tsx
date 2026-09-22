import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { ProjectPage } from './types';
import { PageNavigation } from './components/PageNavigation';
import { Plus, X } from 'lucide-react';

const DEFAULT_PAGES: ProjectPage[] = [
  { id: 'page-1', pageNumber: 1, title: '', content: '' },
  { id: 'page-2', pageNumber: 2, title: '', content: '' },
  { id: 'page-3', pageNumber: 3, title: '', content: '' },
  { id: 'page-4', pageNumber: 4, title: '', content: '' },
  { id: 'page-5', pageNumber: 5, title: '', content: '' },
];

export default function App() {
  const [pages, setPages] = useState<ProjectPage[]>(() => {
    try {
      const saved = localStorage.getItem('gabriella_school_project_pages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_PAGES;
  });

  const [activePageIndex, setActivePageIndex] = useState(0);
  const [userPhoto, setUserPhoto] = useState<string | null>(() => {
    return localStorage.getItem('gabriella_uploaded_photo');
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('gabriella_school_project_pages', JSON.stringify(pages));
    } catch {
      // ignore
    }
  }, [pages]);

  const safeIndex = Math.min(Math.max(0, activePageIndex), pages.length - 1);
  const currentPage = pages[safeIndex] || pages[0];

  const handleUpdateCurrentPage = (updates: Partial<ProjectPage>) => {
    setPages(prev =>
      prev.map((p, idx) => (idx === safeIndex ? { ...p, ...updates } : p))
    );
  };

  const handleAddPage = () => {
    const newPage: ProjectPage = {
      id: `page-${Date.now()}`,
      pageNumber: pages.length + 1,
      title: '',
      content: '',
    };
    setPages(prev => [...prev, newPage]);
    setActivePageIndex(pages.length);
  };

  const handleDeletePage = (indexToDelete: number) => {
    if (pages.length <= 1) return;
    setPages(prev => prev.filter((_, idx) => idx !== indexToDelete));
    if (safeIndex >= pages.length - 1) {
      setActivePageIndex(Math.max(0, pages.length - 2));
    }
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setUserPhoto(reader.result);
        try {
          localStorage.setItem('gabriella_uploaded_photo', reader.result);
        } catch {
          // localStorage might be full for large images
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUserPhoto(null);
    try {
      localStorage.removeItem('gabriella_uploaded_photo');
    } catch {
      // ignore
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isFirstPage = safeIndex === 0;

  return (
    <main className="min-h-screen w-full bg-[#f6dae7] flex flex-col items-center justify-start px-4 sm:px-6 pt-8 sm:pt-12 pb-20 font-cursive">
      {/* Top Header: Always Hi i'm Gabriella on Page 1 */}
      {isFirstPage ? (
        <header className="text-center max-w-2xl mx-auto mb-4">
          <h1
            id="gabriella-greeting"
            className="font-cursive text-7xl sm:text-8xl md:text-9xl text-[#8d549f] tracking-normal leading-none select-none transition-all duration-300"
          >
            Hi i'm Gabriella
          </h1>
        </header>
      ) : (
        /* Header for Pages 2+ */
        <header className="w-full max-w-xl mx-auto mb-4 text-center">
          <input
            type="text"
            value={currentPage.title}
            onChange={e => handleUpdateCurrentPage({ title: e.target.value })}
            placeholder={`Page ${safeIndex + 1}`}
            className="w-full text-center font-cursive text-5xl sm:text-6xl text-[#8d549f] bg-transparent border-b border-transparent hover:border-[#8d549f]/30 focus:border-[#8d549f] focus:outline-hidden py-1 px-3 placeholder:text-[#8d549f]/40 transition-all"
          />
        </header>
      )}

      {/* Navigation Card */}
      <div className="w-full max-w-xl mx-auto mb-8">
        <PageNavigation
          pages={pages}
          activePageIndex={safeIndex}
          onSelectPage={idx => setActivePageIndex(idx)}
          onAddPage={handleAddPage}
          onDeletePage={handleDeletePage}
        />
      </div>

      {/* Hidden File Input for Picture Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* Main Page Area */}
      <section className="w-full max-w-xl mx-auto flex flex-col items-center">
        {isFirstPage ? (
          /* First Page matching screenshot */
          <div className="flex flex-col items-center justify-center w-full">
            {/* The Photo Container */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-72 h-72 sm:w-80 sm:h-80 rounded-[36px] bg-white/95 shadow-sm border border-white/90 flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-all overflow-hidden relative group"
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
                    <span className="px-4 py-1.5 rounded-full bg-white/90 text-[#8d549f] font-cursive text-xl shadow-xs">
                      Change Photo
                    </span>
                    <button
                      onClick={handleRemovePhoto}
                      className="p-2 rounded-full bg-white/90 text-rose-600 hover:bg-white shadow-xs"
                      title="Remove photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Purple Circular Plus Icon */}
                  <div className="w-12 h-12 rounded-full bg-[#8d549f] text-white flex items-center justify-center shadow-xs mb-3 group-hover:scale-105 transition-transform">
                    <Plus className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  {/* "Add one photo" label */}
                  <span className="text-[#8a7686] font-sans text-base font-normal select-none">
                    Add one photo
                  </span>
                </>
              )}
            </div>

            {/* DOB Section in Cursive */}
            <div className="text-center mt-6 select-none">
              <h2 className="font-cursive text-6xl sm:text-7xl text-[#8d549f] leading-tight">
                DOB: 06/15/12
              </h2>
              <p className="font-cursive text-3xl sm:text-4xl text-[#8d549f] mt-1">
                June 15, 2012
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="font-cursive text-2xl sm:text-3xl text-[#8d549f] mt-2 underline underline-offset-4 decoration-[#8d549f]/70 hover:opacity-80 transition-opacity cursor-pointer block mx-auto"
              >
                Upload your own picture
              </button>
            </div>
          </div>
        ) : (
          /* Blank Pages 2+ */
          <div className="w-full bg-white/90 focus-within:bg-white transition-all rounded-[32px] p-6 sm:p-8 shadow-sm border border-white min-h-[420px] flex flex-col">
            <textarea
              value={currentPage.content}
              onChange={e => handleUpdateCurrentPage({ content: e.target.value })}
              placeholder={`Page ${safeIndex + 1} is ready for your ideas...`}
              className="w-full flex-1 min-h-[340px] bg-transparent text-stone-800 font-cursive text-2xl sm:text-3xl leading-relaxed placeholder:text-[#8d549f]/40 focus:outline-hidden resize-none"
            />

            <div className="mt-3 pt-3 border-t border-pink-100 flex items-center justify-between text-xl text-[#8d549f] select-none">
              <span>
                Page {safeIndex + 1} of {pages.length}
              </span>
              <span className="italic">
                {currentPage.content.trim().length > 0 ? 'Saved' : 'Blank'}
              </span>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
