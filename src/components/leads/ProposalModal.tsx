import React, { useState } from 'react';
import { Lead, CommercialProposal } from '../../types';
import { StorageService } from '../../services/storage';
import { useToast } from '../../context/ToastContext';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  Copy, 
  Printer, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  Zap,
  Building2,
  DollarSign
} from 'lucide-react';

interface Props {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProposalModal: React.FC<Props> = ({ lead, isOpen, onClose }) => {
  const toast = useToast();
  const agency = StorageService.getAgencyProfile();

  const [setupPrice, setSetupPrice] = useState('650,00');
  const [monthlyPrice, setMonthlyPrice] = useState('89,00');
  const [deliveryDays, setDeliveryDays] = useState(2);
  const [includedItems, setIncludedItems] = useState<string[]>([
    'Site institucional de alta conversão adaptado para celular e computador',
    'Cardápio / Catálogo completo com botão direto de pedidos no WhatsApp',
    'Selo de prova social com avaliações 5 estrelas verificadas do Google Maps',
    'Configuração de Domínio Próprio e Certificado de Segurança SSL (HTTPS)',
    'Hospedagem em nuvem de alta performance com carregamento ultra rápido',
    'Suporte técnico mensal, pequenas alterações e manutenção contínua'
  ]);

  if (!isOpen || !lead) return null;

  const handleCopyProposal = () => {
    const message = `📋 *PROPOSTA COMERCIAL & PROJETO DIGITAL: ${lead.name.toUpperCase()}*\n\n` +
      `Olá! Segue a proposta oficial elaborada pela *${agency.agencyName}* para a presença digital da *${lead.name}*:\n\n` +
      `🚀 *ESCOPO DO PROJETO:*\n` +
      includedItems.map(item => `  ✓ ${item}`).join('\n') +
      `\n\n` +
      `💰 *CONDIÇÕES DE INVESTIMENTO:*\n` +
      `• *Desenvolvimento & Publicação:* R$ ${setupPrice} (à vista no Pix ou até 12x no cartão)\n` +
      `• *Manutenção & Hospedagem VIP:* R$ ${monthlyPrice} / mês (sem fidelidade contratual presa)\n` +
      `• *Prazo de Entrega:* Apenas ${deliveryDays} dias úteis (demonstração já pronta para aprovação)\n\n` +
      `🔒 *Garantia Incondicional:* Se não ficar 100% satisfeito com o resultado final, ajustamos tudo até a sua total aprovação.\n\n` +
      `Podemos dar início e colocar sua empresa no ar hoje mesmo?`;

    navigator.clipboard.writeText(message);

    // Save proposal event
    const proposal: CommercialProposal = {
      id: 'prop_' + Date.now(),
      leadId: lead.id,
      companyName: lead.name,
      setupPrice: parseFloat(setupPrice.replace('.', '').replace(',', '.')),
      monthlyPrice: parseFloat(monthlyPrice.replace('.', '').replace(',', '.')),
      deliveryDays,
      includedFeatures: includedItems,
      status: 'sent',
      createdAt: new Date().toISOString()
    };
    StorageService.saveProposal(proposal);

    toast.success('Proposta copiada!', 'Cole o texto formatado no WhatsApp do cliente.');
  };

  const toggleItem = (item: string) => {
    if (includedItems.includes(item)) {
      setIncludedItems(includedItems.filter(i => i !== item));
    } else {
      setIncludedItems([...includedItems, item]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl text-zinc-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Gerador de Proposta Comercial & Contrato</h3>
              <p className="text-xs text-zinc-400">Proposta estruturada pronta para fechamento em 1 clique</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Target and Agency Header */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Cliente Proposto</span>
              <h4 className="font-extrabold text-base text-white mt-0.5">{lead.name}</h4>
              <p className="text-xs text-zinc-400">{lead.category} • {lead.city}</p>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-zinc-800 pt-2 sm:pt-0 sm:pl-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Agência Emissora</span>
              <h4 className="font-extrabold text-base text-white mt-0.5">{agency.agencyName}</h4>
              <p className="text-xs text-zinc-400">WhatsApp: {agency.agencyWhatsapp}</p>
            </div>
          </div>

          {/* Pricing Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Valor de Criação (R$)
              </label>
              <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2">
                <span className="text-xs font-bold text-zinc-400">R$</span>
                <input
                  type="text"
                  value={setupPrice}
                  onChange={(e) => setSetupPrice(e.target.value)}
                  className="w-full bg-transparent text-sm font-black text-white focus:outline-none"
                  placeholder="650,00"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Manutenção Mensal (R$)
              </label>
              <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2">
                <span className="text-xs font-bold text-zinc-400">R$</span>
                <input
                  type="text"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(e.target.value)}
                  className="w-full bg-transparent text-sm font-black text-white focus:outline-none"
                  placeholder="89,00"
                />
                <span className="text-[10px] text-zinc-400">/mês</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Prazo de Entrega (Dias)
              </label>
              <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <input
                  type="number"
                  value={deliveryDays}
                  onChange={(e) => setDeliveryDays(Number(e.target.value))}
                  className="w-full bg-transparent text-sm font-black text-white focus:outline-none"
                  min={1}
                  max={30}
                />
                <span className="text-[10px] text-zinc-400">dias</span>
              </div>
            </div>
          </div>

          {/* Scope Checklist */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Escopo Incluso na Proposta
            </span>

            <div className="space-y-2">
              {[
                'Site institucional de alta conversão adaptado para celular e computador',
                'Cardápio / Catálogo completo com botão direto de pedidos no WhatsApp',
                'Selo de prova social com avaliações 5 estrelas verificadas do Google Maps',
                'Configuração de Domínio Próprio e Certificado de Segurança SSL (HTTPS)',
                'Hospedagem em nuvem de alta performance com carregamento ultra rápido',
                'Suporte técnico mensal, pequenas alterações e manutenção contínua'
              ].map((item, idx) => {
                const isIncluded = includedItems.includes(item);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleItem(item)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isIncluded 
                        ? 'border-emerald-500/50 bg-emerald-950/20 text-white' 
                        : 'border-zinc-800 bg-zinc-950/60 text-zinc-500'
                    }`}
                  >
                    <span className="text-xs font-medium">{item}</span>
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${isIncluded ? 'text-emerald-400' : 'text-zinc-700'}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-zinc-800 bg-zinc-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Proposta PDF</span>
          </button>

          <button
            onClick={handleCopyProposal}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-95"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copiar Proposta para WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};