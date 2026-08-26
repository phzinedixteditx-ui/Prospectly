import React, { useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Globe, Copy, Check, ExternalLink, X, Sparkles, Send, MessageCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenPublicDemo: (slug: string) => void;
}

export const PublishModal: React.FC<Props> = ({ isOpen, onClose, onOpenPublicDemo }) => {
  const { site, publishSite } = useBuilder();
  const [copied, setCopied] = useState(false);
  const [isPublished, setIsPublished] = useState(site?.status === 'published');
  const toast = useToast();

  if (!isOpen || !site) return null;

  const localOrigin = window.location.origin;
  const siteUrl = `${localOrigin}/?site=${site.slug}`;

  const cleanPhone = (site.phone || site.whatsapp || '31988887777').replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
  
  const clientPitchText = `Olá, pessoal do ${site.companyName}! Tudo bem? 👋\n\nCriei uma demonstração interativa exclusiva de como ficaria um site moderno para atrair clientes para vocês:\n\n👉 ${siteUrl}\n\nDê uma olhadinha sem compromisso!`;
  const whatsappShareUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(clientPitchText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    toast.success('Link do site copiado com sucesso!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePublish = () => {
    publishSite();
    setIsPublished(true);
    toast.success('Demonstração publicada com sucesso!', 'Link ativo para apresentação.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-slide-up">
      <div className="w-full max-w-lg saas-card p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Publicar Demonstração</h2>
              <p className="text-[11px] text-slate-400">{site.companyName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1.5">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Ao publicar, este site fica disponível através de um link público e seguro para você abrir no navegador ou enviar no WhatsApp do proprietário.
          </p>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-blue-400 truncate select-all">{siteUrl}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenPublicDemo(site.slug || site.id);
              }}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 py-2.5 px-4 rounded-xl border border-slate-700 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              Visualizar em Tela Cheia
            </button>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 flex items-center justify-center gap-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 py-2.5 px-4 rounded-xl shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Enviar no WhatsApp
            </a>
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-end">
            <button
              onClick={handlePublish}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-xl shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {isPublished ? '✓ Demonstração Publicada' : 'Publicar Agora'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

