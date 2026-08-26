import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { SiteConfig, AgencyProfile } from '../types';
import { SectionRenderer } from '../components/builder/SectionRenderer';
import { Sparkles, ArrowLeft, ExternalLink, Check, MessageCircle, Building2, ShieldCheck, Phone } from 'lucide-react';

interface Props {
  slug?: string;
  onNavigate: (page: string) => void;
}

export const PublicSitePage: React.FC<Props> = ({ slug, onNavigate }) => {
  const [site, setSite] = useState<SiteConfig | null>(null);
  const [agency, setAgency] = useState<AgencyProfile>(StorageService.getAgencyProfile());

  useEffect(() => {
    let currentSite: SiteConfig | null = null;

    if (slug) {
      const found = StorageService.getSiteById(slug);
      if (found) {
        currentSite = found;
      } else {
        const sites = StorageService.getSites();
        const bySlug = sites.find(s => s.slug === slug || s.id === slug);
        if (bySlug) currentSite = bySlug;
        else if (sites.length > 0) currentSite = sites[0];
      }
    } else {
      const sites = StorageService.getSites();
      if (sites.length > 0) currentSite = sites[0];
    }

    setSite(currentSite);

    // Record Demo View Event in Real-Time (Lead no Radar)
    if (currentSite) {
      const isMobile = window.innerWidth <= 768;
      StorageService.recordDemoView({
        siteId: currentSite.id,
        siteSlug: currentSite.slug,
        companyName: currentSite.companyName,
        device: isMobile ? 'mobile' : 'desktop'
      });
    }

    setAgency(StorageService.getAgencyProfile());
  }, [slug]);

  if (!site) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-400 gap-3">
        <p>Demonstração não encontrada.</p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-xs text-emerald-400 hover:underline"
        >
          Voltar ao Painel
        </button>
      </div>
    );
  }

  const cleanAgencyPhone = (agency.agencyWhatsapp || '31999999999').replace(/[^0-9]/g, '');
  const formattedAgencyPhone = cleanAgencyPhone.startsWith('55') ? cleanAgencyPhone : `55${cleanAgencyPhone}`;
  const agencyWhatsappUrl = `https://wa.me/${formattedAgencyPhone}?text=${encodeURIComponent(
    `Olá ${agency.agencyName}! Acabei de visualizar a demonstração do site da *${site.companyName}* e gostaria de conversar sobre a publicação e ativação.`
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      {/* Top White-Label Agency Banner */}
      {agency.showBannerOnDemo && (
        <div className="bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 px-4 py-2.5 flex items-center justify-between text-xs text-zinc-200 sticky top-0 z-50">
          <div className="flex items-center gap-2.5">
            {agency.agencyLogo ? (
              <img src={agency.agencyLogo} alt={agency.agencyName} className="h-6 w-auto object-contain rounded" />
            ) : (
              <div className="w-6 h-6 rounded-lg bg-emerald-400 text-zinc-950 flex items-center justify-center font-black text-[11px]">
                {agency.agencyName.charAt(0)}
              </div>
            )}
            <div className="hidden sm:block">
              <span className="text-zinc-400">Demonstração Exclusiva desenvolvida por </span>
              <strong className="text-white font-bold">{agency.agencyName}</strong>
            </div>
            <div className="sm:hidden font-bold text-white truncate max-w-[150px]">
              {site.companyName}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={agencyWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-black text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-3.5 py-1.5 rounded-xl transition-all text-xs shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Aprovar com Especialista</span>
            </a>

            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-1 font-semibold text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-xl transition-colors text-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Painel</span>
            </button>
          </div>
        </div>
      )}

      {/* Rendered Live Website Full Width */}
      <main className="flex-1 w-full bg-white">
        <SectionRenderer site={site} previewMode={true} overrideDeviceMode="desktop" onNavigate={onNavigate} />
      </main>
    </div>
  );
};


