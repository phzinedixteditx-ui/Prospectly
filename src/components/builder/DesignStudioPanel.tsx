import React, { useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { useAuth } from '../../context/AuthContext';
import { SiteTheme, SiteSection, SiteSectionItem } from '../../types';
import { 
  Palette, 
  Type, 
  Sparkles, 
  Layers, 
  Crown, 
  Sliders, 
  Check, 
  RotateCcw, 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  Lock, 
  Zap, 
  Layout,
  MousePointerClick,
  Shapes,
  Sparkle,
  Edit3,
  Trash2,
  Plus,
  Phone,
  MapPin,
  Star,
  FileText,
  ChevronRight,
  PlusCircle,
  Building2,
  Image as ImageIcon,
  MessageSquare,
  Send,
  Copy,
  ExternalLink,
  Share2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

// 16+ Curated Themes with distinct layout aesthetics (Majority FREE!)
export const PRESET_THEMES: (SiteTheme & { description: string; nicheTag: string; category: string })[] = [
  {
    id: 'theme_obsidian_gold',
    name: 'Obsidian & Gold Luxury',
    description: 'Fundo preto profundo (#090a10), detalhes dourados nobres, tipografia clássica e botões com brilho.',
    nicheTag: 'Luxo & Alta Gastronomia',
    category: 'dark',
    isPremium: true,
    planRequired: 'pro',
    backgroundColor: '#090a10',
    cardBackground: '#12141f',
    primaryColor: '#f59e0b',
    accentColor: '#fbbf24',
    textColor: '#f8fafc',
    fontHeading: 'Cinzel',
    fontBody: 'Plus Jakarta Sans',
    borderRadius: 'rounded-2xl',
    cardStyle: 'glass',
    animation: 'slide-up',
    glowEffect: true,
    layoutVariant: 'split',
    buttonStyle: 'glow'
  },
  {
    id: 'theme_italian_trattoria',
    name: 'Royal Italian Trattoria',
    description: 'Design editorial nobre para restaurantes italianos, pizzarias gourmet e bistrôs tradicionais.',
    nicheTag: 'Restaurantes & Trattorias',
    category: 'dark',
    isPremium: true,
    planRequired: 'pro',
    backgroundColor: '#120a07',
    cardBackground: '#20120d',
    primaryColor: '#e0533c',
    accentColor: '#f59e0b',
    textColor: '#fef3c7',
    fontHeading: 'Cormorant Garamond',
    fontBody: 'Outfit',
    borderRadius: 'rounded-xl',
    cardStyle: 'shadow3d',
    animation: 'slide-up',
    glowEffect: true,
    layoutVariant: 'editorial',
    buttonStyle: 'rounded'
  },
  {
    id: 'theme_emerald_vitality',
    name: 'Emerald Vitality & Bio',
    description: 'Verde esmeralda dinâmico com layout em blocos e foco em confiança e saúde.',
    nicheTag: 'Saúde & Confeitaria Bio',
    category: 'dark',
    isPremium: false,
    planRequired: 'free',
    backgroundColor: '#06130d',
    cardBackground: '#0b2017',
    primaryColor: '#10b981',
    accentColor: '#34d399',
    textColor: '#f0fdf4',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans',
    borderRadius: 'rounded-2xl',
    cardStyle: 'solid',
    animation: 'fade',
    glowEffect: true,
    layoutVariant: 'bento',
    buttonStyle: 'pill'
  },
  {
    id: 'theme_ocean_tech',
    name: 'Ocean Tech & Digital',
    description: 'Azul corporativo ultra moderno com tipografia geométrica e glassmorphism suave.',
    nicheTag: 'Corporativo & B2B',
    category: 'dark',
    isPremium: false,
    planRequired: 'free',
    backgroundColor: '#070d19',
    cardBackground: '#0e182a',
    primaryColor: '#3b82f6',
    accentColor: '#60a5fa',
    textColor: '#f8fafc',
    fontHeading: 'Space Grotesk',
    fontBody: 'Inter',
    borderRadius: 'rounded-xl',
    cardStyle: 'glass',
    animation: 'slide-up',
    glowEffect: true,
    layoutVariant: 'split',
    buttonStyle: 'rounded'
  },
  {
    id: 'theme_ruby_wine',
    name: 'Ruby Velvet & Steakhouse',
    description: 'Bordô aveludado, sombras 3D intensas e estética de carnes nobres e cartas de vinhos.',
    nicheTag: 'Churrascarias & Wine Bar',
    category: 'dark',
    isPremium: false,
    planRequired: 'free',
    backgroundColor: '#140509',
    cardBackground: '#220b10',
    primaryColor: '#e11d48',
    accentColor: '#fb7185',
    textColor: '#fff1f2',
    fontHeading: 'Playfair Display',
    fontBody: 'Plus Jakarta Sans',
    borderRadius: 'rounded-2xl',
    cardStyle: 'shadow3d',
    animation: 'slide-up',
    glowEffect: true,
    layoutVariant: 'split',
    buttonStyle: 'glow'
  },
  {
    id: 'theme_warm_espresso',
    name: 'Warm Espresso & Bakery',
    description: 'Tons aconchegantes de café espresso, caramelo tostado e tipografia artesanal.',
    nicheTag: 'Padarias & Cafeterias',
    category: 'dark',
    isPremium: false,
    planRequired: 'free',
    backgroundColor: '#130e0a',
    cardBackground: '#221913',
    primaryColor: '#d97706',
    accentColor: '#f59e0b',
    textColor: '#fef3c7',
    fontHeading: 'Cormorant Garamond',
    fontBody: 'Lora',
    borderRadius: 'rounded-2xl',
    cardStyle: 'glass',
    animation: 'fade',
    glowEffect: true,
    layoutVariant: 'editorial',
    buttonStyle: 'rounded'
  },
  {
    id: 'theme_cyber_purple',
    name: 'Cyber Neon & Street',
    description: 'Roxo vibrante, neon pulsante e tipografia vanguardista para estúdios e barbearias jovens.',
    nicheTag: 'Barbearias & Tattoo',
    category: 'dark',
    isPremium: false,
    planRequired: 'free',
    backgroundColor: '#0c0716',
    cardBackground: '#170e2a',
    primaryColor: '#a855f7',
    accentColor: '#c084fc',
    textColor: '#faf5ff',
    fontHeading: 'Syne',
    fontBody: 'Space Grotesk',
    borderRadius: 'rounded-xl',
    cardStyle: 'neon',
    animation: 'zoom',
    glowEffect: true,
    layoutVariant: 'bento',
    buttonStyle: 'sharp'
  },
  {
    id: 'theme_rose_gold_glam',
    name: 'Rose Gold & Blush Glam',
    description: 'Elegância minimalista em ouro rosê e champagne para clínicas de estética e salões VIP.',
    nicheTag: 'Estética & Salões VIP',
    category: 'dark',
    isPremium: true,
    planRequired: 'pro',
    backgroundColor: '#140c11',
    cardBackground: '#24151e',
    primaryColor: '#fb7185',
    accentColor: '#fda4af',
    textColor: '#fff1f2',
    fontHeading: 'Playfair Display',
    fontBody: 'Outfit',
    borderRadius: 'rounded-2xl',
    cardStyle: 'glass',
    animation: 'fade',
    glowEffect: true,
    layoutVariant: 'split',
    buttonStyle: 'pill'
  },
  {
    id: 'theme_tokyo_sushi',
    name: 'Tokyo Midnight Sushi',
    description: 'Minimalismo escuro oriental com acentos carmim e tipografia moderna de alto impacto.',
    nicheTag: 'Restaurantes Japoneses',
    category: 'dark',
    isPremium: false,
    planRequired: 'free',
    backgroundColor: '#0a0a0c',
    cardBackground: '#141418',
    primaryColor: '#ef4444',
    accentColor: '#f87171',
    textColor: '#f4f4f5',
    fontHeading: 'Syne',
    fontBody: 'Plus Jakarta Sans',
    borderRadius: 'rounded-lg',
    cardStyle: 'flat',
    animation: 'slide-up',
    glowEffect: true,
    layoutVariant: 'editorial',
    buttonStyle: 'sharp'
  },
  {
    id: 'theme_sapphire_clinic',
    name: 'Midnight Sapphire Clinic',
    description: 'Azul meia-noite e platina com layout imponente para odontologia e medicina avançada.',
    nicheTag: 'Odontologia & Clínicas',
    category: 'dark',
    isPremium: false,
    planRequired: 'free',
    backgroundColor: '#040914',
    cardBackground: '#09152b',
    primaryColor: '#0ea5e9',
    accentColor: '#38bdf8',
    textColor: '#f0f9ff',
    fontHeading: 'Montserrat',
    fontBody: 'Inter',
    borderRadius: 'rounded-2xl',
    cardStyle: 'glass',
    animation: 'slide-up',
    glowEffect: true,
    layoutVariant: 'split',
    buttonStyle: 'rounded'
  },
  {
    id: 'theme_vintage_barber',
    name: 'Vintage Barber & Steel',
    description: 'Estética rústica de barbearia tradicional com bordas retas e tons de aço e bronze.',
    nicheTag: 'Barbearia Vintage',
    category: 'dark',
    isPremium: false,
    planRequired: 'free',
    backgroundColor: '#11100f',
    cardBackground: '#1c1b18',
    primaryColor: '#b45309',
    accentColor: '#d97706',
    textColor: '#fef3c7',
    fontHeading: 'Cinzel',
    fontBody: 'Space Grotesk',
    borderRadius: 'rounded-none',
    cardStyle: 'solid',
    animation: 'fade',
    glowEffect: false,
    layoutVariant: 'editorial',
    buttonStyle: 'sharp'
  },
  {
    id: 'theme_hyper_gym',
    name: 'Hyper Neon Fitness Gym',
    description: 'Layout enérgico de alta conversão com verde limão neon e tipografia imponente.',
    nicheTag: 'Academias & Crossfit',
    category: 'dark',
    isPremium: false,
    planRequired: 'free',
    backgroundColor: '#090a0c',
    cardBackground: '#121419',
    primaryColor: '#84cc16',
    accentColor: '#a3e635',
    textColor: '#f7fee7',
    fontHeading: 'Syne',
    fontBody: 'Montserrat',
    borderRadius: 'rounded-xl',
    cardStyle: 'neon',
    animation: 'zoom',
    glowEffect: true,
    layoutVariant: 'bento',
    buttonStyle: 'sharp'
  },
  {
    id: 'theme_nordic_forest',
    name: 'Nordic Forest & Copper',
    description: 'Verde floresta profundo com cobre nobre para escritórios de arquitetura e imóveis.',
    nicheTag: 'Arquitetura & Imóveis',
    category: 'dark',
    isPremium: false,
    planRequired: 'free',
    backgroundColor: '#08120d',
    cardBackground: '#0f1f18',
    primaryColor: '#c2410c',
    accentColor: '#ea580c',
    textColor: '#f0fdf4',
    fontHeading: 'Outfit',
    fontBody: 'DM Sans',
    borderRadius: 'rounded-2xl',
    cardStyle: 'shadow3d',
    animation: 'slide-up',
    glowEffect: true,
    layoutVariant: 'split',
    buttonStyle: 'rounded'
  },
  {
    id: 'theme_clean_minimal',
    name: 'Minimal Studio Editorial',
    description: 'Fundo claro, espaçamento generoso e sofisticação editorial com tipografia nítida.',
    nicheTag: 'Fotografia & Estúdio',
    category: 'light',
    isPremium: false,
    planRequired: 'free',
    backgroundColor: '#ffffff',
    cardBackground: '#f8fafc',
    primaryColor: '#0f172a',
    accentColor: '#475569',
    textColor: '#0f172a',
    fontHeading: 'Syne',
    fontBody: 'Inter',
    borderRadius: 'rounded-xl',
    cardStyle: 'flat',
    animation: 'fade',
    glowEffect: false,
    layoutVariant: 'minimal',
    buttonStyle: 'pill'
  },
  {
    id: 'theme_pastel_bakery',
    name: 'Pastel Sweet Confectionery',
    description: 'Design doce e acolhedor em tons pastéis de pêssego e baunilha para confeitarias e bolos.',
    nicheTag: 'Bolos & Docerias',
    category: 'light',
    isPremium: false,
    planRequired: 'free',
    backgroundColor: '#fffdfa',
    cardBackground: '#fef7ee',
    primaryColor: '#f97316',
    accentColor: '#fb923c',
    textColor: '#431407',
    fontHeading: 'Poppins',
    fontBody: 'Outfit',
    borderRadius: 'rounded-2xl',
    cardStyle: 'glass',
    animation: 'fade',
    glowEffect: false,
    layoutVariant: 'split',
    buttonStyle: 'pill'
  },
  {
    id: 'theme_executive_law',
    name: 'Executive Law & Finance',
    description: 'Design sóbrio, requintado e formal com tipografia serifada e layout clássico centrado.',
    nicheTag: 'Advocacia & Contabilidade',
    category: 'dark',
    isPremium: true,
    planRequired: 'pro',
    backgroundColor: '#080a0f',
    cardBackground: '#10141e',
    primaryColor: '#d4af37',
    accentColor: '#e5c158',
    textColor: '#f8fafc',
    fontHeading: 'Playfair Display',
    fontBody: 'Plus Jakarta Sans',
    borderRadius: 'rounded-lg',
    cardStyle: 'shadow3d',
    animation: 'slide-up',
    glowEffect: true,
    layoutVariant: 'editorial',
    buttonStyle: 'rounded'
  }
];

export const FONT_OPTIONS = [
  // PRO Premium Fonts
  { name: 'Cinzel', family: 'Cinzel', style: 'Luxo Clássico & Nobre', isPro: true },
  { name: 'Playfair Display', family: 'Playfair Display', style: 'Editorial & Sofisticado', isPro: true },
  { name: 'Cormorant Garamond', family: 'Cormorant Garamond', style: 'Artesanal & Nobre', isPro: true },
  { name: 'Syne', family: 'Syne', style: 'Impacto & Vanguarda', isPro: true },
  { name: 'Space Grotesk', family: 'Space Grotesk', style: 'Tecnológico & Ousado', isPro: true },
  { name: 'Outfit', family: 'Outfit', style: 'Geométrico & Premium', isPro: true },
  // FREE High Performance Fonts
  { name: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans', style: 'Moderno & Conversão', isPro: false },
  { name: 'Inter', family: 'Inter', style: 'Legibilidade Máxima', isPro: false },
  { name: 'Montserrat', family: 'Montserrat', style: 'Varejo & Comercial', isPro: false },
  { name: 'Poppins', family: 'Poppins', style: 'Amigável & Redondo', isPro: false },
  { name: 'Lora', family: 'Lora', style: 'Elegante & Serifado', isPro: false },
  { name: 'DM Sans', family: 'DM Sans', style: 'Minimalista & Limpo', isPro: false }
];

export const COLOR_SWATCHES = [
  { label: 'Ouro Obsidian', primary: '#f59e0b', accent: '#fbbf24', bg: '#090a10', card: '#12141f' },
  { label: 'Trattoria Nobre', primary: '#e0533c', accent: '#f59e0b', bg: '#120a07', card: '#20120d' },
  { label: 'Esmeralda Vital', primary: '#10b981', accent: '#34d399', bg: '#06130d', card: '#0b2017' },
  { label: 'Azul Safira Tech', primary: '#3b82f6', accent: '#60a5fa', bg: '#070d19', card: '#0e182a' },
  { label: 'Rubi Steakhouse', primary: '#e11d48', accent: '#fb7185', bg: '#140509', card: '#220b10' },
  { label: 'Espresso Baunilha', primary: '#d97706', accent: '#f59e0b', bg: '#130e0a', card: '#221913' },
  { label: 'Cyber Violeta', primary: '#a855f7', accent: '#c084fc', bg: '#0c0716', card: '#170e2a' },
  { label: 'Rose Gold Glam', primary: '#fb7185', accent: '#fda4af', bg: '#140c11', card: '#24151e' },
  { label: 'Tokyo Carmim', primary: '#ef4444', accent: '#f87171', bg: '#0a0a0c', card: '#141418' },
  { label: 'Neon Gym Limão', primary: '#84cc16', accent: '#a3e635', bg: '#090a0c', card: '#121419' }
];

export const DesignStudioPanel: React.FC = () => {
  const { 
    site, 
    updateTheme, 
    updateSiteInfo, 
    updateSection, 
    updateSectionItem, 
    addSectionItem, 
    removeSectionItem, 
    toggleSection, 
    reorderSections, 
    addSection,
    removeSection,
    undoLastChange, 
    canUndo
  } = useBuilder();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'content' | 'whatsapp' | 'presets' | 'layout' | 'colors' | 'fonts' | 'effects' | 'sections'>('content');
  const [expandedSection, setExpandedSection] = useState<string | null>('general_info');
  const [proModalOpen, setProModalOpen] = useState<{ open: boolean; featureName: string }>({ open: false, featureName: '' });
  const toast = useToast();

  const defaultWhatsAppPitch = `Olá, equipe do {nome_empresa}! Tudo bem? 👋

Estava pesquisando referências de {nicho} aqui em {cidade} e vi que vocês têm excelentes avaliações no Google! ⭐ Parabéns de verdade pelo trabalho!

Notei que muitos novos clientes pesquisam pelo celular e querem ver os serviços/produtos e chamar direto no WhatsApp.

Por isso, preparei uma apresentação exclusiva de como ficaria um site moderno e focado em vendas para o {nome_empresa}:

👉 {link_site}

Dá uma olhada de 10 segundos sem nenhum compromisso! O que acharam?`;

  const [whatsappPitch, setWhatsappPitch] = useState(site?.customWhatsAppPitch || defaultWhatsAppPitch);
  const [leadButtonMessage, setLeadButtonMessage] = useState(site?.customLeadWhatsAppMessage || 'Olá! Vi o site de vocês e gostaria de mais informações / fazer um pedido.');
  const [whatsappPhone, setWhatsappPhone] = useState(site?.whatsapp || site?.phone || '');

  if (!site) return null;

  const currentTheme = site.theme;
  const isPaidUser = user?.plan === 'pro' || user?.plan === 'full';

  const handleApplyPreset = (preset: typeof PRESET_THEMES[0]) => {
    if (preset.isPremium && !isPaidUser) {
      setProModalOpen({ open: true, featureName: `Tema PRO: ${preset.name}` });
      toast.error(`O tema "${preset.name}" é exclusivo dos planos PRO e FULL!`);
      return;
    }
    updateTheme(preset);
    toast.success(`Tema "${preset.name}" aplicado! Layout e estilo atualizados.`);
  };

  const handleApplyFont = (font: typeof FONT_OPTIONS[0]) => {
    if (font.isPro && !isPaidUser) {
      setProModalOpen({ open: true, featureName: `Fonte PRO: ${font.name}` });
      toast.error(`A fonte "${font.name}" é exclusiva dos planos PRO e FULL!`);
      return;
    }
    updateTheme({ fontHeading: font.family });
    toast.success(`Fonte de título "${font.name}" aplicada!`);
  };

  const handleColorChange = (key: keyof SiteTheme, value: string) => {
    updateTheme({ [key]: value });
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const sorted = [...site.sections].sort((a, b) => a.order - b.order);
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sorted.length) return;

    const currentOrder = sorted[index].order;
    sorted[index].order = sorted[targetIndex].order;
    sorted[targetIndex].order = currentOrder;

    reorderSections(sorted);
    toast.success('Ordem das seções atualizada!');
  };

  const handleAddNewItem = (sec: SiteSection) => {
    const id = 'item_' + Date.now();
    if (sec.type === 'menu' || sec.type === 'services' || sec.type === 'products') {
      addSectionItem(sec.id, {
        id,
        title: 'Novo Prato / Serviço Especial',
        description: 'Descrição completa dos ingredientes ou benefícios deste serviço.',
        price: 'R$ 49,90',
        tag: 'Destaque'
      });
    } else if (sec.type === 'testimonials') {
      addSectionItem(sec.id, {
        id,
        author: 'Novo Cliente Satisfeito',
        role: 'Avaliação no Google',
        description: 'Atendimento excepcional e qualidade impecável. Recomendo muito!',
        rating: 5
      });
    } else if (sec.type === 'benefits') {
      addSectionItem(sec.id, {
        id,
        title: 'Novo Diferencial de Alta Qualidade',
        description: 'Explique por que seu estabelecimento é a melhor escolha da região.'
      });
    } else if (sec.type === 'faq') {
      addSectionItem(sec.id, {
        id,
        title: 'Qual é o prazo ou forma de atendimento?',
        description: 'Atendemos presencialmente e recebemos pedidos rápidos pelo WhatsApp com entrega expressa.'
      });
    } else {
      addSectionItem(sec.id, {
        id,
        title: 'Novo Elemento',
        description: 'Conteúdo informativo sobre este elemento.'
      });
    }
  };

  const handleAddNewSection = (type: 'faq' | 'testimonials' | 'benefits' | 'menu') => {
    const existing = site.sections.find(s => s.type === type);
    if (existing) {
      if (!existing.enabled) {
        toggleSection(existing.id);
        toast.success(`Seção de ${type.toUpperCase()} reativada!`);
      } else {
        toast.info(`A seção de ${type.toUpperCase()} já está presente no site.`);
      }
      return;
    }

    const nextOrder = site.sections.length > 0 ? Math.max(...site.sections.map(s => s.order)) + 1 : 1;
    let newSec: SiteSection;

    if (type === 'faq') {
      newSec = {
        id: 'faq_' + Date.now(),
        type: 'faq',
        title: 'Perguntas Frequentes',
        subtitle: 'Tire suas dúvidas antes de fazer seu pedido ou agendamento',
        enabled: true,
        order: nextOrder,
        items: [
          { id: 'f1', title: 'Como faço para agendar ou pedir?', description: 'Basta clicar em qualquer botão de WhatsApp para falar direto conosco.' },
          { id: 'f2', title: 'Quais formas de pagamento são aceitas?', description: 'Aceitamos Pix, cartões de crédito/débito e dinheiro.' }
        ]
      };
    } else if (type === 'testimonials') {
      newSec = {
        id: 'test_' + Date.now(),
        type: 'testimonials',
        title: 'O Que Nossos Clientes Dizem',
        subtitle: 'Avaliações reais de clientes atendidos com nota máxima no Google',
        badge: '⭐ 5.0 no Google',
        enabled: true,
        order: nextOrder,
        items: [
          { id: 't1', author: 'Carlos Henrique', role: 'Cliente no Google Maps', description: 'Experiência impecável, comida maravilhosa e atendimento rápido.', rating: 5 },
          { id: 't2', author: 'Mariana Costa', role: 'Cliente no Google Maps', description: 'O melhor estabelecimento da cidade! Super recomendo.', rating: 5 }
        ]
      };
    } else if (type === 'benefits') {
      newSec = {
        id: 'ben_' + Date.now(),
        type: 'benefits',
        title: 'Por Que Escolher Nosso Estabelecimento',
        subtitle: 'Compromisso inegociável com qualidade e satisfação',
        enabled: true,
        order: nextOrder,
        items: [
          { id: 'b1', title: 'Atendimento Rápido e Humano', description: 'Sem robôs complicados, você fala direto pelo WhatsApp.' },
          { id: 'b2', title: 'Ingredientes e Produtos Selecionados', description: 'Trabalhamos apenas com matéria-prima de primeira linha.' }
        ]
      };
    } else {
      newSec = {
        id: 'menu_' + Date.now(),
        type: 'menu',
        title: 'Nossas Especialidades',
        subtitle: 'Os pratos e serviços mais pedidos e elogiados',
        badge: 'Cardápio Oficial',
        enabled: true,
        order: nextOrder,
        items: [
          { id: 'm1', title: 'Especialidade da Casa', description: 'Preparado artesanalmente com receita exclusiva.', price: 'R$ 55,00', tag: 'Chef' }
        ]
      };
    }

    addSection(newSec);
    setExpandedSection(newSec.id);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-l border-zinc-800/90 w-full sm:w-96 md:w-[480px] lg:w-[520px] shrink-0 text-zinc-100 font-sans select-none shadow-2xl overflow-hidden">
      {/* Studio Header */}
      <div className="p-4 sm:p-5 border-b border-zinc-800/90 bg-zinc-900/90 backdrop-blur-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-indigo-500 p-[1.5px] shadow-lg shadow-emerald-500/20 shrink-0">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
              <Sliders className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div>
            <h3 className="font-black text-sm text-white flex items-center gap-2">
              <span>Design Studio PRO</span>
              <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded-full font-black border border-amber-800/60 flex items-center gap-1">
                <Crown className="w-3 h-3" />
                PREMIUM
              </span>
            </h3>
            <p className="text-[11px] text-zinc-400">Edição de Textos, WhatsApp & Identidade Visual</p>
          </div>
        </div>

        {canUndo && (
          <button
            onClick={undoLastChange}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer active:scale-95 shadow-sm shrink-0"
            title="Desfazer alteração"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Desfazer</span>
          </button>
        )}
      </div>

      {/* Main Tab Bar - 2-Tier Structured Segmented Control */}
      <div className="border-b border-zinc-800/90 bg-zinc-900/40 p-2 space-y-1.5 shrink-0">
        {/* Tier 1: Main Core Tabs */}
        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-2.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'content'
                ? 'bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800/60'
            }`}
          >
            <Edit3 className="w-4 h-4 shrink-0" />
            <span>Conteúdo</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`py-2.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800/60'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`py-2.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'presets'
                ? 'bg-zinc-100 text-zinc-950 shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800/60'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Temas ({PRESET_THEMES.length})</span>
          </button>
        </div>

        {/* Tier 2: Visual Styling Tabs */}
        <div className="grid grid-cols-5 gap-1 pt-0.5">
          <button
            onClick={() => setActiveTab('layout')}
            className={`py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'layout'
                ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Layout className="w-3 h-3 text-sky-400 shrink-0" />
            <span>Layout</span>
          </button>

          <button
            onClick={() => setActiveTab('colors')}
            className={`py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'colors'
                ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Palette className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>Cores</span>
          </button>

          <button
            onClick={() => setActiveTab('fonts')}
            className={`py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'fonts'
                ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Type className="w-3 h-3 text-indigo-400 shrink-0" />
            <span>Fontes</span>
          </button>

          <button
            onClick={() => setActiveTab('effects')}
            className={`py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'effects'
                ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
            <span>Efeitos</span>
          </button>

          <button
            onClick={() => setActiveTab('sections')}
            className={`py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'sections'
                ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Layers className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Seções</span>
          </button>
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">

        {/* TAB 0: CONTEÚDO & EDITOR DE TEXTOS / ELEMENTOS */}
        {activeTab === 'content' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-1">
              <div>
                <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Editor de Textos & Elementos</span>
                </h4>
                <p className="text-[11px] text-zinc-400">Edite, adicione ou exclua textos, cards e informações.</p>
              </div>
            </div>

            {/* SECTION ACCORDIONS */}
            <div className="space-y-3">
              
              {/* 1. General Business Info Accordion */}
              <div className="border border-zinc-800 rounded-2xl bg-zinc-900/80 overflow-hidden transition-all shadow-sm">
                <div 
                  onClick={() => setExpandedSection(expandedSection === 'general_info' ? null : 'general_info')}
                  className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-zinc-800/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-white block">Dados da Empresa & Contato</span>
                      <span className="text-[10px] text-zinc-400">Nome, WhatsApp, Cidade e Endereço</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${expandedSection === 'general_info' ? 'rotate-180' : ''}`} />
                </div>

                {expandedSection === 'general_info' && (
                  <div className="p-4 border-t border-zinc-800 space-y-3.5 bg-zinc-950/40 animate-fade-in">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Nome do Estabelecimento</label>
                      <input 
                        type="text" 
                        value={site.companyName || ''} 
                        onChange={(e) => updateSiteInfo({ companyName: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Cidade / UF</label>
                        <input 
                          type="text" 
                          value={site.city || ''} 
                          onChange={(e) => updateSiteInfo({ city: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Nicho / Categoria</label>
                        <input 
                          type="text" 
                          value={site.niche || ''} 
                          onChange={(e) => updateSiteInfo({ niche: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Slogan / Tagline do Negócio</label>
                      <input 
                        type="text" 
                        value={site.tagline || ''} 
                        onChange={(e) => updateSiteInfo({ tagline: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">WhatsApp (com DDD)</label>
                        <input 
                          type="text" 
                          value={site.whatsapp || ''} 
                          onChange={(e) => updateSiteInfo({ whatsapp: e.target.value })}
                          placeholder="(31) 99999-9999"
                          className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Telefone Fixo</label>
                        <input 
                          type="text" 
                          value={site.phone || ''} 
                          onChange={(e) => updateSiteInfo({ phone: e.target.value })}
                          placeholder="(31) 3837-0000"
                          className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Endereço Comercial</label>
                      <input 
                        type="text" 
                        value={site.address || ''} 
                        onChange={(e) => updateSiteInfo({ address: e.target.value })}
                        placeholder="Av. Getúlio Vargas, 120 - Centro"
                        className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Dynamic Section Accordions */}
              {site.sections.map(sec => {
                const isExpanded = expandedSection === sec.id;
                return (
                  <div key={sec.id} className="border border-zinc-800 rounded-2xl bg-zinc-900/80 overflow-hidden transition-all shadow-sm">
                    <div 
                      onClick={() => setExpandedSection(isExpanded ? null : sec.id)}
                      className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-zinc-800/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 shrink-0">
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-black text-white block truncate">
                            {sec.title || sec.type.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                            Seção: {sec.type} {sec.items?.length ? `(${sec.items.length} itens)` : ''}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSection(sec.id);
                          }}
                          className={`p-1.5 rounded-lg text-[10px] font-bold ${sec.enabled ? 'text-emerald-400 hover:bg-emerald-950/40' : 'text-zinc-500 hover:bg-zinc-800'}`}
                          title={sec.enabled ? 'Ocultar do site' : 'Exibir no site'}
                        >
                          {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 border-t border-zinc-800 space-y-4 bg-zinc-950/50 animate-fade-in">
                        {/* Section Title */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Título da Seção</label>
                          <input 
                            type="text" 
                            value={sec.title || ''} 
                            onChange={(e) => updateSection(sec.id, { title: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-semibold"
                          />
                        </div>

                        {/* Section Badge */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Selo / Badge em Destaque</label>
                          <input 
                            type="text" 
                            value={sec.badge || ''} 
                            onChange={(e) => updateSection(sec.id, { badge: e.target.value })}
                            placeholder="Ex: ⭐ 4.9 no Google Maps"
                            className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                          />
                        </div>

                        {/* Section Subtitle / Main Description */}
                        {sec.subtitle !== undefined && (
                          <div>
                            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Subtítulo / Descrição da Seção</label>
                            <textarea 
                              rows={2}
                              value={sec.subtitle || ''} 
                              onChange={(e) => updateSection(sec.id, { subtitle: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 leading-relaxed"
                            />
                          </div>
                        )}

                        {/* Section Main Content / Story */}
                        {sec.content !== undefined && (
                          <div>
                            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Texto Principal / História</label>
                            <textarea 
                              rows={4}
                              value={sec.content || ''} 
                              onChange={(e) => updateSection(sec.id, { content: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 leading-relaxed"
                            />
                          </div>
                        )}

                        {/* Section Button Text */}
                        {sec.buttonText !== undefined && (
                          <div>
                            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Texto do Botão de Ação (CTA)</label>
                            <input 
                              type="text" 
                              value={sec.buttonText || ''} 
                              onChange={(e) => updateSection(sec.id, { buttonText: e.target.value })}
                              placeholder="Fazer Pedido no WhatsApp"
                              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-bold"
                            />
                          </div>
                        )}

                        {/* Section Image URL */}
                        {sec.imageUrl !== undefined && (
                          <div>
                            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">URL da Imagem / Foto</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                value={sec.imageUrl || ''} 
                                onChange={(e) => updateSection(sec.id, { imageUrl: e.target.value })}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono text-[11px]"
                              />
                              {sec.imageUrl && (
                                <img src={sec.imageUrl} alt="Preview" className="w-9 h-9 rounded-lg object-cover border border-zinc-700 shrink-0" />
                              )}
                            </div>
                          </div>
                        )}

                        {/* ITEM / CARDS LIST EDITOR (For Menu, Testimonials, Benefits, FAQ) */}
                        {sec.items && (
                          <div className="pt-3 border-t border-zinc-800 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                                <span>Cards & Itens ({sec.items.length})</span>
                              </span>
                              <button
                                onClick={() => handleAddNewItem(sec)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-[11px] flex items-center gap-1 shadow-sm cursor-pointer active:scale-95"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Adicionar Item</span>
                              </button>
                            </div>

                            {/* Items List */}
                            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                              {sec.items.map((item, itemIdx) => (
                                <div key={item.id || itemIdx} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 relative group">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[10px] font-bold uppercase text-amber-400">
                                      Item #{itemIdx + 1} {item.tag ? `• ${item.tag}` : ''}
                                    </span>
                                    <button
                                      onClick={() => removeSectionItem(sec.id, item.id)}
                                      className="p-1 rounded-md text-zinc-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                                      title="Excluir este item"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  {/* Title / Name / Author */}
                                  <div>
                                    <input
                                      type="text"
                                      value={item.title || item.author || ''}
                                      onChange={(e) => {
                                        if (sec.type === 'testimonials') {
                                          updateSectionItem(sec.id, item.id, { author: e.target.value, title: e.target.value });
                                        } else {
                                          updateSectionItem(sec.id, item.id, { title: e.target.value });
                                        }
                                      }}
                                      placeholder="Título / Nome do Item"
                                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-bold"
                                    />
                                  </div>

                                  {/* Description / Content */}
                                  <div>
                                    <textarea
                                      rows={2}
                                      value={item.description || ''}
                                      onChange={(e) => updateSectionItem(sec.id, item.id, { description: e.target.value })}
                                      placeholder="Descrição detalhada do item..."
                                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-emerald-400 leading-relaxed"
                                    />
                                  </div>

                                  {/* Meta Fields (Price, Tag, Rating) */}
                                  <div className="grid grid-cols-2 gap-2 pt-1">
                                    {sec.type !== 'testimonials' && (
                                      <>
                                        <input
                                          type="text"
                                          value={item.price || ''}
                                          onChange={(e) => updateSectionItem(sec.id, item.id, { price: e.target.value })}
                                          placeholder="Preço (ex: R$ 45,00)"
                                          className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-emerald-400 font-semibold focus:outline-none focus:border-emerald-400"
                                        />
                                        <input
                                          type="text"
                                          value={item.tag || ''}
                                          onChange={(e) => updateSectionItem(sec.id, item.id, { tag: e.target.value })}
                                          placeholder="Tag (ex: Destaque)"
                                          className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none focus:border-emerald-400"
                                        />
                                      </>
                                    )}

                                    {sec.type === 'testimonials' && (
                                      <>
                                        <input
                                          type="text"
                                          value={item.role || ''}
                                          onChange={(e) => updateSectionItem(sec.id, item.id, { role: e.target.value })}
                                          placeholder="Cargo / Origem (ex: Google)"
                                          className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-400 focus:outline-none focus:border-emerald-400"
                                        />
                                        <select
                                          value={item.rating || 5}
                                          onChange={(e) => updateSectionItem(sec.id, item.id, { rating: Number(e.target.value) })}
                                          className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-amber-400 font-bold focus:outline-none focus:border-emerald-400"
                                        >
                                          <option value={5}>⭐⭐⭐⭐⭐ (5 Estrelas)</option>
                                          <option value={4}>⭐⭐⭐⭐ (4 Estrelas)</option>
                                          <option value={3}>⭐⭐⭐ (3 Estrelas)</option>
                                        </select>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Remove Section Button (for non-essential sections) */}
                        {sec.type !== 'navbar' && sec.type !== 'hero' && sec.type !== 'footer' && (
                          <div className="pt-2 border-t border-zinc-800 flex justify-end">
                            <button
                              onClick={() => removeSection(sec.id)}
                              className="text-[11px] text-zinc-500 hover:text-rose-400 flex items-center gap-1 font-semibold transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-rose-950/20"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Excluir esta seção do site</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ADD NEW SECTION BUTTONS */}
            <div className="pt-4 border-t border-zinc-800 space-y-2.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 block">
                Adicionar Nova Seção ao Site
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddNewSection('menu')}
                  className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-900 hover:border-zinc-700 text-left text-xs font-bold text-zinc-200 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cardápio / Serviços</span>
                </button>

                <button
                  onClick={() => handleAddNewSection('testimonials')}
                  className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-900 hover:border-zinc-700 text-left text-xs font-bold text-zinc-200 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Depoimentos / Avaliações</span>
                </button>

                <button
                  onClick={() => handleAddNewSection('benefits')}
                  className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-900 hover:border-zinc-700 text-left text-xs font-bold text-zinc-200 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-sky-400" />
                  <span>Diferenciais & Vantagens</span>
                </button>

                <button
                  onClick={() => handleAddNewSection('faq')}
                  className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-900 hover:border-zinc-700 text-left text-xs font-bold text-zinc-200 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-purple-400" />
                  <span>Dúvidas Frequentes (FAQ)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB WHATSAPP: CONFIGURAÇÃO DE ABORDAGEM & PROMPT WHATSAPP */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-zinc-800/80 pb-3">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Prompt & Mensagens do WhatsApp</span>
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Personalize o script de abordagem enviado ao proprietário e o botão de atendimento do site.
              </p>
            </div>

            {/* CARD 1: SCRIPT DE ABORDAGEM (PROMPT DE ENVIO PARA O DONO) */}
            <div className="p-5 sm:p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/90 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-sm">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-sm text-white">Prompt de Abordagem do Site</h5>
                  <p className="text-xs text-zinc-400">Mensagem que você envia no WhatsApp do proprietário</p>
                </div>
              </div>

              {/* Dynamic Variables Tags */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Tags Dinâmicas (Clique para inserir no texto):
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { tag: '{nome_empresa}', label: 'Empresa' },
                    { tag: '{cidade}', label: 'Cidade' },
                    { tag: '{nicho}', label: 'Nicho' },
                    { tag: '{link_site}', label: 'Link' },
                    { tag: '{telefone}', label: 'Telefone' }
                  ].map(v => (
                    <button
                      key={v.tag}
                      type="button"
                      onClick={() => setWhatsappPitch(prev => prev + ' ' + v.tag)}
                      className="px-2.5 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-emerald-400 font-mono font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
                      title={`Inserir ${v.label}`}
                    >
                      + {v.tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-300">Texto do Script / Mensagem:</label>
                <textarea
                  value={whatsappPitch}
                  onChange={(e) => setWhatsappPitch(e.target.value)}
                  rows={9}
                  className="w-full p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 font-sans leading-relaxed resize-none shadow-inner"
                  placeholder="Escreva a mensagem personalizada..."
                />
              </div>

              {/* Preset Pitch Quick Selectors */}
              <div className="space-y-2.5 pt-1">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Modelos Prontos de Alta Conversão:
                </span>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setWhatsappPitch(`Olá, equipe do {nome_empresa}! Tudo bem? 👋\n\nEstava pesquisando referências de {nicho} aqui em {cidade} e vi a excelente reputação de vocês no Google! ⭐\n\nPreparei uma demonstração exclusiva de como ficaria um site moderno e focado em vendas para vocês:\n\n👉 {link_site}\n\nDê uma olhadinha sem compromisso! O que acharam?`)}
                    className="w-full p-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800/90 border border-zinc-800/90 text-left transition-all cursor-pointer active:scale-98 shadow-sm flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-bold text-emerald-400 text-xs block group-hover:text-emerald-300">1. Apresentação & Elogio Google</span>
                      <span className="text-[11px] text-zinc-400">Direto, amigável e focado em autoridade</span>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-800">Usar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWhatsappPitch(`Oi, tudo bem? Notei que muitos clientes pesquisam por {nicho} em {cidade} no Google Maps mas acabam não achando site oficial da {nome_empresa}.\n\nPara vocês não perderem mais essas vendas, montei o site completo pronto para colocar no ar:\n\n👉 {link_site}\n\nPodemos fechar a ativação hoje?`)}
                    className="w-full p-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800/90 border border-zinc-800/90 text-left transition-all cursor-pointer active:scale-98 shadow-sm flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-bold text-amber-400 text-xs block group-hover:text-amber-300">2. Focado em Perda de Clientes</span>
                      <span className="text-[11px] text-zinc-400">Gera urgência de fechar com quem pesquisa no Maps</span>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-800">Usar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWhatsappPitch(`Olá! Conseguimos liberar uma condição promocional especial para a {nome_empresa} com domínio próprio e segurança SSL grátis no primeiro ano:\n\n👉 Veja o site pré-configurado: {link_site}\n\nEssa condição é válida para aprovação até amanhã às 18h. O que acha?`)}
                    className="w-full p-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800/90 border border-zinc-800/90 text-left transition-all cursor-pointer active:scale-98 shadow-sm flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-bold text-purple-400 text-xs block group-hover:text-purple-300">3. Oferta Especial com Domínio Grátis</span>
                      <span className="text-[11px] text-zinc-400">Bônus exclusivo com prazo de 24 horas</span>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-800">Usar</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-3 border-t border-zinc-800/90">
                <button
                  type="button"
                  onClick={() => {
                    updateSiteInfo({ customWhatsAppPitch: whatsappPitch });
                    toast.success('Prompt de abordagem do WhatsApp salvo com sucesso!');
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Salvar Prompt como Padrão</span>
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      const processed = whatsappPitch
                        .replace(/{nome_empresa}/g, site.companyName)
                        .replace(/{cidade}/g, site.city)
                        .replace(/{nicho}/g, site.niche)
                        .replace(/{link_site}/g, `${window.location.origin}/?site=${site.slug || site.id}`)
                        .replace(/{telefone}/g, site.phone || '(31) 98888-7777');
                      navigator.clipboard.writeText(processed);
                      toast.success('Mensagem processada copiada!');
                    }}
                    className="py-3 px-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-zinc-200 font-bold text-xs transition-all border border-zinc-800 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copiar Texto</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const processed = whatsappPitch
                        .replace(/{nome_empresa}/g, site.companyName)
                        .replace(/{cidade}/g, site.city)
                        .replace(/{nicho}/g, site.niche)
                        .replace(/{link_site}/g, `${window.location.origin}/?site=${site.slug || site.id}`)
                        .replace(/{telefone}/g, site.phone || '(31) 98888-7777');
                      const clean = (site.whatsapp || site.phone || '31988887777').replace(/[^0-9]/g, '');
                      const phoneFormatted = clean.startsWith('55') ? clean : `55${clean}`;
                      window.open(`https://wa.me/${phoneFormatted}?text=${encodeURIComponent(processed)}`, '_blank');
                    }}
                    className="py-3 px-3 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm shadow-green-600/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Testar no WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2: BOTÃO DE WHATSAPP DO PRÓPRIO SITE (CLIENTES ➔ COMÉRCIO) */}
            <div className="p-5 sm:p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/90 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 shrink-0 shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-sm text-white">Botão de WhatsApp do Site</h5>
                  <p className="text-xs text-zinc-400">Configuração do botão onde os clientes chamam o comércio</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">WhatsApp de Atendimento do Comércio:</label>
                  <input
                    type="text"
                    value={whatsappPhone}
                    onChange={(e) => setWhatsappPhone(e.target.value)}
                    placeholder="(31) 99999-9999"
                    className="w-full p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">Mensagem Pré-preenchida do Botão:</label>
                  <input
                    type="text"
                    value={leadButtonMessage}
                    onChange={(e) => setLeadButtonMessage(e.target.value)}
                    placeholder="Olá! Vi o site de vocês e gostaria de fazer um pedido..."
                    className="w-full p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const clean = whatsappPhone.replace(/[^0-9]/g, '');
                    const phoneFormatted = clean.startsWith('55') ? clean : `55${clean}`;
                    const waUrl = `https://wa.me/${phoneFormatted}?text=${encodeURIComponent(leadButtonMessage)}`;
                    
                    // Update contact section and hero section buttons
                    const updatedSections = site.sections.map(sec => {
                      if (sec.type === 'contact' || sec.type === 'hero') {
                        return { ...sec, buttonLink: waUrl };
                      }
                      return sec;
                    });

                    updateSiteInfo({
                      whatsapp: whatsappPhone,
                      phone: whatsappPhone,
                      customLeadWhatsAppMessage: leadButtonMessage,
                      sections: updatedSections
                    });
                    toast.success('Botão de WhatsApp do site atualizado com sucesso!');
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xs transition-all border border-zinc-700 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                  <span>Salvar Botão de Atendimento</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: PRESETS / TEMAS LUXUOSOS COM DESIGNS DIFERENTES */}
        {activeTab === 'presets' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Temas com Design e Layout Exclusivos
              </h4>
            </div>

            <div className="space-y-3">
              {PRESET_THEMES.map(preset => {
                const isSelected = currentTheme.id === preset.id || currentTheme.name === preset.name;
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleApplyPreset(preset)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'border-emerald-500 bg-zinc-900 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500'
                        : 'border-zinc-800/80 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-black text-xs text-white">{preset.name}</h5>
                          {preset.isPremium ? (
                            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/60 flex items-center gap-1">
                              <Crown className="w-2.5 h-2.5" />
                              PRO
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                              FREE
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-zinc-400 font-semibold">{preset.nicheTag}</span>
                          <span className="text-[9px] text-zinc-500 font-mono uppercase bg-zinc-800 px-1 rounded">
                            Layout: {preset.layoutVariant}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-emerald-400 text-zinc-950 flex items-center justify-center shadow-md">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">{preset.description}</p>

                    {/* Color Swatch & Typography Preview */}
                    <div className="flex items-center gap-1.5 pt-2 border-t border-zinc-800/80">
                      <div className="w-4 h-4 rounded-md border border-white/20 shadow-sm" style={{ backgroundColor: preset.backgroundColor }} title="Fundo" />
                      <div className="w-4 h-4 rounded-md border border-white/20 shadow-sm" style={{ backgroundColor: preset.cardBackground }} title="Cards" />
                      <div className="w-4 h-4 rounded-md border border-white/20 shadow-sm" style={{ backgroundColor: preset.primaryColor }} title="Botões" />
                      <div className="w-4 h-4 rounded-md border border-white/20 shadow-sm" style={{ backgroundColor: preset.accentColor }} title="Acento" />
                      <span className="text-[10px] text-zinc-500 font-mono ml-auto">
                        {preset.fontHeading} • {preset.cardStyle}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: LAYOUT VARIATION SELECTOR */}
        {activeTab === 'layout' && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-3">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Variante de Layout do Hero & Seções
              </label>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  {
                    id: 'split',
                    name: 'Modern Split (Lado a Lado)',
                    desc: 'Texto e chamada na esquerda, fotografia com card e selo de cidade na direita.'
                  },
                  {
                    id: 'editorial',
                    name: 'Editorial Centrado Nobre',
                    desc: 'Título dramático centralizado, selo artesanal e fotografia imponente com moldura.'
                  },
                  {
                    id: 'bento',
                    name: 'Bento Grid Visual Showcase',
                    desc: 'Blocos modulares dinâmicos com destaque para especialidades e avaliações.'
                  },
                  {
                    id: 'minimal',
                    name: 'Minimalista & Clean',
                    desc: 'Tipografia ultra limpa, espaçamento editorial e foco direto no contato.'
                  }
                ].map(layout => {
                  const isSelected = (currentTheme.layoutVariant || 'split') === layout.id;
                  return (
                    <button
                      key={layout.id}
                      onClick={() => {
                        updateTheme({ layoutVariant: layout.id as any });
                        toast.success(`Layout "${layout.name}" aplicado!`);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-zinc-900 ring-1 ring-emerald-500'
                          : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{layout.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{layout.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Button Style Variation */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Estilo dos Botões de Conversão
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'glow', label: '✨ Botão Glow Pulsante' },
                  { id: 'pill', label: '💊 Pílula Arredondada' },
                  { id: 'rounded', label: '🟦 Moderno Suave' },
                  { id: 'sharp', label: '⏹️ Reto Clássico' }
                ].map(btn => (
                  <button
                    key={btn.id}
                    onClick={() => {
                      updateTheme({ buttonStyle: btn.id as any });
                      toast.success(`Estilo de botão "${btn.label}" aplicado!`);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      currentTheme.buttonStyle === btn.id
                        ? 'border-emerald-500 bg-zinc-900 text-white font-bold'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CORES PERSONALIZADAS */}
        {activeTab === 'colors' && (
          <div className="space-y-6 animate-fade-in">
            {/* Quick Palettes */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Paletas Rápidas em 1 Clique
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_SWATCHES.map((swatch, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      updateTheme({
                        backgroundColor: swatch.bg,
                        cardBackground: swatch.card,
                        primaryColor: swatch.primary,
                        accentColor: swatch.accent
                      });
                      toast.success(`Paleta "${swatch.label}" aplicada!`);
                    }}
                    className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 text-left transition-all flex items-center justify-between cursor-pointer active:scale-95"
                  >
                    <span className="text-[11px] font-bold text-zinc-200">{swatch.label}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: swatch.bg }} />
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: swatch.primary }} />
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: swatch.accent }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Granular Color Pickers */}
            <div className="space-y-3.5 pt-4 border-t border-zinc-800">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Ajuste Fino de Cores (Hex / Picker)
              </label>

              {/* Background Color */}
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Fundo Principal</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{currentTheme.backgroundColor}</span>
                </div>
                <input
                  type="color"
                  value={currentTheme.backgroundColor}
                  onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>

              {/* Card Background Color */}
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Fundo dos Cards</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{currentTheme.cardBackground}</span>
                </div>
                <input
                  type="color"
                  value={currentTheme.cardBackground}
                  onChange={(e) => handleColorChange('cardBackground', e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>

              {/* Primary Button Color */}
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Cor Primária (Botões de Ação)</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{currentTheme.primaryColor}</span>
                </div>
                <input
                  type="color"
                  value={currentTheme.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>

              {/* Accent Color */}
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Cor de Destaque / Estrelas</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{currentTheme.accentColor}</span>
                </div>
                <input
                  type="color"
                  value={currentTheme.accentColor}
                  onChange={(e) => handleColorChange('accentColor', e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>

              {/* Text Color */}
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Cor dos Textos e Títulos</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{currentTheme.textColor}</span>
                </div>
                <input
                  type="color"
                  value={currentTheme.textColor}
                  onChange={(e) => handleColorChange('textColor', e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FONTES & TIPOGRAFIA (COM PRO BADGES) */}
        {activeTab === 'fonts' && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-3">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Fontes de Títulos & Destaque
              </label>

              <div className="grid grid-cols-1 gap-2">
                {FONT_OPTIONS.map(font => {
                  const isSelected = currentTheme.fontHeading === font.family;
                  return (
                    <button
                      key={font.family}
                      onClick={() => handleApplyFont(font)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-zinc-900 ring-1 ring-emerald-500'
                          : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span 
                            className="text-sm font-bold text-white"
                            style={{ fontFamily: font.family }}
                          >
                            {font.name}
                          </span>
                          {font.isPro ? (
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/60 flex items-center gap-0.5">
                              <Crown className="w-2.5 h-2.5" />
                              PRO
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                              FREE
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-400">{font.style}</span>
                      </div>

                      {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Fonte dos Parágrafos & Textos
              </label>

              <div className="grid grid-cols-2 gap-2">
                {['Plus Jakarta Sans', 'Inter', 'Outfit', 'DM Sans', 'Poppins', 'Montserrat'].map(fontName => {
                  const isSelected = currentTheme.fontBody === fontName;
                  return (
                    <button
                      key={fontName}
                      onClick={() => {
                        updateTheme({ fontBody: fontName });
                        toast.success(`Fonte de corpo "${fontName}" aplicada!`);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-zinc-900 text-white font-bold'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-xs block" style={{ fontFamily: fontName }}>
                        {fontName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: EFEITOS & ANIMAÇÕES EM TEMPO REAL */}
        {activeTab === 'effects' && (
          <div className="space-y-6 animate-fade-in">
            {/* Entry Animation */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Animação de Entrada
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'slide-up', label: '🚀 Slide Up Dinâmico' },
                  { id: 'fade', label: '✨ Fade In Suave' },
                  { id: 'zoom', label: '🔍 Zoom Reveal' },
                  { id: 'none', label: '⛔ Sem Animação' }
                ].map(anim => (
                  <button
                    key={anim.id}
                    onClick={() => {
                      updateTheme({ animation: anim.id as any });
                      toast.success(`Animação "${anim.label}" ativada!`);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      currentTheme.animation === anim.id
                        ? 'border-emerald-500 bg-zinc-900 text-white font-bold ring-1 ring-emerald-500'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {anim.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Card Style */}
            <div className="space-y-2.5 pt-4 border-t border-zinc-800">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Estilo Visual dos Cards
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'glass', label: '🪞 Glassmorphism Blur' },
                  { id: 'neon', label: '💡 Borda Neon Glow' },
                  { id: 'shadow3d', label: '📦 Sombra 3D Elevada' },
                  { id: 'solid', label: '⬛ Sólido Escuro' },
                  { id: 'flat', label: '📏 Minimalista Flat' }
                ].map(style => (
                  <button
                    key={style.id}
                    onClick={() => {
                      updateTheme({ cardStyle: style.id as any });
                      toast.success(`Estilo de card "${style.label}" aplicado!`);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      currentTheme.cardStyle === style.id
                        ? 'border-emerald-500 bg-zinc-900 text-white font-bold ring-1 ring-emerald-500'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Border Radius */}
            <div className="space-y-2.5 pt-4 border-t border-zinc-800">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Arredondamento das Bordas
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'rounded-none', label: 'Reto (0px)' },
                  { id: 'rounded-lg', label: 'Sutil (8px)' },
                  { id: 'rounded-xl', label: 'Moderno (14px)' },
                  { id: 'rounded-2xl', label: 'Suave (22px)' },
                  { id: 'rounded-full', label: 'Pílula Total' }
                ].map(radius => (
                  <button
                    key={radius.id}
                    onClick={() => {
                      updateTheme({ borderRadius: radius.id as any });
                      toast.success(`Borda "${radius.label}" aplicada!`);
                    }}
                    className={`p-2 rounded-xl border text-center text-xs transition-all cursor-pointer ${
                      currentTheme.borderRadius === radius.id
                        ? 'border-emerald-500 bg-zinc-900 text-white font-bold'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {radius.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Glow Toggle */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <div>
                <span className="text-xs font-bold text-white block">Luz Ambiente de Fundo (Glow)</span>
                <span className="text-[10px] text-zinc-400">Efeito moderno de iluminação radial</span>
              </div>
              <input
                type="checkbox"
                checked={currentTheme.glowEffect ?? true}
                onChange={(e) => updateTheme({ glowEffect: e.target.checked })}
                className="w-4 h-4 accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* TAB 6: GERENCIADOR DE SEÇÕES */}
        {activeTab === 'sections' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Estrutura & Seções do Site
              </h4>
            </div>

            <div className="space-y-2">
              {[...site.sections].sort((a, b) => a.order - b.order).map((sec, idx, arr) => (
                <div
                  key={sec.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                    sec.enabled ? 'border-zinc-800 bg-zinc-900/90' : 'border-zinc-900 bg-zinc-950/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      onClick={() => toggleSection(sec.id)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                        sec.enabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-zinc-800 text-zinc-500'
                      }`}
                      title={sec.enabled ? 'Desativar seção' : 'Ativar seção'}
                    >
                      {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block truncate">
                        {sec.title || sec.type.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase font-semibold">
                        Tipo: {sec.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMoveSection(idx, 'up')}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-zinc-300 cursor-pointer"
                      title="Subir posição"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === arr.length - 1}
                      onClick={() => handleMoveSection(idx, 'down')}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-zinc-300 cursor-pointer"
                      title="Descer posição"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

        {/* Pro Lock Modal */}
        {proModalOpen.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400 mx-auto shadow-lg shadow-amber-500/20">
                <Crown className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-white">Recurso Exclusivo PRO & FULL</h3>
                <p className="text-xs text-zinc-400">
                  <strong className="text-amber-400 font-bold">{proModalOpen.featureName}</strong> está disponível exclusivamente nos planos pagos do Prospectly.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-left text-xs space-y-2 text-zinc-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Desbloqueio de todos os 16+ Temas e Tipografias de Luxo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Remoção automática da Marca d'Água dos sites</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Conexão de Domínio Próprio e Modo Agência White-Label</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setProModalOpen({ open: false, featureName: '' })}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300 transition-colors cursor-pointer"
                >
                  Continuar no Free
                </button>

                <button
                  onClick={() => {
                    setProModalOpen({ open: false, featureName: '' });
                    window.location.href = '/#subscription';
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-black transition-all shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Fazer Upgrade</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
