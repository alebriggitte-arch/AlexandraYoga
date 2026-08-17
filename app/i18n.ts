export type Language = "it" | "en" | "es";

export async function resolveLanguage(searchParams?: Promise<Record<string, string | string[] | undefined>>): Promise<Language> {
  const params = searchParams ? await searchParams : {};
  return params.lang === "en" || params.lang === "es" ? params.lang : "it";
}

export function localizedHref(href: string, language: Language) {
  return language === "it" ? href : `${href}?lang=${language}`;
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
  es: {
    nav: ["Sobre mí", "Programas", "Experiencia", "Colaboraciones"],
    talk: "Hablemos",
    menuOpen: "Abrir el menú",
    menuClose: "Cerrar el menú",
    menuHome: "Inicio",
    menuContact: "Contacto",
    tagline: "Movimiento · Conciencia · Bienestar",
    quote: "“El movimiento es libertad, escucha y transformación.”",
    languageLabel: "Idioma",
  },
} as const;
