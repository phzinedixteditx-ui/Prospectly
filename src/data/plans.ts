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
    aiCreditsPerDay: 0,
    maxProjects: 1,
    limitsText: '5 buscas/mês • 5 leads salvos • 1 site ativo',
    features: [
      '5 pesquisas de empresas por mês',
      '5 leads salvos no pipeline',
      'Criação de 1 demonstração de site',
      'Design Studio com temas e fontes livres',
      'Rastreador de acessos da demonstração',
      'Calculadora de oportunidade e perda estimada',
      'Marca d\'água Prospectly inclusa'
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
    aiCreditsPerDay: 0,
    maxProjects: 5,
    limitsText: '50 buscas/mês • 50 leads salvos • Até 5 sites',
    features: [
      '50 pesquisas de empresas no Google Maps por mês',
      '50 leads salvos no pipeline',
      'Sem marca d\'água nos sites dos clientes',
      'Até 5 projetos de sites simultâneos',
      'Design Studio PRO com 16+ Temas e Tipografias de Luxo',
      'Rastreador de acessos em tempo real (Lead no Radar)',
      'Mini CRM Kanban de Negociação',
      'Gerador Automático de Propostas & Mini-Contratos',
      'Central de Quebra de Objeções para WhatsApp'
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
    aiCreditsPerDay: 0,
    maxProjects: 9999,
    limitsText: '100 buscas/dia • Leads e Sites ilimitados',
    features: [
      '100 pesquisas de empresas por dia no Google Maps',
      'Leads e contatos ilimitados nas buscas',
      'Sem marca d\'água nos sites',
      'Criação e publicação ilimitada de sites',
      'Modo Agência White-Label oficial (sua logo e marca)',
      'Design Studio PRO completo com todos os recursos',
      'Conexão de domínio próprio personalizado',
      'Auditoria de presença digital e propostas ilimitadas',
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
