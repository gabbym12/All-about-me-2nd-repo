import { useState, useEffect } from 'react';
import { AboutMePage } from './components/pages/AboutMePage';
import { FamilyPetsPage } from './components/pages/FamilyPetsPage';
import { FavoritesPage } from './components/pages/FavoritesPage';
import { GoalsPage } from './components/pages/GoalsPage';
import { TriviaPage } from './components/pages/TriviaPage';
import { EditProjectModal } from './components/EditProjectModal';
import { initialSchoolData, schoolTriviaQuestions } from './data/schoolProjectData';
import { SchoolProjectData } from './types';
import { Sparkles, Edit3 } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<SchoolProjectData>(() => {
    try {
      const saved = localStorage.getItem('school_project_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialSchoolData;
  });

  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('school_project_data', JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  const handleToggleGoal = (goalId: string) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.map(goal => {
        if (goal.id === goalId) {
          return {
            ...goal,
            status: goal.status === 'Achieved' ? 'In Progress' : 'Achieved',
          };
        }
        return goal;
      }),
    }));
  };

  return (
    <main className="min-h-screen w-full bg-[#f4ebfc] flex flex-col items-center justify-start px-4 sm:px-6 pt-8 sm:pt-12 pb-20">
      {/* Top Header with Cursive Greeting */}
      <header className="text-center max-w-4xl mx-auto space-y-3 mb-10">
        <h1
          id="gabriella-greeting"
          className="font-cursive text-5xl sm:text-7xl md:text-8xl text-[#4a97cb] tracking-wide leading-tight drop-shadow-xs select-none transition-all duration-300"
        >
          Hi i'm Gabriella
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-purple-900 border border-purple-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#4a97cb]" />
            School Portfolio Project &bull; {data.ageOrGrade}
          </span>

          <button
            onClick={() => setIsEditOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white text-purple-800 hover:bg-purple-100 border border-purple-200/80 shadow-2xs transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#4a97cb]" />
            <span>Edit Answers</span>
          </button>
        </div>
      </header>

      {/* Complete School Project Presentation Sections */}
      <section className="w-full max-w-4xl mx-auto space-y-12">
        {/* Section 1: About Me */}
        <article id="section-about">
          <AboutMePage data={data} />
        </article>

        {/* Section 2: Family & Pets */}
        <article id="section-family">
          <FamilyPetsPage data={data} />
        </article>

        {/* Section 3: My Favorites */}
        <article id="section-favorites">
          <FavoritesPage data={data} />
        </article>

        {/* Section 4: Goals & Dreams */}
        <article id="section-goals">
          <GoalsPage data={data} onToggleGoal={handleToggleGoal} />
        </article>

        {/* Section 5: Fun Trivia */}
        <article id="section-trivia">
          <TriviaPage
            questions={schoolTriviaQuestions}
            name={data.name}
          />
        </article>
      </section>

      {/* Presentation Footer */}
      <footer className="w-full max-w-4xl mx-auto mt-16 pt-6 border-t border-purple-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div className="font-medium text-purple-900">
          Gabriella's School Portfolio Project &bull; 5 Pages
        </div>

        <button
          onClick={() => setIsEditOpen(true)}
          className="text-purple-700 hover:text-purple-900 font-semibold underline underline-offset-4 cursor-pointer"
        >
          Customize your project answers
        </button>
      </footer>

      {/* Edit Modal */}
      <EditProjectModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        data={data}
        onSave={updated => setData(updated)}
      />
    </main>
  );
}
