import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { DataProvider } from '../services/dataProvider';
import { GeminiService } from '../services/geminiService';
import { StorageService } from '../services/storage';
import { calculateOpportunityScore } from '../services/opportunityEngine';
import { Company } from '../types';
import { NICHE_CATEGORIES } from '../data/categories';
import { findCitySuggestion, searchMatchingCities, BrazilianCity } from '../data/brazilianCities';
import { CompanyCard } from '../components/search/CompanyCard';
import { Search, MapPin, Filter, Sparkles, RefreshCw, AlertCircle, CheckCircle2, Key, Lightbulb, ChevronDown } from 'lucide-react';

interface Props {
  onNavigate: (page: string, data?: any) => void;
}

export const SearchPage: React.FC<Props> = ({ onNavigate }) => {
  const { user, consumeSearch, consumeAICredit } = useAuth();
  const toast = useToast();

  const [query, setQuery] = useState('Restaurantes & Gastronomia');
  const [selectedNicheId, setSelectedNicheId] = useState('restaurantes');
  const [location, setLocation] = useState(user?.targetRegion || 'Barão de Cocais, MG');
  const [quantity, setQuantity] = useState<number>(20);
  const [filterNoWebsite, setFilterNoWebsite] = useState(true);
  const [filterHighOpportunity, setFilterHighOpportunity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Tabs & Favorites state
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [favoritesList, setFavoritesList] = useState<Company[]>(StorageService.getFavorites());

  const refreshFavorites = () => {
    setFavoritesList(StorageService.getFavorites());
  };

  // City suggestion / typo states
  const [citySuggestion, setCitySuggestion] = useState<BrazilianCity | null>(null);
  const [cityMatches, setCityMatches] = useState<BrazilianCity[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);


  // API Keys modal (Apify & Google Places)
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [googleKeyInput, setGoogleKeyInput] = useState(DataProvider.getGooglePlacesKey());
  const [apifyTokenInput, setApifyTokenInput] = useState(DataProvider.getApifyToken());

  // Manual / Maps Company Import modal
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualCategory, setManualCategory] = useState('Restaurantes & Gastronomia');
  const [manualCity, setManualCity] = useState(user?.targetRegion || 'Barão de Cocais, MG');
  const [manualPhone, setManualPhone] = useState('');

  // Check for city typos as user types
  useEffect(() => {
    if (location.trim().length >= 3) {
      const suggestion = findCitySuggestion(location);
      setCitySuggestion(suggestion);
      setCityMatches(searchMatchingCities(location, 4));
    } else {
      setCitySuggestion(null);
      setCityMatches([]);
    }
  }, [location]);

  const handleApplySuggestion = (city: BrazilianCity) => {
    setLocation(`${city.name}, ${city.uf}`);
    setCitySuggestion(null);
    setShowCityDropdown(false);
    toast.success(`Cidade ajustada para ${city.name}, ${city.uf}`);
  };

  const handleSaveApiKeys = () => {
    DataProvider.setGooglePlacesKey(googleKeyInput.trim());
    DataProvider.setApifyToken(apifyTokenInput.trim());
    setShowKeyModal(false);
    toast.success('Chaves de conexão salvas com sucesso!');
  };


  const handleCreateManualCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) {
      toast.error('Informe o nome da empresa');
      return;
    }

    const opportunityScore = calculateOpportunityScore({
      hasWebsite: false,
      socialPresence: true,
      rating: 4.8,
      reviewCount: 140
    });

    const company: Company = {
      id: 'manual_' + Math.random().toString(36).substring(2, 9),
      name: manualName.trim(),
      category: manualCategory,
      location: manualCity,
      city: manualCity.split(',')[0].trim(),
      state: manualCity.includes('-') ? manualCity.split('-')[1].trim() : (manualCity.includes(',') ? manualCity.split(',')[1].trim() : 'MG'),
      address: `Região Central, ${manualCity}`,
      phone: manualPhone.trim() || '(31) 98888-7777',
      hasWebsite: false,
      rating: 4.8,
      reviewCount: 140,
      socialPresence: true,
      instagramHandle: '@' + manualName.toLowerCase().replace(/[^a-z0-9]/g, ''),
      opportunityScore
    };

    setShowManualModal(false);
    await handleCreateDemo(company);
  };


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
      toast.success(`${results.length} empresas encontradas!`);
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

    toast.info('Gerando demonstração comercial com Gemini...', 'Montando layout sob medida.');
    const site = await GeminiService.generateInitialSite(company);
    StorageService.saveSite(site);
    onNavigate('builder', { siteId: site.id, site });
  };

  const handleOpenDetails = (company: Company) => {
    toast.info('Detalhes de ' + company.name, 'Visualização completa do lead.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4 animate-slide-up pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-zinc-800/80">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Mapear & Prospectar Empresas</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
              Apify & Google Maps
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Identifique comércios locais ativos no Google Maps sem site próprio.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer"
            title="Configurar Apify ou Google Places"
          >
            <Key className="w-3.5 h-3.5 text-zinc-400" />
            <span>Conectores / Apify</span>
          </button>

          <button
            type="button"
            onClick={() => setShowManualModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-xs font-bold text-zinc-950 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Adicionar do Maps</span>
          </button>
        </div>
      </div>

      {/* Tabs: Todas as Empresas vs Favoritas */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-zinc-100 text-zinc-950 shadow-sm'
              : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Pesquisa Ativa {hasSearched ? `(${companies.length})` : ''}</span>
        </button>

        <button
          onClick={() => {
            refreshFavorites();
            setActiveTab('favorites');
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'favorites'
              ? 'bg-zinc-100 text-zinc-950 shadow-sm'
              : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <span className="text-rose-400">♥</span>
          <span>Favoritas ({favoritesList.length})</span>
        </button>
      </div>

      {activeTab === 'all' && (
        <>
          {/* Main Search Panel - Compact & Sleek */}
          <div className="saas-card p-4 border-zinc-800 space-y-3">
            <form onSubmit={handleSearch} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {/* Niche Selector */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 mb-1">Segmento / Nicho</label>
                  <select
                    value={selectedNicheId}
                    onChange={(e) => {
                      const cat = NICHE_CATEGORIES.find(c => c.id === e.target.value);
                      if (cat) {
                        setSelectedNicheId(cat.id);
                        setQuery(cat.name);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-500"
                  >
                    {NICHE_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location with live autocomplete */}
                <div className="relative">
                  <label className="block text-[11px] font-bold text-zinc-300 mb-1">Cidade & Estado (Brasil)</label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        setShowCityDropdown(true);
                      }}
                      onFocus={() => setShowCityDropdown(true)}
                      placeholder="Ex: Barão de Cocais, MG"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                      required
                    />
                  </div>

                  {/* City Autocomplete Dropdown */}
                  {showCityDropdown && cityMatches.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
                      {cityMatches.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleApplySuggestion(c)}
                          className="w-full px-3 py-1.5 text-left text-xs text-zinc-200 hover:bg-zinc-800 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <span>{c.name}, {c.uf}</span>
                          <span className="text-[10px] text-zinc-400">DDD {c.ddd}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* "Você quis dizer" suggestion pill */}
                  {citySuggestion && (
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-800/40">
                      <Lightbulb className="w-3 h-3 shrink-0" />
                      <span>Sugestão:</span>
                      <button
                        type="button"
                        onClick={() => handleApplySuggestion(citySuggestion)}
                        className="font-bold underline hover:text-amber-200 cursor-pointer"
                      >
                        {citySuggestion.name}, {citySuggestion.uf}
                      </button>
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 mb-1">Quantidade de Resultados</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-500"
                  >
                    <option value={10}>10 Empresas</option>
                    <option value={20}>20 Empresas (Recomendado)</option>
                    <option value={50}>50 Empresas</option>
                  </select>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-800/80">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filterNoWebsite}
                      onChange={(e) => setFilterNoWebsite(e.target.checked)}
                      className="rounded bg-zinc-900 border-zinc-700 text-zinc-100 focus:ring-0"
                    />
                    <span>Apenas sem site próprio</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filterHighOpportunity}
                      onChange={(e) => setFilterHighOpportunity(e.target.checked)}
                      className="rounded bg-zinc-900 border-zinc-700 text-zinc-100 focus:ring-0"
                    />
                    <span>Alta Oportunidade (Score 80+)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 text-xs font-bold text-zinc-950 bg-zinc-100 hover:bg-white px-5 py-2 rounded-lg shadow-sm transition-all disabled:opacity-50 active:scale-95 cursor-pointer ml-auto"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Buscando Empresas...
                    </>
                  ) : (
                    <>
                      <Search className="w-3.5 h-3.5" />
                      Pesquisar Empresas
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      )}


      {/* Results List */}
      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center gap-2.5 text-center">
          <div className="w-9 h-9 rounded-xl bg-zinc-800 text-zinc-200 flex items-center justify-center animate-bounce">
            <Search className="w-4 h-4" />
          </div>
          <p className="font-bold text-sm text-white">Consultando base de empresas em {location}...</p>
          <p className="text-xs text-zinc-400">Verificando presença digital e nota no Google Maps via Apify</p>
        </div>
      ) : activeTab === 'favorites' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-white">
              {favoritesList.length} Empresas Salvas como Favoritas
            </h2>
          </div>

          {favoritesList.length === 0 ? (
            <div className="saas-card p-6 text-center space-y-1.5 border-zinc-800">
              <span className="text-2xl text-zinc-600 block mb-1">♥</span>
              <p className="text-xs font-semibold text-white">Nenhuma empresa favoritada ainda.</p>
              <p className="text-[11px] text-zinc-400">Clique no ícone de coração nos cartões de empresas para salvá-las aqui.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {favoritesList.map(comp => (
                <CompanyCard
                  key={comp.id}
                  company={comp}
                  onOpenDetails={handleOpenDetails}
                  onCreateDemo={handleCreateDemo}
                  onFavoriteToggled={refreshFavorites}
                />
              ))}
            </div>
          )}
        </div>
      ) : hasSearched ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-white">
              {companies.length} Estabelecimentos Encontrados em {location}
            </h2>
          </div>

          {companies.length === 0 ? (
            <div className="saas-card p-6 text-center space-y-1.5 border-zinc-800">
              <AlertCircle className="w-6 h-6 text-zinc-500 mx-auto" />
              <p className="text-xs font-semibold text-white">Nenhuma empresa encontrada com esses filtros.</p>
              <p className="text-[11px] text-zinc-400">Tente selecionar outra categoria ou ampliar a região.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {companies.map(comp => (
                <CompanyCard
                  key={comp.id}
                  company={comp}
                  onOpenDetails={handleOpenDetails}
                  onCreateDemo={handleCreateDemo}
                  onFavoriteToggled={refreshFavorites}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="saas-card p-8 text-center space-y-2 border-zinc-800">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-300">
            <Search className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-white">Selecione o nicho e a cidade acima</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Descubra negócios ativos que necessitam de presença digital e gere demonstrações em 1 clique.
          </p>
        </div>
      )}


      {/* API Connectors Modal (Apify & Google Places) */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="saas-card p-6 max-w-lg w-full space-y-5 animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Key className="w-4 h-4 text-zinc-300" />
                Conectores de Busca em Tempo Real
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-zinc-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Apify Connector */}
              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <label className="text-xs font-bold text-white">Apify Google Maps Scraper</label>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    Recomendado
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Extrai telefones reais, notas exatas e links do Google Maps via atores do Apify (ex: <code>compass/crawler-google-places</code>).
                </p>
                <input
                  type="password"
                  value={apifyTokenInput}
                  onChange={(e) => setApifyTokenInput(e.target.value)}
                  placeholder="apify_api_..."
                  className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400"
                />
              </div>

              {/* Google Places Official API */}
              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                  <label className="text-xs font-bold text-white">Google Places API (Google Cloud)</label>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Conexão direta com a API oficial do Google Places.
                </p>
                <input
                  type="password"
                  value={googleKeyInput}
                  onChange={(e) => setGoogleKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-3.5 py-2 rounded-lg bg-zinc-900 text-zinc-300 text-xs hover:bg-zinc-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveApiKeys}
                className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-bold text-xs hover:bg-white shadow-sm transition-all active:scale-95"
              >
                Salvar Conectores
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual / Maps Company Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateManualCompany} className="saas-card p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Criar Demonstração do Google Maps
              </div>
              <button
                type="button"
                onClick={() => setShowManualModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Viu um comércio sem site no Google Maps ou no Instagram? Digite o nome dele para a IA gerar o site e a mensagem de abordagem na hora.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Nome do Estabelecimento *</label>
                <input
                  type="text"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="Ex: Pizzaria Forno Nobre"
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Segmento / Nicho</label>
                  <select
                    value={manualCategory}
                    onChange={(e) => setManualCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {NICHE_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Cidade & Estado</label>
                  <input
                    type="text"
                    value={manualCity}
                    onChange={(e) => setManualCity(e.target.value)}
                    placeholder="Ex: Barão de Cocais, MG"
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">WhatsApp / Telefone (Opcional)</label>
                <input
                  type="text"
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  placeholder="Ex: (31) 98888-7777"
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowManualModal(false)}
                className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Gerar Demonstração
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};


