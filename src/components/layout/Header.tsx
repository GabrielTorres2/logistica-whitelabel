'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import {
  useBrandIdentity,
  useBrandMenu,
  useBrandSocials,
} from '@/context/BrandContext';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { cx } from '@/lib/utils';

export function Header() {
  const identity = useBrandIdentity();
  const menu     = useBrandMenu();
  const socials  = useBrandSocials();
  const [openMobile, setOpenMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      {/* ───────────────── Topbar ───────────────── */}
      <div className="bg-brand-primary text-brand-ondark">
        <div className="container-wide flex items-center justify-between h-9 text-[11px]">
          <div className="flex items-center gap-3 font-mono tracking-[0.18em]">
            <span aria-hidden className="text-base leading-none">{identity.topbarFlag}</span>
            <span className="hidden sm:inline uppercase">{identity.topbarSlogan}</span>
            <span className="sm:hidden uppercase">{identity.name}</span>
          </div>
          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <a
                key={s.kind}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label || s.kind}
                className="w-7 h-7 grid place-items-center text-brand-ondark/80 hover:text-brand-accent transition-colors"
              >
                <SocialIcon kind={s.kind} size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Linha accent — separador editorial */}
      <div className="h-[2px] bg-brand-accent" />

      {/* ───────────────── Navbar ───────────────── */}
      <nav className="bg-brand-primary text-brand-ondark border-b border-white/5">
        <div className="container-wide flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center gap-3" aria-label={identity.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={identity.logoUrl}
              alt={identity.name}
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-1">
            {menu.map((item) => {
              const hasChildren = !!item.children?.some((c) => c.enabled);
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpenDropdown(item.label)}
                  onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cx(
                      'inline-flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium uppercase tracking-wider',
                      'text-brand-ondark/85 hover:text-brand-ondark transition-colors',
                      'relative after:absolute after:left-3.5 after:right-3.5 after:bottom-1 after:h-px',
                      'after:bg-brand-accent after:scale-x-0 after:origin-left after:transition-transform',
                      'hover:after:scale-x-100',
                    )}
                  >
                    {item.label}
                    {hasChildren && <ChevronDown size={14} strokeWidth={2} />}
                  </Link>

                  {hasChildren && openDropdown === item.label && (
                    <div className="absolute left-0 top-full pt-2 w-56">
                      <div className="bg-brand-secondary border border-white/10 shadow-brand-lg py-2 animate-fade-in">
                        {item.children!
                          .filter((c) => c.enabled)
                          .map((c) => (
                            <Link
                              key={c.label}
                              href={c.href}
                              className="block px-4 py-2.5 text-[13px] text-brand-ondark/85 hover:text-brand-accent hover:bg-white/5 transition-colors"
                            >
                              {c.label}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* CTA desktop */}
          <Link
            href="/cotacao"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-white font-semibold text-[12px] uppercase tracking-wider hover:brightness-110 transition-all"
          >
            Solicitar cotação
          </Link>

          {/* Toggle mobile */}
          <button
            type="button"
            onClick={() => setOpenMobile((v) => !v)}
            className="lg:hidden p-2 text-brand-ondark"
            aria-label="Abrir menu"
          >
            {openMobile ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {openMobile && (
          <div className="lg:hidden border-t border-white/10 bg-brand-primary">
            <ul className="container-wide py-4 flex flex-col">
              {menu.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpenMobile(false)}
                    className="block py-3 text-sm uppercase tracking-wider text-brand-ondark/85 border-b border-white/5"
                  >
                    {item.label}
                  </Link>
                  {item.children?.filter((c) => c.enabled).map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      onClick={() => setOpenMobile(false)}
                      className="block py-2 pl-4 text-[13px] text-brand-ondark/60"
                    >
                      ↳ {c.label}
                    </Link>
                  ))}
                </li>
              ))}
              <li className="mt-4">
                <Link
                  href="/cotacao"
                  onClick={() => setOpenMobile(false)}
                  className="btn-primary w-full"
                >
                  Solicitar cotação
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
