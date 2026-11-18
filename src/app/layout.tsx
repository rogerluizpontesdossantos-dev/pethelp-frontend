
import type { Metadata } from "next";
import "./globals.css";
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import { CookieConsentPanel } from "@/components/cookies/CookieConsentPanel";

export const metadata: Metadata = {
  title: {
    default: "PetHelp | Adoção responsável",
    template: "%s | PetHelp",
  },
  description:
    "Encontre seu novo melhor amigo. O PetHelp conecta animais que precisam de um lar a pessoas dispostas a transformar suas vidas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <CookieConsentProvider>
          {children}
          <CookieConsentPanel />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
