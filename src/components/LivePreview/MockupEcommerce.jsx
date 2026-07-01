import './MockupEcommerce.scss';
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
} from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';

const NAV_LINKS = ['New in', 'Furniture', 'Lighting', 'Decor', 'Sale'];

const CATEGORIES = ['All', 'Best sellers', 'Under $100', 'Workspace', 'Home'];

const PRODUCTS = [
  {
    name: 'Minimal Desk Lamp',
    price: '$89',
    compareAt: '$110',
    rating: 4.8,
    reviews: 124,
    tag: 'Bestseller',
  },
  {
    name: 'Ceramic Pour-Over Set',
    price: '$54',
    compareAt: null,
    rating: 4.6,
    reviews: 89,
    tag: null,
  },
  {
    name: 'Linen Throw Blanket',
    price: '$128',
    compareAt: '$149',
    rating: 4.9,
    reviews: 203,
    tag: 'New',
  },
  {
    name: 'Oak Monitor Stand',
    price: '$72',
    compareAt: null,
    rating: 4.7,
    reviews: 56,
    tag: null,
  },
];

function MockupEcommerce({ parts = {}, logoText = 'Acme Co.' }) {
  const show = (id) => parts[id] !== false;

  return (
    <div className="mockup-ecommerce">
      {show('topNav') && (
        <header className="mockup-ecommerce__header">
          <div className="mockup-ecommerce__header-top">
            <span className="mockup-ecommerce__logo">{logoText}</span>
            <nav className="mockup-ecommerce__nav" aria-label="Store navigation">
              {NAV_LINKS.map((link) => (
                <button key={link} type="button">{link}</button>
              ))}
            </nav>
            <div className="mockup-ecommerce__header-actions">
              <button type="button" className="mockup-ecommerce__icon-btn" aria-label="Search">
                <Icon icon={MagnifyingGlassIcon} size={ICON_SIZE} />
              </button>
              <button type="button" className="mockup-ecommerce__icon-btn" aria-label="Account">
                <Icon icon={UserIcon} size={ICON_SIZE} />
              </button>
              <button type="button" className="mockup-ecommerce__cart" aria-label="Cart">
                <Icon icon={ShoppingCartIcon} size={ICON_SIZE} />
                <span className="mockup-ecommerce__cart-text">Cart</span>
              </button>
            </div>
          </div>
          {show('categoryNav') && (
            <div className="mockup-ecommerce__categories">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat}
                  type="button"
                  className={`mockup-ecommerce__category ${i === 0 ? 'mockup-ecommerce__category--active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </header>
      )}

      {show('heroBanner') && (
        <section className="mockup-ecommerce__hero">
          <div className="mockup-ecommerce__hero-content">
            <span className="mockup-ecommerce__hero-tag">Spring collection</span>
            <h1 className="mockup-ecommerce__hero-title">Elevate your everyday spaces</h1>
            <p className="mockup-ecommerce__hero-desc">
              Curated furniture and home goods — free shipping on orders over $75.
            </p>
            <button type="button" className="mockup-ecommerce__hero-cta">Shop the collection</button>
          </div>
        </section>
      )}

      <main className="mockup-ecommerce__main">
        {show('sectionHeader') && (
          <header className="mockup-ecommerce__section-header">
            <div>
              <h2 className="mockup-ecommerce__title">Featured products</h2>
              <p className="mockup-ecommerce__subtitle">
                Curated picks for your workspace and home.
              </p>
            </div>
            <select className="mockup-ecommerce__sort" aria-label="Sort products">
              <option>Featured</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
              <option>Best rated</option>
            </select>
          </header>
        )}

        {show('productCards') && (
          <div className="mockup-ecommerce__grid">
            {PRODUCTS.map((product) => (
              <article key={product.name} className="mockup-ecommerce__card">
                <div className="mockup-ecommerce__image-wrap">
                  <div className="mockup-ecommerce__image" aria-hidden="true">
                    {product.tag && (
                      <span className="mockup-ecommerce__tag">{product.tag}</span>
                    )}
                  </div>
                  <button type="button" className="mockup-ecommerce__wishlist" aria-label="Add to wishlist">
                    <Icon icon={HeartIcon} size={ICON_SIZE} />
                  </button>
                </div>
                <div className="mockup-ecommerce__body">
                  <div className="mockup-ecommerce__rating" aria-label={`${product.rating} out of 5 stars`}>
                    {'★'.repeat(Math.floor(product.rating))}
                    <span className="mockup-ecommerce__rating-num">{product.rating}</span>
                    <span className="mockup-ecommerce__reviews">({product.reviews})</span>
                  </div>
                  <h3 className="mockup-ecommerce__name">{product.name}</h3>
                  <p className="mockup-ecommerce__price-row">
                    <span className="mockup-ecommerce__price">{product.price}</span>
                    {product.compareAt && (
                      <span className="mockup-ecommerce__compare">{product.compareAt}</span>
                    )}
                  </p>
                  <button type="button" className="mockup-ecommerce__cta">
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {show('footer') && (
        <footer className="mockup-ecommerce__footer">
          <div className="mockup-ecommerce__footer-grid">
            <div>
              <span className="mockup-ecommerce__footer-logo">{logoText}</span>
              <p className="mockup-ecommerce__footer-desc">Thoughtful design for modern living.</p>
            </div>
            <div>
              <h3>Shop</h3>
              <ul>
                <li><button type="button">New arrivals</button></li>
                <li><button type="button">Best sellers</button></li>
                <li><button type="button">Sale</button></li>
              </ul>
            </div>
            <div>
              <h3>Help</h3>
              <ul>
                <li><button type="button">Shipping</button></li>
                <li><button type="button">Returns</button></li>
                <li><button type="button">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3>Newsletter</h3>
              <div className="mockup-ecommerce__newsletter">
                <input type="email" placeholder="Your email" aria-label="Email for newsletter" />
                <button type="button">Subscribe</button>
              </div>
            </div>
          </div>
          <p className="mockup-ecommerce__copyright">© 2026 {logoText}. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
}

export default MockupEcommerce;
