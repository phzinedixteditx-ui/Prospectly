import React from 'react';
import { ArrowRight, User as UserIcon, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ProspectlyLogo } from '../common/ProspectlyLogo';

interface Props {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<Props> = ({ onNavigate, currentPage }) => {
  const { isAuthenticated, user, usage, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Black & White PS Monogram Logo */}
        <div onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'landing')}>
          <ProspectlyLogo size="md" />
        </div>

        {/* Nav Links */}
        {!isAuthenticated ? (
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-zinc-400">
            <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">Como Funciona</button>
            <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">Tabela de Preços</button>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-medium text-zinc-400 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
            <button 
              onClick={() => onNavigate('dashboard')} 
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                currentPage === 'dashboard' ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm' : 'hover:text-white hover:bg-zinc-800'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => onNavigate('search')} 
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                currentPage === 'search' ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm' : 'hover:text-white hover:bg-zinc-800'
              }`}
            >
              Pesquisar Empresas
            </button>
            <button 
              onClick={() => onNavigate('projects')} 
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                currentPage === 'projects' ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm' : 'hover:text-white hover:bg-zinc-800'
              }`}
            >
              Projetos & Demonstrações
            </button>
            <button 
              onClick={() => onNavigate('leads')} 
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                currentPage === 'leads' ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm' : 'hover:text-white hover:bg-zinc-800'
              }`}
            >
              Pipeline de Leads
            </button>
            <button 
              onClick={() => onNavigate('subscription')} 
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                currentPage === 'subscription' ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm' : 'hover:text-white hover:bg-zinc-800'
              }`}
            >
              Assinatura
            </button>

          </nav>
        )}

        {/* Auth / User Section */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => onNavigate('login')}
                className="text-xs font-semibold text-zinc-400 hover:text-white px-3 py-2 transition-colors"
              >
                Entrar
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="flex items-center gap-1.5 text-xs font-bold text-zinc-950 bg-zinc-100 hover:bg-white px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
              >
                Começar Grátis
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* Plan Badge */}
              <div 
                onClick={() => onNavigate('subscription')}
                className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] hover:border-zinc-600 transition-colors"
                title={`Plano ${user?.plan?.toUpperCase()} • Clique para gerenciar`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="font-bold uppercase tracking-wider text-zinc-200">{user?.plan}</span>
              </div>

              {/* User Avatar with Google Picture or Initials */}
              <div 
                onClick={() => onNavigate('subscription')}
                className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900 flex items-center justify-center cursor-pointer hover:border-zinc-400 transition-colors"
                title={user?.name || user?.email}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                )}
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="text-xs text-zinc-500 hover:text-zinc-300 p-1.5 transition-colors"
                title="Sair da conta"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


