import React from 'react';
import { Shield, Lock } from 'lucide-react';
import { ProspectlyLogo } from '../common/ProspectlyLogo';

export const Footer: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          <ProspectlyLogo size="sm" showText={false} />
          <div>
            <p className="font-bold text-white tracking-tight">Prospectly</p>
            <p className="text-[11px] text-zinc-500">Encontre empresas. Crie demonstrações. Venda no WhatsApp.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Shield className="w-3.5 h-3.5 text-zinc-300" /> Prospecção Ética & Em Conformidade
          </span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Lock className="w-3.5 h-3.5 text-zinc-300" /> Isolamento de Dados por Conta
          </span>
        </div>

        <p className="text-[11px] text-zinc-500">
          © {new Date().getFullYear()} Prospectly. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

