'use client';

export function Stats() {
  const items = [
    { value: '142',   label: 'Veículos na frota',     suffix: '' },
    { value: '8',     label: 'Aeronaves dedicadas',   suffix: '' },
    { value: '98.7',  label: 'Entregas no prazo',     suffix: '%' },
    { value: '12',    label: 'Anos de operação B2B',  suffix: '' },
  ];

  return (
    <section className="bg-brand-primary text-brand-ondark border-y border-brand-accent/30">
      <div className="container-wide py-16 grid grid-cols-2 md:grid-cols-4">
        {items.map((it, i) => (
          <div
            key={it.label}
            className={`px-4 ${i !== 0 ? 'md:border-l border-white/10' : ''} ${
              i === 1 ? 'border-l border-white/10' : ''
            } ${i === 2 ? 'md:border-l border-l-0 border-t md:border-t-0 border-white/10 pt-8 md:pt-0' : ''} ${
              i === 3 ? 'border-l border-white/10 border-t md:border-t-0 pt-8 md:pt-0' : ''
            }`}
          >
            <p className="font-display text-5xl md:text-6xl">
              {it.value}
              <span className="text-brand-accent">{it.suffix}</span>
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ondark/60 mt-2">
              {it.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
