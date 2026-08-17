import { Header } from "./SiteChrome";
import { localizedHref, resolveLanguage } from "./i18n";

const copy = {
  it: { role:"Danzatrice · Coreografa · Aerialista · Artista circense · Docente", title:<>Il corpo sa.<br/><em>Impariamo ad ascoltarlo.</em></>, lede:"Il movimento è un ponte tra arte, educazione e comunità: un dialogo tra corpo, percezione e ambiente che apre possibilità di espressione, forza e libertà.", paths:"Scopri i percorsi", about:"Conosci Alexandra", seal:<>Disciplina<br/>consapevolezza<br/>arte al servizio<br/>del corpo</>, index:"Movimento & benessere", image:"Danzatrice contemporanea in movimento in uno studio luminoso" },
  en: { role:"Dancer · Choreographer · Aerialist · Circus artist · Teacher", title:<>The body knows.<br/><em>Let’s learn to listen.</em></>, lede:"Movement is a bridge between art, education and community: a dialogue between body, perception and environment that opens paths to expression, strength and freedom.", paths:"Explore the programs", about:"Meet Alexandra", seal:<>Discipline<br/>awareness<br/>art in service<br/>of the body</>, index:"Movement & wellbeing", image:"Contemporary dancer moving in a luminous studio" },
};

export default async function Home({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const language = await resolveLanguage(searchParams);
  const c = copy[language];
  return (
    <main>
      <Header language={language}/>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{c.role}</p>
          <h1>{c.title}</h1>
          <p className="lede">{c.lede}</p>
          <div className="hero-actions"><a className="primary-action" href={localizedHref("/percorsi", language)}>{c.paths} <span>→</span></a><a className="text-action" href={localizedHref("/chi-sono", language)}>{c.about}</a></div>
        </div>
        <div className="hero-image" role="img" aria-label={c.image}><div className="seal"><span>✦</span>{c.seal}</div></div>
        <div className="hero-index"><span>01</span><i></i><span>{c.index}</span></div>
      </section>
    </main>
  );
}
