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
                className={`w-8 h-2 rounded-full transition-all ${
                  step >= s ? 'bg-indigo-500' : 'bg-slate-800'
                }`}
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
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      !s.available
                        ? 'opacity-50 cursor-not-allowed border-white/5 bg-slate-950'
                        : isSelected
                        ? 'border-indigo-500 bg-indigo-950/40 shadow-lg shadow-indigo-500/20 cursor-pointer'
                        : 'border-white/10 bg-slate-900 hover:border-white/20 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      {s.badge && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          s.available ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                        }`}>
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
