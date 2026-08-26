import { PlanType, User } from '../types';
import { PLANS } from '../data/plans';
import { StorageService } from './storage';

export const PaymentService = {
  async createCheckout(planId: PlanType, user: User): Promise<{ checkoutUrl?: string; success: boolean; message: string }> {
    const plan = PLANS[planId];
    if (!plan) return { success: false, message: 'Plano não encontrado' };

    // Mock checkout flow (In production, connects to Mercado Pago Preference API)
    return new Promise(resolve => {
      setTimeout(() => {
        const updatedUser: User = {
          ...user,
          plan: planId,
          subscriptionStatus: 'active',
          subscriptionRenewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString()
        };

        const usage = StorageService.getUsage();
        usage.searchesLimit = plan.searchesLimit;
        usage.leadsLimit = plan.leadsLimit;
        usage.aiCreditsDailyLimit = plan.aiCreditsPerDay;
        usage.projectsLimit = plan.maxProjects;

        StorageService.setUser(updatedUser);
        StorageService.setUsage(usage);

        resolve({
          success: true,
          message: 'Assinatura do plano ' + plan.name + ' ativada com sucesso!'
        });
      }, 1000);
    });
  },

  async cancelSubscription(user: User): Promise<{ success: boolean; message: string }> {
    return new Promise(resolve => {
      setTimeout(() => {
        const updatedUser: User = {
          ...user,
          plan: 'free',
          subscriptionStatus: 'canceled',
          updatedAt: new Date().toISOString()
        };
        const freePlan = PLANS.free;
        const usage = StorageService.getUsage();
        usage.searchesLimit = freePlan.searchesLimit;
        usage.leadsLimit = freePlan.leadsLimit;
        usage.aiCreditsDailyLimit = freePlan.aiCreditsPerDay;
        usage.projectsLimit = freePlan.maxProjects;

        StorageService.setUser(updatedUser);
        StorageService.setUsage(usage);

        resolve({
          success: true,
          message: 'Assinatura cancelada. Seu acesso continuará no plano Free.'
        });
      }, 800);
    });
  }
};
