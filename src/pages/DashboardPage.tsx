import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLeads } from '../context/LeadsContext';
import { StorageService } from '../services/storage';
import { StatCards } from '../components/dashboard/StatCards';
import { UsageGauge } from '../components/dashboard/UsageGauge';
import { 
  Search, 
  Users, 
  ArrowRight, 
  Building2, 
  Sparkles, 
  Eye, 
  BrainCircuit, 
  Crown, 
  BarChart3, 
  TrendingUp,
  Smartphone,
  Laptop
} from 'lucide-react';

interface Props {
  onNavigate: (page: string, data?: any) => void;
}

export const DashboardPage: React.FC<Props> = ({ onNavigate }) => {
  const { user, usage } = useAuth();
  const { leads } = useLeads();
  const sites = StorageService.getSites();
  const demoViews = StorageService.getDemoViews();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-slide-up">
      {/* Welcome Banner */}
      <div className="saas-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-zinc-900 text-zinc-300 text-xs font-semibold border border-zinc-800">
            <Building2 className="w-3.5 h-3.5" />
            Painel de Prospecção & Vendas B2B
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Olá, {user?.name || 'Profissional'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            Mapeie estabelecimentos em <strong className="text-zinc-200">{user?.targetRegion || 'sua região'}</strong>, envie demonstrações com sua marca White-Label e acompanhe acessos em tempo real.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('leads')}
            className="flex items-center gap-2 text-xs font-bold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-xl transition-all"
          >
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            Pipeline Kanban
          </button>

          <button
            onClick={() => onNavigate('search')}
            className="flex items-center gap-2 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Pesquisar Empresas
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatCards usage={usage} leads={leads} sitesCount={sites.length} />

      {/* Lead no Radar - Real-Time Live Feed */}
      {demoViews.length > 0 && (
        <div className="p-5 rounded-2xl bg-zinc-900/90 border border-amber-500/30 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <span>🔥 Lead no Radar: Demonstrações Visualizadas</span>
                <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded-full border border-amber-800/60 font-black">
                  Tempo Real
                </span>
              </h3>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              Ver todos os sites
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {demoViews.slice(0, 3).map((view) => {
              const diffMin = Math.max(1, Math.round((Date.now() - new Date(view.viewedAt).getTime()) / 60000));
              return (
                <div
                  key={view.id}
                  className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-2"
                >
                  <div className="space-y-0.5 min-w-0">
                    <p className="font-bold text-xs text-white truncate">{view.companyName}</p>
                    <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                      {view.device === 'mobile' ? <Smartphone className="w-3 h-3 text-emerald-400" /> : <Laptop className="w-3 h-3 text-sky-400" />}
                      <span>Acesso via {view.device === 'mobile' ? 'Celular' : 'Computador'}</span>
                    </p>
                  </div>

                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-1 rounded border border-amber-800/40 shrink-0">
                    há {diffMin} min
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid: Quotas & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <UsageGauge usage={usage} plan={user?.plan || 'free'} onUpgrade={() => onNavigate('subscription')} />
        </div>

        <div className="lg:col-span-2 saas-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-zinc-300" />
                Pipeline de Leads Recentes
              </h3>
              <p className="text-xs text-zinc-400">Oportunidades salvas para contato comercial</p>
            </div>
            <button
              onClick={() => onNavigate('leads')}
              className="text-xs font-semibold text-zinc-300 hover:text-white underline flex items-center gap-1"
            >
              Ver no Kanban ({leads.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {leads.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Search className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-xs text-zinc-400">Nenhum lead no pipeline ainda.</p>
              <button
                onClick={() => onNavigate('search')}
                className="text-xs font-bold text-zinc-200 hover:underline"
              >
                Fazer uma pesquisa agora →
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {leads.slice(0, 4).map(lead => (
                <div
                  key={lead.id}
                  className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3 hover:border-zinc-700 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-white truncate">{lead.name}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{lead.category} • {lead.city}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                      Score {lead.opportunityScore.total}
                    </span>
                    <button
                      onClick={() => onNavigate('leads')}
                      className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Abrir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sites & Demonstrations Quick Section */}
      <div className="saas-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              Demonstrações & Sites Criados
            </h3>
            <p className="text-xs text-zinc-400">Acesse seus projetos ativos para enviar no WhatsApp</p>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-zinc-300 hover:text-white underline flex items-center gap-1"
          >
            Ver todos os projetos ({sites.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {sites.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <p className="text-xs text-zinc-400">Você ainda não criou nenhuma demonstração.</p>
            <button
              onClick={() => onNavigate('search')}
              className="text-xs font-bold text-emerald-400 hover:underline"
            >
              Pesquisar empresas e gerar primeira demonstração →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sites.slice(0, 3).map(site => (
              <div 
                key={site.id} 
                className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-3 hover:border-zinc-700 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/60">
                      {site.niche || 'Comércio'}
                    </span>
                    <span className="text-[10px] text-zinc-500">{site.city}</span>
                  </div>
                  <h4 className="font-bold text-xs text-white truncate">{site.companyName}</h4>
                  <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{site.tagline}</p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                  <button
                    onClick={() => onNavigate('builder', { siteId: site.id })}
                    className="flex-1 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onNavigate('public-demo', { slug: site.slug || site.id })}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold transition-all cursor-pointer"
                  >
                    Ver Site
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};


