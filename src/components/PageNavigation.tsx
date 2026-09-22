import { Trash2 } from 'lucide-react';
import { ProjectPage } from '../types';

interface PageNavigationProps {
  pages: ProjectPage[];
  activePageIndex: number;
  onSelectPage: (index: number) => void;
  onAddPage: () => void;
  onDeletePage: (index: number) => void;
}

export function PageNavigation({
  pages,
  activePageIndex,
  onSelectPage,
  onAddPage,
  onDeletePage,
}: PageNavigationProps) {
  const canGoPrev = activePageIndex > 0;

  return (
    <div className="w-full max-w-xl mx-auto bg-white/85 backdrop-blur-md rounded-[32px] p-4 sm:p-5 shadow-sm border border-white/80 select-none">
      {/* Top Row: < Previous, Page 1, Page 2, Page 3, Page 4, Page 5... */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {/* Previous Pill */}
        <button
          onClick={() => onSelectPage(activePageIndex - 1)}
          disabled={!canGoPrev}
          className="px-4 py-1 rounded-full bg-white/95 border border-stone-200/60 text-[#8d549f] font-cursive text-2xl leading-none disabled:opacity-40 disabled:hover:text-[#8d549f] transition-all cursor-pointer whitespace-nowrap shadow-2xs"
        >
          &lsaquo; Previous
        </button>

        {/* Page Pills */}
        {pages.map((page, idx) => {
          const isActive = idx === activePageIndex;
          return (
            <button
              key={page.id}
              onClick={() => onSelectPage(idx)}
              className={`px-4 py-1 rounded-full font-cursive text-2xl leading-none transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#8d549f] text-white shadow-xs'
                  : 'bg-[#faeaf3] text-[#8d549f] hover:bg-[#f3dbee]'
              }`}
            >
              Page {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Thin Horizontal Progress / Track Bar */}
      <div className="w-full h-1.5 bg-stone-300/40 rounded-full my-3 overflow-hidden">
        <div
          className="h-full bg-[#8d549f] rounded-full transition-all duration-300"
          style={{ width: `${((activePageIndex + 1) / pages.length) * 100}%` }}
        />
      </div>

      {/* Bottom Row: + New Page & Delete */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onAddPage}
            className="px-5 py-1.5 rounded-full bg-[#8d549f] text-white font-cursive text-2xl leading-none shadow-xs hover:bg-[#7e478f] transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            + New Page
          </button>

          {pages.length > 1 && (
            <button
              onClick={() => onDeletePage(activePageIndex)}
              className="p-1.5 rounded-full text-stone-300 hover:text-stone-500 hover:bg-stone-100/60 transition-colors cursor-pointer"
              title="Delete this page"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
