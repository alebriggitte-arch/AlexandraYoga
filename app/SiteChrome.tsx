"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, ReactNode, useState } from "react";

const nav = [
  ["Chi sono", "/chi-sono"],
  ["Percorsi", "/percorsi"],
  ["Competenze", "/competenze"],
  ["Collaborazioni", "/collaborazioni"],
];

export function Header({ light = false }: { light?: boolean }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return <>
    <header className={`site-header ${light ? "header-dark" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Alexandra Huaman — home"><span>AH</span><strong>Alexandra Huaman</strong></Link>
      <nav aria-label="Navigazione principale">{nav.map(([label, href]) => <Link className={path === href ? "active" : ""} key={href} href={href}>{label}</Link>)}</nav>
      <Link className="contact-link" href="/contatti">Parliamone <span>↗</span></Link>
      <button className="menu-button" aria-label="Apri il menu" aria-expanded={open} onClick={() => setOpen(true)}><i></i><i></i></button>
    </header>
    <div className={`menu-overlay ${open ? "open" : ""}`} aria-hidden={!open}>
      <button className="menu-close" aria-label="Chiudi il menu" onClick={() => setOpen(false)}>×</button>
      <p>Alexandra Huaman</p>
      <nav>{[["Home", "/"], ...nav, ["Contatti", "/contatti"]].map(([label, href], i) => <Link key={href} href={href} onClick={() => setOpen(false)}><small>0{i + 1}</small>{label}<span>↗</span></Link>)}</nav>
      <div className="menu-meta">Movimento · Consapevolezza · Benessere</div>
    </div>
  </>;
}

export function Footer() {
  return <footer className="site-footer"><div><span className="footer-mark">AH</span><p>“Il movimento è libertà, è ascolto, è trasformazione.”</p></div><div className="footer-links"><a href="tel:+393276874976">+39 327 687 4976</a><a href="mailto:alexandra.huaman.movimento@gmail.com">alexandra.huaman.movimento@gmail.com</a><a href="https://instagram.com/alexandra.movimento" target="_blank" rel="noreferrer">@alexandra.movimento</a></div><small>© {new Date().getFullYear()} Alexandra Huaman</small></footer>;
}

export function Page({ kicker, title, intro, children }: { kicker: string; title: ReactNode; intro?: string; children: ReactNode }) {
  return <main className="inner-page"><Header light/><section className="page-intro"><p className="eyebrow dark">{kicker}</p><h1>{title}</h1>{intro && <p className="page-lede">{intro}</p>}<span className="page-number">AH · movimento</span></section>{children}<Footer/></main>;
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Richiesta dal sito — ${data.get("nome")}`);
    const body = encodeURIComponent(`Nome: ${data.get("nome")}\nEmail: ${data.get("email")}\nInteresse: ${data.get("interesse")}\n\n${data.get("messaggio")}`);
    window.location.href = `mailto:alexandra.huaman.movimento@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }
  return <form className="contact-form" onSubmit={submit}><label>Come ti chiami?<input required name="nome" placeholder="Il tuo nome"/></label><label>La tua email<input required name="email" type="email" placeholder="nome@email.it"/></label><label>Di cosa hai bisogno?<select name="interesse"><option>Lezioni individuali</option><option>Percorso di gruppo</option><option>Workshop introduttivo</option><option>Collaborazione professionale</option></select></label><label>Raccontami qualcosa<textarea required name="messaggio" rows={4} placeholder="Il tuo messaggio..."/></label><button type="submit">{sent ? "Apri la tua email →" : "Invia la richiesta →"}</button></form>;
}
