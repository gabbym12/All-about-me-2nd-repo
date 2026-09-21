import { useState, useEffect } from 'react';
import { NavigationTabs } from './components/NavigationTabs';
import { AboutMePage } from './components/pages/AboutMePage';
import { FamilyPetsPage } from './components/pages/FamilyPetsPage';
import { FavoritesPage } from './components/pages/FavoritesPage';
import { GoalsPage } from './components/pages/GoalsPage';
import { TriviaPage } from './components/pages/TriviaPage';
import { EditProjectModal } from './components/EditProjectModal';
import { initialSchoolData, schoolTriviaQuestions } from './data/schoolProjectData';
import { SchoolProjectData, PageId } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('about');
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

  const pageNames: Record<PageId, { num: number; title: string }> = {
    about: { num: 1, title: 'About Me' },
    family: { num: 2, title: 'Family & Pets' },
    favorites: { num: 3, title: 'My Favorites' },
    goals: { num: 4, title: 'Goals & Dreams' },
    trivia: { num: 5, title: 'Fun Trivia Quiz' },
  };

  return (
    <main className="min-h-screen w-full bg-[#f4ebfc] flex flex-col items-center justify-start px-4 sm:px-6 pt-8 sm:pt-12 pb-16">
      {/* Top Header with Cursive Greeting */}
      <header className="text-center max-w-4xl mx-auto space-y-1">
        <h1
          id="gabriella-greeting"
          className="font-cursive text-5xl sm:text-7xl md:text-8xl text-[#4a97cb] tracking-wide leading-tight drop-shadow-xs select-none transition-all duration-300"
        >
          Hi i'm Gabriella
        </h1>
        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-purple-900 border border-purple-200/80 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#4a97cb]" />
            School Portfolio Project &bull; {data.ageOrGrade}
          </span>
        </div>
      </header>

      {/* Multi-Page Navigation Tabs */}
      <NavigationTabs
        currentPage={currentPage}
        onSelectPage={page => setCurrentPage(page)}
        onOpenEditModal={() => setIsEditOpen(true)}
      />

      {/* Main Page Content */}
      <section className="w-full max-w-4xl mx-auto">
        {currentPage === 'about' && (
          <AboutMePage data={data} onNavigate={p => setCurrentPage(p)} />
        )}
        {currentPage === 'family' && (
          <FamilyPetsPage data={data} onNavigate={p => setCurrentPage(p)} />
        )}
        {currentPage === 'favorites' && (
          <FavoritesPage data={data} onNavigate={p => setCurrentPage(p)} />
        )}
        {currentPage === 'goals' && (
          <GoalsPage
            data={data}
            onToggleGoal={handleToggleGoal}
            onNavigate={p => setCurrentPage(p)}
          />
        )}
        {currentPage === 'trivia' && (
          <TriviaPage
            questions={schoolTriviaQuestions}
            name={data.name}
            onNavigate={p => setCurrentPage(p)}
          />
        )}
      </section>

      {/* Presentation Footer */}
      <footer className="w-full max-w-4xl mx-auto mt-12 pt-6 border-t border-purple-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-2 font-medium">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-purple-800 font-bold">
            Page {pageNames[currentPage].num} of 5
          </span>
          <span>&bull; {pageNames[currentPage].title}</span>
        </div>

        <button
          onClick={() => setIsEditOpen(true)}
          className="text-purple-700 hover:text-purple-900 font-semibold underline underline-offset-4 cursor-pointer"
        >
          Click here to customize your project answers
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
