import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ProspectlyLogo } from '../components/common/ProspectlyLogo';
import { LightBeamBackground } from '../components/common/LightBeamBackground';
import { GoogleAuthModal } from '../components/common/GoogleAuthModal';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export const RegisterPage: React.FC<Props> = ({ onNavigate }) => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const { loginWithGoogle } = useAuth();
  const toast = useToast();

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    try {
      const ok = await loginWithGoogle();
      if (ok) {
        toast.success('Conta criada com sucesso via Google!');
        onNavigate('dashboard');
      }
    } catch {
      setShowGoogleModal(true);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleSuccess = async (profile: { name: string; email: string; avatar: string }) => {
    try {
      await loginWithGoogle(profile);
      toast.success(`Conta criada e vinculada com o Google (${profile.email})!`);
      onNavigate('dashboard');
    } catch {
      toast.error('Não foi possível conectar com o Google.');
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Radiant Prismatic Chromatic Light Beam in Background */}
      <LightBeamBackground opacity={0.95} />

      {/* Main Luxury Hero Title */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8 space-y-3 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Cadastro Gratuito em 1 Clique
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-white font-medium drop-shadow-2xl">
          Create & Convert.
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300/80 max-w-md mx-auto leading-relaxed">
          Crie sua conta oficial em segundos e comece a encontrar clientes reais em qualquer cidade do Brasil.
        </p>
      </div>

      {/* Center Auth Card with Glowing Border Beam */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl border-beam-card space-y-6 animate-slide-up text-center">
        <div className="flex flex-col items-center space-y-2">
          <ProspectlyLogo size="md" showText={false} />
          <h2 className="text-xl font-bold text-white tracking-tight">Criar Conta Oficial</h2>
          <p className="text-xs text-zinc-400">Cadastre-se com seu Google oficial para liberar seus créditos</p>
        </div>

        {/* Google One-Click Register Button */}
        <div className="space-y-4 pt-2">
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={googleLoading}
            className="w-full py-4 px-5 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-950 text-sm font-extrabold shadow-2xl shadow-black/60 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-75"
          >
            {/* Google Icon SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
            <span>{googleLoading ? 'Conectando ao Google...' : 'Cadastrar com o Google'}</span>
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Autenticação direta e protegida pelo Google</span>
          </div>
        </div>

        {/* Benefits List */}
        <div className="pt-4 border-t border-zinc-800/80 space-y-2 text-left text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Criação de demonstração de site inclusa</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Buscas reais de comércios no Google Maps</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Demonstrações interativas com botão de WhatsApp</span>
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-zinc-400">
            Já possui uma conta cadastrada?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-zinc-200 font-semibold hover:text-white underline cursor-pointer"
            >
              Fazer login
            </button>
          </p>
        </div>
      </div>

      {/* Google Auth Modal Fallback */}
      <GoogleAuthModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSuccess={handleGoogleSuccess}
      />
    </div>
  );
};
