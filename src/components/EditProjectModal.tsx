import { useState, type FormEvent } from 'react';
import { X, Save, RotateCcw } from 'lucide-react';
import { SchoolProjectData } from '../types';
import { initialSchoolData } from '../data/schoolProjectData';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SchoolProjectData;
  onSave: (updated: SchoolProjectData) => void;
}

export function EditProjectModal({
  isOpen,
  onClose,
  data,
  onSave,
}: EditProjectModalProps) {
  const [formData, setFormData] = useState<SchoolProjectData>(data);
  const [personalityInput, setPersonalityInput] = useState(data.personalityWords.join(', '));

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const words = personalityInput.split(',').map(s => s.trim()).filter(Boolean);
    onSave({
      ...formData,
      personalityWords: words
    });
    onClose();
  };

  const handleReset = () => {
    setFormData(initialSchoolData);
    setPersonalityInput(initialSchoolData.personalityWords.join(', '));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-200 shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Edit My School Project Details
            </h3>
            <p className="text-xs text-stone-500">
              Customize any answer, favorites, or bio to match your real information.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Basic Profile */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700">
              1. Basic Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Grade Level</label>
                <input
                  type="text"
                  value={formData.ageOrGrade}
                  onChange={e => setFormData({ ...formData, ageOrGrade: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a97cb]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Birthday</label>
                <input
                  type="text"
                  value={formData.birthday}
                  onChange={e => setFormData({ ...formData, birthday: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a97cb]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Hometown</label>
                <input
                  type="text"
                  value={formData.hometown}
                  onChange={e => setFormData({ ...formData, hometown: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a97cb]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">About Me Bio</label>
              <textarea
                rows={3}
                value={formData.aboutMeParagraph}
                onChange={e => setFormData({ ...formData, aboutMeParagraph: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a97cb] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Personal Motto</label>
              <input
                type="text"
                value={formData.motto}
                onChange={e => setFormData({ ...formData, motto: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a97cb]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Personality Words (comma separated)
              </label>
              <input
                type="text"
                value={personalityInput}
                onChange={e => setPersonalityInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a97cb]"
              />
            </div>
          </div>

          {/* Favorites */}
          <div className="space-y-3 pt-3 border-t border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700">
              2. My Favorites
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Favorite Subject</label>
                <input
                  type="text"
                  value={formData.favorites.subject}
                  onChange={e => setFormData({
                    ...formData,
                    favorites: { ...formData.favorites, subject: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a97cb]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Favorite Color</label>
                <input
                  type="text"
                  value={formData.favorites.color}
                  onChange={e => setFormData({
                    ...formData,
                    favorites: { ...formData.favorites, color: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a97cb]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Favorite Food</label>
                <input
                  type="text"
                  value={formData.favorites.food}
                  onChange={e => setFormData({
                    ...formData,
                    favorites: { ...formData.favorites, food: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a97cb]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Favorite Snack</label>
                <input
                  type="text"
                  value={formData.favorites.snack}
                  onChange={e => setFormData({
                    ...formData,
                    favorites: { ...formData.favorites, snack: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a97cb]"
                />
              </div>
            </div>
          </div>

          {/* Future Dream */}
          <div className="space-y-3 pt-3 border-t border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700">
              3. Future Career Dream
            </h4>
            <textarea
              rows={2}
              value={formData.futureDream}
              onChange={e => setFormData({ ...formData, futureDream: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4a97cb] resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4a97cb] hover:bg-[#3d83b2] text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
