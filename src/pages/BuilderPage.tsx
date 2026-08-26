import React, { useState, useEffect } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { StorageService } from '../services/storage';
import { DeviceToolbar } from '../components/builder/DeviceToolbar';
import { SectionRenderer } from '../components/builder/SectionRenderer';
import { DesignStudioPanel } from '../components/builder/DesignStudioPanel';
import { ThemeSelector } from '../components/builder/ThemeSelector';

import { PublishModal } from '../components/builder/PublishModal';
import { WhatsAppPitchModal } from '../components/builder/WhatsAppPitchModal';

interface Props {
  siteId?: string;
  onNavigate: (page: string, data?: any) => void;
}

export const BuilderPage: React.FC<Props> = ({ siteId, onNavigate }) => {
  const { site, deviceMode, loadSite } = useBuilder();
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);

  useEffect(() => {
    if (siteId) {
      const found = StorageService.getSiteById(siteId);
      if (found) loadSite(found);
    }
  }, [siteId]);

  if (!site) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-slate-400">
        Carregando demonstração...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#07080c] overflow-hidden">
      {/* Top Toolbar */}
      <DeviceToolbar
        onBack={() => onNavigate('leads')}
        onOpenPublish={() => setPublishModalOpen(true)}
        onOpenTheme={() => setThemeModalOpen(true)}
        onOpenWhatsApp={() => setWhatsappModalOpen(true)}
      />

      {/* Main Workspace: Canvas + AI Chat */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 overflow-y-auto bg-[#07080d] p-2 sm:p-6 flex justify-center items-start">
          {deviceMode === 'mobile' ? (
            <div className="relative w-[385px] my-4 rounded-[44px] border-[10px] border-slate-800 bg-slate-900 shadow-2xl shadow-black/80 overflow-hidden flex flex-col">
              {/* Phone Top Notch / Dynamic Island */}
              <div className="h-6 w-full bg-slate-900 flex items-center justify-center relative shrink-0 z-40">
                <div className="w-24 h-3.5 bg-black rounded-full flex items-center justify-end px-2">
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Phone Content Screen */}
              <div className="w-full max-h-[680px] overflow-y-auto bg-white" style={{ scrollbarWidth: 'none' }}>
                <SectionRenderer site={site} overrideDeviceMode="mobile" />
              </div>

              {/* Phone Bottom Home Bar */}
              <div className="h-4 w-full bg-slate-900 flex items-center justify-center shrink-0">
                <div className="w-28 h-1 bg-slate-700 rounded-full" />
              </div>
            </div>
          ) : deviceMode === 'tablet' ? (
            <div className="relative w-[780px] my-4 rounded-[32px] border-[10px] border-slate-800 bg-slate-900 shadow-2xl shadow-black/80 overflow-hidden flex flex-col">
              <div className="w-full max-h-[750px] overflow-y-auto bg-white">
                <SectionRenderer site={site} overrideDeviceMode="tablet" />
              </div>
            </div>
          ) : (
            <div className="w-full transition-all duration-300 bg-white rounded-2xl shadow-xl overflow-hidden">
              <SectionRenderer site={site} overrideDeviceMode="desktop" />
            </div>
          )}
        </div>

        {/* Visual Design Studio Sidebar */}
        <DesignStudioPanel />
      </div>


      {/* Modals */}
      <ThemeSelector
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
      />

      <PublishModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        onOpenPublicDemo={(slug) => onNavigate('public-demo', { slug })}
      />

      <WhatsAppPitchModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
      />
    </div>
  );
};

