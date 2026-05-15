'use client';

import { useState } from 'react';
import { Calculator, Loader2, Truck, Plane, Layers, ArrowRight } from 'lucide-react';
import { useBrandFlags } from '@/context/BrandContext';
import { formatBRL } from '@/lib/utils';
import type { RotaCotada } from '@/lib/pricing';

const ICON_MODAL = {
  rodoviario: Truck,
  aereo:      Plane,
  intermodal: Layers,
} as const;

interface FormState {
  origem: string;
  destino: string;
  alturaCm: string;
  larguraCm: string;
  comprimentoCm: string;
  pesoKg: string;
}

const INITIAL: FormState = {
  origem: '',
  destino: '',
  alturaCm: '',
  larguraCm: '',
  comprimentoCm: '',
  pesoKg: '',
};

export function SimuladorFrete() {
  const flags = useBrandFlags();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [rotas, setRotas] = useState<RotaCotada[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  function update<K extends keyof FormState>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setRotas(null);
    setLoading(true);
    try {
      const res = await fetch('/api/cotacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origem: form.origem,
          destino: form.destino,
          cubagem: {
            alturaCm:      Number(form.alturaCm),
            larguraCm:     Number(form.larguraCm),
            comprimentoCm: Number(form.comprimentoCm),
            pesoKg:        Number(form.pesoKg),
          },
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Falha ao cotar.');
      }
      const data = await res.json();
      setRotas(data.rotas);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container-wide py-16 md:py-24">
      <div className="grid lg:grid-cols-12 gap-10">
        {/* ─── Form ─── */}
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            Simulador
          </p>
          <h1 className="font-display text-4xl md:text-5xl leading-[1] mb-3">
            Cotação<br />
            <span className="italic text-brand-accent">em segundos.</span>
          </h1>
          <p className="text-brand-muted mb-8 leading-relaxed">
            Preencha as dimensões reais da carga. Aplicamos automaticamente o
            cálculo de cubagem e priorizamos o maior valor entre peso real e
            cubado, conforme padrão do mercado.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-mono">Origem</label>
                <input
                  type="text"
                  required
                  placeholder="Cidade / UF"
                  value={form.origem}
                  onChange={(e) => update('origem', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-mono">Destino</label>
                <input
                  type="text"
                  required
                  placeholder="Cidade / UF"
                  value={form.destino}
                  onChange={(e) => update('destino', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <p className="label-mono">Dimensões da carga (cm)</p>
              <div className="grid grid-cols-3 gap-px bg-brand-primary/10">
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  required
                  placeholder="Altura"
                  value={form.alturaCm}
                  onChange={(e) => update('alturaCm', e.target.value)}
                  className="input-field border-0"
                />
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  required
                  placeholder="Largura"
                  value={form.larguraCm}
                  onChange={(e) => update('larguraCm', e.target.value)}
                  className="input-field border-0"
                />
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  required
                  placeholder="Comprimento"
                  value={form.comprimentoCm}
                  onChange={(e) => update('comprimentoCm', e.target.value)}
                  className="input-field border-0"
                />
              </div>
            </div>

            <div>
              <label className="label-mono">Peso real (kg)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                required
                placeholder="Ex: 12.5"
                value={form.pesoKg}
                onChange={(e) => update('pesoKg', e.target.value)}
                className="input-field"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <p className="font-mono text-[11px] uppercase tracking-wider text-brand-muted">
                Modais habilitados:
              </p>
              {flags.enableRodoviario && (
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-brand-text">
                  <Truck size={14} /> Rodoviário
                </span>
              )}
              {flags.enableAereo && (
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-brand-text">
                  <Plane size={14} /> Aéreo
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Calculando...
                </>
              ) : (
                <>
                  <Calculator size={16} /> Calcular frete
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

        {/* ─── Resultado ─── */}
        <div className="lg:col-span-7">
          {!rotas && !loading && <PlaceholderResultado />}
          {loading && <LoadingResultado />}
          {rotas && rotas.length > 0 && <ResultadoRotas rotas={rotas} />}
          {rotas && rotas.length === 0 && (
            <p className="text-brand-muted">Nenhuma rota encontrada para os parâmetros informados.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function PlaceholderResultado() {
  return (
    <div className="bg-brand-primary text-brand-ondark p-10 md:p-14 min-h-[500px] relative overflow-hidden">
      <div className="absolute inset-0 bg-tech-grid opacity-30" aria-hidden />
      <div className="relative">
        <p className="eyebrow mb-4">/// Aguardando dados</p>
        <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-md">
          O resultado da cotação aparece aqui com{' '}
          <span className="italic text-brand-accent">prazos e custos</span> por modal.
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-px bg-white/10">
          {[
            { k: 'Tempo médio', v: '< 60s' },
            { k: 'Modais',       v: '03' },
            { k: 'Cobertura',    v: 'BR' },
            { k: 'Atualização',  v: '24/7' },
          ].map((b) => (
            <div key={b.k} className="bg-brand-primary p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-brand-ondark/50">
                {b.k}
              </p>
              <p className="font-display text-2xl mt-1">{b.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingResultado() {
  return (
    <div className="bg-brand-primary text-brand-ondark p-14 min-h-[500px] grid place-items-center">
      <div className="text-center">
        <Loader2 size={28} className="animate-spin mx-auto text-brand-accent" />
        <p className="font-mono text-[11px] uppercase tracking-wider mt-4 text-brand-ondark/70">
          consultando rotas
        </p>
      </div>
    </div>
  );
}

function ResultadoRotas({ rotas }: { rotas: RotaCotada[] }) {
  const melhor = rotas[0];
  return (
    <div className="space-y-4">
      <div className="bg-brand-primary text-brand-ondark p-8 md:p-10">
        <p className="eyebrow mb-3">/// melhor opção</p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h3 className="font-display text-3xl md:text-4xl">{melhor.titulo}</h3>
            <p className="font-mono text-[11px] text-brand-ondark/60 mt-1 uppercase tracking-wider">
              prazo {melhor.prazoDias.min}-{melhor.prazoDias.max} dias úteis
            </p>
          </div>
          <p className="font-display text-4xl md:text-5xl text-brand-accent">
            {formatBRL(melhor.total)}
          </p>
        </div>
      </div>

      {rotas.map((r) => {
        const Icon = ICON_MODAL[r.modal];
        return (
          <article
            key={r.modal}
            className="bg-white border border-brand-primary/10 p-6 grid md:grid-cols-12 gap-6 items-start hover:border-brand-accent transition-colors"
          >
            <div className="md:col-span-5 flex items-start gap-4">
              <div className="w-12 h-12 grid place-items-center bg-brand-primary text-brand-ondark">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-brand-muted">
                  {r.modal}
                </p>
                <h4 className="font-display text-xl mt-0.5">{r.titulo}</h4>
                <p className="font-mono text-[11px] text-brand-muted mt-1">
                  {r.prazoDias.min}-{r.prazoDias.max} dias úteis
                </p>
              </div>
            </div>

            <ul className="md:col-span-4 space-y-1 font-mono text-[11px] text-brand-muted">
              {r.detalhes.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-brand-accent">›</span>
                  {d}
                </li>
              ))}
            </ul>

            <div className="md:col-span-3 md:text-right">
              <p className="font-mono text-[11px] uppercase tracking-wider text-brand-muted">
                Total
              </p>
              <p className="font-display text-2xl text-brand-text mt-0.5">
                {formatBRL(r.total)}
              </p>
              <p className="font-mono text-[10px] text-brand-muted mt-1">
                base {formatBRL(r.custoBase)} + markup {formatBRL(r.markup)}
              </p>
              <button className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-brand-accent hover:text-brand-text">
                Reservar <ArrowRight size={12} />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
