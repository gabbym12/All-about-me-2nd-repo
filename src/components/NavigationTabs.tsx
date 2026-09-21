import { User, Users, Star, Target, HelpCircle, Edit3 } from 'lucide-react';
import { PageId } from '../types';

interface NavigationTabsProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  onOpenEditModal: () => void;
}

export function NavigationTabs({
  currentPage,
  onSelectPage,
  onOpenEditModal,
}: NavigationTabsProps) {
  const pages: { id: PageId; label: string; icon: typeof User }[] = [
    { id: 'about', label: 'About Me', icon: User },
    { id: 'family', label: 'Family & Pets', icon: Users },
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'goals', label: 'Goals & Dreams', icon: Target },
    { id: 'trivia', label: 'Fun Trivia', icon: HelpCircle },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/70 backdrop-blur-md p-2 rounded-2xl border border-purple-200/80 shadow-xs">
        <nav className="flex flex-wrap items-center gap-1.5" aria-label="Project Pages">
          {pages.map(page => {
            const Icon = page.icon;
            const isActive = currentPage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => onSelectPage(page.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#4a97cb] text-white shadow-sm scale-102'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-purple-100/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{page.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          onClick={onOpenEditModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-100 text-purple-900 hover:bg-purple-200 border border-purple-200 transition-colors cursor-pointer shrink-0"
          title="Edit project details"
        >
          <Edit3 className="w-3.5 h-3.5 text-purple-700" />
          <span>Edit Answers</span>
        </button>
      </div>
    </div>
  );
}
