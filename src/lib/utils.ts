/**
 * Converte hex (#RRGGBB ou #RGB) para "R G B" no formato consumido pelo Tailwind
 * com a sintaxe rgb(var(--var) / <alpha-value>).
 */
export function hexToRgbTriple(hex: string): string {
  let h = hex.trim().replace('#', '');
  if (h.length === 3) {
    h = h.split('').map((c) => c + c).join('');
  }
  if (h.length !== 6) {
    return '0 0 0';
  }
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

/** Clamp helper */
export const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

/** Formata BRL */
export const formatBRL = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/** Classe condicional simples (sem dependência extra além de clsx, já incluída) */
export { default as cx } from 'clsx';
