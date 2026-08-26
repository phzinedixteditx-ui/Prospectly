const fs = require('fs');
const path = require('path');

const write = (file, content) => {
  const full = path.join(__dirname, '..', file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\n', 'utf-8');
  console.log('Created: ' + file);
};

// 1. Opportunity Score Badge & Breakdown
write('src/components/common/OpportunityScoreBadge.tsx', `
import React, { useState } from 'react';
import { OpportunityScore } from '../../types';
import { Sparkles, Info, Check, X } from 'lucide-react';

interface Props {
  score: OpportunityScore;
  compact?: boolean;
}

export const OpportunityScoreBadge: React.FC<Props> = ({ score, compact = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getScoreColor = (val: number) => {
    if (val >= 80) return 'from-emerald-500 to-teal-400 text-emerald-300 border-emerald-500/40 bg-emerald-950/40';
    if (val >= 60) return 'from-amber-500 to-yellow-400 text-amber-300 border-amber-500/40 bg-amber-950/40';
    return 'from-slate-500 to-zinc-400 text-slate-300 border-slate-700 bg-slate-900/50';
  };

  const getScoreNumberColor = (val: number) => {
    if (val >= 80) return 'text-emerald-400';
    if (val >= 60) return 'text-amber-400';
    return 'text-slate-400';
  };

  if (compact) {
    return (
      <div className={\`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border \${getScoreColor(score.total)}\`}>
        <Sparkles className="w-3.5 h-3.5" />
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
        className={\`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 hover:scale-105 shadow-sm \${getScoreColor(score.total)}\`}
      >
        <div className="flex items-center gap-1.5 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span className="tracking-tight">Score:</span>
          <span className={\`text-base font-extrabold \${getScoreNumberColor(score.total)}\`}>{score.total}</span>
          <span className="text-xs opacity-60">/100</span>
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-black/40 border border-white/10 hidden sm:inline-block">
          {score.badge}
        </span>
        <Info className="w-3.5 h-3.5 opacity-70" />
      </div>

      {/* Breakdown Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 p-4 rounded-2xl bg-[#0f111a] border border-indigo-500/30 shadow-2xl z-50 text-slate-200 text-xs backdrop-blur-xl animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
            <span className="font-bold text-sm text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Opportunity Score ({score.total}/100)
            </span>
            <span className="font-semibold text-emerald-400">{score.badge}</span>
          </div>

          <p className="text-slate-300 mb-3 leading-relaxed font-medium bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            "{score.reason}"
          </p>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                {score.scoreNoWebsite > 0 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <X className="w-3.5 h-3.5 text-rose-400" />}
                Sem website próprio
              </span>
              <span className="font-mono font-semibold text-slate-200">+{score.scoreNoWebsite} pts</span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Presença social ativa
              </span>
              <span className="font-mono font-semibold text-slate-200">+{score.scoreSocialActive} pts</span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Volume de avaliações Google
              </span>
              <span className="font-mono font-semibold text-slate-200">+{score.scoreHighReviews} pts</span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Negócio consolidado & Reputação
              </span>
              <span className="font-mono font-semibold text-slate-200">+{score.scoreEstablished} pts</span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Potencial de retorno do serviço
              </span>
              <span className="font-mono font-semibold text-slate-200">+{score.scoreServicePotential} pts</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
`);

// 2. Layout Components
write('src/components/layout/Navbar.tsx', `
import React from 'react';
import { Sparkles, ArrowRight, Zap, Globe, Shield, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Props {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<Props> = ({ onNavigate, currentPage }) => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090a0f]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0d0e17] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              Prospectly
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                SaaS
              </span>
            </span>
          </div>
        </div>

        {/* Nav Links */}
        {!isAuthenticated ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">Como Funciona</button>
            <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">Para Quem É</button>
            <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">Planos & Preços</button>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button 
              onClick={() => onNavigate('dashboard')} 
              className={\`transition-colors \${currentPage === 'dashboard' ? 'text-indigo-400 font-semibold' : 'hover:text-white'}\`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => onNavigate('search')} 
              className={\`transition-colors \${currentPage === 'search' ? 'text-indigo-400 font-semibold' : 'hover:text-white'}\`}
            >
              Encontrar Clientes
            </button>
            <button 
              onClick={() => onNavigate('leads')} 
              className={\`transition-colors \${currentPage === 'leads' ? 'text-indigo-400 font-semibold' : 'hover:text-white'}\`}
            >
              Meus Leads
            </button>
            <button 
              onClick={() => onNavigate('subscription')} 
              className={\`transition-colors \${currentPage === 'subscription' ? 'text-indigo-400 font-semibold' : 'hover:text-white'}\`}
            >
              Minha Assinatura
            </button>
          </nav>
        )}

        {/* Auth / CTA Buttons */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => onNavigate('login')}
                className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Entrar
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/25 transition-all hover:scale-102"
              >
                Começar Grátis
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-semibold uppercase tracking-wider text-slate-300">{user?.plan}</span>
              </div>

              <div 
                onClick={() => onNavigate('subscription')}
                className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm cursor-pointer hover:border-indigo-400 transition-colors"
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>

              <button
                onClick={logout}
                className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 transition-colors"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
`);

// 3. Footer
write('src/components/layout/Footer.tsx', `
import React from 'react';
import { Sparkles, Shield, Lock, Heart } from 'lucide-react';

export const Footer: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/10 bg-[#07080c] py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white tracking-tight">Prospectly</p>
            <p className="text-xs text-slate-500">Encontre. Crie. Venda.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
          <span className="flex items-center gap-1 text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400" /> Segurança e Boas Práticas B2B
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Lock className="w-3.5 h-3.5 text-indigo-400" /> Criptografia e Isolamento de Dados
          </span>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Prospectly SaaS. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
`);

// 4. Stat Cards
write('src/components/dashboard/StatCards.tsx', `
import React from 'react';
import { Search, Users, Sparkles, Globe, Award, TrendingUp } from 'lucide-react';
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
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-400',
      sub: usage.searchesThisMonth + ' de ' + usage.searchesLimit + ' usadas no mês'
    },
    {
      label: 'Leads Encontrados',
      value: leads.length,
      max: usage.leadsLimit,
      icon: Users,
      color: 'from-indigo-600 to-purple-600',
      textColor: 'text-indigo-400',
      sub: leads.length + ' leads salvos no CRM'
    },
    {
      label: 'Alta Oportunidade',
      value: highOppCount,
      icon: Sparkles,
      color: 'from-amber-600 to-orange-600',
      textColor: 'text-amber-400',
      sub: 'Score acima de 80/100'
    },
    {
      label: 'Demonstrações Criadas',
      value: sitesCount,
      icon: Globe,
      color: 'from-emerald-600 to-teal-600',
      textColor: 'text-emerald-400',
      sub: 'Sites prontos para enviar'
    },
    {
      label: 'Leads Convertidos',
      value: convertedCount,
      icon: Award,
      color: 'from-rose-600 to-pink-600',
      textColor: 'text-rose-400',
      sub: 'Clientes fechados com sucesso'
    },
    {
      label: 'Créditos IA Hoje',
      value: usage.aiCreditsToday,
      max: usage.aiCreditsDailyLimit,
      icon: TrendingUp,
      color: 'from-violet-600 to-indigo-600',
      textColor: 'text-violet-400',
      sub: (usage.aiCreditsDailyLimit - usage.aiCreditsToday) + ' créditos restantes hoje'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="glass-card p-5 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">{stat.label}</span>
              <div className={\`w-10 h-10 rounded-xl bg-gradient-to-tr \${stat.color} flex items-center justify-center text-white shadow-lg\`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
              {stat.max !== undefined && (
                <span className="text-xs text-slate-500 font-semibold">/ {stat.max}</span>
              )}
            </div>

            <p className="text-xs text-slate-400 font-medium">{stat.sub}</p>
          </div>
        );
      })}
    </div>
  );
};
`);

// 5. Usage Gauge / Quotas
write('src/components/dashboard/UsageGauge.tsx', `
import React from 'react';
import { UsageQuota, PlanType } from '../../types';
import { Zap, Search, Users, ArrowUpRight } from 'lucide-react';

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
    <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Consumo & Limites
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Seus recursos disponíveis no plano atual</p>
        </div>

        {plan !== 'full' && (
          <button
            onClick={onUpgrade}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-xl border border-indigo-500/30 transition-colors"
          >
            Fazer Upgrade
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Pesquisas */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-blue-400" />
              Pesquisas no mês
            </span>
            <span className="text-slate-400">{usage.searchesThisMonth} / {usage.searchesLimit}</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-900 border border-white/5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: searchPct + '%' }}
            />
          </div>
        </div>

        {/* Leads */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              Leads salvos
            </span>
            <span className="text-slate-400">{usage.leadsSaved} / {usage.leadsLimit}</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-900 border border-white/5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: leadsPct + '%' }}
            />
          </div>
        </div>

        {/* Créditos IA Hoje */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Créditos IA Hoje (renovam todo dia)
            </span>
            <span className="text-amber-400 font-bold">{usage.aiCreditsToday} / {usage.aiCreditsDailyLimit}</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-900 border border-white/5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: aiCreditsPct + '%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
`);

// 6. Company Card for Search
write('src/components/search/CompanyCard.tsx', `
import React from 'react';
import { Company } from '../../types';
import { OpportunityScoreBadge } from '../common/OpportunityScoreBadge';
import { Star, MapPin, Phone, Globe, Instagram, Plus, Sparkles, Check } from 'lucide-react';
import { useLeads } from '../../context/LeadsContext';

interface Props {
  company: Company;
  onOpenDetails: (company: Company) => void;
  onCreateDemo: (company: Company) => void;
}

export const CompanyCard: React.FC<Props> = ({ company, onOpenDetails, onCreateDemo }) => {
  const { isCompanySaved, saveCompanyAsLead } = useLeads();
  const saved = isCompanySaved(company.id);

  return (
    <div className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-indigo-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
      <div>
        {/* Top bar: Category & Score */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/40">
            {company.category}
          </span>
          <OpportunityScoreBadge score={company.opportunityScore} />
        </div>

        {/* Company Title */}
        <h3 className="font-bold text-lg text-white mb-1.5 leading-snug group-hover:text-indigo-300 transition-colors">
          {company.name}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 text-xs text-slate-300 mb-3">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{company.rating.toFixed(1)}</span>
          </div>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 font-medium">({company.reviewCount} avaliações no Google)</span>
        </div>

        {/* Location & Details */}
        <div className="space-y-1.5 text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{company.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            {company.hasWebsite ? (
              <span className="text-slate-300 truncate">Possui site</span>
            ) : (
              <span className="text-rose-400 font-semibold">Site não identificado (Oportunidade)</span>
            )}
          </div>

          {company.socialPresence && (
            <div className="flex items-center gap-2">
              <Instagram className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span className="text-slate-300 truncate">{company.instagramHandle || 'Instagram Ativo'}</span>
            </div>
          )}
        </div>

        {/* Opportunity explanation box */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5 text-xs text-slate-300 mb-4 leading-relaxed">
          <p className="font-semibold text-indigo-300 mb-0.5">Por que abordar:</p>
          <p className="text-slate-400">{company.opportunityScore.reason}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
        <button
          onClick={() => onCreateDemo(company)}
          className="flex-1 flex items-center justify-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 py-2.5 px-3 rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-102"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Criar Demonstração
        </button>

        <button
          onClick={() => saveCompanyAsLead(company)}
          className={\`flex items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all \${
            saved
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
              : 'bg-slate-900 hover:bg-slate-800 border-white/10 text-slate-300 hover:text-white'
          }\`}
          title={saved ? 'Lead já salvo' : 'Adicionar aos Meus Leads'}
        >
          {saved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>

        <button
          onClick={() => onOpenDetails(company)}
          className="px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Detalhes
        </button>
      </div>
    </div>
  );
};
`);

// 7. Pitch Generator Modal (WhatsApp approach)
write('src/components/leads/PitchGeneratorModal.tsx', `
import React, { useState, useEffect } from 'react';
import { Lead } from '../../types';
import { GeminiService } from '../../services/geminiService';
import { Sparkles, Copy, Check, Send, X, RefreshCw, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface Props {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PitchGeneratorModal: React.FC<Props> = ({ lead, isOpen, onClose }) => {
  const [pitch, setPitch] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { consumeAICredit } = useAuth();
  const toast = useToast();

  const generatePitch = async () => {
    if (!lead) return;
    setLoading(true);

    const canConsume = consumeAICredit(1);
    if (!canConsume) {
      toast.error('Limite diário de créditos de IA atingido');
      setLoading(false);
      return;
    }

    try {
      const generated = await GeminiService.generatePitchMessage(lead);
      setPitch(generated);
    } catch (e) {
      toast.error('Erro ao gerar abordagem personalizada');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && lead) {
      generatePitch();
    }
  }, [isOpen, lead]);

  if (!isOpen || !lead) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(pitch);
    setCopied(true);
    toast.success('Mensagem copiada para a área de transferência!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : '';
    const phoneParam = cleanPhone.length >= 10 ? (cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone) : '';
    const url = \`https://wa.me/\${phoneParam}?text=\${encodeURIComponent(pitch)}\`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#0e101a] border border-indigo-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Gerar Abordagem com IA</h2>
              <p className="text-xs text-slate-400">Personalizada para {lead.name} ({lead.city})</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-sm font-semibold text-white">Criando abordagem de alta conversão...</p>
            <p className="text-xs text-slate-400">Analisando reputação no Google e ausência de site</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                rows={8}
                className="w-full p-4 rounded-2xl bg-slate-900/90 border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
                placeholder="A mensagem gerada pela IA aparecerá aqui..."
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={generatePitch}
                className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-900 border border-white/5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Gerar Outra Versão (1 crédito)
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar Texto'}
                </button>

                <button
                  onClick={handleSendWhatsApp}
                  className="flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/25 transition-all hover:scale-102"
                >
                  <Send className="w-4 h-4" />
                  Abrir no WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
`);

// 8. Section Renderer for Builder and Public Demo
write('src/components/builder/SectionRenderer.tsx', `
import React from 'react';
import { SiteConfig, SiteSection } from '../../types';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  CheckCircle2, 
  Star, 
  Award, 
  ShieldCheck, 
  HeartHandshake,
  ChevronDown
} from 'lucide-react';

interface Props {
  site: SiteConfig;
  previewMode?: boolean;
}

export const SectionRenderer: React.FC<Props> = ({ site, previewMode = false }) => {
  const { theme, sections } = site;

  const getThemeStyle = () => {
    return {
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
      fontFamily: theme.fontBody + ', sans-serif'
    };
  };

  const enabledSections = [...sections]
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div style={getThemeStyle()} className="min-h-full w-full select-none transition-colors duration-300">
      {enabledSections.map(sec => {
        switch (sec.type) {
          // NAVBAR
          case 'navbar':
            return (
              <header 
                key={sec.id} 
                style={{ borderColor: theme.primaryColor + '30', backgroundColor: theme.backgroundColor + 'ee' }}
                className="sticky top-0 z-30 w-full border-b backdrop-blur-md px-6 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div 
                    style={{ backgroundColor: theme.primaryColor }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                  >
                    {site.companyName.charAt(0)}
                  </div>
                  <span className="font-bold text-base tracking-tight" style={{ fontFamily: theme.fontHeading }}>
                    {site.companyName}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-6 text-xs font-medium opacity-80">
                  <a href="#sobre" className="hover:opacity-100 transition-opacity">Sobre</a>
                  <a href="#destaques" className="hover:opacity-100 transition-opacity">Destaques</a>
                  <a href="#depoimentos" className="hover:opacity-100 transition-opacity">Depoimentos</a>
                  <a href="#contato" className="hover:opacity-100 transition-opacity">Contato</a>
                </div>

                <a
                  href="#whatsapp"
                  style={{ backgroundColor: theme.primaryColor }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md hover:brightness-110 transition-all"
                >
                  {sec.buttonText || 'Fale Conosco'}
                </a>
              </header>
            );

          // HERO
          case 'hero':
            return (
              <section key={sec.id} className="relative py-16 sm:py-24 px-6 overflow-hidden">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6 text-left">
                    {sec.badge && (
                      <span 
                        style={{ backgroundColor: theme.primaryColor + '20', color: theme.accentColor, borderColor: theme.primaryColor + '40' }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        {sec.badge}
                      </span>
                    )}

                    <h1 
                      style={{ fontFamily: theme.fontHeading }}
                      className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight"
                    >
                      {sec.title || site.companyName}
                    </h1>

                    <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-lg">
                      {sec.subtitle || site.tagline}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href="#whatsapp"
                        style={{ backgroundColor: theme.primaryColor }}
                        className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-xl hover:brightness-110 transition-all flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {sec.buttonText || 'Entrar em Contato'}
                      </a>

                      {sec.secondaryButtonText && (
                        <a
                          href="#sobre"
                          style={{ borderColor: theme.primaryColor + '40' }}
                          className="px-6 py-3 rounded-xl text-sm font-semibold border hover:bg-white/5 transition-all"
                        >
                          {sec.secondaryButtonText}
                        </a>
                      )}
                    </div>
                  </div>

                  {sec.imageUrl && (
                    <div className="relative group">
                      <div 
                        style={{ backgroundColor: theme.primaryColor }} 
                        className="absolute -inset-2 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"
                      />
                      <img
                        src={sec.imageUrl}
                        alt={site.companyName}
                        className="relative rounded-3xl w-full h-72 sm:h-96 object-cover shadow-2xl border border-white/10"
                      />
                    </div>
                  )}
                </div>
              </section>
            );

          // ABOUT
          case 'about':
            return (
              <section id="sobre" key={sec.id} className="py-16 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  {sec.imageUrl && (
                    <div className="order-2 md:order-1">
                      <img
                        src={sec.imageUrl}
                        alt="Sobre Nós"
                        className="rounded-3xl w-full h-72 sm:h-80 object-cover shadow-xl border border-white/10"
                      />
                    </div>
                  )}

                  <div className="space-y-4 order-1 md:order-2 text-left">
                    {sec.badge && (
                      <span 
                        style={{ color: theme.accentColor }}
                        className="text-xs font-bold uppercase tracking-wider"
                      >
                        {sec.badge}
                      </span>
                    )}

                    <h2 
                      style={{ fontFamily: theme.fontHeading }}
                      className="text-2xl sm:text-3xl font-bold tracking-tight"
                    >
                      {sec.title}
                    </h2>

                    <p className="text-sm opacity-80 leading-relaxed">
                      {sec.content}
                    </p>

                    {sec.buttonText && (
                      <a
                        href={sec.buttonLink || '#contato'}
                        style={{ color: theme.accentColor }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline pt-2"
                      >
                        {sec.buttonText} →
                      </a>
                    )}
                  </div>
                </div>
              </section>
            );

          // MENU or SERVICES
          case 'menu':
          case 'services':
            return (
              <section id="destaques" key={sec.id} className="py-16 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto text-center space-y-3 mb-10">
                  {sec.badge && (
                    <span 
                      style={{ color: theme.accentColor }}
                      className="text-xs font-bold uppercase tracking-wider"
                    >
                      {sec.badge}
                    </span>
                  )}
                  <h2 
                    style={{ fontFamily: theme.fontHeading }}
                    className="text-2xl sm:text-4xl font-bold tracking-tight"
                  >
                    {sec.title}
                  </h2>
                  {sec.subtitle && (
                    <p className="text-sm opacity-75 max-w-xl mx-auto">
                      {sec.subtitle}
                    </p>
                  )}
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sec.items?.map(item => (
                    <div
                      key={item.id}
                      style={{ backgroundColor: theme.cardBackground, borderColor: theme.primaryColor + '20' }}
                      className="p-6 rounded-2xl border text-left flex flex-col justify-between hover:scale-102 transition-all duration-200"
                    >
                      <div>
                        {item.tag && (
                          <span 
                            style={{ backgroundColor: theme.primaryColor + '20', color: theme.accentColor }}
                            className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2"
                          >
                            {item.tag}
                          </span>
                        )}
                        <h3 className="font-bold text-base mb-1">{item.title}</h3>
                        <p className="text-xs opacity-75 leading-relaxed mb-4">{item.description}</p>
                      </div>

                      {item.price && (
                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                          <span className="text-sm font-extrabold" style={{ color: theme.accentColor }}>{item.price}</span>
                          <a 
                            href="#whatsapp" 
                            style={{ backgroundColor: theme.primaryColor }}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                          >
                            Pedir
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );

          // TESTIMONIALS
          case 'testimonials':
            return (
              <section id="depoimentos" key={sec.id} className="py-16 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto text-center space-y-3 mb-10">
                  {sec.badge && (
                    <span style={{ color: theme.accentColor }} className="text-xs font-bold uppercase tracking-wider">
                      {sec.badge}
                    </span>
                  )}
                  <h2 style={{ fontFamily: theme.fontHeading }} className="text-2xl sm:text-4xl font-bold tracking-tight">
                    {sec.title}
                  </h2>
                  {sec.subtitle && (
                    <p className="text-sm opacity-75 max-w-xl mx-auto">{sec.subtitle}</p>
                  )}
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sec.items?.map(t => (
                    <div
                      key={t.id}
                      style={{ backgroundColor: theme.cardBackground, borderColor: theme.primaryColor + '20' }}
                      className="p-6 rounded-2xl border text-left flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-1 text-amber-400 mb-3">
                        {[...Array(t.rating || 5)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs opacity-85 italic leading-relaxed mb-4">"{t.description}"</p>
                      <div>
                        <p className="font-bold text-xs">{t.author}</p>
                        <p className="text-[11px] opacity-60">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );

          // BENEFITS
          case 'benefits':
            return (
              <section id="beneficios" key={sec.id} className="py-16 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto text-center space-y-3 mb-10">
                  <h2 style={{ fontFamily: theme.fontHeading }} className="text-2xl sm:text-4xl font-bold tracking-tight">
                    {sec.title}
                  </h2>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sec.items?.map(b => (
                    <div
                      key={b.id}
                      style={{ backgroundColor: theme.cardBackground, borderColor: theme.primaryColor + '20' }}
                      className="p-6 rounded-2xl border text-left"
                    >
                      <div 
                        style={{ backgroundColor: theme.primaryColor + '20', color: theme.accentColor }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      >
                        <Award className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-sm mb-1">{b.title}</h3>
                      <p className="text-xs opacity-75 leading-relaxed">{b.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );

          // FAQ
          case 'faq':
            return (
              <section key={sec.id} className="py-16 px-6 border-t border-white/5">
                <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
                  <h2 style={{ fontFamily: theme.fontHeading }} className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {sec.title || 'Perguntas Frequentes'}
                  </h2>
                </div>

                <div className="max-w-3xl mx-auto space-y-3">
                  {sec.items?.map(f => (
                    <details 
                      key={f.id}
                      style={{ backgroundColor: theme.cardBackground, borderColor: theme.primaryColor + '20' }}
                      className="p-4 rounded-xl border group cursor-pointer text-left"
                    >
                      <summary className="font-bold text-xs sm:text-sm flex items-center justify-between">
                        <span>{f.title}</span>
                        <ChevronDown className="w-4 h-4 opacity-60 group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="text-xs opacity-80 mt-2 leading-relaxed pt-2 border-t border-white/5">
                        {f.description}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            );

          // CONTACT
          case 'contact':
            return (
              <section id="contato" key={sec.id} className="py-16 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
                  <div>
                    <h2 style={{ fontFamily: theme.fontHeading }} className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                      {sec.title}
                    </h2>
                    <p className="text-xs opacity-75 mb-6">{sec.subtitle}</p>

                    <div className="space-y-3 text-xs opacity-90">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 opacity-60" />
                        <span>{site.address || site.city}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 opacity-60" />
                        <span>{site.phone || '(31) 98000-0000'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 opacity-60" />
                        <span>Segunda a Sábado: 08h às 20h</span>
                      </div>
                    </div>
                  </div>

                  <div 
                    style={{ backgroundColor: theme.cardBackground, borderColor: theme.primaryColor + '30' }}
                    className="p-6 rounded-2xl border space-y-3"
                  >
                    <input
                      type="text"
                      placeholder="Seu Nome"
                      className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Seu WhatsApp"
                      className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-xs focus:outline-none"
                    />
                    <textarea
                      placeholder="Como podemos te ajudar?"
                      rows={3}
                      className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-xs focus:outline-none resize-none"
                    />
                    <button
                      style={{ backgroundColor: theme.primaryColor }}
                      className="w-full py-3 rounded-xl text-xs font-bold text-white shadow-lg"
                    >
                      {sec.buttonText || 'Enviar Mensagem'}
                    </button>
                  </div>
                </div>
              </section>
            );

          // FLOATING WHATSAPP BUTTON
          case 'whatsapp_floating':
            return (
              <a
                id="whatsapp"
                key={sec.id}
                href={\`https://wa.me/55\${(site.phone || '').replace(/[^0-9]/g, '')}?text=\${encodeURIComponent('Olá! Vim através do site e gostaria de mais informações.')}\`}
                target="_blank"
                rel="noreferrer"
                className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="hidden sm:inline">{sec.buttonText || 'WhatsApp'}</span>
              </a>
            );

          // FOOTER
          case 'footer':
            return (
              <footer 
                key={sec.id} 
                style={{ borderColor: theme.primaryColor + '20' }}
                className="py-8 px-6 border-t text-center text-xs opacity-60"
              >
                <p>{sec.content || \`© \${new Date().getFullYear()} \${site.companyName}. Todos os direitos reservados.\`}</p>
                <p className="text-[10px] mt-1 opacity-50">Demonstração interativa gerada por Prospectly AI</p>
              </footer>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
`);

// 9. AI Chat Panel for Site Builder
write('src/components/builder/AIChatPanel.tsx', `
import React, { useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Sparkles, Send, RefreshCw, Wand2, Palette, MessageCircle, FileText } from 'lucide-react';

export const AIChatPanel: React.FC = () => {
  const { chatMessages, sendAICommand, isGenerating } = useBuilder();
  const [input, setInput] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;
    const cmd = input;
    setInput('');
    await sendAICommand(cmd);
  };

  const quickPrompts = [
    { label: 'Tema Ouro e Preto', text: 'Troque as cores do site para preto e dourado luxuoso' },
    { label: 'Verde Saúde', text: 'Mude a paleta para verde esmeralda e saúde' },
    { label: 'Botão WhatsApp', text: 'Adicione um botão flutuante de WhatsApp' },
    { label: 'Depoimentos', text: 'Adicione uma seção com depoimentos e avaliações 5 estrelas' },
    { label: 'Perguntas Frequentes', text: 'Adicione uma seção de FAQ com perguntas frequentes' },
    { label: 'Cópia Comercial', text: 'Deixe os textos e o título principal mais profissionais' }
  ];

  return (
    <div className="flex flex-col h-full bg-[#0d0e17] border-l border-white/10 w-80 lg:w-96 shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Editor por IA</h3>
            <p className="text-[11px] text-slate-400">1 crédito por alteração</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {chatMessages.map(msg => (
          <div
            key={msg.id}
            className={\`flex flex-col \${msg.sender === 'user' ? 'items-end' : 'items-start'}\`}
          >
            <div
              className={\`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed \${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-slate-900 border border-white/10 text-slate-200 rounded-bl-none'
              }\`}
            >
              <p>{msg.text}</p>
              {msg.actionApplied && (
                <span className="inline-block mt-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Ação: {msg.actionApplied}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-center gap-2 p-3 bg-slate-900/60 rounded-2xl border border-white/5 text-xs text-indigo-300 animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
            <span>Aplicando alterações na demonstração...</span>
          </div>
        )}
      </div>

      {/* Quick suggestions */}
      <div className="p-3 border-t border-white/5 bg-black/20">
        <p className="text-[10px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">Sugestões Rápidas:</p>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              disabled={isGenerating}
              onClick={() => sendAICommand(q.text)}
              className="text-[11px] font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 hover:text-white px-2.5 py-1 rounded-lg border border-white/5 transition-all text-left truncate max-w-full"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-[#090a0f] flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex: Troque as cores para azul e adicione FAQ..."
          disabled={isGenerating}
          className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isGenerating}
          className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white flex items-center justify-center shrink-0 transition-colors shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
`);

// 10. Device Toolbar for Site Builder
write('src/components/builder/DeviceToolbar.tsx', `
import React from 'react';
import { useBuilder, DeviceMode } from '../../context/BuilderContext';
import { Monitor, Tablet, Smartphone, Save, Globe, Eye, ArrowLeft, Palette } from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpenPublish: () => void;
  onOpenTheme: () => void;
}

export const DeviceToolbar: React.FC<Props> = ({ onBack, onOpenPublish, onOpenTheme }) => {
  const { site, deviceMode, setDeviceMode, saveSite } = useBuilder();

  return (
    <div className="h-14 border-b border-white/10 bg-[#090a0f] px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos Leads
        </button>

        <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

        <span className="font-bold text-xs text-white truncate max-w-[150px] sm:max-w-[250px]">
          {site?.companyName}
        </span>
      </div>

      {/* Device Mode Switcher */}
      <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-white/10">
        <button
          onClick={() => setDeviceMode('desktop')}
          className={\`p-1.5 rounded-lg transition-colors \${deviceMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}\`}
          title="Visualização Desktop"
        >
          <Monitor className="w-4 h-4" />
        </button>
        <button
          onClick={() => setDeviceMode('tablet')}
          className={\`p-1.5 rounded-lg transition-colors \${deviceMode === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}\`}
          title="Visualização Tablet"
        >
          <Tablet className="w-4 h-4" />
        </button>
        <button
          onClick={() => setDeviceMode('mobile')}
          className={\`p-1.5 rounded-lg transition-colors \${deviceMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}\`}
          title="Visualização Mobile"
        >
          <Smartphone className="w-4 h-4" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenTheme}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:bg-slate-800 transition-colors"
        >
          <Palette className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Temas</span>
        </button>

        <button
          onClick={saveSite}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:bg-slate-800 transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Salvar</span>
        </button>

        <button
          onClick={onOpenPublish}
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 px-4 py-1.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-102"
        >
          <Globe className="w-3.5 h-3.5" />
          Publicar Demo
        </button>
      </div>
    </div>
  );
};
`);

// 11. Theme Selector Modal / Drawer
write('src/components/builder/ThemeSelector.tsx', `
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
                className={\`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3 \${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/40 shadow-lg shadow-indigo-500/20'
                    : 'border-white/10 bg-slate-900 hover:border-white/20'
                }\`}
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
`);

// 12. Publish Modal
write('src/components/builder/PublishModal.tsx', `
import React, { useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Globe, Copy, Check, ExternalLink, X, Sparkles, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenPublicDemo: (slug: string) => void;
}

export const PublishModal: React.FC<Props> = ({ isOpen, onClose, onOpenPublicDemo }) => {
  const { site, publishSite } = useBuilder();
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  if (!isOpen || !site) return null;

  const url = 'https://prospectly.app/demo/' + site.slug;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copiado!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePublish = () => {
    publishSite();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-[#0e101a] border border-emerald-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Publicar Demonstração</h2>
              <p className="text-xs text-slate-400">Link exclusivo para apresentação ao cliente</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Ao publicar, este site fica disponível através de um link público e seguro que você pode enviar direto no WhatsApp do cliente para fechar a venda.
          </p>

          <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-emerald-400 truncate select-all">{url}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                onClose();
                onOpenPublicDemo(site.slug);
              }}
              className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Abrir Visualização
            </button>

            <button
              onClick={handlePublish}
              className="flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/25 transition-all hover:scale-102"
            >
              <Sparkles className="w-4 h-4" />
              Confirmar Publicação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
`);

console.log('Components Part 2 successfully written!');

