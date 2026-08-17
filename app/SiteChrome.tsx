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

export function Header({ light = false, language = "it" }: { light?: boolean; language?: Language }) {
  const path = usePathname();
  const copy = common[language];
  const alternate = language === "it" ? "en" : "it";
  return <>
    <input className="menu-toggle-control" id="site-menu-toggle" type="checkbox" aria-label={copy.menuOpen}/>
    <header className={`site-header ${light ? "header-dark" : ""}`}>
      <a className="wordmark" href={localizedHref("/", language)} aria-label="Alexandra Huaman — home"><span>AH</span><strong>Alexandra Huaman</strong></a>
      <nav aria-label="Navigazione principale">{nav.map(([, href], i) => <a className={path === href ? "active" : ""} key={href} href={localizedHref(href, language)}>{copy.nav[i]}</a>)}</nav>
      <div className="header-actions"><div className="language-toggle" aria-label={copy.languageLabel}><span className={language === "it" ? "selected" : ""}>IT</span><a href={localizedHref(path, alternate)} aria-label={alternate === "en" ? "Switch to English" : "Passa all’italiano"}><i></i></a><span className={language === "en" ? "selected" : ""}>EN</span></div><a className="contact-link" href={localizedHref("/contatti", language)}>{copy.talk} <span>↗</span></a></div>
      <label className="menu-button" htmlFor="site-menu-toggle" aria-hidden="true"><i></i><i></i></label>
    </header>
    <div className="menu-overlay">
      <p>Alexandra Huaman</p>
      <nav>{[[copy.menuHome, "/"], ...nav.map(([, href], i) => [copy.nav[i], href]), [copy.menuContact, "/contatti"]].map(([label, href], i) => <a key={href} href={localizedHref(href, language)}><small>0{i + 1}</small>{label}<span>↗</span></a>)}</nav>
      <div className="menu-footer"><div className="language-toggle mobile-language" aria-label={copy.languageLabel}><span className={language === "it" ? "selected" : ""}>IT</span><a href={localizedHref(path, alternate)}><i></i></a><span className={language === "en" ? "selected" : ""}>EN</span></div><div className="menu-meta">{copy.tagline}</div></div>
    </div>
  </>;
}

export function Footer({ language = "it" }: { language?: Language }) {
  return <footer className="site-footer"><div><span className="footer-mark">AH</span><p>{common[language].quote}</p></div><div className="footer-links"><a href="tel:+393520879599">+39 352 087 9599</a><a href="mailto:alexandrabhuaman@gmail.com">alexandrabhuaman@gmail.com</a><a href="https://instagram.com/aledevuelo.art" target="_blank" rel="noreferrer">@aledevuelo.art</a></div><small>© {new Date().getFullYear()} Alexandra Huaman</small></footer>;
}

export function Page({ kicker, title, intro, children, language = "it" }: { kicker: string; title: ReactNode; intro?: string; children: ReactNode; language?: Language }) {
  return <main className="inner-page"><Header light language={language}/><section className="page-intro"><p className="eyebrow dark">{kicker}</p><h1>{title}</h1>{intro && <p className="page-lede">{intro}</p>}<span className="page-number">AH · {language === "it" ? "movimento" : "movement"}</span></section>{children}<Footer language={language}/></main>;
}

export function ContactForm({ language = "it" }: { language?: Language }) {
  const [sent, setSent] = useState(false);
  const c = language === "it" ? { name:"Come ti chiami?", namePlaceholder:"Il tuo nome", email:"La tua email", need:"Di cosa hai bisogno?", options:["Lezioni individuali","Percorso di gruppo","Workshop introduttivo","Collaborazione professionale"], tell:"Raccontami qualcosa", message:"Il tuo messaggio...", send:"Invia la richiesta →", sent:"Apri la tua email →", subject:"Richiesta dal sito" } : { name:"What’s your name?", namePlaceholder:"Your name", email:"Your email", need:"What are you looking for?", options:["One-to-one sessions","Group program","Introductory workshop","Professional collaboration"], tell:"Tell me a little more", message:"Your message...", send:"Send request →", sent:"Open your email →", subject:"Website enquiry" };
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`${c.subject} — ${data.get("nome")}`);
    const body = encodeURIComponent(language === "it" ? `Nome: ${data.get("nome")}\nEmail: ${data.get("email")}\nInteresse: ${data.get("interesse")}\n\n${data.get("messaggio")}` : `Name: ${data.get("nome")}\nEmail: ${data.get("email")}\nInterest: ${data.get("interesse")}\n\n${data.get("messaggio")}`);
    window.location.href = `mailto:alexandrabhuaman@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }
  return <form className="contact-form" action="mailto:alexandrabhuaman@gmail.com" method="get" onSubmit={submit}><label>{c.name}<input required name="nome" placeholder={c.namePlaceholder}/></label><label>{c.email}<input required name="email" type="email" placeholder="name@email.com"/></label><label>{c.need}<select name="interesse">{c.options.map(option => <option key={option}>{option}</option>)}</select></label><label>{c.tell}<textarea required name="messaggio" rows={4} placeholder={c.message}/></label><button type="submit">{sent ? c.sent : c.send}</button></form>;
}
