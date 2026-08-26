-- ============================================================
-- PROSPECTLY SAAS - SUPABASE SQL SCHEMA
-- Execute este script no SQL Editor do seu projeto Supabase
-- ============================================================

-- 1. PROFILES (Usuários)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  selected_service TEXT DEFAULT 'website_builder',
  target_region TEXT DEFAULT 'Barão de Cocais, MG',
  target_business_type TEXT DEFAULT 'Restaurantes e Barbearias',
  plan TEXT DEFAULT 'pro', -- 'free', 'pro', 'full'
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USAGE QUOTAS (Controle de Cotas e Limites)
CREATE TABLE IF NOT EXISTS public.usage_quotas (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  searches_this_month INTEGER DEFAULT 0,
  searches_limit INTEGER DEFAULT 100,
  leads_saved INTEGER DEFAULT 0,
  leads_limit INTEGER DEFAULT 100,
  ai_credits_today INTEGER DEFAULT 0,
  ai_credits_daily_limit INTEGER DEFAULT 50,
  last_credits_reset_date DATE DEFAULT CURRENT_DATE,
  projects_created INTEGER DEFAULT 0,
  projects_limit INTEGER DEFAULT 20,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. LEADS (Pipeline Comercial de Clientes)
CREATE TABLE IF NOT EXISTS public.leads (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  address TEXT,
  phone TEXT,
  website TEXT,
  has_website BOOLEAN DEFAULT FALSE,
  rating NUMERIC(2,1) DEFAULT 4.5,
  review_count INTEGER DEFAULT 0,
  opportunity_score JSONB,
  status TEXT DEFAULT 'novo', -- 'novo', 'contato_realizado', 'interessado', 'proposta_enviada', 'negociacao', 'cliente', 'perdido'
  notes JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SITES (Demonstrações e Landing Pages Criadas)
CREATE TABLE IF NOT EXISTS public.sites (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lead_id TEXT,
  company_name TEXT NOT NULL,
  tagline TEXT,
  niche TEXT,
  city TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  address TEXT,
  slug TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'draft', -- 'draft', 'preview', 'published'
  theme JSONB NOT NULL,
  sections JSONB NOT NULL,
  published_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_quotas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURANÇA (Cada usuário só vê e edita os seus próprios dados)
CREATE POLICY "Usuários podem gerenciar seu próprio perfil" 
  ON public.profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY "Usuários podem gerenciar suas próprias cotas" 
  ON public.usage_quotas FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem gerenciar seus próprios leads" 
  ON public.leads FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem gerenciar seus próprios sites" 
  ON public.sites FOR ALL USING (auth.uid() = user_id);

-- Permitir leitura pública para sites publicados (para os clientes visualizarem)
CREATE POLICY "Leitura pública de demonstrações publicadas" 
  ON public.sites FOR SELECT USING (status = 'published');
