import { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, RotateCcw, HelpCircle, Trophy } from 'lucide-react';
import { FunFact } from '../types';

interface FactsTriviaProps {
  facts: FunFact[];
  name: string;
}

export function FactsTrivia({ facts, name }: FactsTriviaProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const handleSelect = (factId: string, optionIdx: number) => {
    if (showResults[factId]) return; // already answered
    setSelectedAnswers(prev => ({ ...prev, [factId]: optionIdx }));
    setShowResults(prev => ({ ...prev, [factId]: true }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults({});
  };

  const totalAnswered = Object.keys(showResults).length;
  const totalCorrect = facts.filter(f => showResults[f.id] && selectedAnswers[f.id] === f.correctIndex).length;

  return (
    <section id="trivia" className="py-16 md:py-20 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Interactive Trivia
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900">
            How Well Do You Know {name.split(' ')[0]}?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            Test your intuition with these fun interactive questions! Pick an option to reveal the true story.
          </p>
        </div>

        {/* Score Banner */}
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-xs mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-stone-500 font-medium">Your Trivia Score</div>
              <div className="text-base font-bold text-stone-900">
                {totalCorrect} of {facts.length} Correct <span className="text-xs text-stone-400 font-normal">({totalAnswered} answered)</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Quiz</span>
          </button>
        </div>

        {/* Questions Grid */}
        <div className="space-y-6">
          {facts.map((fact, qIdx) => {
            const isAnswered = Boolean(showResults[fact.id]);
            const selectedIdx = selectedAnswers[fact.id];
            const isCorrect = selectedIdx === fact.correctIndex;

            return (
              <div
                key={fact.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      Question {qIdx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                      {fact.question}
                    </h3>
                  </div>
                  <HelpCircle className="w-5 h-5 text-stone-300 shrink-0 mt-1" />
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {fact.options.map((option, optIdx) => {
                    let btnStyle = "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800";
                    let IconComponent = null;

                    if (isAnswered) {
                      if (optIdx === fact.correctIndex) {
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
                        onClick={() => handleSelect(fact.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between gap-2 cursor-pointer disabled:cursor-default ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {IconComponent && (
                          <IconComponent className="w-4 h-4 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Box */}
                {isAnswered && (
                  <div
                    className={`p-4 rounded-xl text-sm border flex items-start gap-3 ${
                      isCorrect
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    <div className="font-semibold shrink-0">
                      {isCorrect ? '🎉 Spot on!' : '💡 Good guess!'}
                    </div>
                    <div>{fact.explanation}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
