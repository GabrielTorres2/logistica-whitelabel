# 🚚 Plataforma de Logística Intermodal — White Label

Plataforma web completa de logística (Landing Page + Simulador de Frete + Área do Cliente) com **arquitetura White Label total**. Toda a identidade visual, contatos, menus e regras de negócio do site são controlados por **um único arquivo**: [`src/config/brandConfig.ts`](src/config/brandConfig.ts).

> Stack: **Next.js 14** (App Router) · **TypeScript** · **Tailwind CSS** · **Context API** · **Lucide React**.

---

## ⚡ Início rápido

```bash
npm install
npm run dev
```

Abra <http://localhost:3000>.

| Comando | Função |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run type-check` | Validação de tipos |
| `npm run lint` | Lint do projeto |

---

## 🎨 Como "clonar" para um novo cliente em 5 minutos

Todo o sistema é dirigido por **um único arquivo de configuração**: [`src/config/brandConfig.ts`](src/config/brandConfig.ts). Não há strings, cores ou contatos hardcoded em nenhum outro lugar.

### Passo 1 — Identidade visual

```ts
identity: {
  name: 'AG Expresso',                          // ← nome curto
  legalName: 'AG Expresso Petrallas Ltda.',     // ← razão social (CNPJ)
  logoUrl: 'https://cdn.empresa.com/logo.svg',  // ← logo (fundo escuro)
  logoUrlLight: '...',                          // ← logo alternativa
  faviconUrl: '/favicon.ico',
  slogan: 'Logística intermodal sob medida.',
  topbarSlogan: 'TRANSPORTE COM SEGURANÇA E PONTUALIDADE',
  topbarFlag: '🇧🇷',                           // ← emoji ou URL
},
```

### Passo 2 — Paleta de cores

As cores são em **hex** e o sistema converte automaticamente para CSS Variables consumidas pelo Tailwind (`bg-brand-primary`, `text-brand-accent`, etc.). Não precisa editar `tailwind.config.js`.

```ts
colors: {
  primary:   '#031126',  // header, fundos escuros
  secondary: '#122038',  // painéis, cards escuros
  accent:    '#C8001A',  // linha vermelha, CTAs, destaques
  onDark:    '#F4F6FA',  // texto sobre fundo escuro
  surface:   '#FFFFFF',  // fundo da página
  text:      '#0B1320',  // texto principal
  textMuted: '#5C6B82',  // texto secundário
},
```

> 💡 As cores são injetadas em runtime pelo `BrandProvider` no `<html>` via `style={...}` no SSR, evitando flash visual.

### Passo 3 — Contatos e redes sociais

```ts
contact: {
  cnpj:  '12.345.678/0001-99',
  email: 'contato@empresa.com.br',
  phone: '+55 (11) 4000-0000',
  whatsappNumber: '5511999999999',  // só dígitos, formato wa.me
  address: { street, city, state, zip },
},

