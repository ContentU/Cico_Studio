import Link from "next/link";

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
        {item.tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
