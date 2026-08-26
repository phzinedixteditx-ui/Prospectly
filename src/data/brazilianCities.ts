export interface BrazilianCity {
  name: string;
  state: string;
  uf: string;
  ddd: string;
}

export const BRAZILIAN_CITIES: BrazilianCity[] = [
  // Minas Gerais
  { name: 'Barão de Cocais', state: 'Minas Gerais', uf: 'MG', ddd: '31' },
  { name: 'Belo Horizonte', state: 'Minas Gerais', uf: 'MG', ddd: '31' },
  { name: 'Itabira', state: 'Minas Gerais', uf: 'MG', ddd: '31' },
  { name: 'Santa Bárbara', state: 'Minas Gerais', uf: 'MG', ddd: '31' },
  { name: 'João Monlevade', state: 'Minas Gerais', uf: 'MG', ddd: '31' },
  { name: 'Ipatinga', state: 'Minas Gerais', uf: 'MG', ddd: '31' },
  { name: 'Contagem', state: 'Minas Gerais', uf: 'MG', ddd: '31' },
  { name: 'Betim', state: 'Minas Gerais', uf: 'MG', ddd: '31' },
  { name: 'Nova Lima', state: 'Minas Gerais', uf: 'MG', ddd: '31' },
  { name: 'Ouro Preto', state: 'Minas Gerais', uf: 'MG', ddd: '31' },
  { name: 'Mariana', state: 'Minas Gerais', uf: 'MG', ddd: '31' },
  { name: 'Juiz de Fora', state: 'Minas Gerais', uf: 'MG', ddd: '32' },
  { name: 'Uberlândia', state: 'Minas Gerais', uf: 'MG', ddd: '34' },
  { name: 'Uberaba', state: 'Minas Gerais', uf: 'MG', ddd: '34' },
  { name: 'Montes Claros', state: 'Minas Gerais', uf: 'MG', ddd: '38' },
  { name: 'Governador Valadares', state: 'Minas Gerais', uf: 'MG', ddd: '33' },
  { name: 'Poços de Caldas', state: 'Minas Gerais', uf: 'MG', ddd: '35' },
  { name: 'Divinópolis', state: 'Minas Gerais', uf: 'MG', ddd: '37' },
  { name: 'Pouso Alegre', state: 'Minas Gerais', uf: 'MG', ddd: '35' },
  { name: 'Varginha', state: 'Minas Gerais', uf: 'MG', ddd: '35' },
  { name: 'Sete Lagoas', state: 'Minas Gerais', uf: 'MG', ddd: '31' },

  // São Paulo
  { name: 'São Paulo', state: 'São Paulo', uf: 'SP', ddd: '11' },
  { name: 'Campinas', state: 'São Paulo', uf: 'SP', ddd: '19' },
  { name: 'Guarulhos', state: 'São Paulo', uf: 'SP', ddd: '11' },
  { name: 'São Bernardo do Campo', state: 'São Paulo', uf: 'SP', ddd: '11' },
  { name: 'Santo André', state: 'São Paulo', uf: 'SP', ddd: '11' },
  { name: 'Osasco', state: 'São Paulo', uf: 'SP', ddd: '11' },
  { name: 'Sorocaba', state: 'São Paulo', uf: 'SP', ddd: '15' },
  { name: 'Ribeirão Preto', state: 'São Paulo', uf: 'SP', ddd: '16' },
  { name: 'São José dos Campos', state: 'São Paulo', uf: 'SP', ddd: '12' },
  { name: 'Santos', state: 'São Paulo', uf: 'SP', ddd: '13' },
  { name: 'São José do Rio Preto', state: 'São Paulo', uf: 'SP', ddd: '17' },
  { name: 'Mogi das Cruzes', state: 'São Paulo', uf: 'SP', ddd: '11' },
  { name: 'Jundiaí', state: 'São Paulo', uf: 'SP', ddd: '11' },
  { name: 'Piracicaba', state: 'São Paulo', uf: 'SP', ddd: '19' },
  { name: 'Bauru', state: 'São Paulo', uf: 'SP', ddd: '14' },
  { name: 'Franca', state: 'São Paulo', uf: 'SP', ddd: '16' },
  { name: 'Barueri', state: 'São Paulo', uf: 'SP', ddd: '11' },
  { name: 'Taubaté', state: 'São Paulo', uf: 'SP', ddd: '12' },

  // Rio de Janeiro
  { name: 'Rio de Janeiro', state: 'Rio de Janeiro', uf: 'RJ', ddd: '21' },
  { name: 'Niterói', state: 'Rio de Janeiro', uf: 'RJ', ddd: '21' },
  { name: 'São Gonçalo', state: 'Rio de Janeiro', uf: 'RJ', ddd: '21' },
  { name: 'Duque de Caxias', state: 'Rio de Janeiro', uf: 'RJ', ddd: '21' },
  { name: 'Nova Iguaçu', state: 'Rio de Janeiro', uf: 'RJ', ddd: '21' },
  { name: 'Petrópolis', state: 'Rio de Janeiro', uf: 'RJ', ddd: '24' },
  { name: 'Volta Redonda', state: 'Rio de Janeiro', uf: 'RJ', ddd: '24' },
  { name: 'Campos dos Goytacazes', state: 'Rio de Janeiro', uf: 'RJ', ddd: '22' },
  { name: 'Cabo Frio', state: 'Rio de Janeiro', uf: 'RJ', ddd: '22' },

  // Paraná
  { name: 'Curitiba', state: 'Paraná', uf: 'PR', ddd: '41' },
  { name: 'Londrina', state: 'Paraná', uf: 'PR', ddd: '43' },
  { name: 'Maringá', state: 'Paraná', uf: 'PR', ddd: '44' },
  { name: 'Ponta Grossa', state: 'Paraná', uf: 'PR', ddd: '42' },
  { name: 'Cascavel', state: 'Paraná', uf: 'PR', ddd: '45' },
  { name: 'Foz do Iguaçu', state: 'Paraná', uf: 'PR', ddd: '45' },

  // Rio Grande do Sul
  { name: 'Porto Alegre', state: 'Rio Grande do Sul', uf: 'RS', ddd: '51' },
  { name: 'Caxias do Sul', state: 'Rio Grande do Sul', uf: 'RS', ddd: '54' },
  { name: 'Canoas', state: 'Rio Grande do Sul', uf: 'RS', ddd: '51' },
  { name: 'Pelotas', state: 'Rio Grande do Sul', uf: 'RS', ddd: '53' },
  { name: 'Santa Maria', state: 'Rio Grande do Sul', uf: 'RS', ddd: '55' },

  // Santa Catarina
  { name: 'Florianópolis', state: 'Santa Catarina', uf: 'SC', ddd: '48' },
  { name: 'Joinville', state: 'Santa Catarina', uf: 'SC', ddd: '47' },
  { name: 'Blumenau', state: 'Santa Catarina', uf: 'SC', ddd: '47' },
  { name: 'Balneário Camboriú', state: 'Santa Catarina', uf: 'SC', ddd: '47' },
  { name: 'Chapecó', state: 'Santa Catarina', uf: 'SC', ddd: '49' },
  { name: 'Criciúma', state: 'Santa Catarina', uf: 'SC', ddd: '48' },

  // Bahia
  { name: 'Salvador', state: 'Bahia', uf: 'BA', ddd: '71' },
  { name: 'Feira de Santana', state: 'Bahia', uf: 'BA', ddd: '75' },
  { name: 'Vitória da Conquista', state: 'Bahia', uf: 'BA', ddd: '77' },
  { name: 'Itabuna', state: 'Bahia', uf: 'BA', ddd: '73' },

  // Ceará
  { name: 'Fortaleza', state: 'Ceará', uf: 'CE', ddd: '85' },
  { name: 'Juazeiro do Norte', state: 'Ceará', uf: 'CE', ddd: '88' },
  { name: 'Sobral', state: 'Ceará', uf: 'CE', ddd: '88' },

  // Pernambuco
  { name: 'Recife', state: 'Pernambuco', uf: 'PE', ddd: '81' },
  { name: 'Jaboatão dos Guararapes', state: 'Pernambuco', uf: 'PE', ddd: '81' },
  { name: 'Olinda', state: 'Pernambuco', uf: 'PE', ddd: '81' },
  { name: 'Caruaru', state: 'Pernambuco', uf: 'PE', ddd: '81' },

  // Goiás & DF
  { name: 'Brasília', state: 'Distrito Federal', uf: 'DF', ddd: '61' },
  { name: 'Goiânia', state: 'Goiás', uf: 'GO', ddd: '62' },
  { name: 'Anápolis', state: 'Goiás', uf: 'GO', ddd: '62' },

  // Espírito Santo
  { name: 'Vitória', state: 'Espírito Santo', uf: 'ES', ddd: '27' },
  { name: 'Vila Velha', state: 'Espírito Santo', uf: 'ES', ddd: '27' },
  { name: 'Serra', state: 'Espírito Santo', uf: 'ES', ddd: '27' }
];

