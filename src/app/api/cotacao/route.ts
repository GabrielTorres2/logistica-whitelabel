import { NextResponse } from 'next/server';
import { cotarFrete, type FreteParams } from '@/lib/pricing';
import { brandConfig } from '@/config/brandConfig';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<FreteParams> & {
      cubagem?: Partial<FreteParams['cubagem']>;
    };

    if (!body.origem || !body.destino || !body.cubagem) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    const params: FreteParams = {
      origem: String(body.origem),
      destino: String(body.destino),
      cubagem: {
        alturaCm:      Number(body.cubagem.alturaCm) || 0,
        larguraCm:     Number(body.cubagem.larguraCm) || 0,
        comprimentoCm: Number(body.cubagem.comprimentoCm) || 0,
        pesoKg:        Number(body.cubagem.pesoKg) || 0,
      },
      fatorCubagemRodoviario: brandConfig.flags.fatorCubagemRodoviario,
      fatorCubagemAereo:      brandConfig.flags.fatorCubagemAereo,
      markupGlobalPct:        brandConfig.flags.markupGlobal,
      modais: {
        rodoviario: brandConfig.flags.enableRodoviario,
        aereo:      brandConfig.flags.enableAereo,
      },
    };

    const rotas = cotarFrete(params);

    // Mock de latência
    await new Promise((r) => setTimeout(r, 350));

    return NextResponse.json({
      cotacaoId: `COT-${Date.now().toString(36).toUpperCase()}`,
      params,
      rotas,
      geradoEm: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao processar cotação.' }, { status: 500 });
  }
}
