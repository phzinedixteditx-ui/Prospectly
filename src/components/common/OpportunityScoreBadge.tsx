import React, { useState } from 'react';
import { OpportunityScore } from '../../types';
import { Sparkles, Info, Check, X, ShieldCheck } from 'lucide-react';

interface Props {
  score: OpportunityScore;
  compact?: boolean;
}

export const OpportunityScoreBadge: React.FC<Props> = ({ score, compact = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const isHigh = score.total >= 80;
  const isMedium = score.total >= 60 && score.total < 80;

  const bgStyle = isHigh
    ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
    : isMedium
    ? 'bg-amber-950/60 border-amber-500/30 text-amber-400'
    : 'bg-slate-900 border-slate-700 text-slate-300';

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border ${bgStyle}`}>
        <span>{score.total}/100</span>
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className={`cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${bgStyle}`}
      >
        <span className="text-[11px] opacity-75 font-normal">Score:</span>
        <span className="font-extrabold text-xs">{score.total}</span>
        <span className="text-[10px] opacity-60">/100</span>
      </div>

      {/* Clean Breakdown Tooltip */}
      {showTooltip && (
        <div className="absolute right-0 top-full mt-2 w-72 p-3.5 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 text-slate-200 text-xs animate-slide-up">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Score de Venda ({score.total}/100)
            </span>
            <span className={isHigh ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
              {score.badge}
            </span>
          </div>

          <p className="text-slate-300 text-[11px] mb-2.5 leading-snug">
            {score.reason}
          </p>

          <div className="space-y-1 text-[11px] pt-1 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400">
              <span>Sem site registrado</span>
              <span className="font-mono text-emerald-400">+{score.scoreNoWebsite} pts</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Avaliações Google ({score.scoreHighReviews} pts)</span>
              <span className="font-mono text-emerald-400">+{score.scoreHighReviews} pts</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Potencial de Conversão</span>
              <span className="font-mono text-emerald-400">+{score.scoreServicePotential} pts</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

