'use client';

import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      'Reduzimos 22% do custo de frete consolidado no primeiro trimestre. A visibilidade da carga em tempo real mudou a relação com nossos próprios clientes finais.',
    author: 'Maria Helena Vargas',
    role:   'Diretora de Supply Chain',
    company:'Indústria Petralina S.A.',
  },
  {
    quote:
      'A combinação rodo + aéreo no mesmo pedido era impensável antes. Hoje despachamos cargas para o Norte em menos de 18 horas.',
    author: 'Rodrigo Lemos',
    role:   'Gerente de Logística',
    company:'AgroVale Cooperativa',
  },
  {
    quote:
      'Cotação automatizada com cubagem real eliminou um time inteiro de planilha. Faturamos no mesmo dia da coleta.',
    author: 'Beatriz Tanaka',
    role:   'CFO',
    company:'Tanaka Distribuição',
  },
];

export function Depoimentos() {
  return (
    <section className="container-wide py-24 md:py-32">
      <div className="grid md:grid-cols-12 gap-10 mb-16">
        <div className="md:col-span-6">
          <p className="eyebrow mb-4">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            Clientes B2B
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1] tracking-tight">
            Operações<br />
            <span className="italic">que confiam.</span>
          </h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <article
            key={t.author}
            className="bg-white border border-brand-primary/10 p-8 relative hover:border-brand-accent transition-colors"
          >
            <Quote
              size={28}
              strokeWidth={1.4}
              className="text-brand-accent mb-6"
            />
            <p className="font-display text-xl leading-snug mb-8 text-brand-text">
              "{t.quote}"
            </p>
            <div className="border-t border-brand-primary/10 pt-5">
              <p className="font-semibold text-sm text-brand-text">{t.author}</p>
              <p className="font-mono text-[11px] text-brand-muted uppercase tracking-wider mt-1">
                {t.role} · {t.company}
              </p>
            </div>
            <span className="absolute top-6 right-6 font-mono text-[11px] text-brand-muted/50 tracking-wider">
              0{i + 1}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
