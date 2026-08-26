import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UsageQuota, ServiceType, PlanType } from '../types';
import { StorageService } from '../services/storage';
import { GoogleAuthService } from '../services/googleAuth';
import { PLANS } from '../data/plans';

interface AuthContextType {
  user: User | null;
  usage: UsageQuota;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => Promise<boolean>;
  loginWithGoogle: (customUser?: { name: string; email: string; avatar?: string }) => Promise<boolean>;
  register: (name: string, email: string, service?: ServiceType) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  changePlan: (plan: PlanType) => void;
  completeOnboarding: (service: ServiceType, region: string, businessType: string) => void;
  consumeAICredit: (amount?: number) => boolean;
  consumeSearch: () => boolean;
  incrementLeads: () => boolean;
  incrementProjects: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [usage, setUsage] = useState<UsageQuota>(StorageService.getUsage());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = StorageService.getUser();
    setUser(storedUser);
    setUsage(StorageService.getUsage());
    setLoading(false);
  }, []);

  const loginWithGoogle = async (customUser?: { name: string; email: string; avatar?: string }): Promise<boolean> => {
    let profile = customUser;
    if (!profile) {
      profile = await GoogleAuthService.signInWithGoogle();
    }

    if (!profile || !profile.email) {
      return false;
    }

    const name = profile.name || profile.email.split('@')[0];
    const email = profile.email;
    const avatar = profile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=0D8ABC&color=fff&size=200`;

    const googleUser: User = {
      id: 'google_' + Math.random().toString(36).substring(2, 9),
      name,
      email,
      avatar,
      role: 'user',
      selectedService: 'website_builder',
      targetRegion: 'Brasil',
      targetBusinessType: 'Negócios Locais',
      onboardingCompleted: true,
      plan: 'free',
      subscriptionStatus: 'active',
      subscriptionRenewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    StorageService.setUser(googleUser);
    setUser(googleUser);

    // Set Free quotas (5 AI credits/day)
    const freeUsage: UsageQuota = {
      searchesThisMonth: 0,
      searchesLimit: 15,
      leadsSaved: 0,
      leadsLimit: 15,
      aiCreditsToday: 0,
      aiCreditsDailyLimit: 5, // Free: 5/dia
      lastCreditsResetDate: new Date().toISOString().split('T')[0],
      projectsCreated: 0,
      projectsLimit: 3
    };
    StorageService.setUsage(freeUsage);
    setUsage(freeUsage);

    return true;
  };

  const login = async (email: string, name: string = 'Usuário'): Promise<boolean> => {
    const existing = StorageService.getUser();
    const newUser: User = existing || {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: name || 'Usuário Prospectly',
      email,
      role: 'user',
      selectedService: 'website_builder',
      onboardingCompleted: true,
      plan: 'free',
      subscriptionStatus: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    StorageService.setUser(newUser);
    setUser(newUser);
    return true;
  };

  const changePlan = (newPlan: PlanType) => {
    if (!user) return;
    const updatedUser = { ...user, plan: newPlan, updatedAt: new Date().toISOString() };
    StorageService.setUser(updatedUser);
    setUser(updatedUser);

    const limits = newPlan === 'full' 
      ? { searchesLimit: 500, leadsLimit: 500, aiCreditsDailyLimit: 100, projectsLimit: 100 }
      : newPlan === 'pro'
      ? { searchesLimit: 100, leadsLimit: 100, aiCreditsDailyLimit: 20, projectsLimit: 20 }
      : { searchesLimit: 15, leadsLimit: 15, aiCreditsDailyLimit: 5, projectsLimit: 3 };

    const updatedUsage = {
      ...usage,
      ...limits
    };
    StorageService.setUsage(updatedUsage);
    setUsage(updatedUsage);
  };


  const register = async (name: string, email: string, service: ServiceType = 'website_builder'): Promise<boolean> => {
    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name,
      email,
      role: 'user',
      selectedService: service,
      onboardingCompleted: false,
      plan: 'free',
      subscriptionStatus: 'trialing',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    StorageService.setUser(newUser);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    StorageService.clearUser();
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data, updatedAt: new Date().toISOString() };
    StorageService.setUser(updated);
    setUser(updated);
  };

  const completeOnboarding = (service: ServiceType, region: string, businessType: string) => {
    if (!user) return;
    const updated: User = {
      ...user,
      selectedService: service,
      targetRegion: region,
      targetBusinessType: businessType,
      onboardingCompleted: true,
      updatedAt: new Date().toISOString()
    };
    StorageService.setUser(updated);
    setUser(updated);
  };

  const consumeAICredit = (amount: number = 1): boolean => {
    const currentUsage = StorageService.getUsage();
    if (currentUsage.aiCreditsToday + amount > currentUsage.aiCreditsDailyLimit) {
      return false;
    }
    const updatedUsage = {
      ...currentUsage,
      aiCreditsToday: currentUsage.aiCreditsToday + amount
    };
    StorageService.setUsage(updatedUsage);
    setUsage(updatedUsage);
    return true;
  };

  const consumeSearch = (): boolean => {
    const currentUsage = StorageService.getUsage();
    if (currentUsage.searchesThisMonth >= currentUsage.searchesLimit) {
      return false;
    }
    const updatedUsage = {
      ...currentUsage,
      searchesThisMonth: currentUsage.searchesThisMonth + 1
    };
    StorageService.setUsage(updatedUsage);
    setUsage(updatedUsage);
    return true;
  };

  const incrementLeads = (): boolean => {
    const currentUsage = StorageService.getUsage();
    if (currentUsage.leadsSaved >= currentUsage.leadsLimit) {
      return false;
    }
    const updatedUsage = {
      ...currentUsage,
      leadsSaved: currentUsage.leadsSaved + 1
    };
    StorageService.setUsage(updatedUsage);
    setUsage(updatedUsage);
    return true;
  };

  const incrementProjects = (): boolean => {
    const currentUsage = StorageService.getUsage();
    if (currentUsage.projectsCreated >= currentUsage.projectsLimit) {
      return false;
    }
    const updatedUsage = {
      ...currentUsage,
      projectsCreated: currentUsage.projectsCreated + 1
    };
    StorageService.setUsage(updatedUsage);
    setUsage(updatedUsage);
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      usage,
      isAuthenticated: !!user,
      login,
      loginWithGoogle,
      register,
      logout,
      updateUser,
      changePlan,
      completeOnboarding,
      consumeAICredit,
      consumeSearch,
      incrementLeads,
      incrementProjects
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

