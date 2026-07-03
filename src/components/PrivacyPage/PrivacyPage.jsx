import { useLayoutEffect } from 'react';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import privacyPolicy from '../../content/privacy-policy.md?raw';
import { APP_SITE_URL } from '../../data/buildInfo';
import { renderSimpleMarkdown } from '../../utils/simpleMarkdown';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './PrivacyPage.scss';

function PrivacyPage() {
  useLayoutEffect(() => {
    const root = document.getElementById('root');
    const html = document.documentElement;
    const body = document.body;
    const targets = [html, body, root].filter(Boolean);

    const previousStyles = targets.map((node) => ({
      node,
      overflow: node.style.overflow,
      height: node.style.height,
      maxHeight: node.style.maxHeight,
      position: node.style.position,
      width: node.style.width,
      top: node.style.top,
    }));

    targets.forEach((node) => node.classList.add('route-privacy'));

    // Clear scroll-lock inline styles left by AppShell mobile panels / modals.
    html.style.overflow = '';
    html.style.height = '';
    html.style.maxHeight = '';
    body.style.overflow = '';
    body.style.height = '';
    body.style.maxHeight = '';
    body.style.position = '';
    body.style.width = '';
    body.style.top = '';
    if (root) {
      root.style.overflow = '';
      root.style.height = '';
      root.style.maxHeight = '';
    }

    return () => {
      targets.forEach((node) => node.classList.remove('route-privacy'));
      previousStyles.forEach(({ node, overflow, height, maxHeight, position, width, top }) => {
        node.style.overflow = overflow;
        node.style.height = height;
        node.style.maxHeight = maxHeight;
        if (node === body) {
          node.style.position = position;
          node.style.width = width;
          node.style.top = top;
        }
      });
    };
  }, []);

  return (
    <div className="privacy-page">
      <header className="privacy-page__header">
        <a href="/" className="privacy-page__back">
          <Icon icon={ArrowLeftIcon} size={ICON_SIZE_SM} />
          Back to HueType
        </a>
        <a href={APP_SITE_URL} className="privacy-page__brand">
          huetype.dev
        </a>
      </header>

      <main className="privacy-page__main">
        <article className="privacy-page__article simple-markdown">
          {renderSimpleMarkdown(privacyPolicy)}
        </article>
      </main>
    </div>
  );
}

export default PrivacyPage;
