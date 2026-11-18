"use client";

import { useCallback } from "react";
import { X, ShieldCheck, Settings } from "lucide-react";
import { useCookieConsent, type CookieCategory } from "./CookieConsentProvider";

const CATEGORY_LABELS: Record<string, { title: string; description: string }> = {
  necessary: {
    title: "Cookies necessários",
    description:
      "Essenciais para segurança, autenticação e funcionamento do site. Sempre ativos.",
  },
  functional: {
    title: "Cookies funcionais",
    description:
      "Permitem funcionalidades e memórias de preferências de navegação.",
  },
  analytics: {
    title: "Cookies analíticos",
    description:
      "Ajudam a entender como os visitantes interagem com o site. Desativados por padrão.",
  },
  advertising: {
    title: "Cookies de publicidade",
    description:
      "Usados para exibir anúncios relevantes. Desativados por padrão.",
  },
};

export function CookieConsentPanel() {
  const {
    preferences,
    hasConsented,
    preferencesOpen,
    openPreferences,
    closePreferences,
    acceptAll,
    rejectOptionals,
    savePreferences,
    categoryEnabled,
  } = useCookieConsent();

  const toggleCategory = useCallback(
    (category: CookieCategory) => {
      const next: typeof preferences = {
        ...preferences,
        [category]: !preferences[category],
      };
      savePreferences(next);
    },
    [preferences, savePreferences]
  );

  const isChecked = (category: CookieCategory) =>
    category === "necessary" ? true : preferences[category];

  const disabledCategory = (category: CookieCategory) =>
    category === "necessary";

  return (
    <>
      {!hasConsented && !preferencesOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center pb-8 pt-4 md:pb-16 md:pt-0 md:justify-center md:items-center"
          aria-modal="true"
          role="dialog"
          aria-labelledby="cookie-consent-title"
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-[#e7eae3] bg-white p-6 shadow-2xl shadow-[#245c46]/10 md:p-8"
          >
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="h-6 w-6 shrink-0 text-[#245c46]"
                aria-hidden="true"
              />
              <div>
                <h2
                  id="cookie-consent-title"
                  className="text-lg font-bold text-[#293b2f]"
                >
                  Cookies e suas preferências
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#778078]">
                  Usamos cookies para garantir o funcionamento, a segurança e a
                  sua experiência no PetHelp. Escolha abaixo quais categorias
                  deseja permitir.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {Object.entries(CATEGORY_LABELS).map(([key, category]) => {
                const categoryKey = key as CookieCategory;
                const checked = isChecked(categoryKey);
                const disabled = disabledCategory(categoryKey);
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-xl border border-[#e2e7df] bg-[#fbfcfa]"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => !disabled && toggleCategory(categoryKey)}
                        className="rounded border-[#e2e7df] bg-white text-[#245c46] focus:ring-2 focus:ring-[#245c46] disabled:opacity-50"
                        aria-label={category.title}
                        aria-checked={checked}
                        aria-disabled={disabled}
                      />
                      <div>
                        <span className="text-sm font-semibold text-[#293b2f]">
                          {category.title}
                        </span>
                        {disabled && (
                          <span className="ml-2 text-xs font-medium text-[#245c46]">
                            Obrigatório
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs leading-5 text-[#778078]">
                      {category.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={rejectOptionals}
                className="w-full sm:w-auto rounded-xl border border-[#e2e7df] bg-white px-5 py-3 text-sm font-semibold text-[#465349] transition hover:bg-[#f3f5f2]"
              >
                Rejeitar opcionais
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="w-full sm:w-auto rounded-xl bg-[#245c46] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#194532]"
              >
                Aceitar todos
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="w-full sm:w-auto rounded-xl border border-transparent px-5 py-3 text-sm font-semibold text-[#245c46] transition hover:underline"
              >
                Personalizar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
          aria-labelledby="cookie-preferences-title"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => closePreferences()}
            aria-hidden="true"
          />
          <div
            className="relative w-full max-w-md rounded-2xl border border-[#e7eae3] bg-white p-6 shadow-2xl shadow-[#245c46]/10 md:p-8"
          >
            <button
              type="button"
              onClick={() => closePreferences()}
              className="absolute top-4 right-4 rounded-lg p-2 text-[#778078] hover:text-[#245c46]"
              aria-label="Fechar preferências de cookies"
            >
              <X size={20} />
            </button>

            <div className="flex items-start gap-3 mb-6">
              <Settings className="h-6 w-6 shrink-0 text-[#245c46]" aria-hidden="true" />
              <div>
                <h2
                  id="cookie-preferences-title"
                  className="text-lg font-bold text-[#293b2f]"
                >
                  Personalizar cookies
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#778078]">
                  Escolha quais categorias de cookies opcionais deseja
                  ativar.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(CATEGORY_LABELS).map(([key, category]) => {
                const categoryKey = key as CookieCategory;
                const checked = isChecked(categoryKey);
                const disabled = disabledCategory(categoryKey);
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-xl border border-[#e2e7df] bg-[#fbfcfa]"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => !disabled && toggleCategory(categoryKey)}
                        className="rounded border-[#e2e7df] bg-white text-[#245c46] focus:ring-2 focus:ring-[#245c46] disabled:opacity-50"
                        aria-label={category.title}
                        aria-checked={checked}
                        aria-disabled={disabled}
                      />
                      <div>
                        <span className="text-sm font-semibold text-[#293b2f]">
                          {category.title}
                        </span>
                        {disabled && (
                          <span className="ml-2 text-xs font-medium text-[#245c46]">
                            Obrigatório
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs leading-5 text-[#778078]">
                      {category.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={() => closePreferences()}
                className="w-full sm:w-auto rounded-xl border border-[#e2e7df] bg-white px-5 py-3 text-sm font-semibold text-[#465349] transition hover:bg-[#f3f5f2]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => closePreferences()}
                className="w-full sm:w-auto rounded-xl bg-[#245c46] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#194532]"
              >
                Salvar preferências
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}