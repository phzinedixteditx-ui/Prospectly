import React from 'react';
import { useBuilder, DeviceMode } from '../../context/BuilderContext';
import { Monitor, Tablet, Smartphone, Save, Globe, Eye, ArrowLeft, Palette, MessageCircle, Sparkles, Check } from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpenPublish: () => void;
  onOpenTheme: () => void;
  onOpenWhatsApp: () => void;
}

export const DeviceToolbar: React.FC<Props> = ({ onBack, onOpenPublish, onOpenTheme, onOpenWhatsApp }) => {
  const { site, deviceMode, setDeviceMode, saveSite } = useBuilder();

  return (
    <div className="h-16 border-b border-zinc-800/90 bg-zinc-950 px-4 sm:px-6 flex items-center justify-between gap-4 select-none shrink-0 shadow-md">
      {/* Left: Back & Company Info */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0 min-w-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white px-3 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 transition-all cursor-pointer active:scale-95 shadow-sm"
          title="Voltar para a lista de Leads"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-400" />
          <span className="hidden sm:inline">Voltar</span>
        </button>

        <div className="h-5 w-[1px] bg-zinc-800 hidden md:block" />

        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div className="min-w-0">
            <span className="font-extrabold text-sm text-white truncate block max-w-[140px] sm:max-w-[240px]">
              {site?.companyName || 'Meu Site'}
            </span>
            <span className="text-[10px] text-zinc-400 block truncate">
              {site?.niche} • {site?.city}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Device Mode Switcher */}
      <div className="flex items-center p-1 rounded-2xl bg-zinc-900 border border-zinc-800/90 shadow-inner">
        <button
          onClick={() => setDeviceMode('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            deviceMode === 'desktop'
              ? 'bg-zinc-800 text-white shadow-md'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Visualização Desktop"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden lg:inline text-[11px]">Computador</span>
        </button>

        <button
          onClick={() => setDeviceMode('tablet')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            deviceMode === 'tablet'
              ? 'bg-zinc-800 text-white shadow-md'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Visualização Tablet"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span className="hidden lg:inline text-[11px]">Tablet</span>
        </button>

        <button
          onClick={() => setDeviceMode('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            deviceMode === 'mobile'
              ? 'bg-emerald-500 text-zinc-950 font-black shadow-md shadow-emerald-500/20'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Visualização Celular"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden lg:inline text-[11px]">Celular</span>
        </button>
      </div>

      {/* Right: Action Buttons with Ample Spacing */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={onOpenTheme}
          className="flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all cursor-pointer active:scale-95 shadow-sm"
          title="Ver temas rápidos"
        >
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline">Temas</span>
        </button>

        <button
          onClick={saveSite}
          className="flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all cursor-pointer active:scale-95 shadow-sm"
          title="Salvar alterações no projeto"
        >
          <Save className="w-3.5 h-3.5 text-sky-400" />
          <span>Salvar</span>
        </button>

        <button
          onClick={onOpenWhatsApp}
          className="flex items-center gap-2 text-xs font-black text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-102 active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-zinc-950" />
          <span className="hidden sm:inline">Enviar WhatsApp</span>
        </button>

        <button
          onClick={onOpenPublish}
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 px-3.5 py-2 rounded-xl border border-zinc-700/80 transition-all cursor-pointer active:scale-95 shadow-sm"
          title="Compartilhar Link do Site"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden md:inline">Compartilhar</span>
        </button>
      </div>
    </div>
  );
};

