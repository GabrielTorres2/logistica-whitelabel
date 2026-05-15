'use client';

import { Truck, Plane, Layers, Warehouse, Check } from 'lucide-react';
import { useBrandFlags } from '@/context/BrandContext';

const SECOES = [
  {
    id: 'rodoviario',
    icon: Truck,
    titulo: 'Rodoviário',
    subtitulo: 'Door-to-door com frota dedicada.',
    descricao:
      'Operação 100% própria com caminhões de diversos perfis: leves, médios e bitrens. Cálculo de cubagem automático e cobertura nacional, com hubs estratégicos em SP, RJ, MG e PE.',
    bullets: [
      'Cubagem rodoviária com fator 300 (padrão Brasil)',
      'Rastreamento GPS em tempo real',
      'Documentação eletrônica (CT-e, MDF-e)',
      'Cobertura porta a porta em todo território nacional',
    ],
    flag: 'enableRodoviario',
  },
  {
    id: 'aereo',
    icon: Plane,
    titulo: 'Aéreo',
    subtitulo: 'Velocidade para cargas time-sensitive.',
    descricao:
      'Aeronaves dedicadas e parcerias com cias regionais. Especialidade em rotas Sudeste-Norte e Nordeste com slots prioritários nos principais aeroportos.',
    bullets: [
      'Cubagem aérea com fator IATA 167',
      'Slots prioritários em Viracopos e Guarulhos',
      'Manifesto eletrônico de carga',
      'Cobertura de capitais em até 24h',
    ],
    flag: 'enableAereo',
  },
  {
    id: 'intermodal',
    icon: Layers,
    titulo: 'Intermodal',
    subtitulo: 'Algoritmo escolhe a melhor combinação.',
    descricao:
      'Para destinos longos ou time-sensitive, o sistema combina automaticamente trechos rodoviários e aéreos buscando o menor custo total dentro da janela de prazo.',
    bullets: [
      'Otimização automática por algoritmo de roteirização',
      'Visibilidade única do pedido nos múltiplos trechos',
      'Único responsável legal pela carga (single bill)',
      'Redução média de 18% no custo vs aéreo puro',
    ],
    flag: null,
  },
  {
    id: 'armazenagem',
    icon: Warehouse,
    titulo: 'Armazenagem',
    subtitulo: 'CDs próprios em pontos estratégicos.',
    descricao:
      'Operação WMS própria com gestão de estoque em tempo real, recebimento, picking, expedição e cross-docking.',
    bullets: [
      'CDs em SP, RJ, MG e PE',
      'WMS próprio com API de integração',
      'Cross-docking para reduzir tempo de ciclo',
      'Inventário cíclico contínuo',
    ],
    flag: null,
  },
] as const;

export default function ServicosPage() {
  const flags = useBrandFlags();
  const visiveis = SECOES.filter((s) => !s.flag || flags[s.flag as keyof typeof flags]);

  return (
    <>
      {/* Header da página */}
      <section className="bg-brand-primary text-brand-ondark py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-30" aria-hidden />
        <div className="container-wide relative">
          <p className="eyebrow mb-4">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            Serviços
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Quatro modais.<br />
            <span className="italic text-brand-accent">Uma plataforma.</span>
          </h1>
        </div>
      </section>

      {/* Lista de serviços */}
      <div className="container-wide py-20 space-y-24">
        {visiveis.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            className="grid md:grid-cols-12 gap-10 scroll-mt-32"
          >
            <div className="md:col-span-5">
              <span className="font-mono text-[11px] text-brand-muted tracking-wider">
                0{i + 1} / {String(visiveis.length).padStart(2, '0')}
              </span>
              <div className="w-14 h-14 grid place-items-center bg-brand-primary text-brand-ondark mt-4">
                <s.icon size={26} strokeWidth={1.4} />
              </div>
              <h2 className="font-display text-4xl md:text-5xl mt-6 leading-[1]">
                {s.titulo}
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent mt-3">
                {s.subtitulo}
              </p>
            </div>
            <div className="md:col-span-7">
              <p className="text-lg text-brand-text leading-relaxed mb-8">
                {s.descricao}
              </p>
              <ul className="space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-brand-text border-b border-brand-primary/5 pb-3">
                    <Check size={16} className="text-brand-accent shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
