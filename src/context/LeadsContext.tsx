import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, Company, LeadStatus } from '../types';
import { StorageService } from '../services/storage';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface LeadsContextType {
  leads: Lead[];
  saveCompanyAsLead: (company: Company) => boolean;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  addLeadNote: (leadId: string, note: string) => void;
  removeLead: (leadId: string) => void;
  getLeadById: (leadId: string) => Lead | undefined;
  isCompanySaved: (companyId: string) => boolean;
  refreshLeads: () => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const LeadsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const { user, incrementLeads } = useAuth();
  const toast = useToast();

  const refreshLeads = () => {
    setLeads(StorageService.getLeads());
  };

  useEffect(() => {
    refreshLeads();
  }, []);

  const isCompanySaved = (companyId: string): boolean => {
    return leads.some(l => l.id === companyId || l.leadId === companyId);
  };

  const saveCompanyAsLead = (company: Company): boolean => {
    if (isCompanySaved(company.id)) {
      toast.info('Empresa já adicionada aos seus leads');
      return true;
    }

    const canSave = incrementLeads();
    if (!canSave) {
      toast.error('Limite de leads atingido', 'Faça upgrade do seu plano para salvar leads ilimitados.');
      return false;
    }

    const newLead: Lead = {
      ...company,
      leadId: 'lead_' + Math.random().toString(36).substring(2, 9),
      userId: user?.id || 'usr_demo',
      status: 'novo',
      notes: ['Lead salvo em ' + new Date().toLocaleDateString('pt-BR')],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    StorageService.saveLead(newLead);
    refreshLeads();
    toast.success('Lead salvo com sucesso!', company.name + ' foi adicionado aos Meus Leads.');
    return true;
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    const lead = leads.find(l => l.id === leadId || l.leadId === leadId);
    if (!lead) return;

    const updated = { ...lead, status, updatedAt: new Date().toISOString() };
    StorageService.saveLead(updated);
    refreshLeads();
    toast.success('Status atualizado', 'Lead movido para ' + status.replace('_', ' '));
  };

  const addLeadNote = (leadId: string, note: string) => {
    const lead = leads.find(l => l.id === leadId || l.leadId === leadId);
    if (!lead) return;

    const notes = [note, ...(lead.notes || [])];
    const updated = { ...lead, notes, updatedAt: new Date().toISOString() };
    StorageService.saveLead(updated);
    refreshLeads();
    toast.success('Nota adicionada');
  };

  const removeLead = (leadId: string) => {
    StorageService.removeLead(leadId);
    refreshLeads();
    toast.info('Lead removido');
  };

  const getLeadById = (leadId: string): Lead | undefined => {
    return leads.find(l => l.id === leadId || l.leadId === leadId);
  };

  return (
    <LeadsContext.Provider value={{
      leads,
      saveCompanyAsLead,
      updateLeadStatus,
      addLeadNote,
      removeLead,
      getLeadById,
      isCompanySaved,
      refreshLeads
    }}>
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (!context) throw new Error('useLeads must be used within LeadsProvider');
  return context;
};
