import React, { useState } from 'react';
import { Lead, LeadStatus } from '../../types';
import { useLeads } from '../../context/LeadsContext';
import { useToast } from '../../context/ToastContext';
import { 
  Sparkles, 
  MessageSquare, 
  Trash2, 
  Phone, 
  MapPin, 
  Star, 
  BarChart3, 
  FileText, 
  BrainCircuit, 
  CheckCircle2, 
  DollarSign, 
  ArrowRight,
  TrendingUp,
  MoreVertical
} from 'lucide-react';
import { OpportunityScoreBadge } from '../common/OpportunityScoreBadge';

interface Props {
  leads: Lead[];
  onOpenPitch: (lead: Lead) => void;
  onCreateDemo: (lead: Lead) => void;
  onOpenAudit: (lead: Lead) => void;
  onOpenProposal: (lead: Lead) => void;
  onOpenObjections: (lead: Lead) => void;
}

const COLUMNS: Array<{ id: LeadStatus; label: string; color: string; badgeBg: string }> = [
  { id: 'novo', label: '1. Novos Leads', color: 'border-blue-500/40', badgeBg: 'bg-blue-950 text-blue-400' },
  { id: 'contato_realizado', label: '2. Abordagem Enviada', color: 'border-purple-500/40', badgeBg: 'bg-purple-950 text-purple-400' },
  { id: 'interessado', label: '3. Demo Visualizada', color: 'border-amber-500/40', badgeBg: 'bg-amber-950 text-amber-400' },
  { id: 'proposta_enviada', label: '4. Proposta Enviada', color: 'border-orange-500/40', badgeBg: 'bg-orange-950 text-orange-400' },
  { id: 'negociacao', label: '5. Em Negociação', color: 'border-indigo-500/40', badgeBg: 'bg-indigo-950 text-indigo-400' },
  { id: 'cliente', label: '6. Cliente Fechado 🏆', color: 'border-emerald-500/40', badgeBg: 'bg-emerald-950 text-emerald-400' },
  { id: 'perdido', label: '7. Perdido', color: 'border-rose-500/40', badgeBg: 'bg-rose-950 text-rose-400' }
];

export const KanbanBoard: React.FC<Props> = ({
  leads,
  onOpenPitch,
  onCreateDemo,
  onOpenAudit,
  onOpenProposal,
  onOpenObjections
}) => {
  const { updateLeadStatus, removeLead } = useLeads();
  const toast = useToast();

  const averageTicket = 750; // R$ 750 ticket médio de criação

  const inNegotiationCount = leads.filter(l => ['contato_realizado', 'interessado', 'proposta_enviada', 'negociacao'].includes(l.status)).length;
  const inNegotiationValue = inNegotiationCount * averageTicket;

  const closedCount = leads.filter(l => l.status === 'cliente').length;
  const closedValue = closedCount * averageTicket;

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus(leadId, newStatus);
    const colName = COLUMNS.find(c => c.id === newStatus)?.label || newStatus;
    toast.success(`Lead movido para "${colName}"!`);
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Financial Header Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Total de Leads Salvos</span>
            <span className="text-2xl font-black text-white mt-0.5 block">{leads.length} empresas</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 font-bold">
            {leads.length}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">Em Negociação Ativa</span>
            <span className="text-2xl font-black text-indigo-300 mt-0.5 block">
              R$ {inNegotiationValue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </span>
            <span className="text-[10px] text-indigo-400/80">{inNegotiationCount} propostas em andamento</span>
          </div>
          <TrendingUp className="w-8 h-8 text-indigo-400" />
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">Faturamento Fechado</span>
            <span className="text-2xl font-black text-emerald-400 mt-0.5 block">
              R$ {closedValue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </span>
            <span className="text-[10px] text-emerald-400/80">{closedCount} contratos fechados</span>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      {/* Kanban Board Columns Container */}
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-zinc-800">
        {COLUMNS.map(col => {
          const colLeads = leads.filter(l => l.status === col.id);
          const colValue = colLeads.length * averageTicket;

          return (
            <div
              key={col.id}
              className={`w-80 shrink-0 rounded-3xl bg-zinc-900/60 border ${col.color} flex flex-col max-h-[75vh] backdrop-blur-sm`}
            >
              {/* Column Header */}
              <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/40 rounded-t-3xl">
                <div>
                  <h4 className="font-extrabold text-xs text-white">{col.label}</h4>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    ~R$ {colValue.toLocaleString('pt-BR')} ({colLeads.length})
                  </span>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${col.badgeBg}`}>
                  {colLeads.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="p-3 overflow-y-auto space-y-3 flex-1">
                {colLeads.length === 0 ? (
                  <div className="py-8 text-center text-[11px] text-zinc-600 font-medium">
                    Nenhum lead nesta etapa
                  </div>
                ) : (
                  colLeads.map(lead => (
                    <div
                      key={lead.id}
                      className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all space-y-3 shadow-md group"
                    >
                      {/* Card Top */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h5 className="font-extrabold text-xs text-white group-hover:text-emerald-400 transition-colors">
                            {lead.name}
                          </h5>
                          <p className="text-[10px] text-zinc-400 mt-0.5">
                            {lead.category} • {lead.city}
                          </p>
                        </div>
                        <OpportunityScoreBadge score={lead.opportunityScore} compact />
                      </div>

                      {/* Phone & Rating */}
                      <div className="flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-900 pt-2">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-zinc-500" />
                          {lead.phone || 'Sem tel'}
                        </span>
                        <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {lead.rating.toFixed(1)}
                        </span>
                      </div>

                      {/* Status Selector Dropdown */}
                      <div className="pt-1">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className="w-full text-[10px] font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-emerald-400"
                        >
                          {COLUMNS.map(c => (
                            <option key={c.id} value={c.id}>Mover para: {c.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* Action Tool Buttons */}
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <button
                          onClick={() => onCreateDemo(lead)}
                          className="p-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-[10px] flex items-center justify-center gap-1 transition-all cursor-pointer"
                          title="Abrir no Design Studio"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Demo</span>
                        </button>

                        <button
                          onClick={() => onOpenPitch(lead)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-[10px] flex items-center justify-center gap-1 transition-all cursor-pointer"
                          title="Gerar Abordagem Comercial"
                        >
                          <MessageSquare className="w-3 h-3 text-indigo-400" />
                          <span>Abordagem</span>
                        </button>

                        <button
                          onClick={() => onOpenAudit(lead)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-[10px] flex items-center justify-center gap-1 transition-all cursor-pointer"
                          title="Auditor de Presença Digital"
                        >
                          <BarChart3 className="w-3 h-3 text-amber-400" />
                          <span>Auditoria</span>
                        </button>

                        <button
                          onClick={() => onOpenProposal(lead)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-[10px] flex items-center justify-center gap-1 transition-all cursor-pointer"
                          title="Gerar Proposta & Contrato"
                        >
                          <FileText className="w-3 h-3 text-sky-400" />
                          <span>Proposta</span>
                        </button>
                      </div>

                      {/* Objections button */}
                      <button
                        onClick={() => onOpenObjections(lead)}
                        className="w-full py-1 rounded-lg bg-purple-950/40 hover:bg-purple-950 text-purple-300 border border-purple-800/40 text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <BrainCircuit className="w-3 h-3 text-purple-400" />
                        <span>Quebra de Objeções</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};