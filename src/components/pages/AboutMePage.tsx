import { Sparkles, Calendar, MapPin, GraduationCap, Quote, ArrowRight } from 'lucide-react';
import { SchoolProjectData, PageId } from '../../types';

interface AboutMePageProps {
  data: SchoolProjectData;
  onNavigate: (page: PageId) => void;
}

export function AboutMePage({ data, onNavigate }: AboutMePageProps) {
  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-purple-200/70 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Grade Level</div>
            <div className="text-base font-bold text-stone-900">{data.ageOrGrade}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-purple-200/70 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Birthday</div>
            <div className="text-base font-bold text-stone-900">{data.birthday}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-purple-200/70 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Hometown</div>
            <div className="text-base font-bold text-stone-900">{data.hometown}</div>
          </div>
        </div>
      </div>

      {/* Main Bio Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-xs space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-[#2c78a9]">
            <Sparkles className="w-3.5 h-3.5 text-[#4a97cb]" />
            Page 1 &bull; Personal Profile
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            A Little Bit About Me
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed pt-2">
            {data.aboutMeParagraph}
          </p>
        </div>

        {/* Personality Traits */}
        <div className="pt-2 border-t border-stone-100 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Words That Describe My Personality
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.personalityWords.map((word, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-purple-50 text-purple-800 border border-purple-200/60"
              >
                ✨ {word}
              </span>
            ))}
          </div>
        </div>

        {/* Motto Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-sky-50 border border-purple-200/70 flex items-start gap-4">
          <div className="p-2 rounded-xl bg-white text-[#4a97cb] shadow-2xs shrink-0">
            <Quote className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-900">
              My Guiding Motto
            </div>
            <p className="text-base font-serif italic text-stone-800 leading-snug">
              "{data.motto}"
            </p>
          </div>
        </div>
      </div>

      {/* Page Navigation Footer */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => onNavigate('family')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4a97cb] hover:bg-[#3d83b2] text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <span>Next: Family &amp; Pets</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
