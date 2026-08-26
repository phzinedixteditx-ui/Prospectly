import { supabase, isSupabaseConfigured } from './supabaseClient';
import { User, UsageQuota, Company, Lead, SiteConfig } from '../types';

export const SupabaseStorage = {
  /**
   * Sync User Profile and Daily Credits with Supabase
   */
  async syncUserProfile(user: User, usage: UsageQuota): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          plan: user.plan,
          role: user.role,
          target_region: user.targetRegion,
          target_business_type: user.targetBusinessType,
          onboarding_completed: user.onboardingCompleted,
          ai_credits_today: usage.aiCreditsToday,
          ai_credits_daily_limit: usage.aiCreditsDailyLimit,
          last_credits_reset_date: usage.lastCreditsResetDate,
          searches_this_month: usage.searchesThisMonth,
          searches_limit: usage.searchesLimit,
          leads_saved: usage.leadsSaved,
          leads_limit: usage.leadsLimit,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (error) {
        console.warn('Supabase syncUserProfile error:', error.message);
      }
    } catch (err) {
      console.warn('Supabase syncUserProfile failed:', err);
    }
  },

  /**
   * Fetch User Profile & Usage from Supabase
   */
  async fetchUserProfile(userId: string): Promise<{ user?: Partial<User>; usage?: Partial<UsageQuota> } | null> {
    if (!isSupabaseConfigured || !supabase) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error || !data) return null;

      const user: Partial<User> = {
        id: data.id,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        plan: data.plan,
        role: data.role,
        targetRegion: data.target_region,
        targetBusinessType: data.target_business_type,
        onboardingCompleted: data.onboarding_completed
      };

      const usage: Partial<UsageQuota> = {
        aiCreditsToday: data.ai_credits_today ?? 0,
        aiCreditsDailyLimit: data.ai_credits_daily_limit ?? 5,
        lastCreditsResetDate: data.last_credits_reset_date,
        searchesThisMonth: data.searches_this_month ?? 0,
        searchesLimit: data.searches_limit ?? 15,
        leadsSaved: data.leads_saved ?? 0,
        leadsLimit: data.leads_limit ?? 15
      };

      return { user, usage };
    } catch (err) {
      console.warn('Supabase fetchUserProfile error:', err);
      return null;
    }
  },

  /**
   * Save Favorited Company to Supabase
   */
  async saveFavorite(userId: string, company: Company): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      await supabase
        .from('favorites')
        .upsert({
          user_id: userId,
          company_id: company.id,
          company_data: company,
          created_at: new Date().toISOString()
        }, { onConflict: 'user_id,company_id' });
    } catch (err) {
      console.warn('Supabase saveFavorite error:', err);
    }
  },

  /**
   * Remove Favorited Company from Supabase
   */
  async removeFavorite(userId: string, companyId: string): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('company_id', companyId);
    } catch (err) {
      console.warn('Supabase removeFavorite error:', err);
    }
  },

  /**
   * Fetch All Favorites for a User from Supabase
   */
  async fetchFavorites(userId: string): Promise<Company[]> {
    if (!isSupabaseConfigured || !supabase) return [];

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('company_data')
        .eq('user_id', userId);

      if (error || !data) return [];
      return data.map(row => row.company_data as Company);
    } catch (err) {
      console.warn('Supabase fetchFavorites error:', err);
      return [];
    }
  },

  /**
   * Save Lead to Supabase
   */
  async saveLead(userId: string, lead: Lead): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      await supabase
        .from('leads')
        .upsert({
          id: lead.id || lead.leadId,
          user_id: userId,
          name: lead.name,
          category: lead.category,
          location: lead.location,
          address: lead.address,
          city: lead.city,
          state: lead.state,
          phone: lead.phone,
          website: lead.website,
          has_website: lead.hasWebsite,
          rating: lead.rating,
          review_count: lead.reviewCount,
          status: lead.status,
          notes: lead.notes,
          lead_data: lead,
          created_at: lead.createdAt || new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
    } catch (err) {
      console.warn('Supabase saveLead error:', err);
    }
  },

  /**
   * Fetch Leads from Supabase
   */
  async fetchLeads(userId: string): Promise<Lead[]> {
    if (!isSupabaseConfigured || !supabase) return [];

    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error || !data) return [];

      return data.map(row => (row.lead_data as Lead) || {
        ...row,
        leadId: row.id,
        userId: row.user_id,
        hasWebsite: row.has_website,
        reviewCount: row.review_count,
        notes: row.notes || [],
        opportunityScore: {
          total: 85,
          hasWebsite: row.has_website,
          scoreNoWebsite: 30,
          scoreSocialActive: 15,
          scoreHighReviews: 15,
          scoreEstablished: 10,
          scoreServicePotential: 15,
          scoreLocalEngagement: 10,
          badge: 'Alta oportunidade',
          reason: 'Lead importado do Supabase'
        },
        socialPresence: true,
        createdAt: row.created_at,
        updatedAt: row.updated_at || row.created_at
      } as Lead);
    } catch (err) {
      console.warn('Supabase fetchLeads error:', err);
      return [];
    }
  },


  /**
   * Save Site / Demo Project to Supabase
   */
  async saveSite(userId: string, site: SiteConfig): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      await supabase
        .from('sites')
        .upsert({
          id: site.id,
          user_id: userId,
          company_name: site.companyName,
          slug: site.slug,
          config: site,
          published_url: site.publishedUrl,
          created_at: site.createdAt || new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
    } catch (err) {
      console.warn('Supabase saveSite error:', err);
    }
  },

  /**
   * Fetch User Sites from Supabase
   */
  async fetchSites(userId: string): Promise<SiteConfig[]> {
    if (!isSupabaseConfigured || !supabase) return [];

    try {
      const { data, error } = await supabase
        .from('sites')
        .select('config')
        .eq('user_id', userId);

      if (error || !data) return [];
      return data.map(row => row.config as SiteConfig);
    } catch (err) {
      console.warn('Supabase fetchSites error:', err);
      return [];
    }
  }
};
