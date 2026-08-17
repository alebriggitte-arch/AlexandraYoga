"use client";

import Link from "next/link";
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
  const [open, setOpen] = useState(false);
  const copy = common[language];
  const alternate = language === "it" ? "en" : "it";
  return <>
    <header className={`site-header ${light ? "header-dark" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Alexandra Huaman — home"><span>AH</span><strong>Alexandra Huaman</strong></Link>
      <nav aria-label="Navigazione principale">{nav.map(([, href], i) => <Link className={path === href ? "active" : ""} key={href} href={localizedHref(href, language)}>{copy.nav[i]}</Link>)}</nav>
      <div className="header-actions"><div className="language-toggle" aria-label={copy.languageLabel}><span className={language === "it" ? "selected" : ""}>IT</span><Link href={localizedHref(path, alternate)} aria-label={alternate === "en" ? "Switch to English" : "Passa all’italiano"}><i></i></Link><span className={language === "en" ? "selected" : ""}>EN</span></div><Link className="contact-link" href={localizedHref("/contatti", language)}>{copy.talk} <span>↗</span></Link></div>
      <button className="menu-button" aria-label={copy.menuOpen} aria-expanded={open} onClick={() => setOpen(true)}><i></i><i></i></button>
    </header>
    <div className={`menu-overlay ${open ? "open" : ""}`} aria-hidden={!open}>
      <button className="menu-close" aria-label={copy.menuClose} onClick={() => setOpen(false)}>×</button>
      <p>Alexandra Huaman</p>
      <nav>{[[copy.menuHome, "/"], ...nav.map(([, href], i) => [copy.nav[i], href]), [copy.menuContact, "/contatti"]].map(([label, href], i) => <Link key={href} href={localizedHref(href, language)} onClick={() => setOpen(false)}><small>0{i + 1}</small>{label}<span>↗</span></Link>)}</nav>
      <div className="menu-footer"><div className="language-toggle mobile-language" aria-label={copy.languageLabel}><span className={language === "it" ? "selected" : ""}>IT</span><Link href={localizedHref(path, alternate)} onClick={() => setOpen(false)}><i></i></Link><span className={language === "en" ? "selected" : ""}>EN</span></div><div className="menu-meta">{copy.tagline}</div></div>
    </div>
  </>;
}

export function Footer({ language = "it" }: { language?: Language }) {
  return <footer className="site-footer"><div><span className="footer-mark">AH</span><p>{common[language].quote}</p></div><div className="footer-links"><a href="tel:+393276874976">+39 327 687 4976</a><a href="mailto:alexandra.huaman.movimento@gmail.com">alexandra.huaman.movimento@gmail.com</a><a href="https://instagram.com/alexandra.movimento" target="_blank" rel="noreferrer">@alexandra.movimento</a></div><small>© {new Date().getFullYear()} Alexandra Huaman</small></footer>;
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
    const body = encodeURIComponent(`Nome: ${data.get("nome")}\nEmail: ${data.get("email")}\nInteresse: ${data.get("interesse")}\n\n${data.get("messaggio")}`);
    window.location.href = `mailto:alexandra.huaman.movimento@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }
  return <form className="contact-form" onSubmit={submit}><label>{c.name}<input required name="nome" placeholder={c.namePlaceholder}/></label><label>{c.email}<input required name="email" type="email" placeholder="name@email.com"/></label><label>{c.need}<select name="interesse">{c.options.map(option => <option key={option}>{option}</option>)}</select></label><label>{c.tell}<textarea required name="messaggio" rows={4} placeholder={c.message}/></label><button type="submit">{sent ? c.sent : c.send}</button></form>;
}
