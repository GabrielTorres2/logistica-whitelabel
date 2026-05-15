import type { BrandConfig } from '@/types/brand';

/**
 * ═══════════════════════════════════════════════════════════════════════
 *  CONFIGURAÇÃO WHITE LABEL — EDITE APENAS ESTE ARQUIVO PARA CADA CLIENTE
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Tudo neste objeto é propagado automaticamente pelo BrandProvider para:
 *   - Header (topbar + navbar + cores)
 *   - Footer (contatos + sociais + CNPJ)
 *   - Tailwind (via CSS variables em globals.css)
 *   - Páginas (slogan, hero, menus)
 *   - Lógica de negócio (flags de modal aéreo/rodoviário, cubagem)
 *
 * Para clonar para um novo cliente: copie este arquivo, ajuste os valores,
 * e o site inteiro se reconfigura. Não há strings hardcoded fora daqui.
 * ═══════════════════════════════════════════════════════════════════════
 */
export const brandConfig: BrandConfig = {
  identity: {
    name: 'AG Expresso',
    legalName: 'AG Expresso Petrallas Transportes Ltda.',
    logoUrl: 'https://placehold.co/240x60/031126/FFFFFF/png?text=AG+EXPRESSO',
    logoUrlLight: 'https://placehold.co/240x60/FFFFFF/031126/png?text=AG+EXPRESSO',
    faviconUrl: '/favicon.ico',
    slogan: 'Logística intermodal sob medida para o seu negócio.',
    topbarSlogan: 'TRANSPORTE COM SEGURANÇA E PONTUALIDADE',
    topbarFlag: '🇧🇷',
  },

  colors: {
    primary: '#031126',     // navy profundo - header/topbar
    secondary: '#122038',   // navy2 - cards e painéis
    accent: '#C8001A',      // vermelho - linha de destaque, CTAs
    onDark: '#F4F6FA',
    surface: '#FFFFFF',
    text: '#0B1320',
    textMuted: '#5C6B82',
  },

  contact: {
    cnpj: '12.345.678/0001-99',
    email: 'contato@agexpresso.com.br',
    phone: '+55 (11) 4000-0000',
    whatsappNumber: '5511999999999',
    address: {
      street: 'Av. das Operações, 1500',
      city: 'São Bernardo do Campo',
      state: 'SP',
      zip: '09700-000',
    },
  },

  socials: [
    { kind: 'whatsapp',  url: 'https://wa.me/5511999999999', label: 'WhatsApp' },
    { kind: 'instagram', url: 'https://instagram.com/agexpresso', label: 'Instagram' },
    { kind: 'facebook',  url: 'https://facebook.com/agexpresso', label: 'Facebook' },
    { kind: 'linkedin',  url: 'https://linkedin.com/company/agexpresso', label: 'LinkedIn' },
  ],

  menu: [
    { label: 'Início',           href: '/',                 enabled: true },
    {
      label: 'Serviços',
      href: '/servicos',
      enabled: true,
      children: [
        { label: 'Rodoviário',   href: '/servicos#rodoviario', enabled: true },
        { label: 'Aéreo',        href: '/servicos#aereo',      enabled: true },
        { label: 'Intermodal',   href: '/servicos#intermodal', enabled: true },
        { label: 'Armazenagem',  href: '/servicos#armazenagem', enabled: true },
      ],
    },
    { label: 'Quem somos',       href: '/quem-somos',       enabled: true },
    { label: 'Trabalhe Conosco', href: '/trabalhe-conosco', enabled: true },
    { label: 'Contato',          href: '/contato',          enabled: true },
    { label: 'Cotação',          href: '/cotacao',          enabled: true },
    { label: 'Rastreamento',     href: '/rastreamento',     enabled: true },
  ],

  flags: {
    enableAereo: true,
    enableRodoviario: true,
    enableGoogleLogin: true,
    enable2FA: true,
    enableTrabalheConosco: true,
    fatorCubagemRodoviario: 300,
    fatorCubagemAereo: 167,
    markupGlobal: 18,
  },

  hero: {
    backgroundImage:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2400&q=80',
    title: 'Sua carga em movimento. Sem fricção.',
    subtitle:
      'Plataforma intermodal com frota e aeronaves próprias. Cotação dinâmica, rastreio em tempo real e gestão B2B integrada.',
    ctaPrimary:   { label: 'Solicitar cotação',   href: '/cotacao' },
    ctaSecondary: { label: 'Rastrear minha carga', href: '/rastreamento' },
  },
};
