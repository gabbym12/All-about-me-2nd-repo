import { Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import { SchoolProjectData, PageId } from '../../types';

interface FamilyPetsPageProps {
  data: SchoolProjectData;
  onNavigate: (page: PageId) => void;
}

export function FamilyPetsPage({ data, onNavigate }: FamilyPetsPageProps) {
  return (
    <div className="space-y-6">
      {/* Intro Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-900">
          <Heart className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
          Page 2 &bull; Family &amp; Furry Friends
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          People &amp; Pets I Love
        </h2>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          {data.familyStory}
        </p>
      </div>

      {/* Family Members Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 pl-1">
          Family Members
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.familyMembers.map(member => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-5 border border-purple-200/70 shadow-xs space-y-2 hover:border-purple-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700">
                  {member.relation}
                </span>
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-900">
                {member.name}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {member.funFact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pets Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 pl-1">
          Our Pets &amp; Companions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.pets.map(pet => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl p-6 border border-purple-200/70 shadow-xs flex items-start gap-4 hover:border-sky-300 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-3xl shrink-0">
                {pet.emoji}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-lg text-stone-900">{pet.name}</h4>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                    {pet.type}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {pet.personality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Tradition Banner */}
      <div className="bg-amber-50/80 rounded-2xl p-5 border border-amber-200/70 flex items-start gap-4">
        <div className="text-2xl shrink-0">🍿</div>
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Favorite Family Tradition
          </div>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            {data.favoriteTradition}
          </p>
        </div>
      </div>

      {/* Page Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => onNavigate('about')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-sm font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back: About Me</span>
        </button>

        <button
          onClick={() => onNavigate('favorites')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4a97cb] hover:bg-[#3d83b2] text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <span>Next: My Favorites</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
