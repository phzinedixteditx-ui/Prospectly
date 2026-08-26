import React, { useState } from 'react';
import { PLANS } from '../data/plans';
import { CheckCircle2, ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export const PricingPage: React.FC<Props> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const formatCurrency = (val?: number) => {
    if (val === undefined || val === null) return '';
    if (val === 0) return '0';
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in text-zinc-100">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Planos & Investimento</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Escolha a escala ideal para suas prospecções
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Encontre leads qualificados, gere demonstrações profissionais e feche contratos recorrentes.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <div className="bg-zinc-900 p-1 rounded-2xl border border-zinc-800 inline-flex items-center gap-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-zinc-100 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Anual</span>
              <span className="text-[10px] bg-zinc-950/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-black">
                Desconto Especial
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.values(PLANS).map(plan => {
          const isYearly = billingCycle === 'yearly';
          const price = isYearly ? (plan.priceYearly ?? plan.price * 12) : plan.price;
          const originalPrice = isYearly ? plan.originalPriceYearly : plan.originalPrice;

          return (
            <div
              key={plan.id}
              className={`rounded-3xl border p-8 flex flex-col justify-between relative transition-all duration-300 ${
                plan.isPopular
                  ? 'border-emerald-500/50 bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 shadow-2xl shadow-emerald-500/10'
                  : 'border-zinc-800 bg-zinc-900/60'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-400 text-zinc-950 text-[10px] font-black uppercase tracking-wider shadow-lg shadow-emerald-500/20">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="font-extrabold text-xl text-white">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">{plan.tagline}</p>
                </div>

                <div className="mb-6 pb-6 border-b border-zinc-800/80">
                  {originalPrice && (
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                      <span className="line-through font-semibold">R$ {formatCurrency(originalPrice)}</span>
                      <span className="text-emerald-400 font-bold text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800/60">
                        Economia ativa
                      </span>
                    </div>
                  )}

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white tracking-tight">
                      R$ {formatCurrency(price)}
                    </span>
                    <span className="text-xs text-zinc-400 font-bold">
                      {isYearly ? '/ano' : '/mês'}
                    </span>
                  </div>

                  {isYearly && price > 0 && (
                    <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                      Equivalente a apenas R$ {(price / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / mês
                    </p>
                  )}

                  <p className="text-xs text-zinc-300 font-semibold mt-2">{plan.limitsText}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('register')}
                className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                  plan.isPopular
                    ? 'bg-emerald-400 text-zinc-950 hover:bg-emerald-300 shadow-xl shadow-emerald-500/20'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                }`}
              >
                Começar com {plan.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
