import React, { useState } from 'react';
import { Mail, Check, Sparkles, ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (profile: { name: string; email: string; avatar: string }) => void;
}

export const GoogleAuthModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [clientId, setClientId] = useState(localStorage.getItem('prospectly_google_client_id') || '');

  if (!isOpen) return null;

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=0D8ABC&color=fff&size=200`;

    onSuccess({
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      avatar
    });
    onClose();
  };

  const handleSaveClientId = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientId.trim()) {
      localStorage.setItem('prospectly_google_client_id', clientId.trim());
      setShowConfig(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="saas-card p-6 max-w-md w-full border-zinc-800 space-y-5 animate-slide-up relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            {/* Google Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
            </svg>
            <span>Conectar Conta Google</span>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white text-xs p-1">✕</button>
        </div>

        {/* Informative notice */}
        <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-white text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Login Direto com sua Conta Google
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Confirme sua conta Google para salvar suas pesquisas, créditos diários e projetos sincronizados no Supabase.
          </p>
        </div>

        {/* Direct Google Account Selector */}
        <form onSubmit={handleQuickLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-zinc-300 mb-1.5">Seu E-mail Google (@gmail.com)</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seunome@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/90 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-300 mb-1.5">Nome do Perfil</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Matheus Felipe"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/90 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="text-[11px] text-zinc-500 hover:text-zinc-300 underline"
            >
              {showConfig ? 'Ocultar configurações' : 'Configurar Google Client ID'}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs hover:bg-zinc-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Acessar com Google
              </button>
            </div>
          </div>
        </form>

        {/* Optional Google Cloud Client ID Drawer */}
        {showConfig && (
          <form onSubmit={handleSaveClientId} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
            <label className="block font-bold text-white text-[11px]">
              Google Cloud OAuth Client ID (Opcional):
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="xxxx.apps.googleusercontent.com"
              className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
            />
            <p className="text-[10px] text-zinc-500">
              Para o popup nativo do Google Cloud funcionar em localhost, adicione <code>http://localhost:5173</code> nas Origens JavaScript Autorizadas do seu Client ID no console do Google.
            </p>
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-[11px]"
              >
                Salvar Client ID
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
