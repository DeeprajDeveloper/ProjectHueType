import { useLayoutEffect } from 'react';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import privacyPolicy from '../../content/privacy-policy.md?raw';
import { APP_SITE_URL } from '../../data/buildInfo';
import { useStandaloneRoute } from '../../hooks/useStandaloneRoute';
import { renderSimpleMarkdown } from '../../utils/simpleMarkdown';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import './PrivacyPage.scss';

function PrivacyPage() {
  useStandaloneRoute();

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
