import './MockupEcommerce.scss';

const PRODUCTS = [
  { name: 'Minimal Desk Lamp', price: '$89', tag: 'Bestseller' },
  { name: 'Ceramic Pour-Over Set', price: '$54', tag: null },
  { name: 'Linen Throw Blanket', price: '$128', tag: 'New' },
];

function MockupEcommerce({ parts = {} }) {
  const show = (id) => parts[id] !== false;

  return (
    <section className="mockup-ecommerce">
      {show('sectionHeader') && (
        <header className="mockup-ecommerce__header">
          <h1 className="mockup-ecommerce__title">Featured products</h1>
          <p className="mockup-ecommerce__subtitle">
            Curated picks for your workspace and home.
          </p>
        </header>
      )}

      {show('productCards') && (
        <div className="mockup-ecommerce__grid">
          {PRODUCTS.map((product) => (
            <article key={product.name} className="mockup-ecommerce__card">
              <div className="mockup-ecommerce__image" aria-hidden="true">
                {product.tag && (
                  <span className="mockup-ecommerce__tag">{product.tag}</span>
                )}
              </div>
              <div className="mockup-ecommerce__body">
                <h2 className="mockup-ecommerce__name">{product.name}</h2>
                <p className="mockup-ecommerce__price">{product.price}</p>
                <button type="button" className="mockup-ecommerce__cta">
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MockupEcommerce;
