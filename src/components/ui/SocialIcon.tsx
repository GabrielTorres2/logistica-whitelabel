'use client';

import {
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle, // proxy de WhatsApp (Lucide não tem WhatsApp oficial)
  type LucideIcon,
} from 'lucide-react';
import type { SocialKind } from '@/types/brand';

const MAP: Record<SocialKind, LucideIcon> = {
  whatsapp:  MessageCircle,
  instagram: Instagram,
  facebook:  Facebook,
  linkedin:  Linkedin,
};

interface Props {
  kind: SocialKind;
  size?: number;
  strokeWidth?: number;
}

export function SocialIcon({ kind, size = 16, strokeWidth = 1.8 }: Props) {
  const Icon = MAP[kind];
  return <Icon size={size} strokeWidth={strokeWidth} />;
}
