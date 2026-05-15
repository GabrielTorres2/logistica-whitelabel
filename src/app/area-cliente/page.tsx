'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, FileText, Receipt, LogOut, Plus, Search } from 'lucide-react';
import { formatBRL } from '@/lib/utils';
import { useBrandIdentity } from '@/context/BrandContext';

interface User {
  name: string;
  email: string;
  plan: string;
}

interface Orcamento {
  id: string;
  origem: string;
  destino: string;
  modal: string;
  data: string;
  valor: number;
  status: 'aprovado' | 'pendente' | 'expirado';
}

interface Fatura {
  id: string;
  pedido: string;
  emissao: string;
  vencimento: string;
  valor: number;
  status: 'paga' | 'em_aberto' | 'atrasada';
}

const MOCK_ORC: Orcamento[] = [
  { id: 'COT-LX9A2B', origem: 'São Paulo / SP', destino: 'Manaus / AM', modal: 'Intermodal',  data: '2026-05-08', valor: 4820.5, status: 'aprovado' },
  { id: 'COT-LXC4F1', origem: 'Curitiba / PR',  destino: 'Recife / PE', modal: 'Aéreo',       data: '2026-05-07', valor: 7340.0, status: 'pendente' },
  { id: 'COT-LXAA00', origem: 'Belo Horizonte', destino: 'Salvador',    modal: 'Rodoviário',  data: '2026-05-03', valor: 1980.2, status: 'aprovado' },
  { id: 'COT-LW9012', origem: 'São Paulo',      destino: 'Porto Alegre',modal: 'Rodoviário',  data: '2026-04-28', valor: 2410.0, status: 'expirado' },
];

const MOCK_FAT: Fatura[] = [
  { id: 'NF-9182', pedido: 'COT-LX9A2B', emissao: '2026-05-09', vencimento: '2026-05-24', valor: 4820.5, status: 'em_aberto' },
  { id: 'NF-9170', pedido: 'COT-LXAA00', emissao: '2026-05-04', vencimento: '2026-05-19', valor: 1980.2, status: 'paga' },
  { id: 'NF-9112', pedido: 'COT-LV8801', emissao: '2026-04-12', vencimento: '2026-04-27', valor: 6210.4, status: 'paga' },
  { id: 'NF-9080', pedido: 'COT-LV2200', emissao: '2026-03-25', vencimento: '2026-04-09', valor: 3140.0, status: 'atrasada' },
];

