import { User, Lead, SiteConfig, UsageQuota, Company, DemoViewEvent, CommercialProposal, AgencyProfile } from '../types';
import { SupabaseStorage } from './supabaseStorage';
import { SecurityService } from './securityService';


const STORAGE_KEYS = {
  USER: 'prospectly_user',
  LEADS: 'prospectly_leads',
  SITES: 'prospectly_sites',
  USAGE: 'prospectly_usage',
  SAVED_SEARCHES: 'prospectly_searches',
  FAVORITES: 'prospectly_favorites'
};

const DEFAULT_USER: User = {
  id: 'usr_demo_123',
  name: 'Matheus Felipe',
  email: 'matheus@prospectly.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'user',
  selectedService: 'website_builder',
  targetRegion: 'Barão de Cocais, MG',
  targetBusinessType: 'Restaurantes e Barbearias',
  onboardingCompleted: true,
  plan: 'free',
  subscriptionStatus: 'active',
  subscriptionRenewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const DEFAULT_USAGE: UsageQuota = {
  searchesThisMonth: 3,
  searchesLimit: 15,
  leadsSaved: 4,
  leadsLimit: 15,
  aiCreditsToday: 0,
  aiCreditsDailyLimit: 5, // Free: 5/dia, Pro: 20/dia, Full: 100/dia
  lastCreditsResetDate: new Date().toISOString().split('T')[0],
  projectsCreated: 1,
  projectsLimit: 3
};

export const StorageService = {
  getUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    if (!data) {
      this.setUser(DEFAULT_USER);
      return DEFAULT_USER;
    }
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_USER;
    }
  },

  setUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    const usage = this.getUsage();
    SupabaseStorage.syncUserProfile(user, usage).catch(() => {});
  },

  clearUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getUsage(): UsageQuota {
    const data = localStorage.getItem(STORAGE_KEYS.USAGE);
    const today = new Date().toISOString().split('T')[0];
    
    if (!data) {
      this.setUsage(DEFAULT_USAGE);
      return DEFAULT_USAGE;
    }

    try {
      const parsed: UsageQuota = JSON.parse(data);
      // Daily reset of AI credits if new day
      if (parsed.lastCreditsResetDate !== today) {
        parsed.aiCreditsToday = 0;
        parsed.lastCreditsResetDate = today;
        this.setUsage(parsed);
      }
      return parsed;
    } catch {
      return DEFAULT_USAGE;
    }
  },

  setUsage(usage: UsageQuota): void {
    localStorage.setItem(STORAGE_KEYS.USAGE, JSON.stringify(usage));
    const user = this.getUser();
    if (user) {
      SupabaseStorage.syncUserProfile(user, usage).catch(() => {});
    }
  },

  consumeAICredit(): { success: boolean; remaining: number; message?: string } {

    const user = this.getUser();
    const isPaid = user?.plan === 'pro' || user?.plan === 'full';

    // If free plan, check device hardware fingerprint quota
    if (!isPaid) {
      const deviceQuota = SecurityService.checkDeviceFreeQuota();
      if (!deviceQuota.allowed) {
        return {
          success: false,
          remaining: 0,
          message: deviceQuota.message || 'Limite diário gratuito atingido neste dispositivo. Faça upgrade para o Pro!'
        };
      }
    }

    const usage = this.getUsage();
    if (usage.aiCreditsToday >= usage.aiCreditsDailyLimit && !isPaid) {
      return {
        success: false,
        remaining: 0,
        message: 'Você atingiu o limite de créditos de IA para hoje. Seu limite será restaurado à meia-noite.'
      };
    }

    usage.aiCreditsToday += 1;
    this.setUsage(usage);

    if (!isPaid) {
      SecurityService.recordDeviceUsage();
    }

    const remaining = Math.max(0, usage.aiCreditsDailyLimit - usage.aiCreditsToday);
    return { success: true, remaining };
  },


  getLeads(): Lead[] {
    const data = localStorage.getItem(STORAGE_KEYS.LEADS);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveLead(lead: Lead): void {
    const leads = this.getLeads();
    const index = leads.findIndex(l => l.id === lead.id || l.leadId === lead.leadId);
    if (index >= 0) {
      leads[index] = { ...leads[index], ...lead, updatedAt: new Date().toISOString() };
    } else {
      leads.unshift({ ...lead, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));

    const user = this.getUser();
    if (user) {
      SupabaseStorage.saveLead(user.id, lead).catch(() => {});
    }
  },

  removeLead(leadId: string): void {
    const leads = this.getLeads().filter(l => l.id !== leadId && l.leadId !== leadId);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  },

  getSites(): SiteConfig[] {
    const data = localStorage.getItem(STORAGE_KEYS.SITES);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  getSiteById(id: string): SiteConfig | null {
    const sites = this.getSites();
    return sites.find(s => s.id === id || s.slug === id) || null;
  },

  saveSite(site: SiteConfig): void {
    const sites = this.getSites();
    const index = sites.findIndex(s => s.id === site.id);
    if (index >= 0) {
      sites[index] = { ...sites[index], ...site, updatedAt: new Date().toISOString() };
    } else {
      sites.unshift({ ...site, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    localStorage.setItem(STORAGE_KEYS.SITES, JSON.stringify(sites));

    const user = this.getUser();
    if (user) {
      SupabaseStorage.saveSite(user.id, site).catch(() => {});
    }
  },

  deleteSite(id: string): void {
    const sites = this.getSites().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SITES, JSON.stringify(sites));
  },

  getFavorites(): Company[] {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  isFavorite(companyId: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(c => c.id === companyId);
  },

  toggleFavorite(company: Company): boolean {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(c => c.id === company.id || (c.name === company.name && c.city === company.city));
    let isNowFavorite = false;

    const user = this.getUser();

    if (index >= 0) {
      favorites.splice(index, 1);
      isNowFavorite = false;
      if (user) {
        SupabaseStorage.removeFavorite(user.id, company.id).catch(() => {});
      }
    } else {
      favorites.unshift(company);
      isNowFavorite = true;
      if (user) {
        SupabaseStorage.saveFavorite(user.id, company).catch(() => {});
      }
    }

    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    return isNowFavorite;
  },

  // Demo Views Analytics (Lead no Radar)
  getDemoViews(): DemoViewEvent[] {
    const data = localStorage.getItem('prospectly_demo_views');
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  recordDemoView(view: Omit<DemoViewEvent, 'id' | 'viewedAt'>): void {
    const views = this.getDemoViews();
    const newView: DemoViewEvent = {
      ...view,
      id: 'view_' + Date.now(),
      viewedAt: new Date().toISOString()
    };
    views.unshift(newView);
    localStorage.setItem('prospectly_demo_views', JSON.stringify(views.slice(0, 100)));
  },

  getDemoViewsBySiteId(siteId: string): DemoViewEvent[] {
    return this.getDemoViews().filter(v => v.siteId === siteId || v.siteSlug === siteId);
  },

  // Commercial Proposals
  getProposals(): CommercialProposal[] {
    const data = localStorage.getItem('prospectly_proposals');
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveProposal(proposal: CommercialProposal): void {
    const proposals = this.getProposals();
    const index = proposals.findIndex(p => p.id === proposal.id);
    if (index >= 0) {
      proposals[index] = proposal;
    } else {
      proposals.unshift(proposal);
    }
    localStorage.setItem('prospectly_proposals', JSON.stringify(proposals));
  },

  // Agency Profile (White-Label)
  getAgencyProfile(): AgencyProfile {
    const user = this.getUser();
    if (user?.agencyProfile) return user.agencyProfile;
    const data = localStorage.getItem('prospectly_agency');
    if (data) {
      try {
        return JSON.parse(data);
      } catch {}
    }
    return {
      agencyName: user?.name ? `${user.name} Agência Digital` : 'Agência Digital Pro',
      agencyWhatsapp: '(31) 99999-9999',
      agencyEmail: user?.email || 'contato@agenciadigital.com',
      showBannerOnDemo: true
    };
  },

  setAgencyProfile(profile: AgencyProfile): void {
    localStorage.setItem('prospectly_agency', JSON.stringify(profile));
    const user = this.getUser();
    if (user) {
      user.agencyProfile = profile;
      this.setUser(user);
    }
  }
};