function levenshtein(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = new Array<number[]>(bn + 1);
  for (let i = 0; i <= bn; ++i) {
    let row = matrix[i] = new Array<number>(an + 1);
    row[0] = i;
  }
  const firstRow = matrix[0];
  for (let j = 1; j <= an; ++j) {
    firstRow[j] = j;
  }
  for (let i = 1; i <= bn; ++i) {
    for (let j = 1; j <= an; ++j) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        );
      }
    }
  }
  return matrix[bn][an];
}

function normalizeStr(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function findCitySuggestion(input: string): BrazilianCity | null {
  if (!input || input.trim().length < 3) return null;

  const normalizedInput = normalizeStr(input);

  // Exact match check
  const exact = BRAZILIAN_CITIES.find(c => {
    const normCity = normalizeStr(c.name);
    const normFull = normalizeStr(`${c.name} ${c.uf}`);
    return normCity === normalizedInput || normFull === normalizedInput;
  });
  if (exact) return null;

  // Fuzzy match
  let bestMatch: BrazilianCity | null = null;
  let minDistance = 999;

  for (const city of BRAZILIAN_CITIES) {
    const normCity = normalizeStr(city.name);
    const dist = levenshtein(normalizedInput, normCity);
    
    if (dist < minDistance && dist <= Math.max(2, Math.floor(city.name.length * 0.45))) {
      minDistance = dist;
      bestMatch = city;
    }
  }

  return bestMatch;
}

export function searchMatchingCities(prefix: string, maxResults = 5): BrazilianCity[] {
  if (!prefix || prefix.trim().length < 2) return [];
  const norm = normalizeStr(prefix);

  return BRAZILIAN_CITIES.filter(c => {
    const normCity = normalizeStr(c.name);
    const normUF = normalizeStr(`${c.name} ${c.uf}`);
    return normCity.includes(norm) || normUF.includes(norm);
  }).slice(0, maxResults);
}
