import type { Metadata } from 'next';
import './globals.css';
import { BrandProvider } from '@/context/BrandContext';
import { brandConfig } from '@/config/brandConfig';
import { buildBrandStyle } from '@/lib/brandStyle';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: `${brandConfig.identity.name} — ${brandConfig.identity.slogan}`,
  description: brandConfig.identity.slogan,
  icons: { icon: brandConfig.identity.faviconUrl },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brandStyle = buildBrandStyle(brandConfig.colors);

  return (
    <html lang="pt-BR" style={brandStyle}>
      <body className="min-h-screen flex flex-col">
        <BrandProvider config={brandConfig}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </BrandProvider>
      </body>
    </html>
  );
}
