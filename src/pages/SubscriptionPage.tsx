import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PaymentService } from '../services/paymentService';
import { PLANS } from '../data/plans';
import { PlanType } from '../types';
import { Zap, CheckCircle2, Shield, CreditCard, ArrowRight, RefreshCw, X, Sparkles } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export const SubscriptionPage: React.FC<Props> = ({ onNavigate }) => {
  const { user, usage, changePlan } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const currentPlan = PLANS[user?.plan || 'free'];

  const formatCurrency = (val?: number) => {
    if (val === undefined || val === null) return '';
    if (val === 0) return '0';
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleUpgrade = async (planId: PlanType) => {
    if (!user) return;
    setLoading(true);
    const res = await PaymentService.createCheckout(planId, user, billingCycle);
    setLoading(false);
    if (res.success && planId === 'free') {
      changePlan('free');
      toast.success(res.message);
    } else if (!res.success) {
      toast.error(res.message);
    }
  };

  const handleCancel = async () => {
    if (!user) return;
    if (!confirm('Deseja realmente cancelar sua assinatura? Você voltará para o plano Free.')) return;
    setLoading(true);
    const res = await PaymentService.cancelSubscription(user);
    setLoading(false);
    changePlan('free');
    toast.info(res.message);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-zinc-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Gestão de Planos & Assinatura</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Minha Assinatura
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Gerencie seu plano atual, acompanhe seus limites e aproveite as ofertas anuais.
          </p>
        </div>

        {/* Toggle Billing */}
        <div className="bg-zinc-900 p-1 rounded-2xl border border-zinc-800 inline-flex items-center gap-1 self-start sm:self-auto">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-zinc-100 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Anual</span>
            <span className="text-[10px] bg-zinc-950/20 px-1.5 py-0.5 rounded-full font-black">
              Economize
            </span>
          </button>
        </div>
      </div>

      {/* Current Plan Overview Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-zinc-800 bg-zinc-900/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-xl">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Plano Atual</span>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center gap-2">
            {currentPlan.name}
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {user?.subscriptionStatus === 'active' ? 'Ativo' : 'Grátis'}
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">{currentPlan.tagline}</p>
        </div>

        <div className="space-y-1.5 text-xs text-zinc-300 border-l border-zinc-800/80 pl-4">
          <p className="font-semibold text-white">Demonstrações & Sites Ativos:</p>
          <p className="text-zinc-400">{currentPlan.maxProjects === 9999 ? 'Ilimitados' : `Até ${currentPlan.maxProjects} sites simultâneos`}</p>
          <p className="font-semibold text-white mt-2">Marca d'água:</p>
          <p className="text-zinc-400">{user?.plan === 'free' ? 'Ativa (removível no Pro/Full)' : 'Desativada (100% White-Label)'}</p>
        </div>

        <div className="flex flex-col gap-2">
          {user?.plan !== 'full' && (
            <button
              onClick={() => handleUpgrade('full')}
              className="w-full py-3 rounded-xl text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
            >
              Fazer Upgrade para FULL
            </button>
          )}

          {user?.plan !== 'free' && (
            <button
              onClick={handleCancel}
              className="text-xs font-semibold text-zinc-400 hover:text-rose-400 py-1.5 transition-colors cursor-pointer"
            >
              Cancelar Assinatura
            </button>
          )}
        </div>
      </div>

      {/* Available Plans Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-white">Todos os Planos Disponíveis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(PLANS).map(plan => {
            const isCurrent = user?.plan === plan.id;
            const isYearly = billingCycle === 'yearly';
            const price = isYearly ? (plan.priceYearly ?? plan.price * 12) : plan.price;
            const originalPrice = isYearly ? plan.originalPriceYearly : plan.originalPrice;

            return (
              <div
                key={plan.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                  isCurrent 
                    ? 'border-emerald-500/60 bg-emerald-950/10' 
                    : plan.isPopular 
                    ? 'border-zinc-700 bg-zinc-900/90 shadow-xl' 
                    : 'border-zinc-800 bg-zinc-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-extrabold text-lg text-white">{plan.name}</h4>
                    {isCurrent ? (
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Plano Atual
                      </span>
                    ) : plan.badge ? (
                      <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-800/60">
                        {plan.id === 'pro' ? 'R$ 149,80 / ano' : 'R$ 269,60 / ano'}
                      </span>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    {originalPrice && (
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                        <span className="line-through font-semibold">R$ {formatCurrency(originalPrice)}</span>
                        <span className="text-emerald-400 font-bold text-[10px]">Promoção</span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">R$ {formatCurrency(price)}</span>
                      <span className="text-xs text-zinc-400 font-semibold">{isYearly ? '/ano' : '/mês'}</span>
                    </div>
                    {isYearly && price > 0 && (
                      <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                        Equivalente a R$ {(price / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / mês
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-zinc-300 font-semibold mb-6">{plan.limitsText}</p>

                  <div className="space-y-2.5 border-t border-zinc-800/80 pt-4 mb-6">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {!isCurrent ? (
                  <button
                    disabled={loading}
                    onClick={() => handleUpgrade(plan.id)}
                    className="w-full py-3 rounded-xl text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Migrar para ' + plan.name}
                  </button>
                ) : (
                  <div className="w-full py-3 rounded-xl text-xs font-bold text-zinc-400 bg-zinc-800 text-center">
                    Seu Plano Ativo
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
