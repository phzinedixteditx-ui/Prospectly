import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  Globe, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Star, 
  Target, 
  Shield, 
  BarChart3, 
  Check, 
  Building2, 
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { PLANS } from '../data/plans';

import { LightBeamBackground } from '../components/common/LightBeamBackground';

interface Props {
  onNavigate: (page: string, data?: any) => void;
}

export const LandingPage: React.FC<Props> = ({ onNavigate }) => {
  const [simNiche, setSimNiche] = useState('Restaurantes');
  const [simCity, setSimCity] = useState('Barão de Cocais, MG');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any[] | null>(null);

  const handleSimulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setScanResults(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResults([
        {
          name: 'Restaurante & Grill Sabor da Terra',
          category: simNiche,
          rating: 4.8,
          reviews: 342,
          hasWebsite: false,
          opportunityScore: 95,
          pitch: 'Nota 4.8 no Google sem site próprio. Clientes buscam cardápio e caem em links quebrados.'
        },
        {
          name: simNiche + ' Donatello & Tradição',
          category: simNiche,
          rating: 4.6,
          reviews: 189,
          hasWebsite: false,
          opportunityScore: 91,
          pitch: 'Excelente movimento local. Perde vendas diárias por não ter pedidos diretos no WhatsApp.'
        }
      ]);
    }, 1200);
  };

  const faqs = [
    {
      q: 'O que é o Prospectly?',
      a: 'O Prospectly é uma plataforma B2B de prospecção ativa e vendas. Ela identifica empresas locais sem site próprio que possuem alta reputação no Google Maps via Apify, calcula o potencial de conversão e gera uma demonstração pronta com fotos e avaliações reais.'
    },
    {
      q: 'Como funciona a geração de demonstrações?',
      a: 'Ao selecionar qualquer empresa mapeada pela busca, o sistema estrutura uma página comercial completa com as fotos reais do Google Maps, catálogo de serviços/cardápio, avaliações verificadas do Google e botão direto de WhatsApp.'
    },
    {
      q: 'Como os créditos diários funcionam?',
      a: 'Cada plano possui uma cota de créditos diários renovados automaticamente a cada 24 horas (Free: 5/dia, Pro: 20/dia, Full: 100/dia). Você pode usá-los para consultas de inteligência, criação de sites e abordagens comerciais.'
    },
    {
      q: 'Como é calculado o Opportunity Score?',
      a: 'O algoritmo avalia 5 critérios ponderados: ausência de site (+30), presença no Instagram (+15), volume de avaliações Google (+15), reputação (+10) e potencial de faturamento (+20), gerando uma pontuação de 0 a 100.'
    }
  ];

  return (
    <div className="space-y-24 pb-24 text-zinc-100">
      
      {/* HERO SECTION WITH PRISMATIC CHROMATIC LIGHT BEAM */}
      <section className="relative pt-20 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto space-y-7 animate-slide-up overflow-hidden rounded-3xl">
        <LightBeamBackground opacity={0.85} />
        
        {/* Pill Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-300 text-xs font-semibold shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-zinc-100 animate-pulse"></span>
          Inteligência Comercial & Prospecção B2B
        </div>

        {/* Main Headline */}
        <h1 className="relative z-10 text-4xl sm:text-6xl font-serif tracking-tight text-white leading-[1.1] drop-shadow-2xl">
          Encontre empresas sem site. <br />
          <span className="text-zinc-400 font-sans">Apresente a solução pronta.</span> <br />
          Feche contratos com alta margem.
        </h1>

        {/* Subtitle */}
        <p className="relative z-10 text-base sm:text-lg text-zinc-300/90 max-w-2xl mx-auto leading-relaxed font-normal">
          O Prospectly analisa bases comerciais reais do Google Maps via Apify, identifica comércios com alto fluxo sem presença digital e cria demonstrações com fotos e dados reais em segundos.
        </p>

        {/* CTAs */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('register')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-100 px-7 py-3.5 rounded-xl shadow-xl shadow-black/40 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            Começar Gratuitamente
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('scanner-demo');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 px-6 py-3.5 rounded-xl border border-zinc-700/80 transition-all active:scale-95 backdrop-blur-md cursor-pointer"
          >
            <Search className="w-4 h-4 text-zinc-400" />
            Simular Busca de Empresas
          </button>
        </div>

        {/* Trust Points */}
        <div className="relative z-10 pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <Check className="w-3.5 h-3.5 text-zinc-100" /> 1-Click Login com Google
          </span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <Check className="w-3.5 h-3.5 text-zinc-100" /> 5 créditos diários no plano Free
          </span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <Check className="w-3.5 h-3.5 text-zinc-100" /> Dados reais do Google Maps
          </span>
        </div>
      </section>



      {/* LIVE SCANNER DEMO */}
      <section id="scanner-demo" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="saas-card p-6 sm:p-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Demonstração Interativa</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                Simulador de Prospecção Local
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Base de dados nacional conectada
            </div>
          </div>

          {/* Search Inputs */}
          <form onSubmit={handleSimulateScan} className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-6">
            <div className="sm:col-span-5">
              <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Segmento de Mercado</label>
              <select
                value={simNiche}
                onChange={(e) => setSimNiche(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-zinc-400"
              >
                <option value="Restaurantes">Restaurantes & Gastronomia</option>
                <option value="Barbearias">Barbearias & Salões</option>
                <option value="Clínicas Odontológicas">Clínicas & Odontologia</option>
                <option value="Advocacia">Escritórios de Advocacia</option>
                <option value="Academias">Academias & Fitness</option>
              </select>
            </div>

            <div className="sm:col-span-5">
              <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Cidade / Região</label>
              <input
                type="text"
                value={simCity}
                onChange={(e) => setSimCity(e.target.value)}
                placeholder="Digite uma cidade (ex: São Paulo ou Barão de Cocais)"
                className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                disabled={isScanning}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-zinc-100 hover:bg-white transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
              >
                <Search className="w-3.5 h-3.5" />
                {isScanning ? 'Consultando...' : 'Pesquisar'}
              </button>
            </div>
          </form>

          {/* Results Area */}
          {isScanning && (
            <div className="py-10 text-center text-xs text-zinc-400">
              <p className="font-semibold text-white">Consultando estabelecimentos em {simCity}...</p>
              <p className="text-[11px] text-zinc-500 mt-1">Cruzando dados de reputação e presença de domínio.</p>
            </div>
          )}

          {scanResults && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
                <span>Resultados Encontrados:</span>
                <span className="text-emerald-400">2 empresas qualificadas para abordagem</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scanResults.map((r, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white">{r.name}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mt-0.5">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{r.rating} ({r.reviews} avaliações no Google)</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60">
                        Score {r.opportunityScore}/100
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/80">
                      <strong>Diagnóstico:</strong> {r.pitch}
                    </p>

                    <button
                      onClick={() => onNavigate('register')}
                      className="w-full py-2 rounded-lg text-xs font-bold text-zinc-950 bg-zinc-100 hover:bg-white transition-all shadow-sm active:scale-95"
                    >
                      Acessar e Gerar Demonstração
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* THREE PILLARS OF OPERATION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Metodologia Comercial</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Como a plataforma acelera suas vendas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="saas-card p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-800/90 border border-zinc-700/80 flex items-center justify-center text-zinc-200 font-bold">
              1
            </div>
            <h3 className="font-bold text-base text-white">Mapeamento e Filtro</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Filtre estabelecimentos comerciais por nicho e cidade. Isole negócios reais com alto fluxo que não possuem site próprio.
            </p>
          </div>

          <div className="saas-card p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-800/90 border border-zinc-700/80 flex items-center justify-center text-zinc-200 font-bold">
              2
            </div>
            <h3 className="font-bold text-base text-white">Criação da Demonstração</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              O motor estruturado gera uma página profissional com serviços, fotos, prova social do Google e chamada direta para WhatsApp.
            </p>
          </div>

          <div className="saas-card p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-800/90 border border-zinc-700/80 flex items-center justify-center text-zinc-200 font-bold">
              3
            </div>
            <h3 className="font-bold text-base text-white">Abordagem Consultiva</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Envie mensagens personalizadas convidando o dono do negócio a ver a demonstração pronta sem compromisso.
            </p>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Planos & Preços</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Tabela transparente para profissionais e agências</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(PLANS).map(plan => (
            <div
              key={plan.id}
              className={`saas-card p-7 flex flex-col justify-between relative ${
                plan.isPopular ? 'border-zinc-500 bg-zinc-900/90 shadow-2xl' : 'border-zinc-800'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-zinc-100 text-zinc-950 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-white">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5 min-h-[32px]">{plan.tagline}</p>
                </div>

                <div className="mb-4">
                  {plan.originalPrice && (
                    <span className="text-xs text-zinc-500 line-through mr-1.5 font-medium">
                      R$ {plan.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  )}
                  <span className="text-3xl font-extrabold text-white">
                    R$ {plan.price === 0 ? '0' : plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs text-zinc-400"> /mês</span>
                  <p className="text-xs text-zinc-300 font-semibold mt-1">{plan.limitsText}</p>
                </div>

                <div className="space-y-2.5 border-t border-zinc-800 pt-4 mb-6">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-zinc-100 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('register')}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                  plan.isPopular
                    ? 'bg-zinc-100 hover:bg-white text-zinc-950 shadow-md'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700'
                }`}
              >
                {plan.price === 0 ? 'Começar Grátis' : 'Assinar ' + plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>


      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Dúvidas Frequentes</h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, i) => (
            <details key={i} className="saas-card p-4 group cursor-pointer text-left">
              <summary className="font-semibold text-xs sm:text-sm text-white flex items-center justify-between list-none">
                <span>{faq.q}</span>
                <span className="text-slate-400 font-bold group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed border-t border-slate-800 pt-2 font-normal">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
};


