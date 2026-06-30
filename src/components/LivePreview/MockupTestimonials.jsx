import './MockupTestimonials.scss';

const TESTIMONIALS = [
  {
    quote: 'We stopped guessing how fonts would look on real pages. HueType cut our design review time in half.',
    name: 'Sarah Chen',
    role: 'Head of Design, Northwind',
  },
  {
    quote: 'The live preview finally shows contrast issues our old swatch grid never caught.',
    name: 'Marcus Webb',
    role: 'Product Designer, Lattice',
  },
  {
    quote: 'Our marketing site and app shell both look great with the same combo — we knew before we shipped.',
    name: 'Elena Ruiz',
    role: 'Brand Lead, Harbor Studio',
  },
];

function MockupTestimonials() {
  return (
    <section className="mockup-testimonials">
      <header className="mockup-testimonials__header">
        <h2 className="mockup-testimonials__title">Trusted by design teams</h2>
        <p className="mockup-testimonials__subtitle">
          See how others evaluate palettes and typography before they go live.
        </p>
      </header>
      <div className="mockup-testimonials__grid">
        {TESTIMONIALS.map((item) => (
          <blockquote key={item.name} className="mockup-testimonials__card">
            <p className="mockup-testimonials__quote">&ldquo;{item.quote}&rdquo;</p>
            <footer className="mockup-testimonials__author">
              <span className="mockup-testimonials__avatar" aria-hidden="true" />
              <div>
                <cite className="mockup-testimonials__name">{item.name}</cite>
                <span className="mockup-testimonials__role">{item.role}</span>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export default MockupTestimonials;
