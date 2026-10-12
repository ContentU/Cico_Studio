// Foto o micro video in loop (muto) che riempie il contenitore (hero, ritratto,
// accordion, card). Il contenitore deve avere dimensioni/aspect-ratio dal CSS.
export default function Media({ media, className }) {
  if (!media) return <div className={className}></div>;
  const style = media.pos ? { objectPosition: media.pos } : undefined;
  return (
    <div className={`${className} media-fill`}>
      {media.kind === "video" ? (
        <video
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          style={style}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.src} alt={media.alt || ""} loading="lazy" style={style} />
      )}
    </div>
  );
}
