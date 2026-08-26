import React from 'react';
import { Search, Users, Globe, Award, TrendingUp, Target } from 'lucide-react';
import { UsageQuota, Lead } from '../../types';

interface Props {
  usage: UsageQuota;
  leads: Lead[];
  sitesCount: number;
}

export const StatCards: React.FC<Props> = ({ usage, leads, sitesCount }) => {
  const highOppCount = leads.filter(l => l.opportunityScore.total >= 80).length;
  const convertedCount = leads.filter(l => l.status === 'cliente').length;

  const stats = [
    {
      label: 'Pesquisas Realizadas',
      value: usage.searchesThisMonth,
      max: usage.searchesLimit,
      icon: Search,
      iconBg: 'bg-zinc-900 text-zinc-200 border border-zinc-800',
      sub: `${usage.searchesThisMonth} de ${usage.searchesLimit} consultas usadas no mês`
    },
    {
      label: 'Leads no Pipeline',
      value: leads.length,
      max: usage.leadsLimit,
      icon: Users,
      iconBg: 'bg-zinc-900 text-zinc-200 border border-zinc-800',
      sub: `${leads.length} empresas monitoradas`
    },
    {
      label: 'Alta Oportunidade',
      value: highOppCount,
      icon: Target,
      iconBg: 'bg-zinc-900 text-emerald-400 border border-emerald-900/40',
      sub: 'Score acima de 80/100'
    },
    {
      label: 'Demonstrações Criadas',
      value: sitesCount,
      icon: Globe,
      iconBg: 'bg-zinc-900 text-zinc-200 border border-zinc-800',
      sub: 'Páginas comerciais geradas'
    },
    {
      label: 'Contratos Fechados',
      value: convertedCount,
      icon: Award,
      iconBg: 'bg-zinc-900 text-zinc-200 border border-zinc-800',
      sub: 'Clientes convertidos'
    },
    {
      label: 'Acessos no Radar',
      value: sitesCount > 0 ? 1 : 0,
      icon: TrendingUp,
      iconBg: 'bg-zinc-900 text-amber-400 border border-amber-900/40',
      sub: 'Visualizações das demos pelos leads'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="saas-card p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{stat.label}</span>
              <div className={`w-8 h-8 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</span>
              {stat.max !== undefined && (
                <span className="text-xs text-zinc-500 font-semibold">/ {stat.max}</span>
              )}
            </div>

            <p className="text-xs text-zinc-400">{stat.sub}</p>
          </div>
        );
      })}
    </div>
  );
};


