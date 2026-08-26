import React from 'react';
import { UsageQuota, PlanType } from '../../types';
import { Search, Users, ArrowUpRight, Activity } from 'lucide-react';

interface Props {
  usage: UsageQuota;
  plan: PlanType;
  onUpgrade: () => void;
}

export const UsageGauge: React.FC<Props> = ({ usage, plan, onUpgrade }) => {
  const searchPct = Math.min(100, Math.round((usage.searchesThisMonth / usage.searchesLimit) * 100));
  const leadsPct = Math.min(100, Math.round((usage.leadsSaved / usage.leadsLimit) * 100));
  const aiCreditsPct = Math.min(100, Math.round((usage.aiCreditsToday / usage.aiCreditsDailyLimit) * 100));

  return (
    <div className="saas-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-zinc-300" />
            Consumo & Limites
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">Recursos vinculados à sua conta Google</p>
        </div>

        {plan !== 'full' && (
          <button
            onClick={onUpgrade}
            className="flex items-center gap-1 text-xs font-bold text-zinc-200 hover:text-white underline transition-colors"
          >
            Mudar Plano
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}

      </div>

      <div className="space-y-4">
        {/* Pesquisas */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-zinc-300 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-zinc-500" />
              Consultas no mês
            </span>
            <span className="text-zinc-400 font-mono text-xs">{usage.searchesThisMonth} / {usage.searchesLimit}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
            <div 
              className="h-full bg-zinc-300 rounded-full transition-all duration-300"
              style={{ width: `${searchPct}%` }}
            />
          </div>
        </div>

        {/* Leads */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-zinc-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-zinc-500" />
              Leads salvos
            </span>
            <span className="text-zinc-400 font-mono text-xs">{usage.leadsSaved} / {usage.leadsLimit}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
            <div 
              className="h-full bg-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${leadsPct}%` }}
            />
          </div>
        </div>

        {/* Créditos IA Hoje */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-zinc-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-zinc-400" />
              Créditos de IA Diários
            </span>
            <span className="text-white font-bold font-mono text-xs">{usage.aiCreditsToday} / {usage.aiCreditsDailyLimit}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
            <div 
              className="h-full bg-zinc-100 rounded-full transition-all duration-300"
              style={{ width: `${aiCreditsPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


