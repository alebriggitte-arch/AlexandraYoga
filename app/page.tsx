import Link from "next/link";
import { Header } from "./SiteChrome";

export default function Home() {
  return (
    <main>
      <Header/>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Artista performativa · Docente di danza · Artista circense</p>
          <h1>Il corpo sa.<br/><em>Impariamo ad ascoltarlo.</em></h1>
          <p className="lede">Il movimento non è solo esecuzione tecnica, ma un dialogo tra corpo, percezione e ambiente. Un percorso verso maggiore mobilità, forza e libertà.</p>
          <div className="hero-actions"><Link className="primary-action" href="/percorsi">Scopri i percorsi <span>→</span></Link><Link className="text-action" href="/chi-sono">Conosci Alexandra</Link></div>
        </div>
        <div className="hero-image" role="img" aria-label="Danzatrice contemporanea in movimento in uno studio luminoso"><div className="seal"><span>✦</span> Disciplina<br/>consapevolezza<br/>arte al servizio<br/>del corpo</div></div>
        <div className="hero-index"><span>01</span><i></i><span>Movimento & benessere</span></div>
      </section>
    </main>
  );
}
