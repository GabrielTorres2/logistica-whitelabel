/**
 * Contrato de tipos do sistema White Label.
 * Qualquer novo cliente deve preencher esta estrutura em brandConfig.ts.
 */

export type SocialKind = 'whatsapp' | 'instagram' | 'facebook' | 'linkedin';

export interface SocialLink {
  kind: SocialKind;
  url: string;
  label?: string;
}

export interface BrandColors {
  /** Cor principal - usada no header, fundos escuros e CTAs primários */
  primary: string;
  /** Cor secundária - cards, painéis, fundos intermediários */
  secondary: string;
  /** Cor de destaque - linhas, hover, alertas */
  accent: string;
  /** Cor sobre fundo escuro */
  onDark: string;
  /** Cor de fundo claro da página */
  surface: string;
  /** Cor de texto principal */
  text: string;
  /** Cor de texto secundário */
  textMuted: string;
}

export interface BrandIdentity {
  /** Nome curto da empresa */
  name: string;
  /** Nome legal completo */
  legalName: string;
  /** URL da logo principal (fundo escuro) */
  logoUrl: string;
  /** URL da logo alternativa (fundo claro) */
  logoUrlLight?: string;
  /** URL do favicon */
  faviconUrl: string;
  /** Slogan curto */
  slogan: string;
  /** Slogan exibido na topbar */
  topbarSlogan: string;
  /** Bandeira ao lado do slogan da topbar (emoji ou URL) */
  topbarFlag: string;
}

export interface BrandContact {
  cnpj: string;
  email: string;
  phone: string;
  whatsappNumber: string; // só dígitos, ex: 5511999999999
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface MenuItem {
  label: string;
  href: string;
  enabled: boolean;
  children?: Array<{ label: string; href: string; enabled: boolean }>;
}

export interface BusinessFlags {
  /** Habilita o modal aéreo no simulador e nas rotas */
  enableAereo: boolean;
  /** Habilita o modal rodoviário */
  enableRodoviario: boolean;
  /** Habilita login social Google */
  enableGoogleLogin: boolean;
  /** Habilita 2FA na área administrativa */
  enable2FA: boolean;
  /** Habilita a página Trabalhe Conosco */
  enableTrabalheConosco: boolean;
  /** Fator de cubagem padrão (300 = rodoviário Brasil) */
  fatorCubagemRodoviario: number;
  /** Fator de cubagem aéreo (167 = padrão IATA) */
  fatorCubagemAereo: number;
  /** Markup global em percentual */
  markupGlobal: number;
}

export interface HeroConfig {
  backgroundImage: string;
  title: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface BrandConfig {
  identity: BrandIdentity;
  colors: BrandColors;
  contact: BrandContact;
  socials: SocialLink[];
  menu: MenuItem[];
  flags: BusinessFlags;
  hero: HeroConfig;
}