export default function AreaCliente() {
  const router   = useRouter();
  const identity = useBrandIdentity();
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab]   = useState<'orcamentos' | 'faturas' | 'cargas'>('cargas');

  useEffect(() => {
    const raw = localStorage.getItem('auth.user');
    if (!raw) {
      router.push('/login');
      return;
    }
    try {
      setUser(JSON.parse(raw));
    } catch {
      router.push('/login');
    }
  }, [router]);

  function logout() {
    localStorage.removeItem('auth.token');
    localStorage.removeItem('auth.user');
    router.push('/');
  }

  if (!user) {
    return (
      <div className="container-wide py-32 text-center font-mono text-sm text-brand-muted">
        Verificando sessão…
      </div>
    );
  }

  return (
    <section className="container-wide py-12 md:py-16">
      {/* Header da área */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <p className="eyebrow mb-3">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            Área do cliente · {identity.name}
          </p>
          <h1 className="font-display text-4xl md:text-5xl leading-[1] capitalize">
            Olá, <span className="italic text-brand-accent">{user.name}.</span>
          </h1>
          <p className="font-mono text-[11px] text-brand-muted mt-2 uppercase tracking-wider">
            {user.email} · plano {user.plan}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/cotacao" className="btn-primary">
            <Plus size={16} /> Nova cotação
          </Link>
          <button onClick={logout} className="btn-ghost">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-primary/10 mb-10">
        {[
          { label: 'Cargas em trânsito', value: '07', detail: 'última atualização há 4min' },
          { label: 'Orçamentos abertos', value: '03', detail: '2 expiram esta semana' },
          { label: 'Faturas em aberto',  value: '02', detail: formatBRL(8000.5) },
          { label: 'On-time YTD',        value: '99.1%', detail: '12 entregas este mês' },
        ].map((k) => (
          <div key={k.label} className="bg-white p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-brand-muted">
              {k.label}
            </p>
            <p className="font-display text-3xl text-brand-text mt-1">{k.value}</p>
            <p className="font-mono text-[10px] text-brand-muted mt-1">{k.detail}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-brand-primary/10 mb-6">
        {[
          { id: 'cargas',     label: 'Cargas',     icon: Package },
          { id: 'orcamentos', label: 'Orçamentos', icon: FileText },
          { id: 'faturas',    label: 'Faturas',    icon: Receipt },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-5 py-3 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              tab === t.id
                ? 'text-brand-text border-b-2 border-brand-accent -mb-px'
                : 'text-brand-muted hover:text-brand-text'
            }`}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'cargas' && <TabCargas />}
      {tab === 'orcamentos' && <TabOrcamentos />}
      {tab === 'faturas' && <TabFaturas />}
    </section>
  );
}

function TabCargas() {
  const cargas = [
    { codigo: 'AGX-2026-001', destino: 'Manaus / AM',     status: 'Em trânsito',       prazo: '12/mai' },
    { codigo: 'AGX-2026-008', destino: 'Recife / PE',     status: 'Aguardando coleta', prazo: '15/mai' },
    { codigo: 'AGX-2026-012', destino: 'Porto Velho / RO',status: 'Em triagem',        prazo: '18/mai' },
  ];
  return (
    <div className="bg-white border border-brand-primary/10">
      <table className="w-full">
        <thead>
          <tr className="border-b border-brand-primary/10 text-left font-mono text-[10px] uppercase tracking-wider text-brand-muted">
            <th className="px-5 py-3.5">Código</th>
            <th className="px-5 py-3.5">Destino</th>
            <th className="px-5 py-3.5">Status</th>
            <th className="px-5 py-3.5">Prev. entrega</th>
            <th className="px-5 py-3.5"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-primary/5">
          {cargas.map((c) => (
            <tr key={c.codigo} className="hover:bg-brand-primary/[0.02]">
              <td className="px-5 py-4 font-mono text-sm text-brand-text">{c.codigo}</td>
              <td className="px-5 py-4 text-sm text-brand-text">{c.destino}</td>
              <td className="px-5 py-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-brand-accent">
                  {c.status}
                </span>
              </td>
              <td className="px-5 py-4 font-mono text-xs text-brand-muted">{c.prazo}</td>
              <td className="px-5 py-4 text-right">
                <Link href={`/rastreamento?codigo=${c.codigo}`} className="font-mono text-[11px] uppercase tracking-wider text-brand-accent hover:underline inline-flex items-center gap-1">
                  <Search size={12} /> Detalhe
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TabOrcamentos() {
  const COLOR: Record<Orcamento['status'], string> = {
    aprovado: 'text-emerald-700',
    pendente: 'text-brand-accent',
    expirado: 'text-brand-muted',
  };
  return (
    <div className="bg-white border border-brand-primary/10">
      <table className="w-full">
        <thead>
          <tr className="border-b border-brand-primary/10 text-left font-mono text-[10px] uppercase tracking-wider text-brand-muted">
            <th className="px-5 py-3.5">Cotação</th>
            <th className="px-5 py-3.5">Rota</th>
            <th className="px-5 py-3.5">Modal</th>
            <th className="px-5 py-3.5">Data</th>
            <th className="px-5 py-3.5">Valor</th>
            <th className="px-5 py-3.5">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-primary/5">
          {MOCK_ORC.map((o) => (
            <tr key={o.id} className="hover:bg-brand-primary/[0.02]">
              <td className="px-5 py-4 font-mono text-sm">{o.id}</td>
              <td className="px-5 py-4 text-sm">{o.origem} → {o.destino}</td>
              <td className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-brand-muted">{o.modal}</td>
              <td className="px-5 py-4 font-mono text-xs text-brand-muted">{o.data}</td>
              <td className="px-5 py-4 font-mono text-sm text-brand-text">{formatBRL(o.valor)}</td>
              <td className={`px-5 py-4 font-mono text-[11px] uppercase tracking-wider ${COLOR[o.status]}`}>
                {o.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TabFaturas() {
  const COLOR: Record<Fatura['status'], string> = {
    paga:       'text-emerald-700',
    em_aberto:  'text-brand-accent',
    atrasada:   'text-red-700',
  };
  const LBL: Record<Fatura['status'], string> = {
    paga: 'paga', em_aberto: 'em aberto', atrasada: 'atrasada',
  };
  return (
    <div className="bg-white border border-brand-primary/10">
      <table className="w-full">
        <thead>
          <tr className="border-b border-brand-primary/10 text-left font-mono text-[10px] uppercase tracking-wider text-brand-muted">
            <th className="px-5 py-3.5">NF</th>
            <th className="px-5 py-3.5">Pedido</th>
            <th className="px-5 py-3.5">Emissão</th>
            <th className="px-5 py-3.5">Vencimento</th>
            <th className="px-5 py-3.5">Valor</th>
            <th className="px-5 py-3.5">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-primary/5">
          {MOCK_FAT.map((f) => (
            <tr key={f.id} className="hover:bg-brand-primary/[0.02]">
              <td className="px-5 py-4 font-mono text-sm">{f.id}</td>
              <td className="px-5 py-4 font-mono text-sm text-brand-muted">{f.pedido}</td>
              <td className="px-5 py-4 font-mono text-xs text-brand-muted">{f.emissao}</td>
              <td className="px-5 py-4 font-mono text-xs text-brand-muted">{f.vencimento}</td>
              <td className="px-5 py-4 font-mono text-sm text-brand-text">{formatBRL(f.valor)}</td>
              <td className={`px-5 py-4 font-mono text-[11px] uppercase tracking-wider ${COLOR[f.status]}`}>
                {LBL[f.status]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
