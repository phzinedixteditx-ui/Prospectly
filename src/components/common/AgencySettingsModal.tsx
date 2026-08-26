import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StorageService } from '../../services/storage';
import { useToast } from '../../context/ToastContext';
import { AgencyProfile } from '../../types';
import { 
  X, 
  Building2, 
  Crown, 
  Check, 
  Globe, 
  Phone, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  Palette,
  ExternalLink
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AgencySettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const toast = useToast();
  const currentProfile = StorageService.getAgencyProfile();

  const [agencyName, setAgencyName] = useState(currentProfile.agencyName);
  const [agencyWhatsapp, setAgencyWhatsapp] = useState(currentProfile.agencyWhatsapp);
  const [agencyEmail, setAgencyEmail] = useState(currentProfile.agencyEmail || '');
  const [agencyLogo, setAgencyLogo] = useState(currentProfile.agencyLogo || '');
  const [customSubdomain, setCustomSubdomain] = useState(currentProfile.customSubdomain || 'minhaagencia');
  const [showBannerOnDemo, setShowBannerOnDemo] = useState(currentProfile.showBannerOnDemo ?? true);

  if (!isOpen) return null;

  const isPaidUser = user?.plan === 'pro' || user?.plan === 'full';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AgencyProfile = {
      agencyName,
      agencyWhatsapp,
      agencyEmail,
      agencyLogo,
      customSubdomain,
      showBannerOnDemo
    };
    StorageService.setAgencyProfile(updated);
    toast.success('Configurações da Agência salvas com sucesso!', 'Sua marca White-Label será exibida nas demonstrações enviadas.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl text-zinc-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-[1px] shadow-lg">
              <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center text-amber-400">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">Modo Agência White-Label</h3>
                <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded-full font-black border border-amber-800/60 flex items-center gap-1">
                  <Crown className="w-2.5 h-2.5" />
                  PRO & FULL
                </span>
              </div>
              <p className="text-xs text-zinc-400">Apresente demonstrações com o nome, logo e contato da sua agência</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
              Nome da Sua Agência ou Marca
            </label>
            <input
              type="text"
              required
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              placeholder="Ex: Apex Mídia Digital ou Matheus Consultoria"
              className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-bold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                WhatsApp Comercial
              </label>
              <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-700/80 rounded-xl px-3 py-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <input
                  type="text"
                  required
                  value={agencyWhatsapp}
                  onChange={(e) => setAgencyWhatsapp(e.target.value)}
                  placeholder="(31) 99999-9999"
                  className="w-full bg-transparent text-xs text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                E-mail de Contato
              </label>
              <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-700/80 rounded-xl px-3 py-2">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="email"
                  value={agencyEmail}
                  onChange={(e) => setAgencyEmail(e.target.value)}
                  placeholder="contato@minhaagencia.com"
                  className="w-full bg-transparent text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
              URL do Logotipo da Agência (Opcional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={agencyLogo}
                onChange={(e) => setAgencyLogo(e.target.value)}
                placeholder="https://suaagencia.com/logo.png"
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono text-[11px]"
              />
              {agencyLogo && (
                <img src={agencyLogo} alt="Logo Agência" className="w-9 h-9 rounded-lg object-contain bg-black border border-zinc-700 shrink-0" />
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
              Subdomínio Exclusivo para Demonstrações
            </label>
            <div className="flex items-center bg-zinc-950 border border-zinc-700/80 rounded-xl px-3.5 py-2 text-xs text-zinc-300">
              <span className="text-zinc-500 font-mono">https://</span>
              <input
                type="text"
                value={customSubdomain}
                onChange={(e) => setCustomSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="minhaagencia"
                className="bg-transparent text-emerald-400 font-mono font-bold focus:outline-none px-1"
              />
              <span className="text-zinc-500 font-mono">.prospectly.app/demo/</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Barra de Consultoria no Topo da Demo</span>
              <span className="text-[10px] text-zinc-400">Exibe selo: "Apresentado por {agencyName || 'sua agência'} • Fale conosco"</span>
            </div>
            <input
              type="checkbox"
              checked={showBannerOnDemo}
              onChange={(e) => setShowBannerOnDemo(e.target.checked)}
              className="w-4 h-4 accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Live Preview of the Agency Banner on Demo */}
          <div className="pt-2">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
              Prévia Visual da Barra de Apresentação (Como o cliente verá no topo do site)
            </span>
            <div className="p-3 rounded-xl bg-zinc-950 border border-emerald-500/40 flex items-center justify-between gap-3 text-xs shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-zinc-300">Demonstração Exclusiva desenvolvida por <strong className="text-white">{agencyName || 'Sua Agência'}</strong></span>
              </div>
              <span className="px-3 py-1 rounded-lg bg-emerald-400 text-zinc-950 font-black text-[10px] whitespace-nowrap shadow-sm">
                Falar com Especialista WhatsApp
              </span>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-300 cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-black transition-all shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Salvar Configurações</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};