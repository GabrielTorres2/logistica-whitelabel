import { NextResponse } from 'next/server';

/**
 * Endpoint mock de autenticação.
 * Suporta dois fluxos:
 *  - { provider: 'google', email } → simula OAuth, exige 2FA
 *  - { email, code } → valida o código 2FA (qualquer 6 dígitos serve no mock)
 *
 * Em produção este endpoint integraria com NextAuth / Auth0 / Cognito.
 */
export async function POST(req: Request) {
  const body = (await req.json()) as {
    provider?: 'google';
    email?: string;
    code?: string;
  };

  await new Promise((r) => setTimeout(r, 300));

  // 1ª etapa — OAuth social
  if (body.provider === 'google' && body.email) {
    return NextResponse.json({
      step: '2fa_required',
      email: body.email,
      message: 'Código de verificação enviado para o aplicativo autenticador.',
    });
  }

  // 2ª etapa — 2FA
  if (body.email && body.code) {
    if (!/^\d{6}$/.test(body.code)) {
      return NextResponse.json(
        { error: 'Código deve conter 6 dígitos.' },
        { status: 400 },
      );
    }
    return NextResponse.json({
      step: 'authenticated',
      email: body.email,
      token: `mock_${Math.random().toString(36).slice(2)}`,
      user: {
        name: body.email.split('@')[0].replace(/\./g, ' '),
        email: body.email,
        plan: 'B2B Empresarial',
      },
    });
  }

  return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 });
}
