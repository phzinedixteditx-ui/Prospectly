const fs = require('fs');
const path = require('path');

const write = (file, content) => {
  const full = path.join(__dirname, '..', file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\n', 'utf-8');
  console.log('Created: ' + file);
};

// 1. Landing Page
write('src/pages/LandingPage.tsx', `
import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  Brain, 
  Globe, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Zap, 
  ChevronRight,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react';
import { PLANS } from '../data/plans';

interface Props {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<Props> = ({ onNavigate }) => {
  const faqs = [
    {
      q: 'O que exatamente é o Prospectly?',
      a: 'O Prospectly não é apenas um criador de sites. É uma máquina de prospecção inteligente B2B que encontra empresas que precisam dos seus serviços na sua região e, em segundos, gera uma demonstração interativa pronta da solução para você enviar ao cliente antes de fazer a abordagem.'
    },
    {
      q: 'Como funcionam os créditos de IA diários?',
      a: 'Cada plano possui uma cota de créditos de IA por dia (Free: 5/dia, Pro: 20/dia, Full: 200/dia). Eles são renovados automaticamente todo início de dia (não acumulam), garantindo que você tenha capacidade de geração contínua.'
    },
    {
      q: 'Como o Opportunity Score calcula a pontuação?',
      a: 'Nosso algoritmo analisa ausência de site (+30 pts), redes sociais ativas (+15 pts), quantidade de avaliações Google (+15 pts), tempo de mercado (+10 pts) e potencial comercial (+20 pts), gerando uma nota de 0 a 100 com justificativa clara.'
    },
    {
      q: 'Posso editar o site gerado pela IA?',
      a: 'Sim! Com o Editor por IA, basta digitar o que deseja alterar (ex: "Mude as cores para preto e dourado", "Adicione botão de WhatsApp", "Coloque depoimentos") e o sistema aplica instantaneamente no código estruturado.'
    },
    {
      q: 'Posso cancelar a assinatura quando quiser?',
      a: 'Sim, sem multas ou fidelidade. O cancelamento pode ser feito em 1 clique direto na página "Minha Assinatura".'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-16 sm:pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        {/* Glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-bold backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>A Máquina de Prospecção & Demonstração Inteligente</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Encontre clientes. <br className="hidden sm:block" />
            <span className="gradient-text">Crie a solução.</span> <br className="hidden sm:block" />
            Feche a venda.
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            O <strong className="text-white">Prospectly</strong> encontra empresas que precisam do seu serviço e usa IA para preparar uma demonstração personalizada pronta para você apresentar e vender antes de todo mundo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('register')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Começar Gratuitamente
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-base font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 px-8 py-4 rounded-2xl border border-white/10 transition-all"
            >
              Ver Planos & Preços
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sem necessidade de cartão no Free
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 5 créditos de IA diários grátis
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Demonstração ao vivo em segundos
            </span>
          </div>
        </div>
      </section>

      {/* THE 5 STEPS (FLUXO PRINCIPAL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">O Ciclo de Venda Perfeito</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Como Funciona a Máquina Prospectly</h2>
          <p className="text-sm text-slate-400">Da busca de empresas sem site até a publicação final da solução vendida.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'Encontre',
              desc: 'Pesquise por nicho e cidade (ex: Restaurantes em Barão de Cocais, MG) e ache empresas.',
              icon: Search,
              color: 'from-blue-600 to-indigo-600'
            },
            {
              step: '02',
              title: 'Analise',
              desc: 'O Opportunity Score identifica quem tem boa reputação mas NÃO possui site próprio.',
              icon: Brain,
              color: 'from-amber-600 to-orange-600'
            },
            {
              step: '03',
              title: 'Crie',
              desc: 'A IA monta instantaneamente um site completo personalizado com o nome, fotos e cardápio/serviços.',
              icon: Globe,
              color: 'from-emerald-600 to-teal-600'
            },
            {
              step: '04',
              title: 'Venda',
              desc: 'Gere uma abordagem amigável pelo WhatsApp enviando o link da demonstração já pronta.',
              icon: MessageSquare,
              color: 'from-purple-600 to-pink-600'
            },
            {
              step: '05',
              title: 'Publique',
              desc: 'Cliente aprovou? Ajuste pelo editor em linguagem natural e publique o site online.',
              icon: Send,
              color: 'from-rose-600 to-red-600'
            }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="glass-card p-6 rounded-3xl border border-white/5 space-y-4 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono font-bold text-xs text-slate-500">{item.step}</span>
                    <div className={\`w-10 h-10 rounded-2xl bg-gradient-to-tr \${item.color} flex items-center justify-center text-white shadow-lg\`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Público-Alvo</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Para quem quer faturar alto prestando serviços digitais
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Não entregamos apenas uma lista fria de telefones. Ajudamos você a chegar no cliente com a solução pronta na mão. Quem vê uma demonstração do próprio negócio funcionando dificilmente diz "não".
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Criadores de Sites & Devs',
                'Freelancers & Designers',
                'Agências de Marketing',
                'Editores de Vídeo',
                'Gestores de Tráfego Pago',
                'Especialistas em Automação'
              ].map((role, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demonstration card preview */}
          <div className="p-6 rounded-2xl bg-[#090a12] border border-indigo-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Exemplo de Oportunidade Identificada
              </span>
              <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Score 94/100
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-base text-white">Restaurante Sabor da Casa</p>
              <p className="text-slate-400">⭐ 4.7 (843 avaliações) • Barão de Cocais, MG</p>
              <p className="text-rose-400 font-semibold">❌ Sem site próprio cadastrado</p>
              <p className="text-emerald-400 font-semibold">✅ Instagram ativo e alta reputação</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5 text-xs text-slate-300">
              <p className="font-semibold text-indigo-300 mb-1">Demonstração IA Gerada em 2 seg:</p>
              <p className="text-slate-400 italic">"Site completo com cardápio digital, fotos dos pratos e botão WhatsApp direto para pedidos."</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLANS & PRICING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Planos Transparentes</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Escolha o Plano Ideal para a sua Escala</h2>
          <p className="text-sm text-slate-400">Comece gratuitamente e evolua conforme fechar seus primeiros clientes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(PLANS).map(plan => (
            <div
              key={plan.id}
              className={\`glass-card p-8 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 hover:scale-102 \${
                plan.isPopular
                  ? 'border-indigo-500 shadow-2xl shadow-indigo-500/20 bg-indigo-950/20'
                  : 'border-white/10 hover:border-white/20'
              }\`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="font-bold text-xl text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.tagline}</p>
                </div>

                <div className="mb-6">
                  {plan.originalPrice && (
                    <span className="text-xs text-slate-500 line-through mr-2 font-medium">
                      R$ {plan.originalPrice}/mês
                    </span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white tracking-tight">
                      R$ {plan.price}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">/mês</span>
                  </div>
                  <p className="text-xs text-indigo-400 font-semibold mt-1">{plan.limitsText}</p>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-6 mb-8">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('register')}
                className={\`w-full py-3.5 rounded-2xl text-xs font-bold transition-all \${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:brightness-110 shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border border-white/10'
                }\`}
              >
                {plan.price === 0 ? 'Começar Gratuitamente' : 'Assinar Plano ' + plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Perguntas Frequentes</h2>
          <p className="text-xs text-slate-400">Tire todas as suas dúvidas sobre o Prospectly.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="glass-card p-5 rounded-2xl border border-white/5 group cursor-pointer text-left">
              <summary className="font-bold text-sm text-white flex items-center justify-between">
                <span>{faq.q}</span>
                <ChevronRight className="w-4 h-4 text-indigo-400 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed border-t border-white/5 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-tr from-indigo-950 via-[#0d0e17] to-slate-900 border border-indigo-500/40 shadow-2xl relative overflow-hidden space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Pronto para transformar empresas sem site em clientes pagantes?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Crie sua conta em 30 segundos e gere sua primeira demonstração gratuita hoje mesmo.
          </p>
          <button
            onClick={() => onNavigate('register')}
            className="inline-flex items-center gap-2 text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
          >
            Criar Minha Conta Grátis
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};
`);

// 2. Login Page
write('src/pages/LoginPage.tsx', `
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<Props> = ({ onNavigate }) => {
  const [email, setEmail] = useState('matheus@prospectly.ai');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Informe seu e-mail');
      return;
    }
    setLoading(true);
    await login(email, 'Matheus Felipe');
    setLoading(false);
    toast.success('Bem-vindo de volta ao Prospectly!');
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#0e101a] border border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-indigo-600/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Acesse sua conta</h2>
          <p className="text-xs text-slate-400">Entre na sua máquina de prospecção inteligente</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">E-mail Profissional</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@empresa.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">Senha</label>
              <button 
                type="button" 
                onClick={() => toast.info('Link de recuperação enviado (simulação)')}
                className="text-[11px] text-indigo-400 hover:underline"
              >
                Esqueceu a senha?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Acessando...' : 'Entrar no Prospectly'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/5">
          <p className="text-xs text-slate-400">
            Ainda não tem uma conta?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-indigo-400 font-semibold hover:underline"
            >
              Cadastre-se grátis
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
`);

// 3. Register Page
write('src/pages/RegisterPage.tsx', `
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sparkles, ArrowRight, User, Mail, Lock } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export const RegisterPage: React.FC<Props> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }
    setLoading(true);
    await register(name, email, 'website_builder');
    setLoading(false);
    toast.success('Conta criada com sucesso! Complete seu onboarding.');
    onNavigate('onboarding');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#0e101a] border border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center mx-auto text-white shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Criar Conta Gratuita</h2>
          <p className="text-xs text-slate-400">Comece a encontrar clientes e gerar sites em 1 clique</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Seu Nome Completo</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Matheus Felipe"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Seu E-mail Profissional</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@empresa.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Criar Senha Segura</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Pelo menos 6 dígitos"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Criando conta...' : 'Continuar para Onboarding'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/5">
          <p className="text-xs text-slate-400">
            Já possui uma conta?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-indigo-400 font-semibold hover:underline"
            >
              Fazer login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
`);

// 4. Onboarding Page (3 Steps)
write('src/pages/OnboardingPage.tsx', `
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ServiceType } from '../types';
import { Globe, Megaphone, Video, TrendingUp, Bot, Palette, Check, ArrowRight, Sparkles, MapPin, Building2 } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export const OnboardingPage: React.FC<Props> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceType>('website_builder');
  const [region, setRegion] = useState('Barão de Cocais, MG');
  const [businessType, setBusinessType] = useState('Restaurantes, Barbearias e Clínicas');
  const { completeOnboarding } = useAuth();
  const toast = useToast();

  const servicesList: Array<{ id: ServiceType; title: string; icon: any; available: boolean; badge?: string; desc: string }> = [
    {
      id: 'website_builder',
      title: 'Criação de Sites',
      icon: Globe,
      available: true,
      badge: 'Principal',
      desc: 'Encontre empresas sem site e gere demonstrações completas por IA instantaneamente.'
    },
    {
      id: 'marketing',
      title: 'Agência de Marketing',
      icon: Megaphone,
      available: false,
      badge: 'Em breve',
      desc: 'Encontre empresas com baixa presença e engajamento social.'
    },
    {
      id: 'video_editing',
      title: 'Edição de Vídeo',
      icon: Video,
      available: false,
      badge: 'Em breve',
      desc: 'Identifique marcas com potencial para contratação de Reels e TikTok.'
    },
    {
      id: 'traffic_management',
      title: 'Gestão de Tráfego',
      icon: TrendingUp,
      available: false,
      badge: 'Em breve',
      desc: 'Encontre negócios com alta demanda para campanhas de Google e Meta Ads.'
    },
    {
      id: 'automation',
      title: 'Automação & Chatbots',
      icon: Bot,
      available: false,
      badge: 'Em breve',
      desc: 'Identifique processos locais prontos para automação com WhatsApp.'
    },
    {
      id: 'design',
      title: 'Design & Identidade Visual',
      icon: Palette,
      available: false,
      badge: 'Em breve',
      desc: 'Encontre empresas com identidade visual defasada.'
    }
  ];

  const handleFinish = () => {
    completeOnboarding(service, region, businessType);
    toast.success('Perfil configurado!', 'Seu dashboard foi personalizado.');
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl p-8 rounded-3xl bg-[#0e101a] border border-white/10 shadow-2xl space-y-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Passo {step} de 3</span>
            <h2 className="text-2xl font-bold text-white">Personalize sua experiência</h2>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={\`w-8 h-2 rounded-full transition-all \${
                  step >= s ? 'bg-indigo-500' : 'bg-slate-800'
                }\`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Serviço */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Qual serviço você oferece?</h3>
              <p className="text-xs text-slate-400 mt-1">O modo Criador de Sites é o primeiro totalmente funcional com IA.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {servicesList.map(s => {
                const Icon = s.icon;
                const isSelected = service === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => s.available && setService(s.id)}
                    className={\`p-4 rounded-2xl border transition-all flex flex-col justify-between \${
                      !s.available
                        ? 'opacity-50 cursor-not-allowed border-white/5 bg-slate-950'
                        : isSelected
                        ? 'border-indigo-500 bg-indigo-950/40 shadow-lg shadow-indigo-500/20 cursor-pointer'
                        : 'border-white/10 bg-slate-900 hover:border-white/20 cursor-pointer'
                    }\`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      {s.badge && (
                        <span className={\`text-[10px] font-bold px-2 py-0.5 rounded-full \${
                          s.available ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                        }\`}>
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white mb-1">{s.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center justify-center gap-2"
            >
              Avançar
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Região */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Qual região você atende prioritariamente?</h3>
              <p className="text-xs text-slate-400 mt-1">Informe a cidade e o estado para calibrar suas buscas de clientes.</p>
            </div>

            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Ex: Barão de Cocais, MG ou São Paulo, SP"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-white/10"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center justify-center gap-2"
              >
                Avançar
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Tipo de Empresa */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Que tipo de empresa você quer encontrar?</h3>
              <p className="text-xs text-slate-400 mt-1">Defina os nichos favoritos para receber recomendações diárias.</p>
            </div>

            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="Ex: Restaurantes, Barbearias, Clínicas, etc."
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-3.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-white/10"
              >
                Voltar
              </button>
              <button
                onClick={handleFinish}
                className="w-2/3 py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <Sparkles className="w-4 h-4" />
                Concluir e Abrir Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
`);

// 5. Dashboard Page
write('src/pages/DashboardPage.tsx', `
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLeads } from '../context/LeadsContext';
import { StorageService } from '../services/storage';
import { StatCards } from '../components/dashboard/StatCards';
import { UsageGauge } from '../components/dashboard/UsageGauge';
import { Sparkles, Search, Users, Globe, ArrowRight, Zap, TrendingUp, Plus } from 'lucide-react';
import { CompanyCard } from '../components/search/CompanyCard';

interface Props {
  onNavigate: (page: string, data?: any) => void;
}

export const DashboardPage: React.FC<Props> = ({ onNavigate }) => {
  const { user, usage } = useAuth();
  const { leads } = useLeads();
  const sites = StorageService.getSites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Modo Criador de Sites Ativo
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Olá, {user?.name || 'Profissional'}! Pronto para prospectar hoje?
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Encontre empresas sem presença digital em <strong className="text-white">{user?.targetRegion || 'sua região'}</strong> e crie demonstrações para fechar contratos.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => onNavigate('search')}
            className="flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-5 py-3 rounded-2xl shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <Search className="w-4 h-4" />
            Encontrar Clientes
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatCards usage={usage} leads={leads} sitesCount={sites.length} />

      {/* Grid: Quotas & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <UsageGauge usage={usage} plan={user?.plan || 'free'} onUpgrade={() => onNavigate('subscription')} />
        </div>

        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-white/5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                Leads Recentes no CRM
              </h3>
              <p className="text-xs text-slate-400">Empresas prontas para abordagem ou demonstração</p>
            </div>
            <button
              onClick={() => onNavigate('leads')}
              className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1"
            >
              Ver todos ({leads.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {leads.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">Nenhum lead salvo ainda.</p>
              <button
                onClick={() => onNavigate('search')}
                className="text-xs font-bold text-indigo-400 hover:underline"
              >
                Fazer uma pesquisa agora →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 4).map(lead => (
                <div
                  key={lead.id}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-between gap-3 hover:border-indigo-500/30 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-white truncate">{lead.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{lead.category} • {lead.city}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                      Score {lead.opportunityScore.total}
                    </span>
                    <button
                      onClick={() => onNavigate('leads')}
                      className="px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-bold transition-colors"
                    >
                      Abrir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
`);

// 6. Search Page ("Encontrar Clientes")
write('src/pages/SearchPage.tsx', `
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { DataProvider } from '../services/dataProvider';
import { GeminiService } from '../services/geminiService';
import { StorageService } from '../services/storage';
import { Company } from '../types';
import { CompanyCard } from '../components/search/CompanyCard';
import { Search, MapPin, Filter, Sparkles, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  onNavigate: (page: string, data?: any) => void;
}

export const SearchPage: React.FC<Props> = ({ onNavigate }) => {
  const { user, consumeSearch, consumeAICredit } = useAuth();
  const toast = useToast();

  const [query, setQuery] = useState('Restaurantes e Bares');
  const [location, setLocation] = useState(user?.targetRegion || 'Barão de Cocais, MG');
  const [quantity, setQuantity] = useState<number>(20);
  const [filterNoWebsite, setFilterNoWebsite] = useState(true);
  const [filterHighOpportunity, setFilterHighOpportunity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || !location) {
      toast.error('Informe o segmento e a localização');
      return;
    }

    const canSearch = consumeSearch();
    if (!canSearch) {
      toast.error('Limite mensal de pesquisas atingido', 'Faça upgrade do plano para continuar pesquisando.');
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const results = await DataProvider.searchCompanies({
        query,
        location,
        limit: quantity,
        filterNoWebsite,
        filterHighOpportunity
      });
      setCompanies(results);
      toast.success(\`\${results.length} empresas encontradas!\`);
    } catch (err) {
      toast.error('Não conseguimos concluir a busca agora', 'Tente novamente em instantes.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDemo = async (company: Company) => {
    const canGenerate = consumeAICredit(3);
    if (!canGenerate) {
      toast.error('Créditos de IA diários insuficientes (requer 3 créditos)', 'Faça upgrade para ter mais créditos ou aguarde a renovação diária.');
      return;
    }

    toast.info('Gerando demonstração exclusiva por IA...', 'Montando componentes estruturados.');
    const site = await GeminiService.generateInitialSite(company);
    StorageService.saveSite(site);
    onNavigate('builder', { siteId: site.id, site });
  };

  const handleOpenDetails = (company: Company) => {
    toast.info('Detalhes de ' + company.name, 'Visualização completa do lead.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Search className="w-6 h-6 text-indigo-400" />
            Encontrar Clientes & Oportunidades
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pesquise estabelecimentos comerciais, analise a ausência de site e gere demonstrações imediatas.
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Segmento / Nicho</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: Restaurantes, Barbearias, Clínicas..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Cidade & Estado</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex: Barão de Cocais, MG"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Quantidade de Resultados</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value={10}>10 Empresas</option>
                <option value={20}>20 Empresas (Recomendado)</option>
                <option value={50}>50 Empresas</option>
              </select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/5">
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filterNoWebsite}
                  onChange={(e) => setFilterNoWebsite(e.target.checked)}
                  className="rounded bg-slate-900 border-white/10 text-indigo-600 focus:ring-0"
                />
                <span>Apenas empresas SEM site próprio</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filterHighOpportunity}
                  onChange={(e) => setFilterHighOpportunity(e.target.checked)}
                  className="rounded bg-slate-900 border-white/10 text-indigo-600 focus:ring-0"
                />
                <span>Alta Oportunidade (Score 80+)</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-102 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Pesquisando Empresas...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Encontrar Clientes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results List */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center animate-bounce">
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="font-bold text-base text-white">Analisando oportunidades no mercado...</p>
          <p className="text-xs text-slate-400">Verificando reputação no Google e presença de website</p>
        </div>
      ) : hasSearched ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg text-white">
              {companies.length} Oportunidades Encontradas
            </h2>
          </div>

          {companies.length === 0 ? (
            <div className="glass-card p-12 text-center rounded-3xl border border-white/5 space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-sm font-semibold text-white">Nenhuma empresa encontrada com os filtros atuais.</p>
              <p className="text-xs text-slate-400">Tente buscar por uma categoria mais ampla ou alterar a localização.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map(comp => (
                <CompanyCard
                  key={comp.id}
                  company={comp}
                  onOpenDetails={handleOpenDetails}
                  onCreateDemo={handleCreateDemo}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="glass-card p-12 rounded-3xl border border-white/5 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center mx-auto text-indigo-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-white">Faça sua primeira busca de empresas</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Digite um segmento e cidade acima para encontrar dezenas de estabelecimentos locais e o Opportunity Score de cada um.
          </p>
        </div>
      )}
    </div>
  );
};
`);

// 7. Leads CRM Page ("Meus Leads")
write('src/pages/LeadsPage.tsx', `
import React, { useState } from 'react';
import { useLeads } from '../context/LeadsContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { GeminiService } from '../services/geminiService';
import { StorageService } from '../services/storage';
import { Lead, LeadStatus } from '../types';
import { OpportunityScoreBadge } from '../components/common/OpportunityScoreBadge';
import { PitchGeneratorModal } from '../components/leads/PitchGeneratorModal';
import { Users, Sparkles, MessageSquare, Trash2, Globe, Phone, MapPin, Tag, Plus, CheckCircle2 } from 'lucide-react';

interface Props {
  onNavigate: (page: string, data?: any) => void;
}

export const LeadsPage: React.FC<Props> = ({ onNavigate }) => {
  const { leads, updateLeadStatus, removeLead, addLeadNote } = useLeads();
  const { consumeAICredit } = useAuth();
  const toast = useToast();

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [pitchModalOpen, setPitchModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [noteInput, setNoteInput] = useState('');

  const statusOptions: Array<{ id: LeadStatus; label: string; color: string }> = [
    { id: 'novo', label: 'Novo', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { id: 'contato_realizado', label: 'Contato Realizado', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { id: 'interessado', label: 'Interessado', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { id: 'proposta_enviada', label: 'Proposta Enviada', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
    { id: 'negociacao', label: 'Em Negociação', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    { id: 'cliente', label: 'Cliente Fechado', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { id: 'perdido', label: 'Perdido', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
  ];

  const filteredLeads = leads.filter(l => filterStatus === 'all' || l.status === filterStatus);

  const handleOpenPitch = (lead: Lead) => {
    setSelectedLead(lead);
    setPitchModalOpen(true);
  };

  const handleCreateDemo = async (lead: Lead) => {
    const canGenerate = consumeAICredit(3);
    if (!canGenerate) {
      toast.error('Créditos de IA insuficientes');
      return;
    }
    toast.info('Gerando demonstração...');
    const site = await GeminiService.generateInitialSite(lead);
    StorageService.saveSite(site);
    onNavigate('builder', { siteId: site.id, site });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-indigo-400" />
            Meus Leads & Pipeline de Vendas
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Gerencie contatos, gere abordagens e acompanhe suas propostas comerciais.
          </p>
        </div>

        <button
          onClick={() => onNavigate('search')}
          className="flex items-center gap-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 rounded-xl shadow-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Buscar Novos Leads
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={\`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors \${
            filterStatus === 'all' ? 'bg-white text-black font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
          }\`}
        >
          Todos ({leads.length})
        </button>

        {statusOptions.map(st => (
          <button
            key={st.id}
            onClick={() => setFilterStatus(st.id)}
            className={\`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors \${
              filterStatus === st.id ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
            }\`}
          >
            {st.label} ({leads.filter(l => l.status === st.id).length})
          </button>
        ))}
      </div>

      {/* Leads List / Table */}
      {filteredLeads.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl border border-white/5 text-center space-y-3">
          <Users className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold text-white">Nenhum lead neste status.</p>
          <p className="text-xs text-slate-400">Adicione empresas através da busca para alimentar seu funil de vendas.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map(lead => (
            <div
              key={lead.id}
              className="glass-card p-5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-bold text-base text-white">{lead.name}</h3>
                    <OpportunityScoreBadge score={lead.opportunityScore} compact />
                  </div>
                  <p className="text-xs text-slate-400">
                    {lead.category} • {lead.location} • ⭐ {lead.rating.toFixed(1)} ({lead.reviewCount} avaliações)
                  </p>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center gap-2">
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                    className="text-xs font-bold rounded-xl px-3 py-2 bg-slate-900 border border-white/10 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    {statusOptions.map(st => (
                      <option key={st.id} value={st.id}>{st.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lead.phone || 'Sem telefone'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenPitch(lead)}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/60 px-3.5 py-2 rounded-xl border border-indigo-500/30 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Gerar Abordagem IA
                  </button>

                  <button
                    onClick={() => handleCreateDemo(lead)}
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Criar Demonstração
                  </button>

                  <button
                    onClick={() => removeLead(lead.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
                    title="Remover Lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pitch Generator Modal */}
      <PitchGeneratorModal
        lead={selectedLead}
        isOpen={pitchModalOpen}
        onClose={() => setPitchModalOpen(false)}
      />
    </div>
  );
};
`);

// 8. Builder Page (Full Site Builder with Live Canvas and AI Chat)
write('src/pages/BuilderPage.tsx', `
import React, { useState, useEffect } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { StorageService } from '../services/storage';
import { DeviceToolbar } from '../components/builder/DeviceToolbar';
import { SectionRenderer } from '../components/builder/SectionRenderer';
import { AIChatPanel } from '../components/builder/AIChatPanel';
import { ThemeSelector } from '../components/builder/ThemeSelector';
import { PublishModal } from '../components/builder/PublishModal';

interface Props {
  siteId?: string;
  onNavigate: (page: string, data?: any) => void;
}

export const BuilderPage: React.FC<Props> = ({ siteId, onNavigate }) => {
  const { site, deviceMode, loadSite } = useBuilder();
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);

  useEffect(() => {
    if (siteId) {
      const found = StorageService.getSiteById(siteId);
      if (found) loadSite(found);
    }
  }, [siteId]);

  if (!site) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-slate-400">
        Carregando demonstração...
      </div>
    );
  }

  const getCanvasWidth = () => {
    if (deviceMode === 'mobile') return 'max-w-[375px] my-6 rounded-[40px] border-[8px] border-slate-800 shadow-2xl overflow-hidden';
    if (deviceMode === 'tablet') return 'max-w-[768px] my-6 rounded-[28px] border-[8px] border-slate-800 shadow-2xl overflow-hidden';
    return 'w-full';
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#07080c] overflow-hidden">
      {/* Top Toolbar */}
      <DeviceToolbar
        onBack={() => onNavigate('leads')}
        onOpenPublish={() => setPublishModalOpen(true)}
        onOpenTheme={() => setThemeModalOpen(true)}
      />

      {/* Main Workspace: Canvas + AI Chat */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 overflow-y-auto bg-[#07080d] p-0 sm:p-4 flex justify-center items-start">
          <div className={\`w-full transition-all duration-300 bg-white \${getCanvasWidth()}\`}>
            <SectionRenderer site={site} />
          </div>
        </div>

        {/* AI Chat Sidebar */}
        <AIChatPanel />
      </div>

      {/* Modals */}
      <ThemeSelector
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
      />

      <PublishModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        onOpenPublicDemo={(slug) => onNavigate('public-demo', { slug })}
      />
    </div>
  );
};
`);

// 9. Public Site Page (/demo/:slug)
write('src/pages/PublicSitePage.tsx', `
import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { SiteConfig } from '../types';
import { SectionRenderer } from '../components/builder/SectionRenderer';
import { Sparkles, ArrowLeft, ExternalLink, Check } from 'lucide-react';

interface Props {
  slug?: string;
  onNavigate: (page: string) => void;
}

export const PublicSitePage: React.FC<Props> = ({ slug, onNavigate }) => {
  const [site, setSite] = useState<SiteConfig | null>(null);

  useEffect(() => {
    if (slug) {
      const found = StorageService.getSiteById(slug);
      if (found) {
        setSite(found);
      } else {
        const sites = StorageService.getSites();
        if (sites.length > 0) setSite(sites[0]);
      }
    } else {
      const sites = StorageService.getSites();
      if (sites.length > 0) setSite(sites[0]);
    }
  }, [slug]);

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090a0f] text-slate-400">
        Demonstração não encontrada.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f]">
      {/* Top Demo Banner for presentation */}
      <div className="bg-indigo-950 border-b border-indigo-500/30 px-4 py-2 flex items-center justify-between text-xs text-indigo-200">
        <div className="flex items-center gap-2 font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Demonstração Interativa Criada para <strong>{site.companyName}</strong></span>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-1 font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao Painel
        </button>
      </div>

      {/* Rendered Live Website */}
      <main className="flex-1 w-full">
        <SectionRenderer site={site} previewMode={true} />
      </main>
    </div>
  );
};
`);

// 10. Subscription Page ("Minha Assinatura")
write('src/pages/SubscriptionPage.tsx', `
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PaymentService } from '../services/paymentService';
import { PLANS } from '../data/plans';
import { PlanType } from '../types';
import { Zap, CheckCircle2, Shield, CreditCard, ArrowRight, RefreshCw, X } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export const SubscriptionPage: React.FC<Props> = ({ onNavigate }) => {
  const { user, usage } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const currentPlan = PLANS[user?.plan || 'free'];

  const handleUpgrade = async (planId: PlanType) => {
    if (!user) return;
    setLoading(true);
    const res = await PaymentService.createCheckout(planId, user);
    setLoading(false);
    if (res.success) {
      toast.success(res.message);
      setSelectedPlan(null);
    } else {
      toast.error(res.message);
    }
  };

  const handleCancel = async () => {
    if (!user) return;
    if (!confirm('Deseja realmente cancelar sua assinatura? Você voltará para o plano Free.')) return;
    setLoading(true);
    const res = await PaymentService.cancelSubscription(user);
    setLoading(false);
    toast.info(res.message);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
          <Zap className="w-6 h-6 text-amber-400" />
          Minha Assinatura & Plano
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Gerencie seu plano atual, acompanhe recursos e faça upgrades instantâneos.
        </p>
      </div>

      {/* Current Plan Overview Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Plano Ativo</span>
          <h2 className="text-3xl font-extrabold text-white mt-1 flex items-center gap-2">
            {currentPlan.name}
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {user?.subscriptionStatus === 'active' ? 'Ativo' : 'Trial'}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">R$ {currentPlan.price} / mês</p>
        </div>

        <div className="space-y-1.5 text-xs text-slate-300">
          <p className="font-semibold text-white">Renovação de Créditos IA:</p>
          <p className="text-slate-400">Diária ({currentPlan.aiCreditsPerDay} créditos/dia)</p>
          <p className="font-semibold text-white mt-2">Próxima renovação:</p>
          <p className="text-slate-400">
            {user?.subscriptionRenewDate ? new Date(user.subscriptionRenewDate).toLocaleDateString('pt-BR') : 'Sem renovação automática'}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {user?.plan !== 'full' && (
            <button
              onClick={() => setSelectedPlan('full')}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-600/30 transition-all"
            >
              Fazer Upgrade para FULL
            </button>
          )}

          {user?.plan !== 'free' && (
            <button
              onClick={handleCancel}
              className="text-xs font-semibold text-slate-400 hover:text-rose-400 py-2 transition-colors"
            >
              Cancelar Assinatura
            </button>
          )}
        </div>
      </div>

      {/* Available Plans Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-white">Planos Disponíveis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(PLANS).map(plan => {
            const isCurrent = user?.plan === plan.id;
            return (
              <div
                key={plan.id}
                className={\`glass-card p-6 rounded-3xl border flex flex-col justify-between \${
                  isCurrent ? 'border-indigo-500 bg-indigo-950/20' : 'border-white/10'
                }\`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg text-white">{plan.name}</h4>
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-500/30">
                        Plano Atual
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    {plan.originalPrice && (
                      <span className="text-xs text-slate-500 line-through mr-1.5 font-medium">
                        R$ {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl font-extrabold text-white">R$ {plan.price}</span>
                    <span className="text-xs text-slate-400">/mês</span>
                  </div>

                  <p className="text-xs text-indigo-400 font-semibold mb-6">{plan.limitsText}</p>

                  <div className="space-y-2.5 border-t border-white/10 pt-4 mb-6">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {!isCurrent && (
                  <button
                    disabled={loading}
                    onClick={() => handleUpgrade(plan.id)}
                    className="w-full py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Migrar para ' + plan.name}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
`);

// 11. Pricing Page
write('src/pages/PricingPage.tsx', `
import React from 'react';
import { PLANS } from '../data/plans';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export const PricingPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Tabela de Preços</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Planos Transparentes & Justos</h1>
        <p className="text-sm text-slate-400">Sem contratos complexos. Escolha o plano que melhor atende ao seu momento.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.values(PLANS).map(plan => (
          <div
            key={plan.id}
            className={\`glass-card p-8 rounded-3xl border flex flex-col justify-between relative \${
              plan.isPopular ? 'border-indigo-500 shadow-2xl shadow-indigo-500/20 bg-indigo-950/20' : 'border-white/10'
            }\`}
          >
            {plan.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
                {plan.badge}
              </div>
            )}

            <div>
              <div className="mb-6">
                <h3 className="font-bold text-xl text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.tagline}</p>
              </div>

              <div className="mb-6">
                {plan.originalPrice && (
                  <span className="text-xs text-slate-500 line-through mr-2 font-medium">
                    R$ {plan.originalPrice}/mês
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white tracking-tight">
                    R$ {plan.price}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">/mês</span>
                </div>
                <p className="text-xs text-indigo-400 font-semibold mt-1">{plan.limitsText}</p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-6 mb-8">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('register')}
              className={\`w-full py-3.5 rounded-2xl text-xs font-bold transition-all \${
                plan.isPopular
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:brightness-110 shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-white border border-white/10'
              }\`}
            >
              Começar com {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
`);

// 12. Main App Router (App.tsx)
write('src/App.tsx', `
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LeadsProvider } from './context/LeadsContext';
import { BuilderProvider } from './context/BuilderContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SearchPage } from './pages/SearchPage';
import { LeadsPage } from './pages/LeadsPage';
import { BuilderPage } from './pages/BuilderPage';
import { PublicSitePage } from './pages/PublicSitePage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { PricingPage } from './pages/PricingPage';

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>(isAuthenticated ? 'dashboard' : 'landing');
  const [navigationData, setNavigationData] = useState<any>(null);

  const navigate = (page: string, data?: any) => {
    setCurrentPage(page);
    setNavigationData(data || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated full-screen public demo mode
  if (currentPage === 'public-demo') {
    return <PublicSitePage slug={navigationData?.slug} onNavigate={navigate} />;
  }

  // Builder Page has its own full layout
  if (currentPage === 'builder') {
    return (
      <div className="min-h-screen flex flex-col bg-[#090a0f]">
        <Navbar onNavigate={navigate} currentPage={currentPage} />
        <main className="flex-1">
          <BuilderPage siteId={navigationData?.siteId} onNavigate={navigate} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-slate-100">
      <Navbar onNavigate={navigate} currentPage={currentPage} />

      <main className="flex-1">
        {currentPage === 'landing' && <LandingPage onNavigate={navigate} />}
        {currentPage === 'login' && <LoginPage onNavigate={navigate} />}
        {currentPage === 'register' && <RegisterPage onNavigate={navigate} />}
        {currentPage === 'onboarding' && <OnboardingPage onNavigate={navigate} />}
        {currentPage === 'dashboard' && <DashboardPage onNavigate={navigate} />}
        {currentPage === 'search' && <SearchPage onNavigate={navigate} />}
        {currentPage === 'leads' && <LeadsPage onNavigate={navigate} />}
        {currentPage === 'subscription' && <SubscriptionPage onNavigate={navigate} />}
        {currentPage === 'pricing' && <PricingPage onNavigate={navigate} />}
      </main>

      {currentPage !== 'onboarding' && <Footer onNavigate={navigate} />}
    </div>
  );
};

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <LeadsProvider>
          <BuilderProvider>
            <AppContent />
          </BuilderProvider>
        </LeadsProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
`);

console.log('Setup pages completed successfully!');

