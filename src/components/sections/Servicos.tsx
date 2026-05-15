'use client';

import { Truck, Plane, Layers, Warehouse, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { useBrandFlags } from '@/context/BrandContext';
import Link from 'next/link';

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  enabled: boolean;
  meta: string;
}

export function Servicos() {
  const flags = useBrandFlags();

  const services: Service[] = [
    {
      id: 'rodoviario',
      icon: Truck,
      title: 'Rodoviário',
      description: 'Frota própria com cálculo dinâmico de cubagem e cobertura nacional door-to-door.',
      enabled: flags.enableRodoviario,
      meta: '01',
    },
    {
      id: 'aereo',
      icon: Plane,
      title: 'Aéreo',
      description: 'Aeronaves dedicadas e slots prioritários para cargas time-sensitive.',
      enabled: flags.enableAereo,
      meta: '02',
    },
    {
      id: 'intermodal',
      icon: Layers,
      title: 'Intermodal',
      description: 'Combinação rodo + aéreo otimizada por algoritmo de custo total.',
      enabled: flags.enableRodoviario && flags.enableAereo,
      meta: '03',
    },
    {
      id: 'armazenagem',
      icon: Warehouse,
      title: 'Armazenagem',
      description: 'Centros de distribuição com gestão de inventário em tempo real.',
      enabled: true,
      meta: '04',
    },
  ];

  const active = services.filter((s) => s.enabled);

  return (
    <section id="servicos" className="container-wide py-24 md:py-32">
      <div className="grid md:grid-cols-12 gap-10 mb-16">
        <div className="md:col-span-5">
          <p className="eyebrow mb-4">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            Modais operacionais
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1] tracking-tight">
            Cobertura<br />
            <span className="italic text-brand-accent">end-to-end</span>
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 flex items-end">
          <p className="text-lg text-brand-muted leading-relaxed">
            Uma única plataforma orquestra todos os ativos próprios da operação —
            sem terceirizações, sem caixa preta. Você enxerga a carga do pedido
            ao destino.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-primary/10">
        {active.map((s) => (
          <Link
            key={s.id}
            href={`/servicos#${s.id}`}
            className="group relative bg-white p-7 hover:bg-brand-primary hover:text-brand-ondark transition-colors duration-300"
          >
            <div className="flex items-start justify-between mb-12">
              <s.icon size={32} strokeWidth={1.4} />
              <span className="font-mono text-[11px] text-brand-muted tracking-wider group-hover:text-brand-ondark/50">
                {s.meta}
              </span>
            </div>
            <h3 className="font-display text-2xl mb-2.5">{s.title}</h3>
            <p className="text-sm text-brand-muted leading-relaxed group-hover:text-brand-ondark/70 mb-6">
              {s.description}
            </p>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-brand-accent">
              Explorar <ArrowUpRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
