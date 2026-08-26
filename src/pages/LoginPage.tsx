import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ProspectlyLogo } from '../components/common/ProspectlyLogo';
import { LightBeamBackground } from '../components/common/LightBeamBackground';
import { Sparkles, ShieldCheck, CheckCircle2, Mail, User as UserIcon } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

const GOOGLE_CLIENT_ID = '327866267075-k63apeda2ie4bk82ffof8iljs0ns0jmb.apps.googleusercontent.com';

export const LoginPage: React.FC<Props> = ({ onNavigate }) => {
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithGoogle } = useAuth();
  const toast = useToast();

  const handleCredentialResponse = async (response: any) => {
    if (!response.credential) return;

    setLoading(true);
    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);

      if (payload && payload.email) {
        await loginWithGoogle({
          name: payload.name || payload.given_name || 'Usuário Google',
          email: payload.email,
          avatar: payload.picture
        });

        toast.success(`Autenticado com sucesso! Bem-vindo, ${payload.name || payload.email}.`);
        onNavigate('dashboard');
      }
    } catch (err) {
      console.error('Google sign-in error:', err);
      toast.error('Erro ao conectar conta Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleOAuthPopup = () => {
    if (window.google?.accounts?.oauth2) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'email profile openid',
        callback: async (tokenResponse: any) => {
          if (tokenResponse.access_token) {
            try {
              setLoading(true);
              const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
              });
              if (res.ok) {
                const user = await res.json();
                await loginWithGoogle({
                  name: user.name || user.given_name || 'Usuário Google',
                  email: user.email,
                  avatar: user.picture
                });
                toast.success(`Bem-vindo, ${user.name || user.email}!`);
                onNavigate('dashboard');
              }
            } catch (e) {
              console.error('Error fetching Google profile:', e);
            } finally {
              setLoading(false);
            }
          }
        }
      });
      client.requestAccessToken({ prompt: 'select_account' });
    } else {
      toast.info('Carregando autenticador Google...');
    }
  };

  useEffect(() => {
    const initGsi = () => {
      if (window.google?.accounts?.id && googleBtnRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true
          });

          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'filled_black',
            size: 'large',
            type: 'standard',
            shape: 'pill',
            text: 'signin_with',
            width: 320,
            logo_alignment: 'left'
          });
        } catch (e) {
          console.warn('GSI render error:', e);
        }
      }
    };

    if (window.google?.accounts?.id) {
      initGsi();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(interval);
          initGsi();
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, []);

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const cleanEmail = email.trim();
      const cleanName = name.trim() || cleanEmail.split('@')[0];
      const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=0D8ABC&color=fff&size=200`;

      await loginWithGoogle({
        name: cleanName,
        email: cleanEmail,
        avatar
      });

      toast.success(`Bem-vindo, ${cleanName}!`);
      onNavigate('dashboard');
    } catch {
      toast.error('Erro ao acessar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <LightBeamBackground opacity={0.95} />

      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8 space-y-3 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Autenticação Oficial Google
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-white font-medium drop-shadow-2xl">
          Design is Everything.
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300/80 max-w-md mx-auto leading-relaxed">
          Acesse com sua conta Google oficial para gerenciar seus leads e projetos de sites.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl border-beam-card space-y-6 animate-slide-up text-center">
        <div className="flex flex-col items-center space-y-2">
          <ProspectlyLogo size="md" showText={false} />
          <h2 className="text-xl font-bold text-white tracking-tight">Acesse sua conta</h2>
          <p className="text-xs text-zinc-400">Entre com sua conta Google oficial em 1 clique</p>
        </div>

        {/* Official Google GIS & OAuth Buttons */}
        <div className="pt-2 flex flex-col items-center space-y-4">
          <div ref={googleBtnRef} className="flex justify-center w-full min-h-[44px]" />

          {/* Primary One-Click Google OAuth Popup Button */}
          <button
            type="button"
            onClick={handleGoogleOAuthPopup}
            disabled={loading}
            className="w-full py-4 px-5 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-950 text-sm font-extrabold shadow-2xl shadow-black/60 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-75"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
            </svg>
            <span>{loading ? 'Conectando ao Google...' : 'Entrar com o Google'}</span>
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Autenticação direta e protegida pelo Google</span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="pt-4 border-t border-zinc-800/80 space-y-2 text-left text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Acesso instantâneo com sua conta Google</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Sincronização em nuvem e proteção de dados</span>
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-zinc-400">
            Ainda não tem cadastro?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-zinc-200 font-semibold hover:text-white underline cursor-pointer"
            >
              Criar conta grátis
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
