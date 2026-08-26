export interface NicheCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  keywords: string[];
  sampleImages: string[];
}

export const NICHE_CATEGORIES: NicheCategory[] = [
  // 1. Gastronomia
  {
    id: 'restaurantes',
    name: 'Restaurantes & Gastronomia',
    icon: 'UtensilsCrossed',
    description: 'Restaurantes, churrascarias, bistrôs e comida a quilo.',
    keywords: ['restaurante', 'churrascaria', 'bistro', 'almoco', 'comida', 'gastronomia'],
    sampleImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'pizzarias',
    name: 'Pizzarias & Delivery',
    icon: 'Pizza',
    description: 'Pizzarias tradicionais, forno a lenha e delivery.',
    keywords: ['pizzaria', 'pizza', 'forno a lenha', 'calzone', 'delivery de pizza'],
    sampleImages: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'hamburguerias',
    name: 'Hamburguerias Artesanais',
    icon: 'Flame',
    description: 'Hamburguerias gourmet, smash burgers e batatas artesanais.',
    keywords: ['hamburgueria', 'burger', 'hamburguer', 'smash', 'artesanal'],
    sampleImages: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'cafeterias',
    name: 'Cafeterias, Docerias & Padarias',
    icon: 'Coffee',
    description: 'Cafés especiais, confeitarias, bolos artesanais e padarias gourmet.',
    keywords: ['cafe', 'cafeteria', 'padaria', 'confeitaria', 'doceria', 'bolos'],
    sampleImages: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // 2. Beleza & Estética
  {
    id: 'barbearias',
    name: 'Barbearias Premium',
    icon: 'Scissors',
    description: 'Barbearias tradicionais, barboterapia, corte e estilo masculino.',
    keywords: ['barbearia', 'barbeiro', 'barba', 'corte masculino', 'barber'],
    sampleImages: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'saloes_beleza',
    name: 'Salões de Beleza & Cabelereiros',
    icon: 'Sparkles',
    description: 'Coloração, mechas, hidratação, penteados e estética capilar.',
    keywords: ['salao de beleza', 'cabelereiro', 'cabelereira', 'mechas', 'escova', 'manicure'],
    sampleImages: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'clinicas_estetica',
    name: 'Clínicas de Estética & Harmonização',
    icon: 'Heart',
    description: 'Harmonização facial, botox, depilação a laser e drenagem.',
    keywords: ['estetica', 'harmonizacao', 'botox', 'laser', 'drenagem', 'spa', 'limpeza de pele'],
    sampleImages: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // 3. Saúde & Bem-estar
  {
    id: 'odontologia',
    name: 'Clínicas Odontológicas & Dentistas',
    icon: 'Smile',
    description: 'Implantes, lentes de resina/porcelana, ortodontia e clareamento.',
    keywords: ['dentista', 'odontologia', 'odonto', 'implante', 'ortodontia', 'clareamento'],
    sampleImages: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'clinicas_medicas',
    name: 'Clínicas Médicas & Consultórios',
    icon: 'Stethoscope',
    description: 'Consultórios médicos, dermatologia, pediatria e clínicas gerais.',
    keywords: ['medico', 'consultorio', 'clinica medica', 'dermatologia', 'pediatria', 'cardiologia'],
    sampleImages: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'fisioterapia_pilates',
    name: 'Fisioterapia, Pilates & Quiropraxia',
    icon: 'Activity',
    description: 'Reabilitação, alívio de dores, estúdios de pilates e quiropraxia.',
    keywords: ['fisioterapia', 'pilates', 'quiropraxia', 'rpg', 'reabilitacao', 'postura'],
    sampleImages: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'academias_crossfit',
    name: 'Academias & Centros de Treinamento',
    icon: 'Dumbbell',
    description: 'Musculação, crossfit, natação, lutas e personal training.',
    keywords: ['academia', 'crossfit', 'musculacao', 'treinamento', 'lutas', 'jiu jitsu'],
    sampleImages: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'veterinarias_petshops',
    name: 'Clínicas Veterinárias & Pet Shops',
    icon: 'Dog',
    description: 'Consultas veterinárias, vacinação, cirurgia, banho e tosa.',
    keywords: ['veterinaria', 'pet shop', 'banho e tosa', 'veterinario', 'clinica vet', 'animais'],
    sampleImages: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // 4. Automotivo
  {
    id: 'oficinas_mecanicas',
    name: 'Oficinas Mecânicas & Auto Centers',
    icon: 'Wrench',
    description: 'Manutenção preventiva, motor, suspensão, freios e alinhamento.',
    keywords: ['mecanica', 'oficina', 'auto center', 'revisao', 'freios', 'suspensao'],
    sampleImages: [
      'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'estetica_automotiva',
    name: 'Estética Automotiva & Lava Jatos',
    icon: 'Car',
    description: 'Polimento, vitrificação, higienização interna e lavagem detalhada.',
    keywords: ['lava jato', 'estetica automotiva', 'polimento', 'vitrificacao', 'higienizacao'],
    sampleImages: [
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // 5. Serviços & Construção
  {
    id: 'energia_solar',
    name: 'Energia Solar & Instalações Elétricas',
    icon: 'SunMedium',
    description: 'Projetos fotovoltaicos, economia de energia e instalações industriais.',
    keywords: ['energia solar', 'solar', 'fotovoltaica', 'painel solar', 'eletricista'],
    sampleImages: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'marcenaria_planejados',
    name: 'Móveis Planejados & Marcenarias',
    icon: 'Hammer',
    description: 'Cozinhas planejadas, armários embutidos e design de interiores.',
    keywords: ['marcenaria', 'moveis planejados', 'marceneiro', 'planejados', 'cozinha planejada'],
    sampleImages: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // 6. Negócios & Profissionais
  {
    id: 'advocacia',
    name: 'Escritórios de Advocacia',
    icon: 'Scale',
    description: 'Direito trabalhista, previdenciário, empresarial, civil e família.',
    keywords: ['advogado', 'advocacia', 'direito', 'juridico', 'previdenciario', 'trabalhista'],
    sampleImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'contabilidade',
    name: 'Contabilidade & Consultoria Tributária',
    icon: 'Calculator',
    description: 'Abertura de empresas, assessoria fiscal, contábil e folha de pagamento.',
    keywords: ['contabilidade', 'contador', 'fiscal', 'tributario', 'imposto de renda'],
    sampleImages: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'imobiliarias',
    name: 'Imobiliárias & Corretores de Imóveis',
    icon: 'Building2',
    description: 'Venda e locação de casas, apartamentos, lotes e imóveis comerciais.',
    keywords: ['imobiliaria', 'corretor', 'imoveis', 'aluguel', 'venda de casas'],
    sampleImages: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

