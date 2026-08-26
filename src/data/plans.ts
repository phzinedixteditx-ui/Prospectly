import { PlanConfig, PlanType } from '../types';

export const PLANS: Record<PlanType, PlanConfig> = {
  free: {
    id: 'free',
    name: 'FREE',
    tagline: 'Para explorar o potencial e dar os primeiros passos.',
    price: 0,
    priceYearly: 0,
    searchesLimit: 5,
    searchesPeriod: 'mês',
    leadsLimit: 5,
    aiCreditsPerDay: 5,
    maxProjects: 1,
    limitsText: '5 buscas/mês • 5 leads/mês • 5 créditos IA/dia',
    features: [
      '5 pesquisas de empresas por mês',
      '5 leads salvos por mês',
      '5 créditos de IA por dia',
      'Criação de 1 demonstração de site',
      'Editor IA básico',
      'Marca d\'água Prospectly inclusa',
      'Opportunity Score padrão',
      'Geração de abordagens comerciais'
    ]
  },
  pro: {
    id: 'pro',
    name: 'PRO',
    tagline: 'Para freelancers e profissionais que querem fechar clientes todo mês.',
    price: 26.90,
    originalPriceYearly: 322.80,
    priceYearly: 149.80,
    isPopular: true,
    badge: 'Mais Escolhido • Promoção Anual R$ 149,80',
    searchesLimit: 50,
    searchesPeriod: 'mês',
    leadsLimit: 50,
    aiCreditsPerDay: 20,
    maxProjects: 5,
    limitsText: '50 buscas/mês • 50 leads/mês • 20 créditos IA/dia',
    features: [
      '50 pesquisas de empresas por mês',
      '50 leads salvos por mês',
      '20 créditos de IA por dia (renovação diária)',
      'Sem marca d\'água nos sites',
      'Até 5 projetos de sites simultâneos',
      'Design Studio Pro completo desbloqueado',
      'Análise detalhada de oportunidades',
      'Publicação de demonstrações com link exclusivo',
      'Exportação de contatos e abordagens WhatsApp'
    ]
  },
  full: {
    id: 'full',
    name: 'FULL',
    tagline: 'Máxima potência para agências e quem vive de vendas B2B.',
    price: 89.60,
    originalPriceYearly: 1075.20,
    priceYearly: 269.60,
    badge: 'Oferta Especial Anual R$ 269,60',
    searchesLimit: 100,
    searchesPeriod: 'dia',
    leadsLimit: 9999,
    aiCreditsPerDay: 100,
    maxProjects: 9999,
    limitsText: '100 buscas/dia • Leads ilimitados • 100 créditos IA/dia',
    features: [
      '100 pesquisas de empresas por dia',
      'Leads ilimitados nas buscas',
      '100 créditos de IA por dia (Modo Turbo)',
      'Sem marca d\'água nos sites',
      'Criação e publicação ilimitada de sites',
      'Design Studio Pro com todos os recursos e temas',
      'Auditoria completa de presença digital',
      'Domínio customizado e publicação instantânea',
      'Suporte prioritário VIP via WhatsApp'
    ]
  }
};

export const AI_CREDITS_COST = {
  LEAD_ANALYSIS: 1,
  GENERATE_PITCH: 1,
  GENERATE_SITE: 3,
  MODIFY_SITE: 1,
  ADD_SECTION: 1
};
