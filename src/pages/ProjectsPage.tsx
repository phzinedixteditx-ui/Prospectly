import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { SiteConfig } from '../types';
import { useToast } from '../context/ToastContext';
import { 
  FolderKanban, 
  Search, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Share2, 
  MessageCircle, 
  Plus, 
  Sparkles, 
  Globe, 
  Calendar, 
  MapPin, 
  ArrowRight,
  Eye
} from 'lucide-react';
import { WhatsAppPitchModal } from '../components/builder/WhatsAppPitchModal';
import { AgencySettingsModal } from '../components/common/AgencySettingsModal';

interface Props {
  onNavigate: (page: string, data?: any) => void;
}

export const ProjectsPage: React.FC<Props> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<SiteConfig[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedProjectForPitch, setSelectedProjectForPitch] = useState<SiteConfig | null>(null);
  const [agencyModalOpen, setAgencyModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const sites = StorageService.getSites();
    setProjects(sites);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o projeto de demonstração "${name}"?`)) {
      StorageService.deleteSite(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success(`Projeto "${name}" removido com sucesso.`);
    }
  };

  const handleCopyLink = (project: SiteConfig) => {
    const siteUrl = `${window.location.origin}/?site=${project.slug || project.id}`;
    navigator.clipboard.writeText(siteUrl);
    toast.success('Link do site copiado para a área de transferência!');
  };

  const niches = ['all', ...Array.from(new Set(projects.map(p => p.niche || 'Geral')))];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.niche && p.niche.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesNiche = selectedNiche === 'all' || p.niche === selectedNiche;
    return matchesSearch && matchesNiche;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in text-zinc-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 mb-2">
            <FolderKanban className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gerenciador de Demonstrações & Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <span>Meus Projetos & Sites</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 font-bold">
              {projects.length} {projects.length === 1 ? 'site' : 'sites'}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Acompanhe visualizações em tempo real (Lead no Radar), personalize sua agência e envie no WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setAgencyModalOpen(true)}
            className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-800/60 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            title="Configurar Modo Agência White-Label"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Agência White-Label</span>
          </button>

          <button
            onClick={() => onNavigate('search')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 transition-all shadow-lg shadow-emerald-500/10 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Demonstração</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por empresa, cidade ou nicho..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>

        {niches.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
            {niches.map(niche => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedNiche === niche 
                    ? 'bg-zinc-100 text-zinc-950 shadow-sm' 
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {niche === 'all' ? 'Todos os Nichos' : niche}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl border border-zinc-800/80 bg-zinc-900/40 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center mx-auto text-zinc-400">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Nenhum projeto encontrado</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              {searchQuery 
                ? 'Nenhum site corresponde aos filtros de busca aplicados.' 
                : 'Você ainda não gerou nenhuma demonstração. Pesquise empresas no Google Maps para criar seu primeiro site em 1 clique!'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 transition-all shadow-md active:scale-95"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Pesquisar Empresas no Google Maps</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => {
            const heroSection = project.sections?.find(s => s.type === 'hero');
            const heroImage = heroSection?.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80';

            return (
              <div
                key={project.id}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Visual Preview Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-zinc-950">
                    <img
                      src={heroImage}
                      alt={project.companyName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                    {/* Niche Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-wider text-emerald-400">
                        {project.niche || 'Comércio'}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold">
                      {project.status === 'published' ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-emerald-400">Publicado</span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span className="text-amber-300">Rascunho</span>
                        </>
                      )}
                    </div>

                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-bold">
                      <span className="truncate">{project.companyName}</span>
                      <span className="text-[10px] opacity-75 font-normal flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        {project.city}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {project.tagline || heroSection?.subtitle || `Demonstração interativa desenvolvida exclusivamente para ${project.companyName}.`}
                    </p>

                    {/* Lead no Radar / Views Indicator */}
                    {(() => {
                      const views = StorageService.getDemoViewsBySiteId(project.id);
                      if (views.length > 0) {
                        const lastView = views[0];
                        const diffMin = Math.max(1, Math.round((Date.now() - new Date(lastView.viewedAt).getTime()) / 60000));
                        return (
                          <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-between text-[11px] text-amber-300">
                            <span className="flex items-center gap-1 font-bold">
                              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                              🔥 Lead no Radar
                            </span>
                            <span className="text-[10px] text-amber-400/80">
                              {views.length} {views.length === 1 ? 'acesso' : 'acessos'} (há {diffMin}m)
                            </span>
                          </div>
                        );
                      }
                      return (
                        <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                          <Eye className="w-3 h-3 text-zinc-600" />
                          <span>Aguardando primeiro acesso do cliente</span>
                        </div>
                      );
                    })()}

                    <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-800/80">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(project.updatedAt || project.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-400 font-semibold">
                        <span>{project.sections?.filter(s => s.enabled).length || 8} seções</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onNavigate('builder', { siteId: project.id })}
                      className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Editar no Builder</span>
                    </button>

                    <button
                      onClick={() => onNavigate('public-demo', { slug: project.slug || project.id })}
                      className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Ver Demonstração</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setSelectedProjectForPitch(project)}
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Enviar abordagem comercial no WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Enviar no WhatsApp</span>
                    </button>

                    <button
                      onClick={() => handleCopyLink(project)}
                      className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      title="Copiar link da demonstração"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(project.id, project.companyName)}
                      className="p-2 rounded-xl bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Excluir projeto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* WhatsApp Pitch Modal */}
      {selectedProjectForPitch && (
        <WhatsAppPitchModal
          isOpen={true}
          onClose={() => setSelectedProjectForPitch(null)}
          site={selectedProjectForPitch}
        />
      )}

      {/* Agency Settings Modal */}
      <AgencySettingsModal
        isOpen={agencyModalOpen}
        onClose={() => setAgencyModalOpen(false)}
      />
    </div>
  );
};
