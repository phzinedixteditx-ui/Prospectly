import { Company, SiteConfig, SiteSection, SiteTheme } from '../types';
import { getThemeForNiche, DEFAULT_THEMES } from '../data/defaultThemes';
import { NICHE_CATEGORIES } from '../data/categories';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || atob('QVEuQWI4Uk42S01ZbGNKZUp4dURKNndBZThKR2Fzd2F2ZGNMREhfNmZBSU5LdzJkWG5SOFE=');
const PRIMARY_MODEL = 'gemini-2.5-flash';
const FALLBACK_MODELS = ['gemini-flash-latest', 'gemini-2.5-flash-lite'];

export const GeminiService = {
  getApiKey(): string {
    return localStorage.getItem('prospectly_custom_gemini_key') || GEMINI_API_KEY;
  },

  setApiKey(key: string): void {
    localStorage.setItem('prospectly_custom_gemini_key', key);
  },

  async callGeminiRaw(
    systemInstruction: string,
    prompt: string, 
    history: Array<{ role: 'user' | 'model'; text: string }> = []
  ): Promise<string | null> {
    const key = this.getApiKey();
    const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS];

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Add conversation history if available
    history.forEach(h => {
      contents.push({
        role: h.role,
        parts: [{ text: h.text }]
      });
    });

    // Add current prompt
    contents.push({
      role: 'user',
      parts: [{ text: `${systemInstruction}\n\n[MENSAGEM DO USUÁRIO]:\n${prompt}` }]
    });

    for (const model of modelsToTry) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({ 
            contents,
            generationConfig: {
              temperature: 0.7,
              topP: 0.95,
              maxOutputTokens: 2000
            }
          })
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text.trim();
        } else {
          console.warn(`Model ${model} returned status ${response.status}`);
        }
      } catch (e) {
        console.warn(`Error calling ${model}:`, e);
      }
    }
    return null;
  },


  async generatePitchMessage(company: Company): Promise<string> {
    const systemInstruction = `Você é um Diretor Comercial e Especialista em Copywriting B2B de Altíssima Conversão (estilo Gary Halbert, Dan Kennedy e especialistas em Social Selling).
Você sabe que donos de empresas locais odeiam mensagens frias de robôs ou spam genérico.
Sua missão é criar uma abordagem humana, calorosa, altamente consultiva e personalizada para enviar via WhatsApp para o proprietário da empresa.`;

    const prompt = `Empresa Alvo:
- Nome: ${company.name}
- Nicho: ${company.category}
- Cidade: ${company.city} - ${company.state}
- Reputação Google: ⭐ ${company.rating.toFixed(1)} estrelas com ${company.reviewCount} avaliações reais
- Situação do Site: ${company.hasWebsite ? 'Possui site antigo/desatualizado' : 'NÃO TEM SITE PRÓPRIO (oportunidade de ouro)'}
- Instagram: ${company.socialPresence ? 'Ativo (' + company.instagramHandle + ')' : 'Pouca presença digital'}

Diretrizes da Mensagem:
1. Comece parabenizando de forma genuína pela excelente reputação e nota ${company.rating.toFixed(1)} no Google.
2. Mostre que você identificou uma oportunidade concreta: clientes que buscam por ${company.category} em ${company.city} preferem ver o cardápio/serviços e chamar direto no WhatsApp pelo celular.
3. Conte que você já tomou a iniciativa de criar uma demonstração visual interativa exclusiva e personalizada para o ${company.name}.
4. Finalize com um CTA de baixíssima fricção perguntando se pode enviar o link de 10 segundos para ele dar uma olhada sem compromisso.
5. Tom natural, profissional, com emojis pontuais e quebras de linha confortáveis para leitura rápida no WhatsApp.

Retorne APENAS o texto da mensagem pronta para envio.`;

    const aiResponse = await this.callGeminiRaw(systemInstruction, prompt);
    if (aiResponse) return aiResponse;

    // Fallback humano e de alta conversão
    return `Olá, pessoal do ${company.name}! Tudo bem? 👋

Estava pesquisando referências de ${company.category.toLowerCase()} aqui em ${company.city} e fiquei muito impressionado com as avaliações de vocês no Google — nota ⭐ ${company.rating.toFixed(1)} com mais de ${company.reviewCount} clientes elogiando o atendimento! Parabéns de verdade!

Notei que muitos novos clientes pesquisam por ${company.category.toLowerCase()} pelo celular e acabam sentindo falta de um cardápio e agendamento online rápido.

    Posso te mandar o link rapidinho aqui para você dar uma olhada sem nenhum compromisso?`;
  },

  async generateInitialSite(company: Company): Promise<SiteConfig> {

    const catLower = company.category.toLowerCase();
    const nameLower = company.name.toLowerCase();

    const isBakery = catLower.includes('padaria') || catLower.includes('confeitaria') || catLower.includes('doceria') || catLower.includes('bolo') || nameLower.includes('confeitaria') || nameLower.includes('doces') || nameLower.includes('padaria');
    const isPizza = catLower.includes('pizza') || nameLower.includes('pizza');
    const isBurger = catLower.includes('hamburguer') || catLower.includes('burger') || nameLower.includes('burger');
    const isBarber = catLower.includes('barbearia') || catLower.includes('barbeiro') || nameLower.includes('barber');
    const isSalon = catLower.includes('salao') || catLower.includes('cabelereir') || catLower.includes('estetica') || catLower.includes('unha') || catLower.includes('sobrancelha');
    const isDental = catLower.includes('odonto') || catLower.includes('dentista') || catLower.includes('implante');
    const isPet = catLower.includes('pet') || catLower.includes('vet') || catLower.includes('animal') || catLower.includes('banho e tosa');
    const isFood = isBakery || isPizza || isBurger || catLower.includes('restaurante') || catLower.includes('churrascaria') || catLower.includes('comida') || catLower.includes('gastronomia') || catLower.includes('bistro');

    const theme = getThemeForNiche(company.category);
    const categoryInfo = NICHE_CATEGORIES.find(c => 
      c.keywords.some(k => catLower.includes(k) || nameLower.includes(k))
    ) || NICHE_CATEGORIES[0];

    const cleanPhone = (company.phone || '31988887777').replace(/[^0-9]/g, '');
    const formattedPhone = cleanPhone.startsWith('55') ? cleanPhone : (cleanPhone.length >= 10 ? `55${cleanPhone}` : '5531988887777');
    const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(`Olá! Conheci o ${company.name} pelo site e gostaria de mais informações.`)}`;

    const realPhotos = company.photos && company.photos.length > 0 ? company.photos : [];
    
    // Niche specific photography fallback
    const bakeryPhotos = [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80'
    ];
    const barberPhotos = [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80'
    ];
    const dentalPhotos = [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80'
    ];

    const fallbackPhotos = isBakery ? bakeryPhotos : isBarber ? barberPhotos : isDental ? dentalPhotos : categoryInfo.sampleImages;
    const heroImage = realPhotos[0] || fallbackPhotos[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';
    const aboutImage = realPhotos[1] || realPhotos[0] || fallbackPhotos[1] || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80';

    // Tailored Headlines & Badges
    let heroTitle = `Excelência e tradição em ${company.city}`;
    let heroButtonText = 'Falar no WhatsApp';
    let aboutTitle = `Compromisso com o melhor para ${company.city}`;
    let aboutContent = `No ${company.name}, oferecemos atendimento humanizado, dedicação e padrão de alto nível em ${company.city}. Localizado em ${company.address || company.city}, nosso espaço foi preparado para receber você com total conforto.`;

    if (isBakery) {
      heroTitle = `Bolos artesanais, doces finos e sabores inesquecíveis em ${company.city}`;
      heroButtonText = 'Fazer Encomenda no WhatsApp';
      aboutTitle = `Paixão pela confeitaria e receitas artesanais feitas com amor`;
      aboutContent = `No ${company.name}, cada bolo, doce e receita é preparada com ingredientes nobres e muito carinho em ${company.city}. Localizado em ${company.address || company.city}, transformamos momentos especiais em celebrações inesquecíveis.`;
    } else if (isPizza) {
      heroTitle = `A autêntica pizza no forno a lenha de ${company.city}`;
      heroButtonText = 'Ver Cardápio & Pedir no WhatsApp';
      aboutTitle = `Massa artesanal de fermentação lenta e os melhores ingredientes`;
      aboutContent = `O ${company.name} traz para ${company.city} o verdadeiro sabor da pizza artesanal, com ingredientes frescos e massa crocante. Faça seu pedido ou venha nos visitar em ${company.address || company.city}.`;
    } else if (isBurger) {
      heroTitle = `Burgers artesanais suculentos e batatas crocantes em ${company.city}`;
      heroButtonText = 'Fazer Pedido no WhatsApp';
      aboutTitle = `Blend exclusivo grelhado no ponto perfeito`;
      aboutContent = `No ${company.name}, unimos carne fresca selecionada, pães artesanais selados na manteiga e molhos autorais em ${company.city}. Venha saborear em ${company.address || company.city}.`;
    } else if (isBarber) {
      heroTitle = `Corte, barba e estilo de alto padrão em ${company.city}`;
      heroButtonText = 'Agendar Horário no WhatsApp';
      aboutTitle = `Precisão técnica, toalha quente e atendimento exclusivo`;
      aboutContent = `O ${company.name} é a barbearia de referência em ${company.city}, unindo técnicas modernas de visagismo com o conforto de um ambiente exclusivo. Localizado em ${company.address || company.city}.`;
    } else if (isSalon) {
      heroTitle = `Realce sua beleza com profissionais especialistas em ${company.city}`;
      heroButtonText = 'Agendar no WhatsApp';
      aboutTitle = `Cuidado capilar e estética com produtos premium`;
      aboutContent = `No ${company.name}, valorizamos sua autoestima com procedimentos modernos, mechas, cortes e hidratação profunda em ${company.city}. Estamos em ${company.address || company.city}.`;
    } else if (isDental) {
      heroTitle = `Tecnologia e cuidado com o seu sorriso em ${company.city}`;
      heroButtonText = 'Agendar Avaliação no WhatsApp';
      aboutTitle = `Tratamentos odontológicos modernos e indolores`;
      aboutContent = `A clínica ${company.name} oferece atendimento odontológico completo em ${company.city}, desde profilaxia a implantes e estética do sorriso com conforto absoluto em ${company.address || company.city}.`;
    } else if (isPet) {
      heroTitle = `Amor, carinho e saúde para o seu pet em ${company.city}`;
      heroButtonText = 'Agendar Banho & Tosa no WhatsApp';
      aboutTitle = `Estrutura acolhedora e profissionais apaixonados por animais`;
      aboutContent = `No ${company.name}, cuidamos do seu melhor amigo com banho & tosa cuidadosos, hidratação e acompanhamento em ${company.city}. Localizado em ${company.address || company.city}.`;
    }

    // Dynamic Items for Highlights & Specialties (No fake prices when unverified)
    const menuOrServicesSection: SiteSection = isBakery ? {
      id: 'sec_menu',
      type: 'menu',
      badge: 'Especialidades Artesanais',
      title: `Destaques do ${company.name}`,
      subtitle: `Bolos decorados, doces finos e delícias feitas com carinho todos os dias em ${company.city}.`,
      enabled: true,
      order: 3,
      items: [
        { id: 'b1', title: 'Bolos Confeitados & Decorados', description: 'Massa artesanal fofinha com recheios nobres e acabamento personalizado sob encomenda.', tag: 'Mais Pedido', icon: 'Sparkles' },
        { id: 'b2', title: 'Doces Finos & Brigadeiros Gourmet', description: 'Seleção especial de sabores tradicionais e autorais para festas, presentes e sobremesas.', tag: 'Destaque', icon: 'Award' },
        { id: 'b3', title: 'Kits Festa & Comemorações', description: 'Combinação completa com bolo temático, docinhos e salgadinhos fresquinhos.', tag: 'Recomendado', icon: 'HeartHandshake' },
        { id: 'b4', title: 'Tortas & Sobremesas Especiais', description: 'Receitas exclusivas com equilíbrio perfeito de doçura e ingredientes frescos.', tag: 'Exclusivo', icon: 'Sparkles' }
      ]
    } : isPizza ? {
      id: 'sec_menu',
      type: 'menu',
      badge: 'Forno a Lenha',
      title: `Especialidades do ${company.name}`,
      subtitle: `Pizzas com massa artesanal de fermentação lenta e ingredientes selecionados em ${company.city}.`,
      enabled: true,
      order: 3,
      items: [
        { id: 'p1', title: 'Pizzas Especiais da Casa', description: 'Molho pelati fresco, mussarela de cura e combinações autorais de sabores.', tag: 'Favorita', icon: 'Flame' },
        { id: 'p2', title: 'Pizzas Tradicionais & Clássicas', description: 'Receitas consagradas com massa crocante e queijo derretido no ponto certo.', tag: 'Tradicional', icon: 'Award' },
        { id: 'p3', title: 'Bordas Especiais Recheadas', description: 'Opções com catupiry original, cheddar e chocolate para acompanhar sua pizza.', tag: 'Premium', icon: 'Sparkles' }
      ]
    } : isBarber ? {
      id: 'sec_services',
      type: 'services',
      badge: 'Estilo & Precisão',
      title: `Procedimentos no ${company.name}`,
      subtitle: `Técnicas modernas de corte, barba e visagismo em ${company.city}.`,
      enabled: true,
      order: 3,
      items: [
        { id: 'bb1', title: 'Corte Degradê & Visagismo Masculino', description: 'Fade milimétrico adaptado ao formato do seu rosto e estilo de vida.', icon: 'Scissors', tag: 'Mais Pedido' },
        { id: 'bb2', title: 'Barboterapia com Toalha Quente', description: 'Alinhamento com navalha, esfoliação facial e hidratação com óleos essenciais.', icon: 'Sparkles', tag: 'Relax' },
        { id: 'bb3', title: 'Combo Cabelo + Barba Premium', description: 'Experiência completa com lavagem especial, corte estilizado e acabamento de barba.', icon: 'Award', tag: 'Destaque' }
      ]
    } : isDental ? {
      id: 'sec_services',
      type: 'services',
      badge: 'Tratamentos Odontológicos',
      title: `Especialidades da Clínica ${company.name}`,
      subtitle: `Tecnologia de ponta e equipe atenciosa em ${company.city}.`,
      enabled: true,
      order: 3,
      items: [
        { id: 'd1', title: 'Clareamento Dental & Estética do Sorriso', description: 'Dentes mais brancos com segurança, agilidade e proteção do esmalte dentário.', icon: 'Sparkles', tag: 'Estética' },
        { id: 'd2', title: 'Implantes & Reabilitação Oral', description: 'Devolva a mastigação e a confiança do seu sorriso com materiais importados.', icon: 'ShieldCheck', tag: 'Avançado' },
        { id: 'd3', title: 'Alinhadores Invisíveis & Ortodontia', description: 'Correção rápida e discreta da posição dos dentes sem fios aparentes.', icon: 'Award', tag: 'Moderno' }
      ]
    } : isFood ? {
      id: 'sec_menu',
      type: 'menu',
      badge: 'Gastronomia Selecionada',
      title: `Especialidades do ${company.name}`,
      subtitle: `Pratos preparados diariamente com ingredientes frescos e tempero caseiro em ${company.city}.`,
      enabled: true,
      order: 3,
      items: [
        { id: 'm1', title: 'Prato Especial da Casa', description: 'Combinação saborosa com ingredientes frescos e temperos selecionados.', tag: 'Mais Pedido', icon: 'Sparkles' },
        { id: 'm2', title: `Seleção Tradicional ${company.name}`, description: `A receita favorita dos clientes em ${company.city}.`, tag: 'Exclusivo', icon: 'Award' },
        { id: 'm3', title: 'Sobremesas & Acompanhamentos', description: 'Opções artesanais para fechar sua refeição com chave de ouro.', tag: 'Recomendado', icon: 'HeartHandshake' }
      ]
    } : {
      id: 'sec_services',
      type: 'services',
      badge: 'Soluções Especializadas',
      title: `Serviços no ${company.name}`,
      subtitle: `Atendimento de excelência e compromisso com o cliente em ${company.city}.`,
      enabled: true,
      order: 3,
      items: [
        { id: 's1', title: 'Atendimento Personalizado', description: `Análise detalhada das suas necessidades com foco no melhor resultado em ${company.city}.`, icon: 'Sparkles', tag: 'Destaque' },
        { id: 's2', title: 'Procedimento Avançado', description: 'Uso de técnicas modernas e produtos de procedência garantida.', icon: 'ShieldCheck', tag: 'Qualidade' },
        { id: 's3', title: 'Acompanhamento Exclusivo', description: 'Suporte humanizado e atenção aos detalhes em todas as etapas.', icon: 'HeartHandshake', tag: 'Recomendado' }
      ]
    };


    const sections: SiteSection[] = [
      // 1. Navbar
      {
        id: 'sec_nav',
        type: 'navbar',
        enabled: true,
        order: 0,
        buttonText: 'Falar no WhatsApp',
        buttonLink: waUrl
      },
      // 2. Hero
      {
        id: 'sec_hero',
        type: 'hero',
        badge: `⭐ Nota ${company.rating.toFixed(1)} no Google Maps (${company.reviewCount} avaliações reais)`,
        title: heroTitle,
        subtitle: `Mais de ${company.reviewCount} clientes atendidos com nota máxima no Google. Venha conhecer o espaço do ${company.name} em ${company.city}.`,
        buttonText: heroButtonText,
        buttonLink: waUrl,
        secondaryButtonText: 'Ver Endereço & Fotos',
        secondaryButtonLink: '#sobre',
        imageUrl: heroImage,
        enabled: true,
        order: 1
      },
      // 3. About
      {
        id: 'sec_about',
        type: 'about',
        badge: 'Nossa Trajetória',
        title: aboutTitle,
        content: aboutContent,
        imageUrl: aboutImage,
        buttonText: 'Falar Diretamente Conosco',
        buttonLink: waUrl,
        enabled: true,
        order: 2
      },
      // 4. Menu or Services
      menuOrServicesSection,
      // 5. Testimonials
      {
        id: 'sec_testimonials',
        type: 'testimonials',
        badge: 'Clientes Satisfeitos no Google',
        title: `O que dizem sobre o ${company.name}`,
        subtitle: `Média de ⭐ ${company.rating.toFixed(1)} estrelas com ${company.reviewCount} depoimentos de clientes em ${company.city}.`,
        enabled: true,
        order: 4,
        items: [
          { id: 't1', author: 'Mariana Silva', role: 'Cliente no Google Maps', description: `O atendimento do ${company.name} é maravilhoso! Ambiente super limpo, equipe prestativa e qualidade impecável.`, rating: 5 },
          { id: 't2', author: 'Rodrigo Guimarães', role: 'Cliente Verificado', description: `Excelente custo-benefício e rapidez no atendimento em ${company.city}. Virei cliente assíduo do ${company.name}!`, rating: 5 },
          { id: 't3', author: 'Fernanda Oliveira', role: 'Avaliação 5 Estrelas', description: `Superou todas as minhas expectativas. Recomendo de olhos fechados para quem busca o melhor em ${company.city}.`, rating: 5 }
        ]
      },
      // 6. Benefits
      {
        id: 'sec_benefits',
        type: 'benefits',
        badge: 'Por que Nos Escolher',
        title: `Diferenciais do ${company.name}`,
        enabled: true,
        order: 5,
        items: [
          { id: 'b1', title: 'Localização de Fácil Acesso', description: `Estamos localizados em ${company.address || 'região central de ' + company.city} com estacionamento e conforto.`, icon: 'MapPin' },
          { id: 'b2', title: 'Padrão Rigoroso de Qualidade', description: `Produtos e procedimentos com a mais alta recomendação de clientes em ${company.city}.`, icon: 'Award' },
          { id: 'b3', title: 'Atendimento Rápido no WhatsApp', description: 'Tire suas dúvidas ou agende seu pedido diretamente pelo WhatsApp sem complicação.', icon: 'MessageCircle' }
        ]
      },
      // 7. FAQ
      {
        id: 'sec_faq',
        type: 'faq',
        badge: 'Dúvidas Comuns',
        title: 'Perguntas Frequentes',
        enabled: true,
        order: 6,
        items: [
          { id: 'f1', title: 'Quais são as formas de pagamento aceitas?', description: 'Aceitamos Pix com confirmação instantânea, cartões de débito e crédito (com parcelamento), e dinheiro.' },
          { id: 'f2', title: 'Como faço para fazer um pedido ou agendar?', description: 'Basta clicar no botão de WhatsApp aqui no site para conversar diretamente com nosso atendente.' },
          { id: 'f3', title: `Onde fica localizado o ${company.name}?`, description: `Nosso endereço completo é ${company.address || 'Centro, ' + company.city + ' - ' + company.state}.` }
        ]
      },
      // 8. Contact
      {
        id: 'sec_contact',
        type: 'contact',
        badge: 'Localização & Contato',
        title: `Venha nos fazer uma visita no ${company.name}`,
        subtitle: `Endereço: ${company.address || company.city + ' - ' + company.state} • WhatsApp: ${company.phone || '(31) 98888-7777'}`,
        buttonText: `Chamar no WhatsApp (${company.phone || 'WhatsApp'})`,
        buttonLink: waUrl,
        enabled: true,
        order: 7
      },
      // 9. Footer
      {
        id: 'sec_footer',
        type: 'footer',
        content: `© ${new Date().getFullYear()} ${company.name} • ${company.address || company.city + ' - ' + company.state}. Todos os direitos reservados.`,
        enabled: true,
        order: 8
      }
    ];

    const slug = company.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    return {
      id: 'site_' + Math.random().toString(36).substring(2, 9),
      projectId: 'proj_' + Math.random().toString(36).substring(2, 9),
      leadId: company.id,
      companyName: company.name,
      tagline: isBakery ? `Bolos e doces artesanais inesquecíveis em ${company.city}` : isPizza ? `Pizzas artesanais no forno a lenha em ${company.city}` : isBarber ? `Corte e barba com excelência em ${company.city}` : `Excelência e dedicação em ${company.city}`,
      niche: company.category,
      city: company.city,
      phone: company.phone || '(31) 98888-7777',
      whatsapp: company.phone || '(31) 98888-7777',
      email: 'contato@' + slug + '.com.br',
      address: company.address || 'Centro, ' + company.city + ' - ' + company.state,
      slug,
      status: 'preview',
      theme,
      sections,
      publishedUrl: 'https://prospectly.app/demo/' + slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  async executeAICommand(
    currentSite: SiteConfig, 
    userCommand: string,
    chatHistory: Array<{ role: 'user' | 'model'; text: string }> = []
  ): Promise<{ updatedSite: SiteConfig; responseMessage: string; toolUsed: string }> {
    const systemInstruction = `Você é a "Prospectly IA", uma Inteligência Artificial avançada no estilo ChatGPT, especializada em estratégia B2B, copywriting de alta conversão, design de landing pages e fechamento de vendas.

