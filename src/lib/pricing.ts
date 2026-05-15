/**
 * Lógica de precificação conforme SDD §4.1 (Cubagem) e §4.2 (Markup).
 * Centraliza fórmulas para que API e UI usem a mesma fonte de verdade.
 */

export interface CubagemInput {
  alturaCm: number;
  larguraCm: number;
  comprimentoCm: number;
  pesoKg: number;
}

export interface CubagemResultado {
  pesoReal: number;
  pesoCubadoRodoviario: number;
  pesoCubadoAereo: number;
  /** peso utilizado para cálculo (max entre real e cubado) */
  pesoTaxavelRodoviario: number;
  pesoTaxavelAereo: number;
}

export interface FreteParams {
  origem: string;
  destino: string;
  cubagem: CubagemInput;
  fatorCubagemRodoviario: number;
  fatorCubagemAereo: number;
  markupGlobalPct: number;
  modais: { rodoviario: boolean; aereo: boolean };
}

export interface RotaCotada {
  modal: 'rodoviario' | 'aereo' | 'intermodal';
  titulo: string;
  prazoDias: { min: number; max: number };
  custoBase: number;
  markup: number;
  total: number;
  detalhes: string[];
}

/** Volume em m³ a partir de dimensões em cm */
export function volumeM3(c: number, l: number, a: number): number {
  return (c * l * a) / 1_000_000;
}

export function calcularCubagem(
  input: CubagemInput,
  fatorRodoviario: number,
  fatorAereo: number,
): CubagemResultado {
  const v = volumeM3(input.comprimentoCm, input.larguraCm, input.alturaCm);
  const pesoCubadoRodoviario = v * fatorRodoviario;
  const pesoCubadoAereo      = v * fatorAereo;
  return {
    pesoReal: input.pesoKg,
    pesoCubadoRodoviario,
    pesoCubadoAereo,
    pesoTaxavelRodoviario: Math.max(input.pesoKg, pesoCubadoRodoviario),
    pesoTaxavelAereo:      Math.max(input.pesoKg, pesoCubadoAereo),
  };
}

/**
 * Modelo simplificado de cálculo de frete.
 * Em produção, isso bate em tabelas de rotas/tarifas.
 */
function tarifaRodoviaria(pesoTaxavel: number, origem: string, destino: string): number {
  // Heurística mock: 6.20/kg + 0.5/char na distância textual
  const distFactor = Math.max(0.5, (origem.length + destino.length) / 18);
  return pesoTaxavel * 6.2 * distFactor + 78;
}

function tarifaAerea(pesoTaxavel: number, origem: string, destino: string): number {
  const distFactor = Math.max(0.8, (origem.length + destino.length) / 14);
  return pesoTaxavel * 22.4 * distFactor + 240;
}

export function cotarFrete(params: FreteParams): RotaCotada[] {
  const cub = calcularCubagem(
    params.cubagem,
    params.fatorCubagemRodoviario,
    params.fatorCubagemAereo,
  );
  const rotas: RotaCotada[] = [];

  if (params.modais.rodoviario) {
    const base = tarifaRodoviaria(cub.pesoTaxavelRodoviario, params.origem, params.destino);
    const markup = (base * params.markupGlobalPct) / 100;
    rotas.push({
      modal: 'rodoviario',
      titulo: 'Rodoviário direto',
      prazoDias: { min: 3, max: 5 },
      custoBase: base,
      markup,
      total: base + markup,
      detalhes: [
        `Peso real ${cub.pesoReal.toFixed(2)} kg`,
        `Peso cubado ${cub.pesoCubadoRodoviario.toFixed(2)} kg (fator ${params.fatorCubagemRodoviario})`,
        `Peso taxável ${cub.pesoTaxavelRodoviario.toFixed(2)} kg`,
        cub.pesoCubadoRodoviario > cub.pesoReal
          ? 'Tarifa aplicada sobre peso cubado'
          : 'Tarifa aplicada sobre peso real',
      ],
    });
  }

  if (params.modais.aereo) {
    const base = tarifaAerea(cub.pesoTaxavelAereo, params.origem, params.destino);
    const markup = (base * params.markupGlobalPct) / 100;
    rotas.push({
      modal: 'aereo',
      titulo: 'Aéreo expresso',
      prazoDias: { min: 1, max: 2 },
      custoBase: base,
      markup,
      total: base + markup,
      detalhes: [
        `Peso real ${cub.pesoReal.toFixed(2)} kg`,
        `Peso cubado ${cub.pesoCubadoAereo.toFixed(2)} kg (fator ${params.fatorCubagemAereo})`,
        `Peso taxável ${cub.pesoTaxavelAereo.toFixed(2)} kg`,
        cub.pesoCubadoAereo > cub.pesoReal
          ? 'Tarifa aplicada sobre peso cubado'
          : 'Tarifa aplicada sobre peso real',
      ],
    });
  }

  if (params.modais.rodoviario && params.modais.aereo) {
    // Intermodal: 60% trecho rodoviário + 40% trecho aéreo (mock)
    const rodo  = tarifaRodoviaria(cub.pesoTaxavelRodoviario * 0.6, params.origem, params.destino);
    const aereo = tarifaAerea(cub.pesoTaxavelAereo * 0.4, params.origem, params.destino);
    const base   = rodo + aereo;
    const markup = (base * params.markupGlobalPct) / 100;
    rotas.push({
      modal: 'intermodal',
      titulo: 'Intermodal otimizado',
      prazoDias: { min: 2, max: 3 },
      custoBase: base,
      markup,
      total: base + markup,
      detalhes: [
        'Trecho 1: coleta rodoviária até hub',
        'Trecho 2: aéreo entre hubs',
        'Trecho 3: entrega rodoviária final',
        'Otimizado para custo total mínimo',
      ],
    });
  }

  return rotas.sort((a, b) => a.total - b.total);
}