socials: [
  { kind: 'whatsapp',  url: 'https://wa.me/5511999999999' },
  { kind: 'instagram', url: 'https://instagram.com/empresa' },
  { kind: 'facebook',  url: 'https://facebook.com/empresa' },
  { kind: 'linkedin',  url: 'https://linkedin.com/company/empresa' },
],
```

### Passo 4 — Menu (ative/desative itens)

```ts
menu: [
  { label: 'Início', href: '/', enabled: true },
  {
    label: 'Serviços',
    href: '/servicos',
    enabled: true,
    children: [
      { label: 'Rodoviário', href: '/servicos#rodoviario', enabled: true },
      { label: 'Aéreo',      href: '/servicos#aereo',      enabled: true },
      ...
    ],
  },
  { label: 'Trabalhe Conosco', href: '/trabalhe-conosco', enabled: false }, // ← oculta
  ...
],
```

### Passo 5 — Flags de negócio

Cliente que **só faz rodoviário**? Desligue o aéreo. O simulador, os cards de serviço e as cotações se ajustam automaticamente.

```ts
flags: {
  enableAereo:         true,   // mostra modal aéreo no simulador
  enableRodoviario:    true,   // mostra modal rodoviário
  enableGoogleLogin:   true,   // botão Google na tela de login
  enable2FA:           true,   // exige 2FA no login
  enableTrabalheConosco: true, // mostra/oculta página de carreiras
  fatorCubagemRodoviario: 300, // fator de cubagem (padrão Brasil)
  fatorCubagemAereo:     167,  // fator IATA padrão
  markupGlobal:          18,   // markup aplicado às cotações em %
},
```

### Passo 6 — Hero da landing

```ts
hero: {
  backgroundImage: 'https://images.unsplash.com/...',
  title: 'Sua carga em movimento. Sem fricção.',
  subtitle: '...',
  ctaPrimary:   { label: 'Solicitar cotação',    href: '/cotacao' },
  ctaSecondary: { label: 'Rastrear minha carga', href: '/rastreamento' },
},
```

**Pronto.** Salve o arquivo. O Next.js faz hot-reload e o site inteiro está rebrandeado.

---

## 🏗️ Arquitetura

```
src/
├── app/                       ← rotas (App Router)
│   ├── api/
│   │   ├── auth/              ← mock OAuth Google + 2FA
│   │   ├── cotacao/           ← cálculo de frete
│   │   └── rastreamento/      ← timeline de carga
│   ├── area-cliente/          ← dashboard B2B (cargas, orçamentos, faturas)
│   ├── contato/
│   ├── cotacao/               ← simulador de frete
│   ├── login/                 ← login social + 2FA
│   ├── quem-somos/
│   ├── rastreamento/          ← busca por código
│   ├── servicos/
│   ├── trabalhe-conosco/
│   ├── globals.css            ← CSS vars + fontes (Archivo + Fraunces + IBM Plex Mono)
│   ├── layout.tsx             ← root, monta BrandProvider/Header/Footer
│   └── page.tsx               ← landing
├── components/
│   ├── forms/
│   │   ├── RastreioForm.tsx
│   │   └── SimuladorFrete.tsx
│   ├── layout/
│   │   ├── Header.tsx         ← Topbar + Navbar duplos com dropdown
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── CtaFinal.tsx
│   │   ├── Depoimentos.tsx
│   │   ├── Hero.tsx
│   │   ├── Servicos.tsx
│   │   └── Stats.tsx
│   └── ui/
│       └── SocialIcon.tsx
├── config/
│   └── brandConfig.ts         ← ⭐ ÚNICO ARQUIVO A EDITAR POR CLIENTE
├── context/
│   └── BrandContext.tsx       ← Context API global + injeção de CSS vars
├── lib/
│   ├── brandStyle.ts          ← SSR de CSS vars (sem FOUC)
│   ├── pricing.ts             ← lógica de cubagem e cotação (SDD §4.1)
│   └── utils.ts               ← hex→RGB, BRL, cx
└── types/
    └── brand.ts               ← contrato BrandConfig com tipos fortes
```

### Como funciona o tema dinâmico

1. `brandConfig.ts` define as cores em **hex**.
2. No SSR, `buildBrandStyle()` em `lib/brandStyle.ts` converte cada hex para o formato `"R G B"` e injeta como `style={...}` no `<html>`. **Sem flash de cor**.
3. No client, `BrandProvider` faz a mesma injeção via `useEffect` (cobre navegações client-side).
4. O Tailwind, em `tailwind.config.js`, define classes como `bg-brand-primary` que consomem `rgb(var(--brand-primary) / <alpha-value>)`.

Resultado: **trocar a cor primária é trocar `colors.primary` no `brandConfig.ts`.** O site inteiro reage.

---

## 🔐 Autenticação (mock)

- `POST /api/auth { provider: 'google', email }` → simula OAuth e retorna `step: '2fa_required'`.
- `POST /api/auth { email, code }` → valida qualquer código de 6 dígitos e retorna token mock.

**Em produção**, troque o conteúdo de `app/api/auth/route.ts` por integração com NextAuth.js / Auth0 / Cognito. As páginas de login (`app/login/page.tsx`) já consomem este contrato.

---

## 🚛 Lógica de cubagem (SDD §4.1)

Implementada em `src/lib/pricing.ts`:

```
Peso Cubado = (Comprimento × Largura × Altura) × Fator de Cubagem
Peso Taxável = max(Peso Real, Peso Cubado)
Custo = Tarifa(Peso Taxável, Origem, Destino) + Markup
```

- **Fator rodoviário**: 300 (padrão Brasil)
- **Fator aéreo**: 167 (padrão IATA)
- **Markup**: configurável global em `flags.markupGlobal`

Quando ambos modais estão ativos, o sistema também gera automaticamente uma **rota intermodal** (60% rodo + 40% aéreo) e ordena por menor custo.

---

## 🎨 Identidade visual atual

Como demonstração, o `brandConfig.ts` vem preenchido com o palette do cliente **AG Expresso Petrallas**:

| Token | Valor |
|---|---|
| `primary`   | `#031126` (navy profundo) |
| `secondary` | `#122038` (navy 2) |
| `accent`    | `#C8001A` (vermelho) |

Tipografia: **Fraunces** (display, com itálico expressivo), **Archivo** (sans), **IBM Plex Mono** (mono).

---

## 📦 Próximos passos sugeridos

- [ ] Trocar `localStorage` por cookies httpOnly + middleware do Next
- [ ] Integração real com gateway de pagamento na área do cliente
- [ ] Painel admin de markup por rota (SDD §4.2)
- [ ] Geração de PDF de manifesto/etiqueta (SDD §5)
- [ ] Internacionalização (i18n) — toda string fica em `brandConfig`/dicionários

---

**Licença:** privado / proprietário.
