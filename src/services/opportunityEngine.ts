import { OpportunityScore } from '../types';

interface ScoreCalculationParams {
  hasWebsite: boolean;
  socialPresence: boolean;
  rating: number;
  reviewCount: number;
  isEstablished?: boolean;
}

export function calculateOpportunityScore(params: ScoreCalculationParams): OpportunityScore {
  // 1. Ausência de site: +30 pontos
  const scoreNoWebsite = !params.hasWebsite ? 30 : 0;

  // 2. Presença social ativa: +15 pontos
  const scoreSocialActive = params.socialPresence ? 15 : 5;

  // 3. Grande quantidade de avaliações (4.2+ e 15+ avaliações): +15 pontos
  let scoreHighReviews = 0;
  if (params.reviewCount >= 100) {
    scoreHighReviews = 15;
  } else if (params.reviewCount >= 30) {
    scoreHighReviews = 12;
  } else if (params.reviewCount >= 10) {
    scoreHighReviews = 8;
  } else {
    scoreHighReviews = 4;
  }

  // 4. Negócio estabelecido: +10 pontos (avaliação sólida > 4.0)
  const scoreEstablished = params.rating >= 4.3 ? 10 : params.rating >= 3.8 ? 7 : 3;

  // 5. Potencial de serviço / retorno comercial: +20 pontos
  const scoreServicePotential = !params.hasWebsite ? 20 : 5;

  // 6. Outros sinais e engajamento local: +10 pontos
  const scoreLocalEngagement = (params.socialPresence && params.reviewCount > 20) ? 10 : 6;

  const total = Math.min(100, Math.max(10, 
    scoreNoWebsite + 
    scoreSocialActive + 
    scoreHighReviews + 
    scoreEstablished + 
    scoreServicePotential + 
    scoreLocalEngagement
  ));

  let badge: OpportunityScore['badge'] = 'Alta oportunidade';
  let reason = '';

  if (total >= 80) {
    badge = 'Alta oportunidade';
    if (!params.hasWebsite) {
      reason = 'Empresa estabelecida com forte reputação local (' + params.reviewCount + ' avaliações ⭐' + params.rating.toFixed(1) + '), redes ativas porém SEM site próprio identificado.';
    } else {
      reason = 'Empresa com grande volume de clientes e alta demanda potencial de melhoria de posicionamento digital.';
    }
  } else if (total >= 60) {
    badge = 'Média oportunidade';
    reason = 'Negócio com boa tração local e potencial para demonstração visual focada em conversão.';
  } else {
    badge = 'Oportunidade moderada';
    reason = 'Empresa com presença digital básica estabelecida, oportunidade para modernização.';
  }

  return {
    total,
    hasWebsite: params.hasWebsite,
    scoreNoWebsite,
    scoreSocialActive,
    scoreHighReviews,
    scoreEstablished,
    scoreServicePotential,
    scoreLocalEngagement,
    badge,
    reason
  };
}
