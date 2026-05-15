import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { Servicos } from '@/components/sections/Servicos';
import { Depoimentos } from '@/components/sections/Depoimentos';
import { CtaFinal } from '@/components/sections/CtaFinal';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Servicos />
      <Depoimentos />
      <CtaFinal />
    </>
  );
}
