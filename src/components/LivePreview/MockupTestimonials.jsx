import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupTestimonials.scss';

function MockupTestimonials({ copy = MOCKUP_COPY.marketing.testimonials }) {

  return (
    <section className="mockup-testimonials">
      <header className="mockup-testimonials__header">
        <h2 className="mockup-testimonials__title">{copy.header.title}</h2>
        <p className="mockup-testimonials__subtitle">
          {copy.header.subtitle}
        </p>
      </header>
      <div className="mockup-testimonials__grid">
        {copy.items.map((item) => (
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
