"use client";

import { usePathname } from "next/navigation";
import { FormEvent, ReactNode, useState } from "react";
import { common, Language, localizedHref } from "./i18n";

const nav = [
  ["Chi sono", "/chi-sono"],
  ["Percorsi", "/percorsi"],
  ["Competenze", "/competenze"],
  ["Collaborazioni", "/collaborazioni"],
];

const languages: { code: Language; label: string }[] = [
  { code: "it", label: "Italiano" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

function LanguagePicker({ language, path, mobile = false }: { language: Language; path: string; mobile?: boolean }) {
  return <div className={`language-picker${mobile ? " mobile-language" : ""}`} aria-label={common[language].languageLabel}>
    {languages.map(({ code, label }) => <a key={code} className={language === code ? "selected" : ""} href={localizedHref(path, code)} aria-current={language === code ? "true" : undefined} aria-label={label}>{code.toUpperCase()}</a>)}
  </div>;
}

export function Header({ light = false, language = "it" }: { light?: boolean; language?: Language }) {
  const path = usePathname();
  const copy = common[language];
  return <>
    <input className="menu-toggle-control" id="site-menu-toggle" type="checkbox" aria-label={copy.menuOpen}/>
    <header className={`site-header ${light ? "header-dark" : ""}`}>
      <a className="wordmark" href={localizedHref("/", language)} aria-label="Alexandra Huaman — home"><span className="wordmark-logo" aria-hidden="true"><img src="/alexandra-monogram-transparent.png" alt=""/></span><strong>Alexandra Huaman</strong></a>
      <nav aria-label="Navigazione principale">{nav.map(([, href], i) => <a className={path === href ? "active" : ""} key={href} href={localizedHref(href, language)}>{copy.nav[i]}</a>)}</nav>
      <div className="header-actions"><LanguagePicker language={language} path={path}/><a className="contact-link" href={localizedHref("/contatti", language)}>{copy.talk} <span>↗</span></a></div>
      <label className="menu-button" htmlFor="site-menu-toggle" aria-hidden="true"><i></i><i></i></label>
    </header>
    <div className="menu-overlay">
      <p>Alexandra Huaman</p>
      <nav>{[[copy.menuHome, "/"], ...nav.map(([, href], i) => [copy.nav[i], href]), [copy.menuContact, "/contatti"]].map(([label, href], i) => <a key={href} href={localizedHref(href, language)}><small>0{i + 1}</small>{label}<span>↗</span></a>)}</nav>
      <div className="menu-footer"><LanguagePicker language={language} path={path} mobile/><div className="menu-meta">{copy.tagline}</div></div>
    </div>
  </>;
}

export function Footer({ language = "it" }: { language?: Language }) {
  const location = language === "it" ? "Roma, Italia · Disponibile in tutto il mondo" : language === "es" ? "Roma, Italia · Disponible en todo el mundo" : "Rome, Italy · Available worldwide";
  return <footer className="site-footer"><div><span className="footer-mark" aria-hidden="true"><img src="/alexandra-monogram-transparent.png" alt=""/></span><p>{common[language].quote}</p></div><div className="footer-links"><span className="footer-location">{location}</span><a href="tel:+393520879599">+39 352 087 9599</a><a href="mailto:alexandrabhuaman@gmail.com">alexandrabhuaman@gmail.com</a><a href="https://instagram.com/aledevuelo.art" target="_blank" rel="noreferrer">@aledevuelo.art</a></div><small>© {new Date().getFullYear()} Alexandra Huaman</small></footer>;
}

export function Page({ kicker, title, intro, children, language = "it" }: { kicker: string; title: ReactNode; intro?: string; children: ReactNode; language?: Language }) {
  const movement = language === "en" ? "movement" : "movimento";
  return <main className="inner-page"><Header light language={language}/><section className="page-intro"><p className="eyebrow dark">{kicker}</p><h1>{title}</h1>{intro && <p className="page-lede">{intro}</p>}<span className="page-number">Alexandra · {movement}</span></section>{children}<Footer language={language}/></main>;
}

export function ContactForm({ language = "it" }: { language?: Language }) {
  const [sent, setSent] = useState(false);
  const forms = {
    it: { name:"Come ti chiami?", namePlaceholder:"Il tuo nome", email:"La tua email", need:"Di cosa hai bisogno?", options:["Performance o evento","Lezioni individuali","Percorso di gruppo","Workshop introduttivo","Collaborazione professionale"], tell:"Raccontami qualcosa", message:"Il tuo messaggio...", send:"Invia la richiesta →", sent:"Apri la tua email →", subject:"Richiesta dal sito" },
    en: { name:"What’s your name?", namePlaceholder:"Your name", email:"Your email", need:"What are you looking for?", options:["Performance or event","One-to-one sessions","Group program","Introductory workshop","Professional collaboration"], tell:"Tell me a little more", message:"Your message...", send:"Send request →", sent:"Open your email →", subject:"Website enquiry" },
    es: { name:"¿Cómo te llamas?", namePlaceholder:"Tu nombre", email:"Tu correo electrónico", need:"¿Qué estás buscando?", options:["Performance o evento","Sesiones individuales","Programa grupal","Taller introductorio","Colaboración profesional"], tell:"Cuéntame un poco más", message:"Tu mensaje...", send:"Enviar solicitud →", sent:"Abrir tu correo →", subject:"Consulta desde la web" },
  };
  const c = forms[language];
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`${c.subject} — ${data.get("nome")}`);
    const labels = language === "it" ? ["Nome", "Email", "Interesse"] : language === "es" ? ["Nombre", "Correo", "Interés"] : ["Name", "Email", "Interest"];
    const body = encodeURIComponent(`${labels[0]}: ${data.get("nome")}\n${labels[1]}: ${data.get("email")}\n${labels[2]}: ${data.get("interesse")}\n\n${data.get("messaggio")}`);
    window.location.href = `mailto:alexandrabhuaman@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }
  return <form className="contact-form" action="mailto:alexandrabhuaman@gmail.com" method="get" onSubmit={submit}><label>{c.name}<input required name="nome" placeholder={c.namePlaceholder}/></label><label>{c.email}<input required name="email" type="email" placeholder="name@email.com"/></label><label>{c.need}<select name="interesse">{c.options.map(option => <option key={option}>{option}</option>)}</select></label><label>{c.tell}<textarea required name="messaggio" rows={4} placeholder={c.message}/></label><button type="submit">{sent ? c.sent : c.send}</button></form>;
}