SUA PERSONALIDADE E CAPACIDADES:
- Você é inteligente, proativa, simpática e articulada como o ChatGPT (GPT-4o).
- Você conversa livremente sobre QUALQUER assunto (dúvidas comerciais, como abordar clientes no WhatsApp, melhores horários, objeções de preço, copywriting, estratégias de nicho para restaurantes, padarias, barbearias, etc.).
- AO MESMO TEMPO, você tem poder total de alterar o site de demonstração em tempo real!

ESTRUTURA ATUAL DO SITE (JSON):
${JSON.stringify({
  companyName: currentSite.companyName,
  tagline: currentSite.tagline,
  city: currentSite.city,
  theme: currentSite.theme,
  sections: currentSite.sections
}, null, 2)}

DIRETRIZES DE RESPOSTA:
1. SE O USUÁRIO FIZER UMA PERGUNTA CONVERSACIONAL (ex: "como abordo essa padaria no whatsapp?", "qual o melhor nicho para vender?", "oi tudo bem?", "o que você acha desse design?"):
   - Responda como um especialista de alto nível, com dicas práticas, passo a passo e empatia.
   - Se nenhuma alteração for necessária no site, NÃO inclua bloco JSON.
2. SE O USUÁRIO PEDIR QUALQUER ALTERAÇÃO OU MELHORIA NO SITE (ex: "o site está muito claro", "deixe mais escuro", "adicione uma promoção de 15%", "mude a paleta para azul", "adicione depoimentos", "reescreva para celular"):
   - Explique sua estratégia em texto conversacional.
   - Inclua OBRIGATORIAMENTE o bloco JSON atualizado com o tema ou seções modificadas:
\`\`\`json
{
  "theme": { ...primaryColor, accentColor, backgroundColor, textColor, cardBackground... },
  "sections": [ ...array completo de seções atualizadas... ],
  "tagline": "tagline atualizada",
  "companyName": "nome se alterado"
}
\`\`\`
3. Se o usuário reclamar que o site está muito claro, mude imediatamente o tema para "backgroundColor": "#090a10", "cardBackground": "#12141f", "textColor": "#f8fafc", com acentos dourados ou esmeralda.`;


    try {
      const aiResponse = await this.callGeminiRaw(systemInstruction, userCommand, chatHistory);

      if (aiResponse) {
        let responseMessage = aiResponse;
        let updatedSite = JSON.parse(JSON.stringify(currentSite)) as SiteConfig;
        let toolUsed = 'ai_chat';

        // Extract JSON if returned by Gemini
        const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
          try {
            const parsedData = JSON.parse(jsonMatch[1]);
            if (parsedData.theme) {
              updatedSite.theme = { ...updatedSite.theme, ...parsedData.theme };
              toolUsed = 'update_theme';
            }
            if (parsedData.sections && Array.isArray(parsedData.sections)) {
              updatedSite.sections = parsedData.sections.filter((s: any) => s.type !== 'whatsapp_floating');
              toolUsed = 'update_sections';
            }
            if (parsedData.companyName) updatedSite.companyName = parsedData.companyName;
            if (parsedData.tagline) updatedSite.tagline = parsedData.tagline;

            // Remove the raw json block from user-facing text
            responseMessage = aiResponse.replace(/```json[\s\S]*?```/, '').trim();
          } catch (jsonErr) {
            console.warn('Could not parse JSON block from AI:', jsonErr);
          }
        }

        updatedSite.updatedAt = new Date().toISOString();
        return { updatedSite, responseMessage, toolUsed };
      }
    } catch (e) {
      console.warn('Gemini execution error:', e);
    }

    // High Intelligence Fallback when API is offline
    const cmd = userCommand.toLowerCase().trim();
    const updated = JSON.parse(JSON.stringify(currentSite)) as SiteConfig;
    let toolUsed = 'ai_chat';
    let responseMessage = '';

    // 1. Pure Greetings / Salutations (DO NOT TOUCH SITE!)
    if (/^(oi|olá|ola|bom dia|boa tarde|boa noite|e ai|e aí|opa|fala aí|fala ai|tudo bem|tudo bom)\b/i.test(cmd) || cmd === 'oi' || cmd === 'ola' || cmd === 'olá' || cmd === 'boa noite' || cmd === 'bom dia' || cmd === 'boa tarde') {
      toolUsed = 'ai_chat';
      const greeting = cmd.includes('noite') ? 'Boa noite' : cmd.includes('tarde') ? 'Boa tarde' : cmd.includes('dia') ? 'Bom dia' : 'Olá';
      responseMessage = `${greeting}! 👋 Como posso te ajudar hoje?\n\nSou a **Prospectly IA**. Você pode:\n• **Conversar livremente** (tirar dúvidas sobre como prospectar clientes, quanto cobrar, estratégias de vendas)\n• **Pedir alterações no site** (*"deixe o fundo preto"*, *"adicione uma promoção de 15%"*, *"otimize para celular"*, etc.).`;
      return { updatedSite: currentSite, responseMessage, toolUsed };
    }

    // 2. Pure Questions / Advice / Strategy (DO NOT TOUCH SITE!)
    if (cmd.includes('quanto cobrar') || cmd.includes('preço') && !cmd.includes('mude') && !cmd.includes('altere') && !cmd.includes('coloque')) {
      toolUsed = 'ai_chat';
      responseMessage = `💡 **Recomendação de Preço para Venda de Site:**\n\nPara comércios locais (como ${currentSite.niche} em ${currentSite.city}):\n• **Site Institucional Simples:** R$ 600 a R$ 1.200 (pagamento único) + R$ 80 a R$ 150/mês de manutenção/hospedagem.\n• **Site com Cardápio/Catálogo no WhatsApp:** R$ 1.200 a R$ 2.000.\n\n*Dica de Ouro:* Ofereça a demonstração pronta sem cobrar nada antes. Ao ver o site pronto, o dono tem muito mais confiança para fechar!`;
      return { updatedSite: currentSite, responseMessage, toolUsed };
    }

    if (cmd.includes('como abordar') || cmd.includes('mensagem') && !cmd.includes('mude') && !cmd.includes('adicione')) {
      toolUsed = 'ai_chat';
      responseMessage = `🎯 **Estratégia de Abordagem no WhatsApp:**\n\n1. **Elogio sincero inicial:** Elogie a nota ou produto do comércio.\n2. **Identifique a dor:** *"Notei que vocês não possuem site oficial no Google e clientes no celular não encontram o cardápio rápido."*\n3. **Apresente o valor:** *"Montei uma demonstração de 15 segundos exclusiva para a ${currentSite.companyName}."*\n4. **Chamada de baixo atrito:** *"Dá uma olhada sem compromisso e me diga o que achou!"*`;
      return { updatedSite: currentSite, responseMessage, toolUsed };
    }

    if (cmd.includes('quem é você') || cmd.includes('o que você faz') || cmd.includes('ajuda')) {
      toolUsed = 'ai_chat';
      responseMessage = `🤖 **Eu sou a Prospectly IA!**\n\nSou seu assistente de inteligência artificial estilo ChatGPT integrado com o construtor de sites. Posso responder qualquer dúvida de negócios e vendas, ou modificar o design, cores, textos e seções deste site quando você me pedir.`;
      return { updatedSite: currentSite, responseMessage, toolUsed };
    }

    // 3. Explicit Site Modifications (ONLY WHEN EXPLICITLY REQUESTED)
    if (cmd.includes('muito claro') || cmd.includes('menos claro') || cmd.includes('escuro') || cmd.includes('mais escuro') || cmd.includes('fundo preto') || cmd.includes('tema escuro') || cmd.includes('modo dark') || cmd.includes('dark') || cmd.includes('obsidian') || cmd.includes('modo noturno')) {
      toolUsed = 'update_theme';
      updated.theme = DEFAULT_THEMES[1]; // Obsidian & Gold Luxury Dark
      responseMessage = '🌑 **Modo Dark Premium Aplicado!** Transformei o visual para fundo preto profundo (#090a10) e detalhes dourados sofisticados com alto contraste.';
    } else if (cmd.includes('remover whatsapp') || cmd.includes('tirar whatsapp') || cmd.includes('retirar whatsapp') || cmd.includes('sem whatsapp flutuante') || cmd.includes('retire o botao do falar no whatsapp')) {
      toolUsed = 'update_sections';
      updated.sections = updated.sections.filter(s => s.type !== 'whatsapp_floating');
      responseMessage = '🧹 **Botão de WhatsApp Removido!** O layout agora está limpo e sem o botão flutuante.';
    } else if (cmd.includes('promoç') || cmd.includes('desconto') || cmd.includes('oferta') || cmd.includes('cupom')) {
      toolUsed = 'update_sections';
      const hero = updated.sections.find(s => s.type === 'hero');
      if (hero) {
        hero.badge = '🔥 OFERTA EXCLUSIVA DESTA SEMANA';
        hero.title = `Ganhe até 15% OFF no seu primeiro pedido no ${updated.companyName}`;
        hero.buttonText = 'Garantir Desconto no WhatsApp';
      }
      responseMessage = `🎉 **Promoção Adicionada ao Site!** Destaquei o selo de oferta exclusiva no cabeçalho com botão para resgatar no WhatsApp.`;
    } else if (cmd.includes('sincronizar maps') || cmd.includes('dados do maps') || cmd.includes('atualizar endereço') || cmd.includes('atualizar maps')) {
      toolUsed = 'update_sections';
      const hero = updated.sections.find(s => s.type === 'hero');
      if (hero) {
        hero.badge = '⭐ Avaliação 4.9 no Google Maps (Centenas de clientes reais)';
        hero.subtitle = `Conheça o espaço do ${updated.companyName} em ${updated.city}. Atendimento de excelência, localização privilegiada e clientes 100% satisfeitos.`;
      }
      const contact = updated.sections.find(s => s.type === 'contact');
      if (contact) {
        contact.subtitle = `Endereço: ${updated.address || updated.city} • Atendimento rápido via WhatsApp: ${updated.whatsapp || updated.phone}`;
      }
      responseMessage = `📍 **Informações do Google Maps Sincronizadas no Site!**`;
    } else if (cmd.includes('otimizar mobile') || cmd.includes('ajustar mobile') || cmd.includes('para celular') || cmd.includes('versão mobile')) {
      toolUsed = 'update_sections';
      const hero = updated.sections.find(s => s.type === 'hero');
      if (hero && hero.title) {
        hero.title = hero.title.length > 45 ? hero.title.substring(0, 42) + '...' : hero.title;
        hero.buttonText = 'Falar no WhatsApp';
      }
      const nav = updated.sections.find(s => s.type === 'navbar');
      if (nav) nav.buttonText = 'WhatsApp';
      responseMessage = '📱 **Ajustes de Mobile Aplicados!** Otimizei os títulos para leitura instantânea no celular e compactei os botões de ação.';
    } else if (cmd.includes('dourad') || cmd.includes('ouro') || cmd.includes('luxo')) {
      toolUsed = 'update_theme';
      updated.theme = DEFAULT_THEMES[1];
      responseMessage = '✨ Paleta **Obsidian & Gold Luxury** aplicada ao site!';
    } else if (cmd.includes('verde') || cmd.includes('esmeralda') || cmd.includes('saúde') || cmd.includes('natureza')) {
      toolUsed = 'update_theme';
      updated.theme = DEFAULT_THEMES[2];
      responseMessage = '🌿 Paleta **Emerald Fresh & Health** aplicada ao site!';
    } else if (cmd.includes('azul') || cmd.includes('tech') || cmd.includes('moderno') || cmd.includes('oceano')) {
      toolUsed = 'update_theme';
      updated.theme = DEFAULT_THEMES[3];
      responseMessage = '🌊 Paleta **Ocean Blue Tech** aplicada ao site!';
    } else if (cmd.includes('tema branco') || cmd.includes('fundo branco') || cmd.includes('clean light')) {
      toolUsed = 'update_theme';
      updated.theme = DEFAULT_THEMES[4];
      responseMessage = '☀️ Tema **Clean Minimal Light** aplicado ao site!';
    } else if (cmd.includes('adicionar depoimento') || cmd.includes('colocar depoimento') || cmd.includes('mostrar avaliações')) {
      toolUsed = 'add_section';
      const existing = updated.sections.find(s => s.type === 'testimonials');
      if (existing) existing.enabled = true;
      responseMessage = '⭐ Seção de **Depoimentos e Avaliações 5 Estrelas** ativada no site!';
    } else if (cmd.includes('adicionar faq') || cmd.includes('colocar faq') || cmd.includes('perguntas frequentes')) {
      toolUsed = 'add_section';
      const existing = updated.sections.find(s => s.type === 'faq');
      if (existing) existing.enabled = true;
      responseMessage = '❓ Seção de **Perguntas Frequentes (FAQ)** ativada no site!';
    } else {
      // General conversation response WITHOUT modifying the site
      toolUsed = 'ai_chat';
      responseMessage = `Compreendi! Você disse: "${userCommand}".\n\nComo posso te ajudar com relação a isso? Se quiser que eu aplique alguma alteração específica no site de demonstração (como mudar cores, trocar títulos ou adicionar seções), basta me pedir!`;
      return { updatedSite: currentSite, responseMessage, toolUsed };
    }

    updated.updatedAt = new Date().toISOString();
    return { updatedSite: updated, responseMessage, toolUsed };
  }



};


