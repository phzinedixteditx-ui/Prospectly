import React, { useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { MessageCircle, Copy, Check, ExternalLink, X, Sparkles, RefreshCw, Send, Phone } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { GeminiService } from '../../services/geminiService';
import { SiteConfig } from '../../types';


interface Props {
  isOpen: boolean;
  onClose: () => void;
  site?: SiteConfig | null;
}

export const WhatsAppPitchModal: React.FC<Props> = ({ isOpen, onClose, site: propSite }) => {
  const builderContext = useBuilder();
  const site = propSite || builderContext?.site;
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const toast = useToast();

  if (!isOpen || !site) return null;


  const localOrigin = window.location.origin;
  const siteUrl = `${localOrigin}/?site=${site.slug || site.id}`;

  const cleanPhone = (site.whatsapp || site.phone || '31988887777').replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.startsWith('55') ? cleanPhone : (cleanPhone.length >= 10 ? `55${cleanPhone}` : '5531988887777');

  const defaultPitch = `Olá, equipe do ${site.companyName}! Tudo bem? 👋

Estava pesquisando referências de ${site.niche.toLowerCase()} aqui em ${site.city} e vi que vocês têm excelentes avaliações no Google! ⭐ Parabéns de verdade pelo trabalho!

Notei que muitos novos clientes pesquisam pelo celular e querem ver os serviços/produtos e chamar direto no WhatsApp.

Por isso, preparei uma apresentação exclusiva de como ficaria um site moderno e focado em vendas para o ${site.companyName}:

👉 ${siteUrl}

Dá uma olhada de 10 segundos sem nenhum compromisso! O que acharam?`;

  const getProcessedPitch = (raw: string) => {
    return raw
      .replace(/{nome_empresa}/g, site.companyName)
      .replace(/{cidade}/g, site.city)
      .replace(/{nicho}/g, site.niche)
      .replace(/{link_site}/g, siteUrl)
      .replace(/{telefone}/g, site.phone || '(31) 98888-7777');
  };

  const initialPitch = site.customWhatsAppPitch ? getProcessedPitch(site.customWhatsAppPitch) : defaultPitch;
  const [message, setMessage] = useState(initialPitch);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    toast.success('Mensagem de abordagem copiada!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveAsDefault = () => {
    builderContext?.updateSiteInfo({ customWhatsAppPitch: message });
    toast.success('Script salvo como padrão para este site!');
  };

  const handleRegeneratePitch = async () => {
    setIsGenerating(true);
    try {
      const companyMock = {
        id: site.leadId || site.id,
        name: site.companyName,
        category: site.niche,
        city: site.city,
        state: 'MG',
        rating: 4.8,
        reviewCount: 95,
        hasWebsite: false,
        socialPresence: true,
        opportunityScore: { total: 90 } as any,
        location: site.city
      };
      const newPitch = await GeminiService.generatePitchMessage(companyMock);
      if (newPitch) {
        setMessage(`${newPitch}\n\n👉 Apresentação exclusiva: ${siteUrl}`);
        toast.success('Nova mensagem gerada com sucesso!');
      }
    } catch {
      toast.error('Erro ao gerar nova mensagem');
    } finally {
      setIsGenerating(false);
    }
  };

  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-slide-up">
      <div className="w-full max-w-lg saas-card p-5 sm:p-6 shadow-2xl space-y-4 border-zinc-800 bg-zinc-950 text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                Enviar Abordagem no WhatsApp
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Alta Conversão
                </span>
              </h2>
              <p className="text-[11px] text-zinc-400">{site.companyName} • {site.city}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Business Phone Badge */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <Phone className="w-3.5 h-3.5 text-zinc-400" />
            <span>Telefone / WhatsApp:</span>
            <strong className="text-white">{site.whatsapp || site.phone || 'Não informado'}</strong>
          </div>
          <span className="text-[10px] text-zinc-500">Google Maps</span>
        </div>

        {/* Message Editor */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-zinc-300">Mensagem Personalizada de Prospecção:</label>
            <button
              onClick={handleRegeneratePitch}
              disabled={isGenerating}
              className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
              Gerar com IA
            </button>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={7}
            className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-zinc-800">
          <button
            onClick={handleSaveAsDefault}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer"
            title="Salvar esta mensagem como padrão para este site"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Salvar Script</span>
          </button>

          <button
            onClick={handleCopyMessage}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copiado!' : 'Copiar Texto'}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-102 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Abrir WhatsApp e Enviar</span>
          </a>
        </div>
      </div>
    </div>
  );
};
