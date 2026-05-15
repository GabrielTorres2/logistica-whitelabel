'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useBrandContact, useBrandSocials } from '@/context/BrandContext';
import { SocialIcon } from '@/components/ui/SocialIcon';

export default function ContatoPage() {
  const contact = useBrandContact();
  const socials = useBrandSocials();

  const [form, setForm] = useState({
    nome: '', empresa: '', email: '', telefone: '', mensagem: '',
  });
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // mock
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setEnviado(true);
  }

  return (
    <>
      <section className="bg-brand-primary text-brand-ondark py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-30" aria-hidden />
        <div className="container-wide relative">
          <p className="eyebrow mb-4">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            Contato
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Vamos<br />
            <span className="italic text-brand-accent">conversar.</span>
          </h1>
        </div>
      </section>

      <section className="container-wide py-20 grid lg:grid-cols-12 gap-10">
        {/* Form */}
        <div className="lg:col-span-7">
          {enviado ? (
            <div className="bg-brand-primary text-brand-ondark p-12 min-h-[500px] grid place-items-center text-center">
              <div>
                <CheckCircle2 size={48} strokeWidth={1.2} className="text-brand-accent mx-auto mb-6" />
                <h2 className="font-display text-4xl mb-3">Mensagem enviada.</h2>
                <p className="text-brand-ondark/70 max-w-md mx-auto">
                  Nossa equipe comercial entrará em contato em até 1 dia útil.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-mono">Nome</label>
                  <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="label-mono">Empresa</label>
                  <input required value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} className="input-field" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-mono">E-mail</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="label-mono">Telefone</label>
                  <input value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="label-mono">Mensagem</label>
                <textarea
                  required
                  rows={6}
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  className="input-field resize-none"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Enviar mensagem
              </button>
            </form>
          )}
        </div>

        {/* Dados */}
        <aside className="lg:col-span-5 lg:pl-10 lg:border-l border-brand-primary/10">
          <p className="eyebrow mb-6">/// canais diretos</p>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <MapPin size={18} className="text-brand-accent shrink-0 mt-1" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-brand-muted">Endereço</p>
                <p className="text-brand-text mt-1">
                  {contact.address.street}<br />
                  {contact.address.city} / {contact.address.state} — {contact.address.zip}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <Phone size={18} className="text-brand-accent shrink-0 mt-1" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-brand-muted">Telefone</p>
                <a href={`tel:${contact.phone}`} className="text-brand-text mt-1 block hover:text-brand-accent">
                  {contact.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail size={18} className="text-brand-accent shrink-0 mt-1" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-brand-muted">E-mail</p>
                <a href={`mailto:${contact.email}`} className="text-brand-text mt-1 block hover:text-brand-accent">
                  {contact.email}
                </a>
              </div>
            </li>
          </ul>

          <div className="mt-10 pt-10 border-t border-brand-primary/10">
            <p className="font-mono text-[11px] uppercase tracking-wider text-brand-muted mb-4">Redes sociais</p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.kind}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 grid place-items-center border border-brand-primary/15 hover:border-brand-accent hover:text-brand-accent transition-colors"
                  aria-label={s.label}
                >
                  <SocialIcon kind={s.kind} size={16} />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
