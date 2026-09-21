import { Target, CheckCircle2, Circle, Compass, Sparkles } from 'lucide-react';
import { SchoolProjectData, GoalItem } from '../../types';

interface GoalsPageProps {
  data: SchoolProjectData;
  onToggleGoal: (goalId: string) => void;
}

export function GoalsPage({ data, onToggleGoal }: GoalsPageProps) {
  const getCategoryColor = (category: GoalItem['category']) => {
    switch (category) {
      case 'School':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Personal':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Dream Career':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Bucket List':
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900">
          <Target className="w-3.5 h-3.5 text-emerald-600" />
          Page 4 &bull; Aspirations &amp; Milestones
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Goals, Hopes &amp; Future Dreams
        </h2>
        <p className="text-stone-600 text-base sm:text-lg">
          What I'm currently working towards in school and what I hope to accomplish in the future!
        </p>
      </div>

      {/* Career Dream Spotlight */}
      <div className="bg-gradient-to-br from-purple-50 via-white to-sky-50 rounded-3xl p-6 sm:p-7 border border-purple-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800">
              Future Career Vision
            </span>
            <h3 className="font-serif font-bold text-xl text-stone-900">
              What I Want To Be When I Grow Up
            </h3>
          </div>
        </div>
        <p className="text-stone-700 text-base sm:text-lg leading-relaxed pl-1">
          {data.futureDream}
        </p>
      </div>

      {/* Goals Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pl-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            School Year &amp; Personal Goals (Click to Check Off)
          </h3>
          <span className="text-xs text-stone-400">
            {data.goals.filter(g => g.status === 'Achieved').length} of {data.goals.length} Achieved
          </span>
        </div>

        <div className="space-y-2.5">
          {data.goals.map(goal => {
            const isDone = goal.status === 'Achieved';
            return (
              <div
                key={goal.id}
                onClick={() => onToggleGoal(goal.id)}
                className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer flex items-center justify-between gap-4 select-none ${
                  isDone
                    ? 'border-emerald-200/80 bg-emerald-50/40'
                    : 'border-purple-200/70 hover:border-purple-300 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <button
                    type="button"
                    className={`shrink-0 transition-colors cursor-pointer ${
                      isDone ? 'text-emerald-600' : 'text-stone-300 hover:text-stone-500'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 fill-emerald-100" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  <span
                    className={`text-sm sm:text-base font-medium leading-snug ${
                      isDone ? 'line-through text-stone-400' : 'text-stone-800'
                    }`}
                  >
                    {goal.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${getCategoryColor(goal.category)}`}>
                    {goal.category}
                  </span>
                  {isDone && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" /> Done!
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
