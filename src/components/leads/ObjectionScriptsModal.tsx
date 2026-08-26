import React, { useState } from 'react';
import { Lead } from '../../types';
import { useToast } from '../../context/ToastContext';
import { 
  X, 
  BrainCircuit, 
  Copy, 
  MessageSquare, 
  Check, 
  Sparkles, 
  ChevronRight,
  ShieldAlert,
  Zap,
  PhoneCall
} from 'lucide-react';

interface Props {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ObjectionScriptsModal: React.FC<Props> = ({ lead, isOpen, onClose }) => {
  const toast = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeLead = lead || {
    id: 'demo_lead',
    name: 'Nome do Estabelecimento',
    category: 'Comércio Local',
    city: 'sua cidade',
    rating: 4.8,
    reviewsCount: 42,
    phone: '',
    address: 'Endereço Principal',
    status: 'novo' as const,
    hasWebsite: false,
    score: 95,
    createdAt: new Date().toISOString()
  };

  const scripts = [
    {
      id: 'obj_instagram',
      title: '1. "Já tenho Instagram, não preciso de site"',
      subtitle: 'Quando o dono diz que as redes sociais já são suficientes',
      response: `Entendo perfeitamente, o Instagram de vocês é muito bom! Mas tem um detalhe que faz toda a diferença nas vendas:\n\nQuando alguém está com fome ou precisa de um serviço imediato em ${activeLead.city}, essa pessoa NÃO vai no Instagram pesquisar — ela pesquisa direto no Google Maps: "*${activeLead.category} em ${activeLead.city}*".\n\nNo Google, quem tem site próprio aparece no topo e ganha o cliente na hora com botão de WhatsApp. Quem não tem, perde essas vendas silenciosas todo santo dia.\n\nO site não substitui seu Instagram, ele multiplica seus clientes que vêm das pesquisas do Google. Dá uma olhada em como ficou o projeto:`,
      tag: 'Mais Comum'
    },
    {
      id: 'obj_price',
      title: '2. "Achei caro / Não tenho dinheiro para investir agora"',
      subtitle: 'Quando a objeção é financeira ou fluxo de caixa',
      response: `Compreendo total seu momento! Por isso mesmo estruturamos o projeto para se pagar no primeiro mês:\n\nSe esse site te trouxer apenas 2 ou 3 clientes a mais por mês vindos das buscas do Google, o investimento já volta 100% para o seu caixa com lucro líquido.\n\nAlém disso, conseguimos parcelar a criação em até 12x no cartão ou fazer um valor de entrada super acessível com a manutenção mensal. O importante é sua empresa não ficar invisível enquanto seus concorrentes estão pegando esses clientes.\n\nO que acha de começarmos com essa condição facilitada?`,
      tag: 'Financeiro'
    },
    {
      id: 'obj_no_time',
      title: '3. "Não tenho tempo para administrar ou cuidar de site"',
      subtitle: 'Quando o dono tem rotina corrida e medo de trabalho extra',
      response: `Essa é a melhor parte: você não vai ter NENHUM trabalho de mexer em código ou tecnologia! \n\nNossa agência cuida de 100% da hospedagem, segurança, domínio e alterações para você. Quando quiser mudar um preço, foto ou prato, você só manda um áudio no nosso WhatsApp e nós atualizamos na hora.\n\nPara você e seus clientes, funciona simples: a pessoa clica no site e já cai conversando direto no seu WhatsApp para fechar pedido. Praticidade total!`,
      tag: 'Operacional'
    },
    {
      id: 'obj_think',
      title: '4. "Vou pensar e te aviso depois"',
      subtitle: 'Quando o cliente tenta postergar e esfriar o contato',
      response: `Claro, sem problemas pensar com calma! Só te mandei a demonstração porque vimos a nota maravilhosa de ${activeLead.rating?.toFixed(1) || '4.8'} estrelas de vocês no Google e achamos um desperdício enorme estarem sem presença digital oficial.\n\nComo esse projeto já está 100% pronto e pré-configurado, eu consigo segurar o valor promocional e a entrega em 24h apenas até amanhã às 18h.\n\nSe fecharmos hoje, já coloco seu domínio no ar para começar a captar clientes neste final de semana. Podemos garantir?`,
      tag: 'Follow-up'
    },
    {
      id: 'obj_urgency',
      title: '5. Script de Fechamento com Condição Especial do Dia',
      subtitle: 'Para aplicar desconto e fechar o contrato no mesmo dia',
      response: `Oi, tudo bem? Conversei com minha equipe aqui e conseguimos liberar uma condição especial para a *${activeLead.name}*:\n\nSe aprovarmos hoje, incluímos a configuração do domínio próprio + certificado de segurança SSL inteiramente GRÁTIS no primeiro ano (economia de R$ 180,00).\n\nAssim você já tem seu site profissional rodando amanhã sem dor de cabeça. Posso emitir a ordem de serviço para começarmos?`,
      tag: 'Urgência'
    }
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Script copiado!', 'Cole a resposta diretamente no WhatsApp do cliente.');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl text-zinc-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Central de Quebra de Objeções</h3>
              <p className="text-xs text-zinc-400">Scripts testados para responder donos de estabelecimentos no WhatsApp</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Scripts personalizados para: <strong className="text-white">{activeLead.name}</strong> ({activeLead.category})</span>
            </div>
          </div>

          <div className="space-y-3">
            {scripts.map((script) => (
              <div
                key={script.id}
                className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/90 space-y-2.5 transition-all hover:border-zinc-700"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-xs text-white">{script.title}</h4>
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800/60">
                        {script.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{script.subtitle}</p>
                  </div>

                  <button
                    onClick={() => handleCopy(script.id, script.response)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0 ${
                      copiedId === script.id
                        ? 'bg-emerald-400 text-zinc-950 font-black'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700'
                    }`}
                  >
                    {copiedId === script.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === script.id ? 'Copiado!' : 'Copiar Resposta'}</span>
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 whitespace-pre-line leading-relaxed font-sans select-text">
                  {script.response}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white transition-all cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};