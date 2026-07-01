import './MockupEcommerce.scss';
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
} from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import { MOCKUP_COPY, DEFAULT_PREVIEW_LOGO, formatMockupCopy } from '../../data/mockupCopy';

function MockupEcommerce({ parts = {}, logoText = DEFAULT_PREVIEW_LOGO }) {
  const copy = MOCKUP_COPY.ecommerce;
  const show = (id) => parts[id] !== false;

  return (
    <div className="mockup-ecommerce">
      {show('topNav') && (
        <header className="mockup-ecommerce__header">
          <div className="mockup-ecommerce__header-top">
            <span className="mockup-ecommerce__logo">{logoText}</span>
            <nav className="mockup-ecommerce__nav" aria-label="Store navigation">
              {copy.nav.links.map((link) => (
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
                <span className="mockup-ecommerce__cart-text">{copy.nav.cart}</span>
              </button>
            </div>
          </div>
          {show('categoryNav') && (
            <div className="mockup-ecommerce__categories">
              {copy.categories.map((cat, i) => (
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
            <span className="mockup-ecommerce__hero-tag">{copy.hero.tag}</span>
            <h1 className="mockup-ecommerce__hero-title">{copy.hero.title}</h1>
            <p className="mockup-ecommerce__hero-desc">
              {copy.hero.description}
            </p>
            <button type="button" className="mockup-ecommerce__hero-cta">{copy.hero.cta}</button>
          </div>
        </section>
      )}

      <main className="mockup-ecommerce__main">
        {show('sectionHeader') && (
          <header className="mockup-ecommerce__section-header">
            <div>
              <h2 className="mockup-ecommerce__title">{copy.section.title}</h2>
              <p className="mockup-ecommerce__subtitle">
                {copy.section.subtitle}
              </p>
            </div>
            <select className="mockup-ecommerce__sort" aria-label="Sort products">
              {copy.sort.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </header>
        )}

        {show('productCards') && (
          <div className="mockup-ecommerce__grid">
            {copy.products.map((product) => (
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
                    {copy.productCta}
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
              <p className="mockup-ecommerce__footer-desc">{copy.footer.tagline}</p>
            </div>
            <div>
              <h3>{copy.footer.shop.title}</h3>
              <ul>
                {copy.footer.shop.links.map((link) => (
                  <li key={link}><button type="button">{link}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{copy.footer.help.title}</h3>
              <ul>
                {copy.footer.help.links.map((link) => (
                  <li key={link}><button type="button">{link}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{copy.footer.newsletter.title}</h3>
              <div className="mockup-ecommerce__newsletter">
                <input type="email" placeholder={copy.footer.newsletter.placeholder} aria-label="Email for newsletter" />
                <button type="button">{copy.footer.newsletter.subscribe}</button>
              </div>
            </div>
          </div>
          <p className="mockup-ecommerce__copyright">
            {formatMockupCopy(copy.footer.copyright, { brand: logoText })}
          </p>
        </footer>
      )}
    </div>
  );
}

export default MockupEcommerce;
