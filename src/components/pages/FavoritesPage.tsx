import { Star, BookOpen, Music, Film, Utensils, Palette, Sun, HeartHandshake, Dumbbell, ArrowLeft, ArrowRight } from 'lucide-react';
import { SchoolProjectData, PageId } from '../../types';

interface FavoritesPageProps {
  data: SchoolProjectData;
  onNavigate: (page: PageId) => void;
}

export function FavoritesPage({ data, onNavigate }: FavoritesPageProps) {
  const f = data.favorites;

  const favoriteItems = [
    { label: "Favorite Subject", value: f.subject, icon: BookOpen, color: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Favorite Colors", value: f.color, icon: Palette, color: "bg-purple-50 text-purple-700 border-purple-200" },
    { label: "Favorite Food", value: f.food, icon: Utensils, color: "bg-rose-50 text-rose-700 border-rose-200" },
    { label: "Favorite Snack", value: f.snack, icon: Star, color: "bg-amber-50 text-amber-700 border-amber-200" },
    { label: "Favorite Season", value: f.season, icon: Sun, color: "bg-orange-50 text-orange-700 border-orange-200" },
    { label: "Favorite Animal", value: f.animal, icon: HeartHandshake, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { label: "Music & Songs", value: f.song, icon: Music, color: "bg-violet-50 text-violet-700 border-violet-200" },
    { label: "Favorite Movies", value: f.movie, icon: Film, color: "bg-sky-50 text-sky-700 border-sky-200" },
    { label: "Favorite Books", value: f.book, icon: BookOpen, color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { label: "Sports & Hobbies", value: f.sportOrActivity, icon: Dumbbell, color: "bg-teal-50 text-teal-700 border-teal-200" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900">
          <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
          Page 3 &bull; Favorites Shelf
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          My All-Time Favorite Things
        </h2>
        <p className="text-stone-600 text-base sm:text-lg">
          Here is a quick snapshot of the foods, songs, classes, and hobbies that make every day fun!
        </p>
      </div>

      {/* Grid of Favorites */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-purple-200/70 shadow-xs hover:border-purple-300 transition-all flex items-start gap-3.5"
            >
              <div className={`p-3 rounded-xl border shrink-0 ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  {item.label}
                </span>
                <p className="text-sm sm:text-base font-semibold text-stone-900 leading-snug">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Page Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => onNavigate('family')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-sm font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back: Family &amp; Pets</span>
        </button>

        <button
          onClick={() => onNavigate('goals')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4a97cb] hover:bg-[#3d83b2] text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <span>Next: Goals &amp; Dreams</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
