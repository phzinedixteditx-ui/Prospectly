import { SiteTheme } from '../types';

export const DEFAULT_THEMES: SiteTheme[] = [
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    primaryColor: '#6366f1', // Indigo
    accentColor: '#818cf8',
    backgroundColor: '#090a10',
    textColor: '#f8fafc',
    cardBackground: '#12141f',
    fontHeading: 'Space Grotesk',
    fontBody: 'Plus Jakarta Sans',
    borderRadius: 'rounded-xl'
  },
  {
    id: 'luxury-gold',
    name: 'Luxury & Gold',
    primaryColor: '#d97706', // Amber/Gold
    accentColor: '#f59e0b',
    backgroundColor: '#0c0a09',
    textColor: '#fef3c7',
    cardBackground: '#1c1917',
    fontHeading: 'Cinzel',
    fontBody: 'Plus Jakarta Sans',
    borderRadius: 'rounded-lg'
  },
  {
    id: 'emerald-fresh',
    name: 'Emerald Health',
    primaryColor: '#059669', // Emerald
    accentColor: '#10b981',
    backgroundColor: '#064e3b',
    textColor: '#ecfdf5',
    cardBackground: '#065f46',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans',
    borderRadius: 'rounded-2xl'
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Tech',
    primaryColor: '#0284c7', // Sky blue
    accentColor: '#38bdf8',
    backgroundColor: '#082f49',
    textColor: '#f0f9ff',
    cardBackground: '#0c4a6e',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans',
    borderRadius: 'rounded-xl'
  },
  {
    id: 'clean-light',
    name: 'Clean Minimal',
    primaryColor: '#4f46e5',
    accentColor: '#6366f1',
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    cardBackground: '#f8fafc',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans',
    borderRadius: 'rounded-xl'
  }
];

export const getThemeForNiche = (niche: string): SiteTheme => {
  const lower = niche.toLowerCase();
  if (lower.includes('barbearia') || lower.includes('advocacia') || lower.includes('joalheria') || lower.includes('luxo')) {
    return DEFAULT_THEMES[1]; // Luxury Gold
  }
  if (lower.includes('clinica') || lower.includes('saude') || lower.includes('odonto') || lower.includes('nutri')) {
    return DEFAULT_THEMES[2]; // Emerald Health
  }
  if (lower.includes('restaurante') || lower.includes('hamburgueria') || lower.includes('pizzaria') || lower.includes('cafe')) {
    return DEFAULT_THEMES[1]; // Gold/Warm
  }
  if (lower.includes('tech') || lower.includes('contabilidade') || lower.includes('engenharia')) {
    return DEFAULT_THEMES[3]; // Ocean Tech
  }
  return DEFAULT_THEMES[0]; // Modern Dark
};
