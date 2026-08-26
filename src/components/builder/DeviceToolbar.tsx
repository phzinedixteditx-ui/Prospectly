import React from 'react';
import { useBuilder, DeviceMode } from '../../context/BuilderContext';
import { Monitor, Tablet, Smartphone, Save, Globe, Eye, ArrowLeft, Palette, MessageCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpenPublish: () => void;
  onOpenTheme: () => void;
  onOpenWhatsApp: () => void;
}

export const DeviceToolbar: React.FC<Props> = ({ onBack, onOpenPublish, onOpenTheme, onOpenWhatsApp }) => {
  const { site, deviceMode, setDeviceMode, saveSite } = useBuilder();

  return (
    <div className="h-14 border-b border-white/10 bg-[#090a0f] px-3 sm:px-4 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-white px-2 py-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Voltar</span>
        </button>

        <div className="h-4 w-[1px] bg-white/10 hidden md:block" />

        <span className="font-bold text-xs text-white truncate max-w-[120px] sm:max-w-[200px]">
          {site?.companyName}
        </span>
      </div>

      {/* Device Mode Switcher */}
      <div className="flex items-center p-0.5 sm:p-1 rounded-xl bg-zinc-900 border border-white/10">
        <button
          onClick={() => setDeviceMode('desktop')}
          className={`p-1.5 rounded-lg transition-colors ${deviceMode === 'desktop' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
          title="Visualização Desktop"
        >
          <Monitor className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setDeviceMode('tablet')}
          className={`p-1.5 rounded-lg transition-colors ${deviceMode === 'tablet' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
          title="Visualização Tablet"
        >
          <Tablet className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setDeviceMode('mobile')}
          className={`p-1.5 rounded-lg transition-colors ${deviceMode === 'mobile' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
          title="Visualização Mobile"
        >
          <Smartphone className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={onOpenTheme}
          className="flex items-center gap-1 text-xs font-semibold text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
        >
          <Palette className="w-3 h-3 text-zinc-400" />
          <span className="hidden sm:inline">Temas</span>
        </button>

        <button
          onClick={saveSite}
          className="flex items-center gap-1 text-xs font-semibold text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
        >
          <Save className="w-3 h-3" />
          <span className="hidden sm:inline">Salvar</span>
        </button>

        <button
          onClick={onOpenWhatsApp}
          className="flex items-center gap-1.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-3 sm:px-3.5 py-1.5 rounded-lg shadow-sm shadow-emerald-500/20 transition-all hover:scale-102 active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Enviar no WhatsApp</span>
        </button>

        <button
          onClick={onOpenPublish}
          className="hidden md:flex items-center gap-1 text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-700 transition-all"
        >
          <Globe className="w-3 h-3 text-zinc-300" />
          <span>Link Demo</span>
        </button>
      </div>
    </div>
  );
};

