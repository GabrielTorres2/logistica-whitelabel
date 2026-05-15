'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useBrandIdentity } from '@/context/BrandContext';

export function CtaFinal() {
  const identity = useBrandIdentity();

  return (
    <section className="bg-brand-secondary text-brand-ondark">
      <div className="container-wide py-20 md:py-28 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-8">
          <p className="eyebrow mb-4">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            Vamos operar juntos
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1] tracking-tight">
            Sua próxima carga<br />
            <span className="italic text-brand-accent">começa aqui.</span>
          </h2>
          <p className="text-lg text-brand-ondark/70 mt-6 max-w-2xl">
            Gere uma cotação em menos de 60 segundos. Equipe comercial dedicada
            para volumes recorrentes.
          </p>
        </div>
        <div className="md:col-span-4 md:justify-self-end flex flex-col gap-3 w-full md:w-auto">
          <Link href="/cotacao" className="btn-primary justify-center">
            Solicitar cotação <ArrowRight size={16} />
          </Link>
          <Link href="/contato" className="btn-ghost-dark justify-center">
            Falar com {identity.name}
          </Link>
        </div>
      </div>
    </section>
  );
}
