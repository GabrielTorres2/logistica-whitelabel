'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import type { BrandConfig } from '@/types/brand';
import { hexToRgbTriple } from '@/lib/utils';

const BrandContext = createContext<BrandConfig | null>(null);

interface BrandProviderProps {
  config: BrandConfig;
  children: React.ReactNode;
}

/**
 * Provê o BrandConfig para toda a árvore e injeta as cores como CSS variables
 * no <html>. Isso permite que o Tailwind consuma cores dinâmicas sem rebuild.
 */
export function BrandProvider({ config, children }: BrandProviderProps) {
  // Aplica as CSS variables no root assim que o cliente monta
  useEffect(() => {
    const root = document.documentElement;
    const { colors } = config;
    root.style.setProperty('--brand-primary',    hexToRgbTriple(colors.primary));
    root.style.setProperty('--brand-secondary',  hexToRgbTriple(colors.secondary));
    root.style.setProperty('--brand-accent',     hexToRgbTriple(colors.accent));
    root.style.setProperty('--brand-on-dark',    hexToRgbTriple(colors.onDark));
    root.style.setProperty('--brand-surface',    hexToRgbTriple(colors.surface));
    root.style.setProperty('--brand-text',       hexToRgbTriple(colors.text));
    root.style.setProperty('--brand-text-muted', hexToRgbTriple(colors.textMuted));

    // Title e favicon dinâmicos
    document.title = `${config.identity.name} — ${config.identity.slogan}`;
    const link =
      (document.querySelector("link[rel='icon']") as HTMLLinkElement) ||
      Object.assign(document.createElement('link'), { rel: 'icon' });
    link.href = config.identity.faviconUrl;
    if (!link.parentNode) document.head.appendChild(link);
  }, [config]);

  const value = useMemo(() => config, [config]);

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrand(): BrandConfig {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error('useBrand precisa estar dentro de <BrandProvider>.');
  }
  return ctx;
}

/** Helpers seletores para evitar re-render em sub-árvores que só querem 1 slice */
export const useBrandIdentity = () => useBrand().identity;
export const useBrandFlags    = () => useBrand().flags;
export const useBrandSocials  = () => useBrand().socials;
export const useBrandMenu     = () => useBrand().menu.filter((m) => m.enabled);
export const useBrandContact  = () => useBrand().contact;
