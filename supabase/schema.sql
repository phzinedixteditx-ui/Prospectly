-- =========================================================
-- PROSPECTLY B2B - SUPABASE DATABASE SCHEMA
-- Execute este script no SQL Editor do seu projeto Supabase
-- =========================================================

-- 1. Tabela de Perfis de Usuários (Controle de Planos & Créditos Diários)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  avatar TEXT,
  plan TEXT DEFAULT 'free',
  role TEXT DEFAULT 'user',
  target_region TEXT,
  target_business_type TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  ai_credits_today INT DEFAULT 0,
  ai_credits_daily_limit INT DEFAULT 5,
  last_credits_reset_date TEXT,
  searches_this_month INT DEFAULT 0,
  searches_limit INT DEFAULT 15,
  leads_saved INT DEFAULT 0,
  leads_limit INT DEFAULT 15,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Empresas Favoritadas por Usuário
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  company_id TEXT NOT NULL,
  company_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, company_id)
);

-- 3. Tabela de Leads Salvos no CRM
CREATE TABLE IF NOT EXISTS public.leads (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  company JSONB NOT NULL,
  status TEXT DEFAULT 'new',
  priority TEXT DEFAULT 'medium',
  notes JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela de Sites / Demonstrações Comerciais Geradas
CREATE TABLE IF NOT EXISTS public.sites (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  company_name TEXT NOT NULL,
  slug TEXT NOT NULL,
  config JSONB NOT NULL,
  published_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS) se desejado
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público/anon (para acesso direto via publishable key)
CREATE POLICY "Permitir acesso completo a profiles" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Permitir acesso completo a favorites" ON public.favorites FOR ALL USING (true);
CREATE POLICY "Permitir acesso completo a leads" ON public.leads FOR ALL USING (true);
CREATE POLICY "Permitir acesso completo a sites" ON public.sites FOR ALL USING (true);
