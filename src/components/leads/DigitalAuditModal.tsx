import React from 'react';
import { Lead } from '../../types';
import { useToast } from '../../context/ToastContext';
import { 
  X, 
  BarChart3, 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  Copy, 
  Printer, 
  Share2, 
  Sparkles,
  MapPin,
  Star,
  Globe
} from 'lucide-react';

interface Props {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalAuditModal: React.FC<Props> = ({ lead, isOpen, onClose }) => {
  const toast = useToast();

  if (!isOpen || !lead) return null;

  // Estimation formulas based on category and review volume
  const estimatedMonthlySearches = Math.max(250, Math.round(lead.reviewCount * 12 + 180));
  const estimatedConversionLoss = Math.round(estimatedMonthlySearches * 0.08); // 8% lost visitors
  const averageTicket = lead.category.toLowerCase().includes('barbearia') ? 45 :
                        lead.category.toLowerCase().includes('odont') || lead.category.toLowerCase().includes('clinic') ? 220 :
                        lead.category.toLowerCase().includes('advoc') ? 350 : 65;
  const estimatedMonthlyRevenueLoss = estimatedConversionLoss * averageTicket;

  const copyAuditMessage = () => {
    const message = `📊 *DIAGNÓSTICO DIGITAL EXECUTIVO: ${lead.name.toUpperCase()}*\n\n` +
      `Olá! Analisamos a presença digital da *${lead.name}* no Google Maps em ${lead.city}.\n\n` +
      `⭐ *Reputação:* Nota ${lead.rating.toFixed(1)} com ${lead.reviewCount} avaliações reais\n` +
      `🔍 *Buscas Estimadas na Região:* ~${estimatedMonthlySearches.toLocaleString('pt-BR')} pessoas/mês\n` +
      `⚠️ *Diagnóstico Crítico:* Estabelecimento sem site próprio indexado.\n` +
      `📉 *Impacto Comercial:* Perda estimada de cerca de ${estimatedConversionLoss} clientes/mês (~R$ ${estimatedMonthlyRevenueLoss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês em vendas que vão para concorrentes com site).\n\n` +
      `💡 *Solução Pronta:* Desenvolvemos uma demonstração completa e estruturada com fotos reais e pedidos rápidos no WhatsApp.\n\n` +
      `Podemos te apresentar o site pronto sem compromisso?`;

    navigator.clipboard.writeText(message);
    toast.success('Diagnóstico copiado!', 'Cole a mensagem formatada diretamente no WhatsApp do cliente.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl text-zinc-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Auditor de Presença Digital</h3>
              <p className="text-xs text-zinc-400">Diagnóstico comercial de faturamento & perda de conversão</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Target Company Banner */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Empresa Auditada</span>
              <h4 className="font-extrabold text-lg text-white mt-0.5">{lead.name}</h4>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>{lead.location}</span>
                <span>•</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {lead.rating.toFixed(1)} ({lead.reviewCount} avaliações)
                </span>
              </div>
            </div>

            <div className="text-right sm:self-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-950/80 text-rose-400 border border-rose-800/60">
                <AlertTriangle className="w-3.5 h-3.5" />
                Sem Site Próprio
              </span>
            </div>
          </div>

          {/* Revenue Loss Estimator Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Buscas Locais / Mês</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-white">~{estimatedMonthlySearches}</span>
                <span className="text-xs text-zinc-400">pesquisas</span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">No Google Maps e busca orgânica</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Clientes Perdidos</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-rose-400">~{estimatedConversionLoss}</span>
                <span className="text-xs text-zinc-400">/mês</span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">Desistem por falta de site/cardápio</p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/40">
              <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider block">Faturamento Perdido</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-rose-400">
                  R$ {estimatedMonthlyRevenueLoss.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
                <span className="text-xs text-rose-300/80">/mês</span>
              </div>
              <p className="text-[10px] text-rose-300/60 mt-1">Vendas que vão para concorrentes</p>
            </div>
          </div>

          {/* Audit Highlights */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Pontos Críticos do Diagnóstico</h5>
            
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-300">
                <span className="w-5 h-5 rounded-full bg-rose-950 text-rose-400 flex items-center justify-center shrink-0 font-bold text-xs border border-rose-800/60">✕</span>
                <div>
                  <strong className="text-white block">Ausência de Domínio Próprio & Cardápio Digital</strong>
                  <span className="text-zinc-400">O cliente pesquisa a empresa no Google, mas cai em links de terceiros ou guias sem fotos nem botão direto de WhatsApp.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-300">
                <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs border border-emerald-800/60">✓</span>
                <div>
                  <strong className="text-white block">Alta Reputação e Prova Social Local (Nota {lead.rating.toFixed(1)})</strong>
                  <span className="text-zinc-400">O estabelecimento possui excelente qualidade reconhecida, facilitando a conversão imediata de novos clientes com um site profissional.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-300">
                <span className="w-5 h-5 rounded-full bg-amber-950 text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs border border-amber-800/60">⚡</span>
                <div>
                  <strong className="text-white block">Oportunidade Imediata de Recuperação de Vendas</strong>
                  <span className="text-zinc-400">Apresentar uma demonstração pronta reduz a resistência do cliente em 90% e fecha contratos recorrentes com facilidade.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-zinc-800 bg-zinc-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Salvar PDF</span>
          </button>

          <button
            onClick={copyAuditMessage}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-95"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copiar Diagnóstico para WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};