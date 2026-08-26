import React, { useState } from 'react';
import { useLeads } from '../context/LeadsContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { GeminiService } from '../services/geminiService';
import { StorageService } from '../services/storage';
import { Lead, LeadStatus } from '../types';
import { OpportunityScoreBadge } from '../components/common/OpportunityScoreBadge';
import { PitchGeneratorModal } from '../components/leads/PitchGeneratorModal';
import { DigitalAuditModal } from '../components/leads/DigitalAuditModal';
import { ProposalModal } from '../components/leads/ProposalModal';
import { ObjectionScriptsModal } from '../components/leads/ObjectionScriptsModal';
import { AgencySettingsModal } from '../components/common/AgencySettingsModal';
import { KanbanBoard } from '../components/leads/KanbanBoard';
import { 
  Users, 
  Sparkles, 
  MessageSquare, 
  Trash2, 
  Phone, 
  MapPin, 
  Plus, 
  BarChart3, 
  FileText, 
  BrainCircuit, 
  Building2, 
  LayoutGrid, 
  List,
  Crown
} from 'lucide-react';

interface Props {
  onNavigate: (page: string, data?: any) => void;
}

export const LeadsPage: React.FC<Props> = ({ onNavigate }) => {
  const { leads, updateLeadStatus, removeLead } = useLeads();
  const { consumeAICredit, user } = useAuth();
  const toast = useToast();

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Modals state
  const [pitchModalOpen, setPitchModalOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [objectionsModalOpen, setObjectionsModalOpen] = useState(false);
  const [agencyModalOpen, setAgencyModalOpen] = useState(false);

  const [filterStatus, setFilterStatus] = useState<string>('all');

  const statusOptions: Array<{ id: LeadStatus; label: string; color: string }> = [
    { id: 'novo', label: 'Novo', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { id: 'contato_realizado', label: 'Contato Realizado', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { id: 'interessado', label: 'Interessado', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { id: 'proposta_enviada', label: 'Proposta Enviada', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
    { id: 'negociacao', label: 'Em Negociação', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    { id: 'cliente', label: 'Cliente Fechado', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { id: 'perdido', label: 'Perdido', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
  ];

  const filteredLeads = leads.filter(l => filterStatus === 'all' || l.status === filterStatus);

  const handleOpenPitch = (lead: Lead) => {
    setSelectedLead(lead);
    setPitchModalOpen(true);
  };

  const handleOpenAudit = (lead: Lead) => {
    setSelectedLead(lead);
    setAuditModalOpen(true);
  };

  const handleOpenProposal = (lead: Lead) => {
    setSelectedLead(lead);
    setProposalModalOpen(true);
  };

  const handleOpenObjections = (lead?: Lead) => {
    setSelectedLead(lead || (leads.length > 0 ? leads[0] : null));
    setObjectionsModalOpen(true);
  };

  const handleCreateDemo = async (lead: Lead) => {
    toast.info('Criando site do comércio...');
    const site = await GeminiService.generateInitialSite(lead);
    StorageService.saveSite(site);
    toast.success('Site criado com sucesso!');
    onNavigate('builder', { siteId: site.id, site });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header with Tool Shortcuts */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-indigo-400" />
            Pipeline de Leads & Fechamento B2B
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Gerencie seu funil, audite estabelecimentos, quebre objeções e envie propostas comerciais em 1 clique.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Agency White-Label Button */}
          <button
            onClick={() => setAgencyModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 px-3.5 py-2.5 rounded-xl border border-amber-800/60 transition-all cursor-pointer shadow-sm"
            title="Configurar Logotipo e Contato da sua Agência nos links públicos"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Agência White-Label</span>
          </button>

          {/* Objections Quick Button */}
          <button
            onClick={() => handleOpenObjections()}
            className="flex items-center gap-1.5 text-xs font-bold text-purple-300 bg-purple-950/60 hover:bg-purple-900/60 px-3.5 py-2.5 rounded-xl border border-purple-800/60 transition-all cursor-pointer shadow-sm"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
            <span>Scripts de Objeções</span>
          </button>

          {/* View Toggle */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'kanban' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Visualização Kanban"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Visualização em Lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onNavigate('search')}
            className="flex items-center gap-2 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Buscar Novos Leads
          </button>
        </div>
      </div>

      {/* Main View: Kanban vs List */}
      {viewMode === 'kanban' ? (
        <KanbanBoard
          leads={leads}
          onOpenPitch={handleOpenPitch}
          onCreateDemo={handleCreateDemo}
          onOpenAudit={handleOpenAudit}
          onOpenProposal={handleOpenProposal}
          onOpenObjections={handleOpenObjections}
        />
      ) : (
        <div className="space-y-6">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterStatus === 'all' ? 'bg-white text-black font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Todos ({leads.length})
            </button>

            {statusOptions.map(st => (
              <button
                key={st.id}
                onClick={() => setFilterStatus(st.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterStatus === st.id ? 'bg-emerald-400 text-zinc-950 font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {st.label} ({leads.filter(l => l.status === st.id).length})
              </button>
            ))}
          </div>

          {/* Leads List / Table */}
          {filteredLeads.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl border border-zinc-800 text-center space-y-3">
              <Users className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-sm font-semibold text-white">Nenhum lead neste status.</p>
              <p className="text-xs text-zinc-400">Adicione empresas através da busca para alimentar seu funil de vendas.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLeads.map(lead => (
                <div
                  key={lead.id}
                  className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4 shadow-md"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-extrabold text-base text-white">{lead.name}</h3>
                        <OpportunityScoreBadge score={lead.opportunityScore} compact />
                      </div>
                      <p className="text-xs text-zinc-400">
                        {lead.category} • {lead.location} • ⭐ {lead.rating.toFixed(1)} ({lead.reviewCount} avaliações)
                      </p>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className="text-xs font-bold rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-emerald-400"
                      >
                        {statusOptions.map(st => (
                          <option key={st.id} value={st.id}>{st.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <Phone className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{lead.phone || 'Sem telefone'}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleOpenAudit(lead)}
                        className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 px-3 py-2 rounded-xl border border-amber-800/60 transition-colors"
                        title="Auditor de Presença Digital"
                      >
                        <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                        Auditoria
                      </button>

                      <button
                        onClick={() => handleOpenProposal(lead)}
                        className="flex items-center gap-1.5 text-xs font-bold text-sky-300 bg-sky-950/60 hover:bg-sky-900/60 px-3 py-2 rounded-xl border border-sky-800/60 transition-colors"
                        title="Gerar Proposta Comercial"
                      >
                        <FileText className="w-3.5 h-3.5 text-sky-400" />
                        Proposta
                      </button>

                      <button
                        onClick={() => handleOpenObjections(lead)}
                        className="flex items-center gap-1.5 text-xs font-bold text-purple-300 bg-purple-950/60 hover:bg-purple-900/60 px-3 py-2 rounded-xl border border-purple-800/60 transition-colors"
                        title="Scripts de Quebra de Objeções"
                      >
                        <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
                        Objeções
                      </button>

                      <button
                        onClick={() => handleOpenPitch(lead)}
                        className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/60 px-3.5 py-2 rounded-xl border border-indigo-500/30 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Abordagem
                      </button>

                      <button
                        onClick={() => handleCreateDemo(lead)}
                        className="flex items-center gap-1.5 text-xs font-black text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Criar Demonstração
                      </button>

                      <button
                        onClick={() => removeLead(lead.id)}
                        className="p-2 rounded-xl text-zinc-500 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
                        title="Remover Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <PitchGeneratorModal
        lead={selectedLead}
        isOpen={pitchModalOpen}
        onClose={() => setPitchModalOpen(false)}
      />

      <DigitalAuditModal
        lead={selectedLead}
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
      />

      <ProposalModal
        lead={selectedLead}
        isOpen={proposalModalOpen}
        onClose={() => setProposalModalOpen(false)}
      />

      <ObjectionScriptsModal
        lead={selectedLead}
        isOpen={objectionsModalOpen}
        onClose={() => setObjectionsModalOpen(false)}
      />

      <AgencySettingsModal
        isOpen={agencyModalOpen}
        onClose={() => setAgencyModalOpen(false)}
      />
    </div>
  );
};
