import React, { useState, useEffect } from 'react';
import { Lead } from '../../types';
import { GeminiService } from '../../services/geminiService';
import { Sparkles, Copy, Check, Send, X, RefreshCw, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface Props {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PitchGeneratorModal: React.FC<Props> = ({ lead, isOpen, onClose }) => {
  const [pitch, setPitch] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { consumeAICredit } = useAuth();
  const toast = useToast();

  const generatePitch = async () => {
    if (!lead) return;
    setLoading(true);

    const canConsume = consumeAICredit(1);
    if (!canConsume) {
      toast.error('Limite diário de créditos de IA atingido');
      setLoading(false);
      return;
    }

    try {
      const generated = await GeminiService.generatePitchMessage(lead);
      setPitch(generated);
    } catch (e) {
      toast.error('Erro ao gerar abordagem personalizada');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && lead) {
      generatePitch();
    }
  }, [isOpen, lead]);

  if (!isOpen || !lead) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(pitch);
    setCopied(true);
    toast.success('Mensagem copiada para a área de transferência!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : '';
    const phoneParam = cleanPhone.length >= 10 ? (cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone) : '';
    const url = `https://wa.me/${phoneParam}?text=${encodeURIComponent(pitch)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#0e101a] border border-indigo-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Gerar Abordagem com IA</h2>
              <p className="text-xs text-slate-400">Personalizada para {lead.name} ({lead.city})</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-sm font-semibold text-white">Criando abordagem de alta conversão...</p>
            <p className="text-xs text-slate-400">Analisando reputação no Google e ausência de site</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                rows={8}
                className="w-full p-4 rounded-2xl bg-slate-900/90 border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
                placeholder="A mensagem gerada pela IA aparecerá aqui..."
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={generatePitch}
                className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-900 border border-white/5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Gerar Outra Versão (1 crédito)
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar Texto'}
                </button>

                <button
                  onClick={handleSendWhatsApp}
                  className="flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/25 transition-all hover:scale-102"
                >
                  <Send className="w-4 h-4" />
                  Abrir no WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
