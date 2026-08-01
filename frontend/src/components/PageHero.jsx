export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="bg-primary/5 border-b border-black/5">
      <div className="container-x py-16 md:py-20 text-center">
        {eyebrow && <span className="section-label">{eyebrow}</span>}
        <h1 className="text-3xl md:text-5xl font-display font-semibold text-ink max-w-2xl mx-auto">
          {title}
        </h1>
        {subtitle && (
          <p className="text-ink/60 max-w-xl mx-auto mt-4">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
