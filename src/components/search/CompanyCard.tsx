import React, { useState } from 'react';
import { Company } from '../../types';
import { OpportunityScoreBadge } from '../common/OpportunityScoreBadge';
import { Star, MapPin, Globe, AtSign, Plus, Sparkles, Check, Flame, ExternalLink, Heart } from 'lucide-react';
import { useLeads } from '../../context/LeadsContext';
import { StorageService } from '../../services/storage';
import { useToast } from '../../context/ToastContext';

interface Props {
  company: Company;
  onOpenDetails: (company: Company) => void;
  onCreateDemo: (company: Company) => void;
  onFavoriteToggled?: () => void;
}

export const CompanyCard: React.FC<Props> = ({ company, onOpenDetails, onCreateDemo, onFavoriteToggled }) => {
  const { isCompanySaved, saveCompanyAsLead } = useLeads();
  const saved = isCompanySaved(company.id);
  const [isFav, setIsFav] = useState(StorageService.isFavorite(company.id));
  const toast = useToast();

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = StorageService.toggleFavorite(company);
    setIsFav(result);
    if (result) {
      toast.success(`${company.name} adicionada aos favoritos!`);
    } else {
      toast.info(`${company.name} removida dos favoritos.`);
    }
    if (onFavoriteToggled) onFavoriteToggled();
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.name} ${company.city} ${company.state}`)}`;

  return (
    <div className="saas-card p-3.5 flex flex-col justify-between hover:border-zinc-700 transition-all group relative">
      <div>
        {/* Top Header: Category Pill, Favorite Button & Opportunity Score */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-800 truncate max-w-[150px]">
              {company.category}
            </span>
            <button
              onClick={handleToggleFav}
              className={`p-1 rounded-md border transition-all ${
                isFav
                  ? 'bg-rose-950/80 border-rose-500/50 text-rose-400 fill-rose-400'
                  : 'bg-zinc-900/90 border-zinc-800 text-zinc-500 hover:text-rose-400 hover:border-zinc-700'
              }`}
              title={isFav ? 'Remover dos favoritos' : 'Favoritar empresa'}
            >
              <Heart className={`w-3 h-3 ${isFav ? 'fill-rose-400' : ''}`} />
            </button>
          </div>
          <OpportunityScoreBadge score={company.opportunityScore} />
        </div>

        {/* Photo preview if scraped from Maps */}
        {company.photos && company.photos.length > 0 && (
          <div className="w-full h-24 rounded-lg overflow-hidden mb-2 border border-zinc-800 bg-zinc-950">
            <img 
              src={company.photos[0]} 
              alt={company.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
          </div>
        )}

        {/* Company Name */}
        <h3 className="font-bold text-sm text-white mb-1 leading-snug group-hover:text-zinc-200 transition-colors line-clamp-1">
          {company.name}
        </h3>

        {/* Rating & Reviews on Google */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-300 mb-2">
          <div className="flex items-center gap-1 text-amber-400 font-bold text-[11px]">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{company.rating.toFixed(1)}</span>
          </div>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400 text-[11px]">({company.reviewCount} avaliações)</span>
        </div>

        {/* Location & Status Badges */}
        <div className="space-y-1 text-xs text-zinc-400 mb-2.5">
          <div className="flex items-center gap-1.5 text-[11px]">
            <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
            <span className="truncate text-zinc-300">{company.address || company.location}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {company.hasWebsite ? (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-900 text-zinc-400 border border-zinc-800">
                <Globe className="w-2.5 h-2.5 text-zinc-400" /> Possui site
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950/70 text-emerald-400 border border-emerald-500/30">
                ⚡ Sem site próprio
              </span>
            )}

            {company.socialPresence && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-900 text-zinc-400 border border-zinc-800">
                <AtSign className="w-2.5 h-2.5 text-zinc-400" /> Insta Ativo
              </span>
            )}
          </div>
        </div>

        {/* Opportunity Summary Hook */}
        <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800/90 text-xs text-zinc-300 mb-2.5">
          <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400 mb-0.5">
            <Flame className="w-3 h-3 text-amber-400 shrink-0" />
            Oportunidade:
          </div>
          <p className="text-zinc-300 text-[10px] leading-snug line-clamp-2">
            {company.opportunityScore.reason}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-zinc-800">
        <button
          onClick={() => onCreateDemo(company)}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-950 bg-zinc-100 hover:bg-white py-2 px-2.5 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-amber-500" />
          Demonstração
        </button>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
          title="Ver no Google Maps"
        >
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </a>

        <button
          onClick={() => saveCompanyAsLead(company)}
          className={`flex items-center justify-center p-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
            saved
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
              : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
          }`}
          title={saved ? 'Lead já salvo' : 'Salvar no CRM'}
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};




