'use client';

import Link from 'next/link';
import { ArrowRight, Radar } from 'lucide-react';
import { useBrand } from '@/context/BrandContext';

export function Hero() {
  const { hero, identity } = useBrand();

  return (
    <section className="relative min-h-[640px] flex items-center overflow-hidden bg-brand-primary text-brand-ondark">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
        aria-hidden
      />
      {/* Overlay escuro + blur sutil */}
      <div
        className="absolute inset-0 backdrop-blur-[2px]"
        style={{
          background:
            'linear-gradient(180deg, rgb(var(--brand-primary) / 0.85) 0%, rgb(var(--brand-primary) / 0.92) 100%)',
        }}
        aria-hidden
      />
      {/* Grid técnico decorativo */}
      <div className="absolute inset-0 bg-tech-grid opacity-50" aria-hidden />

      {/* Linha accent vertical decorativa */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-brand-accent/30 hidden lg:block" aria-hidden />

      <div className="container-wide relative z-10 py-20 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8 animate-slide-up">
          <p className="eyebrow mb-5">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            {identity.name} / Plataforma intermodal
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-[88px] leading-[0.95] mb-6">
            {hero.title.split('. ').map((part, i, arr) => (
              <span key={i} className="block">
                {part}
                {i < arr.length - 1 && <span className="text-brand-accent">.</span>}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-brand-ondark/75 max-w-2xl leading-relaxed mb-10">
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={hero.ctaPrimary.href} className="btn-primary">
              {hero.ctaPrimary.label} <ArrowRight size={16} />
            </Link>
            <Link href={hero.ctaSecondary.href} className="btn-ghost-dark">
              <Radar size={16} /> {hero.ctaSecondary.label}
            </Link>
          </div>
        </div>

        {/* Painel técnico lateral */}
        <div className="lg:col-span-4 hidden lg:block animate-fade-in">
          <div className="bg-brand-secondary/80 backdrop-blur border border-white/10 p-6">
            <p className="label-mono text-brand-ondark/60">// status da operação</p>
            <div className="space-y-4 mt-4">
              {[
                { label: 'Frota ativa',    value: '142', unit: 'veículos' },
                { label: 'Aeronaves',      value: '08',  unit: 'unidades' },
                { label: 'Rotas hoje',     value: '1.284', unit: 'em trânsito' },
                { label: 'On-time',        value: '98.7', unit: '%' },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline justify-between border-b border-white/5 pb-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-brand-ondark/60">
                    {s.label}
                  </span>
                  <span className="font-display text-2xl text-brand-ondark">
                    {s.value}
                    <span className="font-mono text-[10px] text-brand-ondark/50 ml-1.5">
                      {s.unit}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
