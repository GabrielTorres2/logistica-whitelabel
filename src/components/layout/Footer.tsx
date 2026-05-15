'use client';

import Link from 'next/link';
import {
  useBrandIdentity,
  useBrandContact,
  useBrandSocials,
  useBrandMenu,
} from '@/context/BrandContext';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  const identity = useBrandIdentity();
  const contact  = useBrandContact();
  const socials  = useBrandSocials();
  const menu     = useBrandMenu();
  const year     = new Date().getFullYear();

  return (
    <footer className="bg-brand-primary text-brand-ondark mt-20">
      {/* Top: tagline editorial */}
      <div className="border-b border-white/10">
        <div className="container-wide py-14 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-brand-accent mb-3">/// {identity.name}</p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] max-w-2xl">
              {identity.slogan}
            </h2>
          </div>
          <div className="md:col-span-4 flex md:justify-end gap-2">
            {socials.map((s) => (
              <a
                key={s.kind}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label || s.kind}
                className="w-10 h-10 grid place-items-center border border-white/15 hover:border-brand-accent hover:text-brand-accent transition-colors"
              >
                <SocialIcon kind={s.kind} size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Middle: colunas */}
      <div className="container-wide py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={identity.logoUrl}
            alt={identity.name}
            className="h-10 mb-5 object-contain"
          />
          <p className="text-sm text-brand-ondark/70 max-w-xs leading-relaxed">
            {identity.legalName}
          </p>
          <p className="font-mono text-[11px] text-brand-ondark/50 mt-2 tracking-wider">
            CNPJ {contact.cnpj}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="label-mono text-brand-ondark/60 mb-4">Navegação</p>
          <ul className="space-y-2.5">
            {menu.slice(0, 6).map((m) => (
              <li key={m.label}>
                <Link
                  href={m.href}
                  className="text-sm text-brand-ondark/80 hover:text-brand-accent transition-colors"
                >
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <p className="label-mono text-brand-ondark/60 mb-4">Contato</p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3 text-brand-ondark/80">
              <MapPin size={16} className="text-brand-accent shrink-0 mt-0.5" />
              <span>
                {contact.address.street}<br />
                {contact.address.city} / {contact.address.state} — {contact.address.zip}
              </span>
            </li>
            <li className="flex gap-3 text-brand-ondark/80 items-center">
              <Phone size={16} className="text-brand-accent shrink-0" />
              <a href={`tel:${contact.phone}`} className="hover:text-brand-accent transition-colors">
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-3 text-brand-ondark/80 items-center">
              <Mail size={16} className="text-brand-accent shrink-0" />
              <a href={`mailto:${contact.email}`} className="hover:text-brand-accent transition-colors">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10">
        <div className="container-wide py-5 flex flex-col md:flex-row justify-between items-center gap-2 font-mono text-[11px] text-brand-ondark/50 tracking-wider">
          <span>© {year} {identity.legalName}. Todos os direitos reservados.</span>
          <span>Plataforma white label // versão 1.0</span>
        </div>
      </div>
    </footer>
  );
}
