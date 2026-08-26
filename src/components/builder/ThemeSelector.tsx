import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { DEFAULT_THEMES } from '../../data/defaultThemes';
import { SiteTheme } from '../../types';
import { Check, X, Palette } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSelector: React.FC<Props> = ({ isOpen, onClose }) => {
  const { site, updateTheme } = useBuilder();
  if (!isOpen || !site) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-[#0e101a] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2 font-bold text-white">
            <Palette className="w-5 h-5 text-indigo-400" />
            <span>Escolher Paleta de Cores e Estilo</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DEFAULT_THEMES.map(theme => {
            const isSelected = site.theme.id === theme.id || site.theme.primaryColor === theme.primaryColor;
            return (
              <div
                key={theme.id}
                onClick={() => {
                  updateTheme(theme);
                  onClose();
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/40 shadow-lg shadow-indigo-500/20'
                    : 'border-white/10 bg-slate-900 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">{theme.name}</span>
                  {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-white/20 shadow" style={{ backgroundColor: theme.primaryColor }} />
                  <div className="w-6 h-6 rounded-full border border-white/20 shadow" style={{ backgroundColor: theme.accentColor }} />
                  <div className="w-6 h-6 rounded-full border border-white/20 shadow" style={{ backgroundColor: theme.backgroundColor }} />
                  <div className="w-6 h-6 rounded-full border border-white/20 shadow" style={{ backgroundColor: theme.cardBackground }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
