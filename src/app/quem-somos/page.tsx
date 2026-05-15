'use client';

import { useBrandIdentity } from '@/context/BrandContext';

export default function QuemSomos() {
  const identity = useBrandIdentity();
  return (
    <>
      <section className="bg-brand-primary text-brand-ondark py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-30" aria-hidden />
        <div className="container-wide relative">
          <p className="eyebrow mb-4">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            Quem somos
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Logística feita<br />
            <span className="italic text-brand-accent">por gente que opera.</span>
          </h1>
        </div>
      </section>

      <section className="container-wide py-20 grid md:grid-cols-12 gap-10">
        <aside className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-brand-accent">
            // desde 2014
          </p>
          <p className="font-display text-3xl mt-4 leading-tight">
            12 anos<br />
            142 veículos<br />
            8 aeronaves<br />
            +6.000 clientes B2B
          </p>
        </aside>
        <div className="md:col-span-8 space-y-6 text-lg leading-relaxed text-brand-text">
          <p>
            A <strong>{identity.legalName}</strong> nasceu da inquietação de quem
            via a operação ficar refém de planilhas e telefonemas. Construímos do
            zero uma plataforma onde a frota, a tripulação e a precificação
            convivem em um mesmo dashboard.
          </p>
          <p>
            Operamos com frota e aeronaves <em>próprias</em>. Isso significa
            controle real sobre prazo, custo e qualidade — sem terceiros, sem
            terceirização da responsabilidade.
          </p>
          <p>
            Atendemos do produtor rural ao e-commerce de grande porte. Cada
            integração é desenhada caso a caso. Cada CT-e é emitido pela nossa
            equipe. Cada entrega tem dono.
          </p>

          <div className="border-l-4 border-brand-accent pl-6 mt-10">
            <p className="font-display text-2xl leading-snug italic">
              "Nossa promessa é simples: a carga chega no prazo combinado, com a
              fatura no dia certo e o suporte ao telefone na hora errada."
            </p>
            <p className="font-mono text-[11px] text-brand-muted mt-3 uppercase tracking-wider">
              — Diretoria
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
