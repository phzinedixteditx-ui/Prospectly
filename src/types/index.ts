export type ServiceType = 
  | 'website_builder'
  | 'marketing'
  | 'video_editing'
  | 'traffic_management'
  | 'automation'
  | 'design'
  | 'other';

export type PlanType = 'free' | 'pro' | 'full';

export interface AgencyProfile {
  agencyName: string;
  agencyLogo?: string;
  agencyWhatsapp: string;
  agencyEmail?: string;
  customSubdomain?: string;
  showBannerOnDemo: boolean;
}

export interface DemoViewEvent {
  id: string;
  siteId: string;
  siteSlug: string;
  companyName: string;
  viewedAt: string;
  device: 'mobile' | 'desktop';
  whatsappClicked?: boolean;
}

export interface CommercialProposal {
  id: string;
  leadId: string;
  companyName: string;
  setupPrice: number;
  monthlyPrice: number;
  deliveryDays: number;
  includedFeatures: string[];
  status: 'draft' | 'sent' | 'accepted' | 'declined';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  selectedService: ServiceType;
  targetRegion?: string;
  targetBusinessType?: string;
  onboardingCompleted: boolean;
  plan: PlanType;
  subscriptionStatus: 'active' | 'trialing' | 'canceled' | 'past_due';
  subscriptionRenewDate?: string;
  agencyProfile?: AgencyProfile;
  createdAt: string;
  updatedAt: string;
}

export interface UsageQuota {
  searchesThisMonth: number;
  searchesLimit: number;
  leadsSaved: number;
  leadsLimit: number;
  aiCreditsToday: number;
  aiCreditsDailyLimit: number;
  lastCreditsResetDate: string;
  projectsCreated: number;
  projectsLimit: number;
}

export interface OpportunityScore {
  total: number;
  hasWebsite: boolean;
  scoreNoWebsite: number;
  scoreSocialActive: number;
  scoreHighReviews: number;
  scoreEstablished: number;
  scoreServicePotential: number;
  scoreLocalEngagement: number;
  badge: 'Alta oportunidade' | 'Média oportunidade' | 'Oportunidade moderada';
  reason: string;
}

export type LeadStatus = 
  | 'novo'
  | 'contato_realizado'
  | 'interessado'
  | 'proposta_enviada'
  | 'negociacao'
  | 'cliente'
  | 'perdido';

export interface Company {
  id: string;
  name: string;
  category: string;
  location: string;
  address?: string;
  city: string;
  state: string;
  phone?: string;
  website?: string;
  hasWebsite: boolean;
  rating: number;
  reviewCount: number;
  socialPresence: boolean;
  instagramHandle?: string;
  opportunityScore: OpportunityScore;
  businessHours?: string;
  googlePlaceId?: string;
  photos?: string[];
}

export interface Lead extends Company {
  leadId: string;
  userId: string;
  status: LeadStatus;
  notes: string[];
  lastContactDate?: string;
  generatedPitch?: string;
  siteProjectId?: string;
  createdAt: string;
  updatedAt: string;
}

export type SectionType = 
  | 'navbar'
  | 'hero'
  | 'about'
  | 'services'
  | 'products'
  | 'menu'
  | 'gallery'
  | 'testimonials'
  | 'benefits'
  | 'pricing'
  | 'faq'
  | 'contact'
  | 'whatsapp_floating'
  | 'map'
  | 'footer';

export interface SiteTheme {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  cardBackground: string;
  fontHeading: string;
  fontBody: string;
  borderRadius: 'rounded-none' | 'rounded-md' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-full';
  cardStyle?: 'glass' | 'solid' | 'neon' | 'shadow3d' | 'flat';
  animation?: 'fade' | 'slide-up' | 'zoom' | 'none';
  glowEffect?: boolean;
  isPremium?: boolean;
  planRequired?: 'free' | 'pro';
  layoutVariant?: 'split' | 'centered' | 'bento' | 'editorial' | 'minimal';
  buttonStyle?: 'pill' | 'rounded' | 'sharp' | 'glow';
}



export interface SiteSectionItem {
  id: string;
  title?: string;
  description: string;
  price?: string;
  tag?: string;
  icon?: string;
  image?: string;
  author?: string;
  role?: string;
  rating?: number;
}


export interface SiteSection {
  id: string;
  type: SectionType;
  title?: string;
  subtitle?: string;
  content?: string;
  badge?: string;
  enabled: boolean;
  order: number;
  items?: SiteSectionItem[];
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  imageUrl?: string;
  extraData?: Record<string, any>;
}

export interface SiteConfig {
  id: string;
  projectId: string;
  leadId?: string;
  companyName: string;
  tagline: string;
  niche: string;
  city: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  slug: string;
  status: 'draft' | 'preview' | 'published';
  theme: SiteTheme;
  sections: SiteSection[];
  publishedUrl?: string;
  creatorPlan?: PlanType;
  createdAt: string;
  updatedAt: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  actionApplied?: string;
  creditsCost?: number;
}

export interface PlanConfig {
  id: PlanType;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  priceYearly?: number;
  originalPriceYearly?: number;
  badge?: string;
  isPopular?: boolean;
  searchesLimit: number;
  searchesPeriod: 'mês' | 'dia';
  leadsLimit: number;
  aiCreditsPerDay: number;
  maxProjects: number;
  features: string[];
  limitsText: string;
}

