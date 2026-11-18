"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
export const CONSENT_COOKIE_NAME = "pethelp_cookie_consent";
const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;

export type CookieCategory =
  | "necessary"
  | "functional"
  | "analytics"
  | "advertising";

export interface CookieConsentPreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  advertising: boolean;
}

export interface CookieConsentRecord {
  version: number;
  categories: CookieConsentPreferences;
  updatedAt: string;
}

const DEFAULT_PREFERENCES: CookieConsentPreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  advertising: false,
};

interface CookieConsentContextValue {
  preferences: CookieConsentPreferences;
  hasConsented: boolean;
  isLoading: boolean;
  preferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectOptionals: () => void;
  savePreferences: (next: CookieConsentPreferences) => void;
  categoryEnabled: (category: CookieCategory) => boolean;
}

const CookieConsentContext =
  createContext<CookieConsentContextValue | null>(null);

function readConsentCookie(): CookieConsentPreferences | null {
  if (typeof document === "undefined") return null;

  try {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const cookie = cookies.find(
      (c) => c.startsWith(CONSENT_COOKIE_NAME + "=")
    );
    if (!cookie) return null;

    const value = cookie.substring(CONSENT_COOKIE_NAME.length + 1);
    const decoded = decodeURIComponent(value);
    const record: unknown = JSON.parse(decoded);

    if (
      record &&
      typeof record === "object" &&
      "categories" in record
    ) {
      const categories = (record as Partial<
        CookieConsentRecord
      >).categories;
      return {
        necessary: true,
        functional: Boolean(categories?.functional),
        analytics: Boolean(categories?.analytics),
        advertising: Boolean(categories?.advertising),
      };
    }
  } catch {
    // Cookie corrompido: trata como sem consentimento.
  }

  return null;
}

function writeConsentCookie(preferences: CookieConsentPreferences): void {
  if (typeof document === "undefined") return;

  const record: CookieConsentRecord = {
    version: CONSENT_VERSION,
    categories: preferences,
    updatedAt: new Date().toISOString(),
  };

  const value = encodeURIComponent(JSON.stringify(record));
  const secure =
    window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = [
    CONSENT_COOKIE_NAME + "=" + value,
    "path=/",
    "SameSite=Lax",
    secure,
    "max-age=" + CONSENT_MAX_AGE_SECONDS,
  ].join("; ");
}

function eraseConsentCookie(): void {}

export function CookieConsentProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [preferences, setPreferencesState] = useState<CookieConsentPreferences>(
    () => readConsentCookie() ?? DEFAULT_PREFERENCES
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [hasConsented, setHasConsented] = useState<boolean>(
    () => readConsentCookie() !== null
  );
  const [isLoading, setIsLoading] = useState(false);

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    const next: CookieConsentPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      advertising: true,
    };
    setPreferencesState(next);
    setHasConsented(true);
    setPreferencesOpen(false);
    writeConsentCookie(next);
  }, []);

  const rejectOptionals = useCallback(() => {
    const next: CookieConsentPreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      advertising: false,
    };
    setPreferencesState(next);
    setHasConsented(true);
    setPreferencesOpen(false);
    writeConsentCookie(next);
  }, []);

  const savePreferences = useCallback(
    (next: CookieConsentPreferences) => {
      const withNecessary: CookieConsentPreferences = {
        ...next,
        necessary: true,
      };
      setPreferencesState(withNecessary);
      setHasConsented(true);
      setPreferencesOpen(false);
      writeConsentCookie(withNecessary);
    },
    []
  );

  const categoryEnabled = useCallback(
    (category: CookieCategory) => {
      if (category === "necessary") return true;
      return Boolean(preferences[category]);
    },
    [preferences]
  );

  const value = useMemo(
    () => ({
      preferences,
      hasConsented,
      isLoading,
      preferencesOpen,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectOptionals,
      savePreferences,
      categoryEnabled,
    }),
    [
      preferences,
      hasConsented,
      isLoading,
      preferencesOpen,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectOptionals,
      savePreferences,
      categoryEnabled,
    ]
  );

  if (isLoading) return null;

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent deve ser usado dentro de CookieConsentProvider"
    );
  }
  return context;
}