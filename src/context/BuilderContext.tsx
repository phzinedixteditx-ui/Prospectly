import React, { createContext, useContext, useState } from 'react';
import { SiteConfig, AIChatMessage, SiteSection, SiteTheme } from '../types';
import { StorageService } from '../services/storage';
import { GeminiService } from '../services/geminiService';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

interface BuilderContextType {
  site: SiteConfig | null;
  deviceMode: DeviceMode;
  chatMessages: AIChatMessage[];
  isGenerating: boolean;
  canUndo: boolean;
  undoLastChange: () => void;
  setDeviceMode: (mode: DeviceMode) => void;
  loadSite: (site: SiteConfig) => void;
  updateTheme: (theme: Partial<SiteTheme>) => void;
  updateSiteInfo: (info: Partial<SiteConfig>) => void;
  updateSection: (sectionId: string, data: Partial<SiteSection>) => void;
  updateSectionItem: (sectionId: string, itemId: string, itemData: Partial<any>) => void;
  addSectionItem: (sectionId: string, item: any) => void;
  removeSectionItem: (sectionId: string, itemId: string) => void;
  toggleSection: (sectionId: string) => void;
  reorderSections: (newSections: SiteSection[]) => void;
  addSection: (section: SiteSection) => void;
  removeSection: (sectionId: string) => void;
  sendAICommand: (command: string) => Promise<void>;
  saveSite: () => void;
  publishSite: () => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [site, setSite] = useState<SiteConfig | null>(null);
  const [history, setHistory] = useState<SiteConfig[]>([]);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [chatMessages, setChatMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: '✨ **Olá! Sou seu Copiloto de IA.** Diga o que gostaria de transformar neste site (ex: *"Deixe com visual escuro luxuoso"*, *"Adicione uma promoção de 15% no WhatsApp"*, *"Otimize os textos para celular"* ou *"Adicione depoimentos 5 estrelas"*).',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { consumeAICredit } = useAuth();
  const toast = useToast();

  const loadSite = (newSite: SiteConfig) => {
    setSite(newSite);
    setHistory([]);
  };

  const pushHistory = (current: SiteConfig) => {
    setHistory(prev => [...prev.slice(-10), JSON.parse(JSON.stringify(current))]);
  };

  const undoLastChange = () => {
    if (history.length === 0) {
      toast.info('Nenhuma alteração anterior para desfazer.');
      return;
    }
    const previous = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setSite(previous);
    StorageService.saveSite(previous);
    toast.success('Versão anterior restaurada com sucesso!');
  };

  const saveSite = () => {
    if (!site) return;
    StorageService.saveSite(site);
    toast.success('Demonstração salva com sucesso!');
  };

  const publishSite = () => {
    if (!site) return;
    const published = {
      ...site,
      status: 'published' as const,
      publishedUrl: 'https://prospectly.app/demo/' + site.slug,
      updatedAt: new Date().toISOString()
    };
    pushHistory(site);
    setSite(published);
    StorageService.saveSite(published);
    toast.success('🎉 Site Publicado!', 'A demonstração está online e pronta para enviar ao cliente.');
  };

  const updateTheme = (themeUpdates: Partial<SiteTheme>) => {
    if (!site) return;
    pushHistory(site);
    const updated = {
      ...site,
      theme: { ...site.theme, ...themeUpdates },
      updatedAt: new Date().toISOString()
    };
    setSite(updated);
    StorageService.saveSite(updated);
  };

  const updateSiteInfo = (info: Partial<SiteConfig>) => {
    if (!site) return;
    pushHistory(site);
    const updated = {
      ...site,
      ...info,
      updatedAt: new Date().toISOString()
    };
    setSite(updated);
    StorageService.saveSite(updated);
    toast.success('Informações atualizadas!');
  };

  const updateSection = (sectionId: string, data: Partial<SiteSection>) => {
    if (!site) return;
    pushHistory(site);
    const updatedSections = site.sections.map(s => s.id === sectionId ? { ...s, ...data } : s);
    const updated = { ...site, sections: updatedSections, updatedAt: new Date().toISOString() };
    setSite(updated);
    StorageService.saveSite(updated);
  };

  const updateSectionItem = (sectionId: string, itemId: string, itemData: Partial<any>) => {
    if (!site) return;
    pushHistory(site);
    const updatedSections = site.sections.map(sec => {
      if (sec.id !== sectionId) return sec;
      const updatedItems = (sec.items || []).map(item => item.id === itemId ? { ...item, ...itemData } : item);
      return { ...sec, items: updatedItems };
    });
    const updated = { ...site, sections: updatedSections, updatedAt: new Date().toISOString() };
    setSite(updated);
    StorageService.saveSite(updated);
    toast.success('Item atualizado!');
  };

  const addSectionItem = (sectionId: string, item: any) => {
    if (!site) return;
    pushHistory(site);
    const updatedSections = site.sections.map(sec => {
      if (sec.id !== sectionId) return sec;
      return { ...sec, items: [...(sec.items || []), item] };
    });
    const updated = { ...site, sections: updatedSections, updatedAt: new Date().toISOString() };
    setSite(updated);
    StorageService.saveSite(updated);
    toast.success('Item adicionado!');
  };

  const removeSectionItem = (sectionId: string, itemId: string) => {
    if (!site) return;
    pushHistory(site);
    const updatedSections = site.sections.map(sec => {
      if (sec.id !== sectionId) return sec;
      return { ...sec, items: (sec.items || []).filter(item => item.id !== itemId) };
    });
    const updated = { ...site, sections: updatedSections, updatedAt: new Date().toISOString() };
    setSite(updated);
    StorageService.saveSite(updated);
    toast.info('Item removido');
  };

  const toggleSection = (sectionId: string) => {
    if (!site) return;
    pushHistory(site);
    const updatedSections = site.sections.map(s => s.id === sectionId ? { ...s, enabled: !s.enabled } : s);
    const updated = { ...site, sections: updatedSections, updatedAt: new Date().toISOString() };
    setSite(updated);
    StorageService.saveSite(updated);
  };

  const reorderSections = (newSections: SiteSection[]) => {
    if (!site) return;
    pushHistory(site);
    const updated = { ...site, sections: newSections, updatedAt: new Date().toISOString() };
    setSite(updated);
    StorageService.saveSite(updated);
  };

  const addSection = (section: SiteSection) => {
    if (!site) return;
    pushHistory(site);
    const updatedSections = [...site.sections, section];
    const updated = { ...site, sections: updatedSections, updatedAt: new Date().toISOString() };
    setSite(updated);
    StorageService.saveSite(updated);
    toast.success('Seção adicionada com sucesso!');
  };

  const removeSection = (sectionId: string) => {
    if (!site) return;
    pushHistory(site);
    const updatedSections = site.sections.filter(s => s.id !== sectionId);
    const updated = { ...site, sections: updatedSections, updatedAt: new Date().toISOString() };
    setSite(updated);
    StorageService.saveSite(updated);
    toast.info('Seção removida');
  };

  const sendAICommand = async (command: string) => {
    if (!site || !command.trim()) return;

    const canConsume = consumeAICredit(1);
    if (!canConsume) {
      toast.error('Limite diário de créditos de IA atingido', 'Seus créditos renovam automaticamente amanhã ou faça upgrade para o PRO/FULL.');
      return;
    }

    const userMsg: AIChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: command,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    const historyPrompt = chatMessages.slice(-6).map(m => ({
      role: m.sender === 'user' ? ('user' as const) : ('model' as const),
      text: m.text
    }));

    setChatMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);

    try {
      const { updatedSite, responseMessage, toolUsed } = await GeminiService.executeAICommand(site, command, historyPrompt);
      
      const wasModified = toolUsed !== 'ai_chat';
      if (wasModified) {
        pushHistory(site);
        setSite(updatedSite);
        StorageService.saveSite(updatedSite);
        toast.success('Site atualizado pela IA!');
      }


      const aiMsg: AIChatMessage = {
        id: 'msg_ai_' + Date.now(),
        sender: 'assistant',
        text: responseMessage,
        actionApplied: wasModified ? toolUsed : undefined,
        creditsCost: 1,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      toast.error('Não conseguimos aplicar a alteração agora', 'Tente novamente.');
    } finally {
      setIsGenerating(false);
    }

  };

  return (
    <BuilderContext.Provider value={{
      site,
      deviceMode,
      chatMessages,
      isGenerating,
      canUndo: history.length > 0,
      undoLastChange,
      setDeviceMode,
      loadSite,
      updateTheme,
      updateSiteInfo,
      updateSection,
      updateSectionItem,
      addSectionItem,
      removeSectionItem,
      toggleSection,
      reorderSections,
      addSection,
      removeSection,
      sendAICommand,
      saveSite,
      publishSite
    }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) throw new Error('useBuilder must be used within BuilderProvider');
  return context;
};

