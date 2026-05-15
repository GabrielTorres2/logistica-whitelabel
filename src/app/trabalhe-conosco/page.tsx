'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useBrandFlags } from '@/context/BrandContext';

const VAGAS = [
  { area: 'Operações',  titulo: 'Motorista CNH E',           local: 'São Bernardo / SP', tipo: 'CLT' },
  { area: 'Operações',  titulo: 'Piloto comercial',          local: 'Viracopos / SP',    tipo: 'CLT' },
  { area: 'Tecnologia', titulo: 'Engenheiro(a) de Software', local: 'Remoto',            tipo: 'PJ ou CLT' },
  { area: 'Comercial',  titulo: 'Executivo(a) de contas B2B',local: 'São Paulo / SP',    tipo: 'CLT' },
  { area: 'Operações',  titulo: 'Conferente de carga',       local: 'Manaus / AM',       tipo: 'CLT' },
];

export default function TrabalheConoscoPage() {
  const flags = useBrandFlags();

  if (!flags.enableTrabalheConosco) {
    return (
      <section className="container-wide py-32 text-center">
        <p className="font-mono text-sm text-brand-muted">
          Página indisponível no momento.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="bg-brand-primary text-brand-ondark py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-30" aria-hidden />
        <div className="container-wide relative">
          <p className="eyebrow mb-4">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            Trabalhe Conosco
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Construa uma<br />
            <span className="italic text-brand-accent">operação que funciona.</span>
          </h1>
        </div>
      </section>

      <section className="container-wide py-20">
        <p className="eyebrow mb-6"><span className="inline-block w-6 h-px bg-brand-accent" /> Vagas abertas</p>
        <div className="bg-white border border-brand-primary/10 divide-y divide-brand-primary/10">
          {VAGAS.map((v, i) => (
            <Link
              key={i}
              href="#"
              className="group grid sm:grid-cols-12 gap-4 items-center px-6 py-5 hover:bg-brand-primary hover:text-brand-ondark transition-colors"
            >
              <p className="sm:col-span-2 font-mono text-[11px] uppercase tracking-wider text-brand-accent">
                {v.area}
              </p>
              <p className="sm:col-span-5 font-display text-xl">{v.titulo}</p>
              <p className="sm:col-span-2 font-mono text-xs text-brand-muted group-hover:text-brand-ondark/70">{v.local}</p>
              <p className="sm:col-span-2 font-mono text-xs text-brand-muted group-hover:text-brand-ondark/70">{v.tipo}</p>
              <ArrowUpRight size={18} className="sm:col-span-1 sm:justify-self-end" />
            </Link>
          ))}
        </div>

        <p className="font-mono text-[11px] text-brand-muted mt-8 text-center">
          Não encontrou sua vaga? Envie currículo para{' '}
          <a href="mailto:rh@empresa.com.br" className="text-brand-accent hover:underline">rh@empresa.com.br</a>
        </p>
      </section>
    </>
  );
}
