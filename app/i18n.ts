export type Language = "it" | "en";

export async function resolveLanguage(searchParams?: Promise<Record<string, string | string[] | undefined>>): Promise<Language> {
  const params = searchParams ? await searchParams : {};
  return params.lang === "en" ? "en" : "it";
}

export function localizedHref(href: string, language: Language) {
  return language === "en" ? `${href}?lang=en` : href;
}

export const common = {
  it: {
    nav: ["Chi sono", "Percorsi", "Competenze", "Collaborazioni"],
    talk: "Parliamone",
    menuOpen: "Apri il menu",
    menuClose: "Chiudi il menu",
    menuHome: "Home",
    menuContact: "Contatti",
    tagline: "Movimento · Consapevolezza · Benessere",
    quote: "“Il movimento è libertà, è ascolto, è trasformazione.”",
    languageLabel: "Lingua",
  },
  en: {
    nav: ["About", "Programs", "Expertise", "Collaborations"],
    talk: "Let’s talk",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menuHome: "Home",
    menuContact: "Contact",
    tagline: "Movement · Awareness · Wellbeing",
    quote: "“Movement is freedom, listening and transformation.”",
    languageLabel: "Language",
  },
} as const;
