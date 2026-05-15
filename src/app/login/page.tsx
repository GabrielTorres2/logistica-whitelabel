'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';
import { useBrandFlags, useBrandIdentity } from '@/context/BrandContext';

type Step = 'login' | '2fa';

export default function LoginPage() {
  const router   = useRouter();
  const flags    = useBrandFlags();
  const identity = useBrandIdentity();

  const [step, setStep]       = useState<Step>('login');
  const [email, setEmail]     = useState('');
  const [code, setCode]       = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro]       = useState<string | null>(null);

  async function loginGoogle() {
    setErro(null);
    setLoading(true);
    try {
      // Mock: no fluxo real abriria popup Google; aqui simulamos e-mail
      const fakeEmail = email || 'demo@empresa.com.br';
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'google', email: fakeEmail }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Falha no login.');
      setEmail(fakeEmail);
      setStep(flags.enable2FA ? '2fa' : 'login');
      if (!flags.enable2FA) {
        router.push('/area-cliente');
      }
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }

  async function verify2FA(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Código inválido.');
      // Persiste no localStorage (mock — em produção: cookie httpOnly)
      localStorage.setItem('auth.token', json.token);
      localStorage.setItem('auth.user', JSON.stringify(json.user));
      router.push('/area-cliente');
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-200px)] grid lg:grid-cols-2">
      {/* Painel esquerdo — narrativa */}
      <div className="hidden lg:block bg-brand-primary text-brand-ondark p-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-30" aria-hidden />
        <div className="relative h-full flex flex-col">
          <p className="eyebrow">/// {identity.name}</p>
          <h2 className="font-display text-5xl mt-6 leading-[1] max-w-md">
            Acesso seguro à<br />
            <span className="italic text-brand-accent">sua operação.</span>
          </h2>
          <p className="text-brand-ondark/70 mt-6 max-w-sm leading-relaxed">
            Login social com OAuth2 + autenticação em dois fatores obrigatória
            para operações financeiras, conforme política de segurança.
          </p>
          <div className="mt-auto flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-brand-ondark/60">
            <ShieldCheck size={14} className="text-brand-accent" />
            Conexão criptografada · SSO · 2FA
          </div>
        </div>
      </div>

      {/* Painel direito — form */}
      <div className="flex items-center justify-center p-8 md:p-14">
        <div className="w-full max-w-md">
          {step === 'login' && (
            <>
              <p className="eyebrow mb-4">
                <span className="inline-block w-8 h-px bg-brand-accent" />
                Entrar
              </p>
              <h1 className="font-display text-4xl mb-2">Bem-vindo de volta.</h1>
              <p className="text-brand-muted mb-8">
                Use a conta corporativa cadastrada com {identity.name}.
              </p>

              <div className="space-y-3">
                {flags.enableGoogleLogin && (
                  <button
                    onClick={loginGoogle}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-5 py-3.5 border border-brand-primary/20 hover:bg-brand-primary hover:text-white font-semibold text-sm uppercase tracking-wider transition-all"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <GoogleGlyph />
                    )}
                    Continuar com Google
                  </button>
                )}

                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-brand-primary/10" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-brand-muted">
                    ou e-mail corporativo
                  </span>
                  <div className="flex-1 h-px bg-brand-primary/10" />
                </div>

                <div>
                  <label className="label-mono">E-mail</label>
                  <input
                    type="email"
                    placeholder="voce@empresa.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                  />
                </div>

                <button
                  onClick={loginGoogle}
                  disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-60"
                >
                  Continuar <ArrowRight size={16} />
                </button>

                {erro && (
                  <p className="font-mono text-xs text-brand-accent border border-brand-accent/40 p-3">
                    {erro}
                  </p>
                )}
              </div>

              <p className="font-mono text-[11px] text-brand-muted mt-8 text-center">
                Não tem conta?{' '}
                <Link href="/contato" className="text-brand-accent hover:underline">
                  Falar com comercial
                </Link>
              </p>
            </>
          )}

          {step === '2fa' && (
            <form onSubmit={verify2FA}>
              <p className="eyebrow mb-4">
                <span className="inline-block w-8 h-px bg-brand-accent" />
                Verificação 2FA
              </p>
              <h1 className="font-display text-4xl mb-2">Confirme sua identidade.</h1>
              <p className="text-brand-muted mb-8">
                Insira o código de 6 dígitos gerado pelo seu app autenticador
                (qualquer 6 dígitos funcionam neste mock).
              </p>

              <label className="label-mono">Código</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                required
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="input-field text-center font-mono text-2xl tracking-[0.5em]"
              />

              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="btn-primary w-full justify-center mt-5 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Verificando...
                  </>
                ) : (
                  <>
                    <Lock size={16} /> Autenticar
                  </>
                )}
              </button>

              {erro && (
                <p className="font-mono text-xs text-brand-accent border border-brand-accent/40 p-3 mt-4">
                  {erro}
                </p>
              )}

              <button
                type="button"
                onClick={() => setStep('login')}
                className="block mx-auto font-mono text-[11px] text-brand-muted hover:text-brand-accent mt-6"
              >
                ← Voltar ao login
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function GoogleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.19V7.07H2.18a11 11 0 0 0 0 9.87l3.66-2.85z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  );
}
