import { NextResponse } from 'next/server';

interface Evento {
  data: string;
  hora: string;
  local: string;
  status: string;
  descricao: string;
}

const MOCK_TRACK: Record<string, Evento[]> = {
  'AGX-2026-001': [
    { data: '2026-05-09', hora: '08:12', local: 'São Bernardo do Campo / SP',
      status: 'COLETADO', descricao: 'Carga coletada no remetente.' },
    { data: '2026-05-09', hora: '14:55', local: 'CD Guarulhos / SP',
      status: 'EM_TRIAGEM', descricao: 'Triagem e cubagem confirmadas.' },
    { data: '2026-05-10', hora: '03:22', local: 'Aeroporto de Viracopos / SP',
      status: 'EMBARCADO', descricao: 'Embarque no voo AG-204.' },
    { data: '2026-05-10', hora: '07:48', local: 'Aeroporto de Manaus / AM',
      status: 'EM_TRANSITO', descricao: 'Desembarque, em transferência rodoviária.' },
    { data: '2026-05-12', hora: '09:30', local: 'Manaus / AM',
      status: 'EM_ROTA', descricao: 'Saiu para entrega no destinatário.' },
  ],
};

export async function POST(req: Request) {
  const { codigo } = (await req.json()) as { codigo?: string };
  if (!codigo) {
    return NextResponse.json({ error: 'Código obrigatório.' }, { status: 400 });
  }
  await new Promise((r) => setTimeout(r, 250));
  const eventos = MOCK_TRACK[codigo.toUpperCase()];
  if (!eventos) {
    // Gera um histórico genérico para qualquer código diferente
    const today = new Date();
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    return NextResponse.json({
      codigo,
      cliente: 'Mock Demo S.A.',
      origem: 'São Paulo / SP',
      destino: 'Belo Horizonte / MG',
      modal: 'rodoviario',
      eventos: [
        { data: fmt(new Date(today.getTime() - 2 * 864e5)), hora: '10:14',
          local: 'São Paulo / SP', status: 'COLETADO',
          descricao: 'Carga coletada no remetente.' },
        { data: fmt(new Date(today.getTime() - 1 * 864e5)), hora: '22:01',
          local: 'CD Campinas / SP', status: 'EM_TRIAGEM',
          descricao: 'Conferência de cubagem e roteirização.' },
        { data: fmt(today), hora: '06:45',
          local: 'Em rota — BR-381 km 412', status: 'EM_TRANSITO',
          descricao: 'Veículo em trânsito para o destino final.' },
      ],
    });
  }
  return NextResponse.json({
    codigo,
    cliente: 'Indústria Petralina S.A.',
    origem: 'São Bernardo do Campo / SP',
    destino: 'Manaus / AM',
    modal: 'intermodal',
    eventos,
  });
}
