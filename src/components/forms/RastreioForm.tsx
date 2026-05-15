'use client';

import { useState } from 'react';
import { Search, Loader2, Package, MapPin, CheckCircle2, Truck, Plane } from 'lucide-react';

interface Evento {
  data: string;
  hora: string;
  local: string;
  status: string;
  descricao: string;
}

interface Rastreio {
  codigo: string;
  cliente: string;
  origem: string;
  destino: string;
  modal: 'rodoviario' | 'aereo' | 'intermodal';
  eventos: Evento[];
}

const STATUS_LABEL: Record<string, string> = {
  COLETADO:    'Coletado',
  EM_TRIAGEM:  'Em triagem',
  EMBARCADO:   'Embarcado',
  EM_TRANSITO: 'Em trânsito',
  EM_ROTA:     'Saiu para entrega',
  ENTREGUE:    'Entregue',
};

export function RastreioForm() {
  const [codigo, setCodigo] = useState('');
  const [data, setData]     = useState<Rastreio | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro]     = useState<string | null>(null);

  async function buscar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setData(null);
    setLoading(true);
    try {
      const res = await fetch('/api/rastreamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: codigo.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Falha ao rastrear.');
      setData(json);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container-wide py-16 md:py-24">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            Rastreamento
          </p>
          <h1 className="font-display text-4xl md:text-5xl leading-[1] mb-3">
            Onde está<br />
            <span className="italic text-brand-accent">a sua carga.</span>
          </h1>
          <p className="text-brand-muted mb-8 leading-relaxed">
            Insira o código do pedido para visualizar a linha do tempo completa
            da operação. Para teste, use o código <code className="font-mono text-brand-text">AGX-2026-001</code>.
          </p>

          <form onSubmit={buscar} className="space-y-4">
            <div>
              <label className="label-mono">Código de rastreio</label>
              <input
                type="text"
                required
                placeholder="Ex: AGX-2026-001"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="input-field uppercase tracking-wider"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Buscando...
                </>
              ) : (
                <>
                  <Search size={16} /> Rastrear
                </>
              )}
            </button>
            {erro && (
              <p className="font-mono text-xs text-brand-accent border border-brand-accent/40 p-3">
                {erro}
              </p>
            )}
          </form>
        </div>

        <div className="lg:col-span-7">
          {!data && !loading && <PlaceholderRastreio />}
          {loading && (
            <div className="bg-brand-primary text-brand-ondark p-14 min-h-[500px] grid place-items-center">
              <Loader2 size={28} className="animate-spin text-brand-accent" />
            </div>
          )}
          {data && <ResultadoRastreio data={data} />}
        </div>
      </div>
    </section>
  );
}

function PlaceholderRastreio() {
  return (
    <div className="bg-brand-primary text-brand-ondark p-10 md:p-14 min-h-[500px] relative overflow-hidden">
      <div className="absolute inset-0 bg-tech-grid opacity-30" aria-hidden />
      <div className="relative">
        <p className="eyebrow mb-4">/// linha do tempo</p>
        <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-md">
          Visibilidade <span className="italic text-brand-accent">ponta-a-ponta</span> da operação.
        </h2>
        <div className="mt-12 space-y-3">
          {['Coletado', 'Em triagem', 'Em trânsito', 'Saiu para entrega', 'Entregue'].map((s, i) => (
            <div key={s} className="flex items-center gap-4 opacity-50">
              <span className="font-mono text-[11px] text-brand-ondark/60 w-8">0{i + 1}</span>
              <span className="w-2 h-2 bg-brand-accent" />
              <span className="font-mono text-xs uppercase tracking-wider">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultadoRastreio({ data }: { data: Rastreio }) {
  const ModalIcon = data.modal === 'aereo' ? Plane : Truck;
  return (
    <div className="space-y-6">
      <div className="bg-brand-primary text-brand-ondark p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-brand-ondark/60">
              Pedido
            </p>
            <p className="font-display text-3xl mt-0.5">{data.codigo}</p>
            <p className="font-mono text-xs text-brand-ondark/70 mt-1">{data.cliente}</p>
          </div>
          <div className="flex items-center gap-2 border border-white/20 px-3 py-2">
            <ModalIcon size={16} className="text-brand-accent" />
            <span className="font-mono text-[11px] uppercase tracking-wider">{data.modal}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px bg-white/10 mt-6">
          <div className="bg-brand-primary p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-brand-ondark/50">Origem</p>
            <p className="font-display text-lg mt-1">{data.origem}</p>
          </div>
          <div className="bg-brand-primary p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-brand-ondark/50">Destino</p>
            <p className="font-display text-lg mt-1">{data.destino}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-brand-primary/10">
        <div className="p-6 border-b border-brand-primary/10">
          <p className="eyebrow"><span className="inline-block w-6 h-px bg-brand-accent" /> linha do tempo</p>
        </div>
        <ol className="divide-y divide-brand-primary/10">
          {data.eventos.slice().reverse().map((ev, i, arr) => {
            const ativo = i === 0;
            return (
              <li key={i} className="p-6 grid grid-cols-[auto_1fr_auto] gap-5 items-start">
                <div className="flex flex-col items-center pt-1">
                  <div className={`w-3 h-3 ${ativo ? 'bg-brand-accent' : 'bg-brand-primary/20'} ${ativo ? 'ring-4 ring-brand-accent/15' : ''}`} />
                  {i < arr.length - 1 && <div className="w-px h-12 bg-brand-primary/10 mt-2" />}
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-brand-accent">
                    {STATUS_LABEL[ev.status] || ev.status}
                  </p>
                  <p className="font-display text-lg text-brand-text mt-1">{ev.descricao}</p>
                  <p className="font-mono text-[11px] text-brand-muted mt-1 flex items-center gap-1.5">
                    <MapPin size={11} /> {ev.local}
                  </p>
                </div>
                <p className="font-mono text-[11px] text-brand-muted whitespace-nowrap">
                  {ev.data}<br />{ev.hora}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="font-mono text-[11px] text-brand-muted text-center">
        Precisa do detalhe completo da carga? <a href="/area-cliente" className="text-brand-accent hover:underline">Acesse a área do cliente</a>.
      </p>
    </div>
  );
}
