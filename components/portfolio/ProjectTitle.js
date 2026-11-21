import Link from "next/link";

// Tag usati solo internamente per posizionare i progetti (home, pagine): non si mostrano.
const INTERNAL = ["homepage", "luxury"];

export default function ProjectTitle({ item }) {
  return (
    <section className="project-title-section">
      <div className="breadcrumb">
        <Link href="/#portfolio">Portfolio</Link> / <Link href="/#servizi">{item.macroarea}</Link> /{" "}
        {item.title}
      </div>
      <h1 className="project-title">{item.title}</h1>
      <div className="tags project-tags-row">
        {item.macroarea && <span className="tag cat">{item.macroarea}</span>}
        {item.tags.filter((t) => !INTERNAL.includes(String(t).trim().toLowerCase())).map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
