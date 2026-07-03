import {
  APP_NAME,
  APP_SITE_URL,
  APP_VERSION,
  CHANGELOG_PATH,
  CONTACT_EMAIL,
  GITHUB_REPO_URL,
  PRIVACY_POLICY_PATH,
} from './buildInfo';

export const SITE_DESCRIPTION =
  'Pick a color palette and font pairing that actually work together. Live preview on landing pages, dashboards, and more. Export to CSS or Tailwind.';

const ORGANIZATION_ID = `${APP_SITE_URL}/#organization`;
const WEBSITE_ID = `${APP_SITE_URL}/#website`;
const APP_ID = `${APP_SITE_URL}/#app`;

export function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: APP_NAME,
    url: APP_SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${APP_SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    email: CONTACT_EMAIL,
    sameAs: [GITHUB_REPO_URL],
  };
}

export function getWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: APP_SITE_URL,
    name: APP_NAME,
    description: SITE_DESCRIPTION,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-US',
  };
}

export function getWebApplicationSchema() {
  return {
    '@type': 'WebApplication',
    '@id': APP_ID,
    name: APP_NAME,
    url: APP_SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web browser',
    browserRequirements: 'Requires JavaScript',
    softwareVersion: APP_VERSION,
    image: `${APP_SITE_URL}/og-image.png`,
    screenshot: `${APP_SITE_URL}/og-image.png`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    featureList: [
      'Curated color and font preset library',
      'Live mockup preview across 12 layout archetypes',
      'WCAG contrast checking with fix suggestions',
      'Export to CSS, SCSS, Tailwind, and JSON tokens',
      'Shareable combo URLs and saved favorites',
    ],
  };
}

export function getWebPageSchema({ path, name, description }) {
  return {
    '@type': 'WebPage',
    '@id': `${APP_SITE_URL}${path}#webpage`,
    url: `${APP_SITE_URL}${path}`,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': APP_ID },
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-US',
  };
}

export function getHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(),
      getWebSiteSchema(),
      getWebApplicationSchema(),
    ],
  };
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function getStructuredDataForPath(pathname) {
  const path = normalizePath(pathname);

  if (path === PRIVACY_POLICY_PATH) {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        getOrganizationSchema(),
        getWebSiteSchema(),
        getWebApplicationSchema(),
        getWebPageSchema({
          path: PRIVACY_POLICY_PATH,
          name: 'Privacy Policy — HueType',
          description:
            'HueType privacy policy: what data we collect, how it is used, and your choices.',
        }),
      ],
    };
  }

  if (path === CHANGELOG_PATH) {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        getOrganizationSchema(),
        getWebSiteSchema(),
        getWebApplicationSchema(),
        getWebPageSchema({
          path: CHANGELOG_PATH,
          name: 'Changelog & Release Notes — HueType',
          description:
            'HueType release history, version notes, and what shipped in each build.',
        }),
      ],
    };
  }

  return getHomePageSchema();
}

export const STRUCTURED_DATA_SCRIPT_ID = 'huetype-structured-data';

export function applyStructuredData(pathname = window.location.pathname) {
  const data = getStructuredDataForPath(pathname);
  let script = document.getElementById(STRUCTURED_DATA_SCRIPT_ID);

  if (!script) {
    script = document.createElement('script');
    script.id = STRUCTURED_DATA_SCRIPT_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}
