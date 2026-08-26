import React, { useState, useRef, useEffect } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  Bot, 
  User, 
  Check, 
  Undo2, 
  Zap, 
  Smartphone, 
  Palette, 
  Flame, 
  HelpCircle, 
  MessageCircle,
  Layers,
  ArrowRight,
  MessageSquareQuote
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AIChatPanel: React.FC = () => {
  const { chatMessages, sendAICommand, isGenerating, canUndo, undoLastChange } = useBuilder();
  const { usage, user } = useAuth();
  const [input, setInput] = useState('');
  const [activeCategory, setActiveCategory] = useState<'quick' | 'style' | 'copy' | 'chat'>('quick');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isGenerating]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;
    const cmd = input.trim();
    setInput('');
    await sendAICommand(cmd);
  };

  const handleChipClick = (cmdText: string) => {
    if (isGenerating) return;
    sendAICommand(cmdText);
  };

  // Categorized prompt chips
  const quickCategories = {
    quick: [
      { icon: Palette, label: '🌑 Fundo Escuro Luxo', text: 'O site está muito claro! Deixe com fundo preto escuro (#090a10) e detalhes dourados luxuosos' },
      { icon: Flame, label: '🔥 Oferta 15% OFF', text: 'Adicione uma oferta de 15% OFF no cabeçalho com botão para resgatar no WhatsApp' },
      { icon: Smartphone, label: '📱 Otimizar Mobile', text: 'Otimize todos os títulos, botões e espaçamentos para leitura perfeita na tela do celular' },
      { icon: Sparkles, label: '⭐ Depoimentos 5 Estrelas', text: 'Adicione 3 depoimentos reais de clientes verificados com 5 estrelas do Google Maps' }
    ],
    chat: [
      { icon: MessageSquareQuote, label: '💬 Como abordar no WhatsApp?', text: 'Como posso abordar o dono deste comércio no WhatsApp com alta chance de resposta?' },
      { icon: Zap, label: '💰 Quanto cobrar por este site?', text: 'Qual valor você recomenda cobrar por este site para este nicho e cidade?' },
      { icon: HelpCircle, label: '🎯 Objeções comuns e respostas', text: 'Quais as principais objeções que o cliente pode fazer e como posso contorná-las?' }
    ],
    style: [
      { icon: Palette, label: '🖤 Dark Obsidian & Gold', text: 'Aplique o tema preto e dourado luxuoso de alto padrão' },
      { icon: Palette, label: '🌿 Emerald Health & Bio', text: 'Mude a paleta para verde esmeralda, transmitindo saúde e bem-estar' },
      { icon: Palette, label: '🌊 Ocean Blue Tech', text: 'Atualize as cores para azul oceano corporativo e moderno' },
      { icon: Palette, label: '☀️ Clean Minimal Light', text: 'Aplique o tema claro minimalista com fundo branco e tipografia nítida' }
    ],
    copy: [
      { icon: Sparkles, label: '🎯 Títulos Magnéticos', text: 'Reescreva todos os títulos e subtítulos usando gatilhos mentais de prova social e exclusividade' },
      { icon: Flame, label: '⚡ Gatilho de Urgência', text: 'Adicione um aviso de vagas/pedidos limitados para estimular o contato imediato' },
      { icon: Check, label: '⭐ Nota do Google Maps', text: 'Destaque que o comércio possui nota máxima de 5 estrelas no Google Maps em sua cidade' }
    ]
  };

  const remainingCredits = Math.max(0, (usage.aiCreditsDailyLimit || 20) - (usage.aiCreditsToday || 0));
  const isFree = user?.plan === 'free';

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-l border-zinc-800/80 w-80 lg:w-96 shrink-0 relative text-zinc-100 font-sans select-none">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/60 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-500 p-[1px] shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-xs text-white">Prospectly IA</h3>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-zinc-400 font-medium">Conversação ChatGPT + Copiloto de Sites</p>
          </div>
        </div>

        {/* Undo Button */}
        {canUndo && (
          <button
            onClick={undoLastChange}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-bold text-zinc-300 hover:text-white transition-all cursor-pointer active:scale-95"
            title="Desfazer última alteração"
          >
            <Undo2 className="w-3 h-3 text-zinc-400" />
            <span>Desfazer</span>
          </button>
        )}
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {chatMessages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}
          >
            <div className="flex items-start gap-2 max-w-[90%]">
              {msg.sender === 'assistant' && (
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-500 text-zinc-950 font-bold rounded-br-none shadow-md shadow-emerald-500/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                {msg.actionApplied && (
                  <div className="mt-2.5 pt-2 border-t border-zinc-800/80 flex items-center gap-1.5 text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                    <Check className="w-3 h-3" />
                    <span>Alterações Aplicadas no Site</span>
                  </div>
                )}
              </div>
            </div>
            <span className="text-[9px] text-zinc-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {/* Dynamic Thinking State */}
        {isGenerating && (
          <div className="flex items-start gap-2 max-w-[90%] animate-fade-in">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="p-3.5 bg-zinc-900 rounded-2xl border border-zinc-800 text-xs space-y-1.5 shadow-lg">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Prospectly IA está pensando e processando...</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Analisando resposta, estratégia comercial e modificações visuais.
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Categorized Prompt Chips */}
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/90 space-y-2.5">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 border-b border-zinc-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveCategory('quick')}
            className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeCategory === 'quick' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            ⚡ Ações
          </button>
          <button
            onClick={() => setActiveCategory('chat')}
            className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeCategory === 'chat' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            💬 Conversar (ChatGPT)
          </button>
          <button
            onClick={() => setActiveCategory('style')}
            className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeCategory === 'style' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            🎨 Estilos
          </button>
          <button
            onClick={() => setActiveCategory('copy')}
            className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeCategory === 'copy' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            ✍️ Vendas
          </button>
        </div>

        {/* Chips list */}
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
          {quickCategories[activeCategory].map((chip, idx) => {
            const IconComponent = chip.icon;
            return (
              <button
                key={idx}
                disabled={isGenerating}
                onClick={() => handleChipClick(chip.text)}
                className="text-[11px] font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 hover:text-white px-2.5 py-1 rounded-lg border border-zinc-800 transition-all flex items-center gap-1.5 text-left truncate cursor-pointer disabled:opacity-50"
              >
                <IconComponent className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Credit Counter & Progress */}
      <div className="px-3 py-2 bg-zinc-900/90 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Créditos Prospectly IA:</span>
          <strong className="text-white font-bold">{remainingCredits} / {usage.aiCreditsDailyLimit || 20} hoje</strong>
        </div>
        {isFree && (
          <span className="text-[10px] font-bold text-emerald-400 hover:underline cursor-pointer">
            Upgrade Pro →
          </span>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-zinc-800 bg-zinc-950 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Converse ou peça qualquer alteração no site..."
          disabled={isGenerating}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || isGenerating}
          className="w-9 h-9 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:opacity-40 text-zinc-950 flex items-center justify-center shrink-0 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
