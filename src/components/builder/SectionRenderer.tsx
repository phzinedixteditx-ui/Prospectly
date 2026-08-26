import React from 'react';
import { SiteConfig, SiteSection } from '../../types';
import { useBuilder } from '../../context/BuilderContext';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  CheckCircle2, 
  Star, 
  Award, 
  ShieldCheck, 
  HeartHandshake,
  ChevronDown,
  ExternalLink,
  Check,
  Flame,
  ArrowRight
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { StorageService } from '../../services/storage';

interface Props {
  site: SiteConfig;
  previewMode?: boolean;
  overrideDeviceMode?: 'desktop' | 'tablet' | 'mobile';
  onNavigate?: (page: string) => void;
}

export const SectionRenderer: React.FC<Props> = ({ site, previewMode = false, overrideDeviceMode, onNavigate }) => {
  const { theme, sections } = site;
  const builderContext = useBuilder();
  const { user } = useAuth();
  const toast = useToast();
  const currentDevice = overrideDeviceMode || (builderContext?.deviceMode ?? 'desktop');
  const isMobile = currentDevice === 'mobile';
  const isTablet = currentDevice === 'tablet';
  const storedUser = StorageService.getUser();
  const activePlan = user?.plan || storedUser?.plan || 'free';
  const isFreePlan = site.creatorPlan ? site.creatorPlan === 'free' : (activePlan === 'free');


  const bgColor = theme.backgroundColor || '#090a10';
  const textColor = theme.textColor || '#f8fafc';
  const cardBg = theme.cardBackground || '#12141f';
  const primaryColor = theme.primaryColor || '#10b981';
  const accentColor = theme.accentColor || '#34d399';
  const borderRadius = theme.borderRadius || 'rounded-2xl';

  const getThemeStyle = () => {
    return {
      backgroundColor: bgColor,
      color: textColor,
      fontFamily: theme.fontBody ? `${theme.fontBody}, sans-serif` : 'Plus Jakarta Sans, sans-serif'
    };
  };

  const getAnimationClass = () => {
    if (theme.animation === 'slide-up') return 'anim-slide-up';
    if (theme.animation === 'fade') return 'anim-fade';
    if (theme.animation === 'zoom') return 'anim-zoom';
    return '';
  };

  const getButtonClasses = (extra = '') => {
    const btnStyle = theme.buttonStyle || 'rounded';
    let shape = 'rounded-xl';
    let glow = '';

    if (btnStyle === 'pill') shape = 'rounded-full';
    else if (btnStyle === 'sharp') shape = 'rounded-none';
    else if (btnStyle === 'glow') {
      shape = 'rounded-xl';
      glow = 'shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 ring-1 ring-white/20';
    }

    return `${shape} font-extrabold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 ${glow} ${extra}`;
  };

  const getCardClasses = (extra = '') => {
    const radius = theme.borderRadius || 'rounded-2xl';
    const style = theme.cardStyle || 'glass';
    let effectClass = 'card-style-glass';

    if (style === 'neon') effectClass = 'card-style-neon';
    else if (style === 'shadow3d') effectClass = 'card-style-shadow3d';
    else if (style === 'flat') effectClass = 'card-style-flat';
    else if (style === 'solid') effectClass = 'card-style-solid';

    return `${radius} ${effectClass} ${extra}`;
  };

  const getWhatsAppUrl = (customText?: string) => {
    const raw = (site.whatsapp || site.phone || '31988887777').replace(/[^0-9]/g, '');
    const phone = raw.length >= 10 ? (raw.startsWith('55') ? raw : `55${raw}`) : '5531988887777';
    const text = customText || `Olá! Conheci o ${site.companyName} pelo site e gostaria de saber mais informações e fazer um pedido.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.companyName} ${site.city}`)}`;

  // Filter out disabled sections and floating whatsapp button as requested
  const enabledSections = [...sections]
    .filter(s => s.enabled && s.type !== 'whatsapp_floating')
    .sort((a, b) => a.order - b.order);

  const layoutVariant = theme.layoutVariant || 'split';

  return (
    <div style={getThemeStyle()} className={`relative min-h-full w-full select-none transition-colors duration-300 font-sans antialiased ${getAnimationClass()}`}>
      {enabledSections.map(sec => {
        switch (sec.type) {
          // NAVBAR
          case 'navbar':
            return (
              <header 
                key={sec.id} 
                style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: `${bgColor}ee` }}
                className={`sticky top-0 z-30 w-full border-b backdrop-blur-xl flex items-center justify-between transition-all ${
                  isMobile ? 'px-4 py-3' : 'px-8 py-4'
                }`}
              >
                <div className="flex items-center gap-2.5 group cursor-pointer">
                  <div 
                    style={{ backgroundColor: primaryColor }}
                    className={`rounded-xl flex items-center justify-center text-zinc-950 font-black shadow-md ${
                      isMobile ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'
                    }`}
                  >
                    {site.companyName.charAt(0)}
                  </div>
                  <div>
                    <span 
                      className={`font-extrabold tracking-tight block truncate ${isMobile ? 'text-xs max-w-[140px]' : 'text-sm sm:text-base'}`} 
                      style={{ fontFamily: theme.fontHeading, color: textColor }}
                    >
                      {site.companyName}
                    </span>
                    <span className="text-[10px] opacity-70 font-medium block truncate max-w-[130px]">
                      {site.city}
                    </span>
                  </div>
                </div>

                {!isMobile && (
                  <div className="flex items-center gap-7 text-xs font-semibold opacity-85">
                    <a href="#destaques" className="hover:opacity-100 transition-opacity">Especialidades</a>
                    <a href="#sobre" className="hover:opacity-100 transition-opacity">Sobre Nós</a>
                    <a href="#depoimentos" className="hover:opacity-100 transition-opacity">Avaliações</a>
                    <a href="#contato" className="hover:opacity-100 transition-opacity">Localização</a>
                  </div>
                )}

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: primaryColor }}
                  className={getButtonClasses(isMobile ? 'px-3 py-1.5 text-[11px] text-zinc-950' : 'px-4 py-2 text-xs text-zinc-950')}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{sec.buttonText || 'WhatsApp'}</span>
                </a>
              </header>
            );

          // HERO
          case 'hero':
            // VARIANT 1: EDITORIAL CENTERED
            if (layoutVariant === 'editorial') {
              return (
                <section key={sec.id} className={`relative overflow-hidden text-center ${isMobile ? 'py-12 px-4' : 'py-20 px-8'}`}>
                  {theme.glowEffect && (
                    <div 
                      className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-3xl opacity-25 pointer-events-none"
                      style={{ backgroundColor: primaryColor }}
                    />
                  )}

                  <div className="max-w-4xl mx-auto space-y-6 relative z-10">
                    {sec.badge && (
                      <div 
                        style={{ backgroundColor: cardBg }}
                        className={getCardClasses('inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold shadow-sm mx-auto')}
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span style={{ color: textColor }}>{sec.badge}</span>
                      </div>
                    )}

                    <h1 
                      style={{ fontFamily: theme.fontHeading, color: textColor }}
                      className={`font-black tracking-tight leading-tight max-w-3xl mx-auto ${
                        isMobile ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-6xl'
                      }`}
                    >
                      {sec.title || site.companyName}
                    </h1>

                    <p style={{ opacity: 0.85 }} className={`leading-relaxed font-normal max-w-2xl mx-auto ${isMobile ? 'text-xs' : 'text-base sm:text-lg'}`}>
                      {sec.subtitle || site.tagline}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: primaryColor }}
                        className={getButtonClasses(isMobile ? 'w-full py-3 text-xs text-zinc-950' : 'px-8 py-4 text-sm text-zinc-950')}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{sec.buttonText || 'Fazer Pedido no WhatsApp'}</span>
                      </a>

                      <a
                        href="#destaques"
                        style={{ backgroundColor: cardBg, color: textColor }}
                        className={getCardClasses(isMobile ? 'w-full py-3 text-xs text-center' : 'px-7 py-4 text-sm text-center')}
                      >
                        <span>Ver Cardápio & Fotos</span>
                      </a>
                    </div>

                    {sec.imageUrl && (
                      <div className="pt-8 max-w-3xl mx-auto">
                        <div style={{ backgroundColor: cardBg }} className={getCardClasses('overflow-hidden relative group')}>
                          <img
                            src={sec.imageUrl}
                            alt={site.companyName}
                            className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                              isMobile ? 'h-56' : 'h-88 sm:h-[420px]'
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white text-xs font-semibold">
                            <span className="font-bold text-sm">{site.companyName}</span>
                            <span className="text-[11px] bg-black/70 px-2.5 py-1 rounded-full border border-white/10 text-zinc-200">
                              📍 {site.city}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              );
            }

            // VARIANT 2: BENTO SHOWCASE
            if (layoutVariant === 'bento') {
              return (
                <section key={sec.id} className={`relative overflow-hidden ${isMobile ? 'py-10 px-4' : 'py-20 px-8'}`}>
                  {theme.glowEffect && (
                    <div 
                      className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
                      style={{ backgroundColor: primaryColor }}
                    />
                  )}

                  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch relative z-10">
                    {/* Main Headline Bento Card */}
                    <div 
                      style={{ backgroundColor: cardBg }}
                      className={getCardClasses(`md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4 ${isMobile ? 'text-center' : 'text-left'}`)}
                    >
                      <div className="space-y-3">
                        {sec.badge && (
                          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{sec.badge}</span>
                          </div>
                        )}

                        <h1 
                          style={{ fontFamily: theme.fontHeading, color: textColor }}
                          className={`font-black tracking-tight leading-tight ${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'}`}
                        >
                          {sec.title || site.companyName}
                        </h1>

                        <p style={{ opacity: 0.85 }} className="text-xs sm:text-sm leading-relaxed">
                          {sec.subtitle || site.tagline}
                        </p>
                      </div>

                      <div className={`flex flex-col sm:flex-row items-center gap-3 pt-2 ${isMobile ? 'justify-center' : ''}`}>
                        <a
                          href={getWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ backgroundColor: primaryColor }}
                          className={getButtonClasses(isMobile ? 'w-full py-3 text-xs text-zinc-950' : 'px-6 py-3.5 text-sm text-zinc-950')}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{sec.buttonText || 'Pedir no WhatsApp'}</span>
                        </a>

                        <a
                          href="#sobre"
                          style={{ color: textColor }}
                          className="text-xs font-bold hover:underline py-2"
                        >
                          Saber Mais →
                        </a>
                      </div>
                    </div>

                    {/* Photo Bento Card */}
                    {sec.imageUrl && (
                      <div 
                        style={{ backgroundColor: cardBg }}
                        className={getCardClasses('md:col-span-5 relative overflow-hidden group min-h-[260px]')}
                      >
                        <img
                          src={sec.imageUrl}
                          alt={site.companyName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-bold flex justify-between items-center">
                          <span>{site.companyName}</span>
                          <span className="bg-black/60 px-2 py-0.5 rounded text-[10px] text-zinc-300">
                            {site.city}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              );
            }

            // DEFAULT: MODERN SPLIT
            return (
              <section key={sec.id} className={`relative overflow-hidden ${isMobile ? 'py-10 px-4' : 'py-20 px-8'}`}>
                {/* Ambient Glow */}
                {theme.glowEffect && (
                  <div 
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: primaryColor }}
                  />
                )}

                <div className={`max-w-5xl mx-auto grid gap-8 items-center ${isMobile ? 'grid-cols-1 text-center' : 'grid-cols-1 md:grid-cols-2 text-left'}`}>
                  <div className="space-y-4 relative z-10">
                    {/* Reputation Badge */}
                    {sec.badge && (
                      <div 
                        style={{ backgroundColor: cardBg }}
                        className={getCardClasses(`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold shadow-sm ${isMobile ? 'mx-auto' : ''}`)}
                      >
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                        </div>
                        <span style={{ color: textColor }}>{sec.badge}</span>
                      </div>
                    )}

                    <h1 
                      style={{ fontFamily: theme.fontHeading, color: textColor }}
                      className={`font-black tracking-tight leading-tight ${
                        isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'
                      }`}
                    >
                      {sec.title || site.companyName}
                    </h1>

                    <p style={{ opacity: 0.85 }} className={`leading-relaxed font-normal ${isMobile ? 'text-xs max-w-sm mx-auto' : 'text-sm sm:text-base max-w-lg'}`}>
                      {sec.subtitle || site.tagline}
                    </p>

                    {/* Dual Action Buttons */}
                    <div className={`flex flex-col sm:flex-row items-center gap-3 pt-2 ${isMobile ? 'justify-center' : ''}`}>
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: primaryColor }}
                        className={getButtonClasses(isMobile ? 'w-full py-3 text-xs text-zinc-950' : 'px-6 py-3.5 text-sm text-zinc-950')}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{sec.buttonText || 'Fazer Pedido no WhatsApp'}</span>
                      </a>

                      <a
                        href="#sobre"
                        style={{ backgroundColor: cardBg, color: textColor }}
                        className={getCardClasses(isMobile ? 'w-full py-2.5 text-xs text-center' : 'px-5 py-3.5 text-sm text-center')}
                      >
                        <span>Conhecer o Espaço</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-70 ml-1 inline" />
                      </a>
                    </div>

                    {/* Trust Badges */}
                    <div className={`flex flex-wrap items-center gap-4 pt-3 text-[11px] opacity-75 ${isMobile ? 'justify-center' : ''}`}>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: accentColor }} />
                        <span>Atendimento Rápido</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: accentColor }} />
                        <span>{site.city}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: accentColor }} />
                        <span>Direto com Proprietário</span>
                      </div>
                    </div>
                  </div>

                  {/* Hero Photography Showcase */}
                  {sec.imageUrl && (
                    <div 
                      style={{ backgroundColor: cardBg }}
                      className={getCardClasses('relative group overflow-hidden shadow-2xl')}
                    >
                      <img
                        src={sec.imageUrl}
                        alt={site.companyName}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                          isMobile ? 'h-52' : 'h-80 sm:h-96'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                        <span className="truncate">{site.companyName}</span>
                        <span className="text-[10px] bg-black/70 px-2 py-0.5 rounded-full border border-white/10 text-zinc-300">
                          {site.city}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );



          // ABOUT / TRAJECTORY
          case 'about':
            return (
              <section id="sobre" key={sec.id} style={{ borderColor: 'rgba(255,255,255,0.08)' }} className={`border-t ${isMobile ? 'py-10 px-4' : 'py-16 px-8'}`}>
                <div className={`max-w-5xl mx-auto grid gap-8 items-center ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {sec.imageUrl && (
                    <div 
                      style={{ backgroundColor: cardBg, borderColor: 'rgba(255,255,255,0.1)' }}
                      className={`overflow-hidden rounded-3xl border group ${isMobile ? 'order-2' : 'order-2 md:order-1'}`}
                    >
                      <img
                        src={sec.imageUrl}
                        alt="Sobre Nós"
                        className={`rounded-3xl w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                          isMobile ? 'h-48' : 'h-72 sm:h-80'
                        }`}
                      />
                    </div>
                  )}

                  <div className={`space-y-3.5 ${isMobile ? 'order-1 text-center' : 'order-1 md:order-2 text-left'}`}>
                    {sec.badge && (
                      <span 
                        style={{ color: accentColor }}
                        className="text-[11px] font-extrabold uppercase tracking-widest block"
                      >
                        {sec.badge}
                      </span>
                    )}

                    <h2 
                      style={{ fontFamily: theme.fontHeading, color: textColor }}
                      className={`font-extrabold tracking-tight ${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}`}
                    >
                      {sec.title}
                    </h2>

                    <p style={{ opacity: 0.85 }} className={`leading-relaxed font-normal ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {sec.content}
                    </p>

                    <div className="pt-2">
                      <a
                        href={getWhatsAppUrl(`Olá! Vi o espaço da ${site.companyName} e gostaria de tirar uma dúvida.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: accentColor }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline transition-all"
                      >
                        <span>{sec.buttonText || 'Falar Diretamente Conosco'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            );

          // HIGHLIGHTS / SPECIALTIES / MENU
          case 'menu':
          case 'services':
            return (
              <section id="destaques" key={sec.id} style={{ borderColor: 'rgba(255,255,255,0.08)' }} className={`border-t ${isMobile ? 'py-10 px-4' : 'py-16 px-8'}`}>
                <div className="max-w-5xl mx-auto text-center space-y-2 mb-8">
                  {sec.badge && (
                    <span 
                      style={{ color: accentColor }}
                      className="text-[11px] font-extrabold uppercase tracking-widest block"
                    >
                      {sec.badge}
                    </span>
                  )}
                  <h2 
                    style={{ fontFamily: theme.fontHeading, color: textColor }}
                    className={`font-black tracking-tight ${isMobile ? 'text-xl' : 'text-2xl sm:text-4xl'}`}
                  >
                    {sec.title}
                  </h2>
                  {sec.subtitle && (
                    <p style={{ opacity: 0.8 }} className={`max-w-xl mx-auto ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {sec.subtitle}
                    </p>
                  )}
                </div>

                <div className={`max-w-5xl mx-auto grid gap-4 ${
                  isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}>

                  {sec.items?.map(item => (
                    <div
                      key={item.id}
                      style={{ backgroundColor: cardBg }}
                      className={getCardClasses('p-5 text-left flex flex-col justify-between group')}
                    >
                      <div>
                        {item.tag && (
                          <span 
                            style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: accentColor, borderColor: 'rgba(16, 185, 129, 0.3)' }}
                            className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 border"
                          >
                            {item.tag}
                          </span>
                        )}
                        <h3 style={{ color: textColor }} className="font-bold text-sm sm:text-base mb-1 group-hover:opacity-90 transition-opacity">
                          {item.title}
                        </h3>
                        <p style={{ opacity: 0.8 }} className="text-xs leading-relaxed mb-4">{item.description}</p>
                      </div>

                      <div style={{ borderColor: 'rgba(255,255,255,0.08)' }} className="flex items-center justify-between pt-3 border-t">
                        {item.price ? (
                          <span style={{ color: accentColor }} className="text-xs sm:text-sm font-black">{item.price}</span>
                        ) : (
                          <span style={{ opacity: 0.65 }} className="text-[11px] font-semibold">Sob Encomenda / WhatsApp</span>
                        )}
                        <a 
                          href={getWhatsAppUrl(`Olá! Gostaria de mais informações sobre "${item.title}" no ${site.companyName}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ backgroundColor: primaryColor }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-950 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 shadow-sm"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Pedir / Agendar</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Custom Order Callout */}
                <div 
                  style={{ backgroundColor: cardBg }}
                  className={getCardClasses('max-w-xl mx-auto mt-8 p-4 text-center space-y-2')}
                >
                  <p style={{ opacity: 0.85 }} className="text-xs">
                    Procurando uma opção personalizada ou deseja receber o cardápio completo do dia?
                  </p>
                  <a
                    href={getWhatsAppUrl(`Olá! Gostaria de consultar o catálogo/cardápio completo do ${site.companyName}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: accentColor }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
                  >
                    <span>Solicitar no WhatsApp</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </section>
            );

          // TESTIMONIALS
          case 'testimonials':
            return (
              <section id="depoimentos" key={sec.id} style={{ borderColor: 'rgba(255,255,255,0.08)' }} className={`border-t ${isMobile ? 'py-10 px-4' : 'py-16 px-8'}`}>
                <div className="max-w-5xl mx-auto text-center space-y-2 mb-8">
                  {sec.badge && (
                    <span style={{ color: accentColor }} className="text-[11px] font-extrabold uppercase tracking-widest block">
                      {sec.badge}
                    </span>
                  )}
                  <h2 style={{ fontFamily: theme.fontHeading, color: textColor }} className={`font-black tracking-tight ${isMobile ? 'text-xl' : 'text-2xl sm:text-4xl'}`}>
                    {sec.title}
                  </h2>
                  {sec.subtitle && (
                    <p style={{ opacity: 0.8 }} className={`max-w-xl mx-auto ${isMobile ? 'text-xs' : 'text-sm'}`}>{sec.subtitle}</p>
                  )}
                </div>

                <div className={`max-w-5xl mx-auto grid gap-4 ${
                  isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3'
                }`}>
                  {sec.items?.map(t => (
                    <div
                      key={t.id}
                      style={{ backgroundColor: cardBg }}
                      className={getCardClasses('p-5 text-left flex flex-col justify-between')}
                    >
                      <div>
                        <div className="flex items-center gap-1 text-amber-400 mb-2.5">
                          {[...Array(t.rating || 5)].map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <p style={{ opacity: 0.9 }} className="text-xs italic leading-relaxed mb-4">"{t.description}"</p>
                      </div>
                      <div style={{ borderColor: 'rgba(255,255,255,0.08)' }} className="flex items-center gap-2.5 pt-2.5 border-t">
                        <div 
                          style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: textColor }}
                          className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs"
                        >
                          {(t.author || 'C').charAt(0)}
                        </div>
                        <div>
                          <p style={{ color: textColor }} className="font-bold text-xs">{t.author || 'Cliente Verificado'}</p>
                          <p style={{ opacity: 0.6 }} className="text-[10px]">{t.role || 'Avaliação no Google Maps'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );

          // BENEFITS / DIFFERENTIATORS
          case 'benefits':
            return (
              <section id="beneficios" key={sec.id} style={{ borderColor: 'rgba(255,255,255,0.08)' }} className={`border-t ${isMobile ? 'py-10 px-4' : 'py-16 px-8'}`}>
                <div className="max-w-5xl mx-auto text-center space-y-2 mb-8">
                  <h2 style={{ fontFamily: theme.fontHeading, color: textColor }} className={`font-black tracking-tight ${isMobile ? 'text-xl' : 'text-2xl sm:text-4xl'}`}>
                    {sec.title}
                  </h2>
                </div>

                <div className={`max-w-5xl mx-auto grid gap-4 ${
                  isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3'
                }`}>
                  {sec.items?.map(b => (
                    <div
                      key={b.id}
                      style={{ backgroundColor: cardBg }}
                      className={getCardClasses('p-5 text-left')}
                    >
                      <div 
                        style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: accentColor, borderColor: 'rgba(16, 185, 129, 0.3)' }}
                        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 border"
                      >
                        <Award className="w-4 h-4" />
                      </div>
                      <h3 style={{ color: textColor }} className="font-bold text-xs sm:text-sm mb-1">{b.title}</h3>
                      <p style={{ opacity: 0.8 }} className="text-xs leading-relaxed">{b.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );

          // FAQ
          case 'faq':
            return (
              <section key={sec.id} style={{ borderColor: 'rgba(255,255,255,0.08)' }} className={`border-t ${isMobile ? 'py-10 px-4' : 'py-16 px-8'}`}>
                <div className="max-w-3xl mx-auto text-center space-y-2 mb-8">
                  <h2 style={{ fontFamily: theme.fontHeading, color: textColor }} className={`font-black tracking-tight ${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>
                    {sec.title || 'Dúvidas Frequentes'}
                  </h2>
                </div>

                <div className="max-w-3xl mx-auto space-y-2.5">
                  {sec.items?.map(f => (
                    <details 
                      key={f.id} 
                      style={{ backgroundColor: cardBg }}
                      className={getCardClasses('p-4 group cursor-pointer text-left')}
                    >
                      <summary style={{ color: textColor }} className="font-bold text-xs flex items-center justify-between list-none">
                        <span>{f.title}</span>
                        <ChevronDown className="w-3.5 h-3.5 opacity-60 group-open:rotate-180 transition-transform" />
                      </summary>
                      <p style={{ opacity: 0.75, borderColor: 'rgba(255,255,255,0.08)' }} className="text-xs mt-2.5 leading-relaxed pt-2.5 border-t">
                        {f.description}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            );

          // LOCATION & CONTACT

          case 'contact':
            return (
              <section id="contato" key={sec.id} style={{ borderColor: 'rgba(255,255,255,0.08)' }} className={`border-t ${isMobile ? 'py-10 px-4' : 'py-16 px-8'}`}>
                <div className={`max-w-4xl mx-auto grid gap-8 items-center text-left ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  <div className="space-y-4">
                    <div>
                      <h2 style={{ fontFamily: theme.fontHeading, color: textColor }} className={`font-black tracking-tight mb-1.5 ${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>
                        {sec.title}
                      </h2>
                      <p style={{ opacity: 0.75 }} className="text-xs">{sec.subtitle}</p>
                    </div>

                    <div style={{ opacity: 0.9 }} className="space-y-3 text-xs">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
                        <div>
                          <strong style={{ color: textColor }} className="block">Endereço:</strong>
                          <span>{site.address || site.city}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
                        <div>
                          <strong style={{ color: textColor }} className="block">WhatsApp / Telefone:</strong>
                          <span>{site.whatsapp || site.phone || '(31) 98000-0000'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
                        <div>
                          <strong style={{ color: textColor }} className="block">Horário de Atendimento:</strong>
                          <span>Segunda a Sábado das 08h às 20h</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ backgroundColor: cardBg, borderColor: 'rgba(255,255,255,0.12)', color: textColor }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold border px-3.5 py-2 rounded-xl hover:brightness-125 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir no Google Maps & Ver Rota</span>
                    </a>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const target = e.currentTarget;
                      const name = (target.elements.namedItem('userName') as HTMLInputElement)?.value || '';
                      const userMsg = (target.elements.namedItem('userMsg') as HTMLTextAreaElement)?.value || '';
                      const msg = `Olá! Meu nome é ${name}. Gostaria de informações sobre o ${site.companyName}: ${userMsg}`;
                      window.open(getWhatsAppUrl(msg), '_blank');
                    }}
                    style={{ backgroundColor: cardBg, borderColor: 'rgba(255,255,255,0.12)' }}
                    className="p-5 sm:p-6 rounded-3xl border space-y-3 shadow-2xl"
                  >
                    <h3 style={{ color: textColor }} className="font-bold text-sm flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" style={{ color: accentColor }} />
                      <span>Fale com o Atendente</span>
                    </h3>
                    <input
                      name="userName"
                      type="text"
                      placeholder="Seu Nome *"
                      required
                      style={{ backgroundColor: 'rgba(0,0,0,0.25)', borderColor: 'rgba(255,255,255,0.1)', color: textColor }}
                      className="w-full p-2.5 rounded-xl border text-xs placeholder:opacity-40 focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      name="userPhone"
                      type="text"
                      placeholder="Seu WhatsApp (Opcional)"
                      style={{ backgroundColor: 'rgba(0,0,0,0.25)', borderColor: 'rgba(255,255,255,0.1)', color: textColor }}
                      className="w-full p-2.5 rounded-xl border text-xs placeholder:opacity-40 focus:outline-none focus:border-emerald-500"
                    />
                    <textarea
                      name="userMsg"
                      placeholder="Qual produto ou serviço você tem interesse?"
                      rows={2}
                      style={{ backgroundColor: 'rgba(0,0,0,0.25)', borderColor: 'rgba(255,255,255,0.1)', color: textColor }}
                      className="w-full p-2.5 rounded-xl border text-xs placeholder:opacity-40 focus:outline-none focus:border-emerald-500 resize-none"
                    />
                    <button
                      type="submit"
                      style={{ backgroundColor: primaryColor }}
                      className="w-full py-3 rounded-xl text-xs font-black text-zinc-950 shadow-md hover:brightness-110 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{sec.buttonText || 'Enviar no WhatsApp'}</span>
                    </button>
                  </form>
                </div>
              </section>
            );

          // FOOTER
          case 'footer':
            return (
              <footer 
                key={sec.id} 
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                className="py-6 px-4 border-t text-center text-xs opacity-60"
              >
                <p>{sec.content || `© ${new Date().getFullYear()} ${site.companyName}. Todos os direitos reservados.`}</p>
              </footer>
            );

          default:
            return null;
        }
      })}

      {/* Free Plan Watermark Badge with Logo and X button */}
      {isFreePlan && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-zinc-950/95 border border-zinc-700/80 text-zinc-200 py-1.5 px-3 rounded-full shadow-2xl backdrop-blur-md text-[11px] font-semibold animate-fade-in select-none group">
          <a 
            href="https://prospectly-tau.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
            title="Criado com Prospectly • Clique para conhecer"
          >
            {/* Prospectly Logo Monogram */}
            <div className="w-5 h-5 rounded-md bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-inner relative overflow-hidden shrink-0">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white">
                <path d="M8 6V26" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M8 6H16.5C19.5376 6 22 8.23858 22 11C22 13.7614 19.5376 16 16.5 16H8" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M24 16.5C21.5 14.5 16 14.5 14 17C12 19.5 13 22 17 22.5C21 23 23.5 24 23 26.5C22.5 29 18 29.5 13 28" stroke="#e4e4e7" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span>edit by <strong className="text-white font-bold hover:underline">Prospectly</strong></span>
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toast.info('Para retirar a marca d\'água deste site e conectar seu domínio próprio, assine o plano PRO ou FULL!');
              if (onNavigate) {
                onNavigate('subscription');
              } else {
                window.open('https://prospectly-tau.vercel.app', '_blank');
              }
            }}
            className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-[10px] ml-1"
            title="Remover marca d'água (Requer Plano PRO/FULL)"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

