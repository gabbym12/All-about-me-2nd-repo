import { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowLeft, Sparkles } from 'lucide-react';
import { FunFact, PageId } from '../../types';

interface TriviaPageProps {
  questions: FunFact[];
  name: string;
  onNavigate: (page: PageId) => void;
}

export function TriviaPage({ questions, name, onNavigate }: TriviaPageProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const handleSelect = (questionId: string, optionIdx: number) => {
    if (showResults[questionId]) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
    setShowResults(prev => ({ ...prev, [questionId]: true }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults({});
  };

  const totalAnswered = Object.keys(showResults).length;
  const totalCorrect = questions.filter(
    q => showResults[q.id] && selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-900">
          <HelpCircle className="w-3.5 h-3.5 text-[#4a97cb]" />
          Page 5 &bull; Interactive Quiz
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          How Well Do You Know {name}?
        </h2>
        <p className="text-stone-600 text-base sm:text-lg">
          A fun interactive trivia game for classmates and teachers to test how well they paid attention!
        </p>
      </div>

      {/* Score Tracker */}
      <div className="bg-white rounded-2xl p-5 border border-purple-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Classmate Trivia Score
            </div>
            <div className="text-lg font-bold text-stone-900">
              {totalCorrect} of {questions.length} Correct{' '}
              <span className="text-xs font-normal text-stone-400">
                ({totalAnswered} answered)
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Quiz</span>
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const isAnswered = Boolean(showResults[q.id]);
          const selectedIdx = selectedAnswers[q.id];
          const isCorrect = selectedIdx === q.correctIndex;

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-purple-200/80 p-5 sm:p-6 shadow-xs space-y-4"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#4a97cb] uppercase tracking-wider">
                  Question {idx + 1}
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((option, optIdx) => {
                  let btnStyle = "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800";
                  let IconComponent = null;

                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold";
                      IconComponent = CheckCircle2;
                    } else if (optIdx === selectedIdx) {
                      btnStyle = "bg-rose-50 border-rose-300 text-rose-900 font-semibold";
                      IconComponent = XCircle;
                    } else {
                      btnStyle = "bg-stone-50 border-stone-200 text-stone-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between gap-2 cursor-pointer disabled:cursor-default ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {IconComponent && <IconComponent className="w-4 h-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {isAnswered && (
                <div
                  className={`p-4 rounded-xl text-sm border flex items-start gap-3 ${
                    isCorrect
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                      : 'bg-purple-50 border-purple-200 text-purple-950'
                  }`}
                >
                  <div className="font-semibold shrink-0">
                    {isCorrect ? '🎉 Correct!' : '💡 Fun Fact:'}
                  </div>
                  <div>{q.explanation}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Page Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => onNavigate('goals')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-sm font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back: Goals</span>
        </button>

        <button
          onClick={() => onNavigate('about')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4a97cb] hover:bg-[#3d83b2] text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Return to Beginning (About Me)</span>
        </button>
      </div>
    </div>
  );
}
