
"use client";

import Link from "next/link";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";
import { Heart, Mail } from "lucide-react";

export default function Footer() {
  const { openPreferences } = useCookieConsent();

  return (
    <footer className="bg-[#1d382c] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Heart size={22} fill="currentColor" />
            <span className="text-xl font-bold">PetHelp.</span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-7 text-white/65">
            Conectando animais que precisam de um lar a pessoas dispostas a
            transformar vidas.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold">Explore</h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-white/65">
            <Link href="/animals" className="transition hover:text-white">
              Encontrar um pet
            </Link>

            <Link href="/register" className="transition hover:text-white">
              Quero ajudar
            </Link>

            <Link href="/#how-it-works" className="transition hover:text-white">
              Como funciona
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold">Contato</h3>

          <div className="mt-4 flex flex-col gap-4 text-sm text-white/65">
            <a
              href="mailto:contato@pethelp.com.br"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Mail size={17} />
              contato@pethelp.com.br
            </a>

            <a
              href="#"
              className="flex items-center gap-2 transition hover:text-white"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="0.5" fill="currentColor" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 text-center text-xs text-white/45">
        © 2026 PetHelp. Todos os direitos reservados.{" "}
        <button
          type="button"
          onClick={openPreferences}
          className="ml-2 underline underline-offset-2 hover:text-white"
          aria-label="Preferências de cookies"
        >
          Preferências de Cookies
        </button>
      </div>
    </footer>
  );
}
