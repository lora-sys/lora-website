"use client";

import type { FC } from "react";
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useLocaleCookie } from "next-intlayer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

  // Simple toggle for 2 languages, or dropdown for more
  const nextLocale = availableLocales.find((l) => l !== locale) ?? Locales.ENGLISH;

  return (
    <Button variant="ghost" size="sm" asChild className="text-xs font-bold uppercase tracking-wider">
      <Link
        href={getLocalizedUrl(pathWithoutLocale, nextLocale)}
        hrefLang={nextLocale}
        onClick={() => setLocaleCookie(nextLocale)}
      >
        {locale === Locales.ENGLISH ? "ZH" : "EN"}
      </Link>
    </Button>
  );
};
