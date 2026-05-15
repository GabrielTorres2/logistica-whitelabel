import type { BrandColors } from '@/types/brand';
import { hexToRgbTriple } from '@/lib/utils';

/** Gera um objeto de style inline para injetar no <html> no SSR */
export function buildBrandStyle(colors: BrandColors): React.CSSProperties {
  return {
    // @ts-expect-error CSS vars via inline style
    '--brand-primary':    hexToRgbTriple(colors.primary),
    '--brand-secondary':  hexToRgbTriple(colors.secondary),
    '--brand-accent':     hexToRgbTriple(colors.accent),
    '--brand-on-dark':    hexToRgbTriple(colors.onDark),
    '--brand-surface':    hexToRgbTriple(colors.surface),
    '--brand-text':       hexToRgbTriple(colors.text),
    '--brand-text-muted': hexToRgbTriple(colors.textMuted),
  };
}
