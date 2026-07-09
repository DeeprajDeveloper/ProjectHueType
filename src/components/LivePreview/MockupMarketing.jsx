import { useState } from 'react';
import MockupNavbar from './MockupNavbar';
import MockupHero from './MockupHero';
import MockupFeatureCards from './MockupFeatureCards';
import MockupTestimonials from './MockupTestimonials';
import MockupContactForm from './MockupContactForm';
import MockupFooter from './MockupFooter';
import MockupAuthModal from './MockupAuthModal';
import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupMarketing.scss';

function MockupMarketing({
  previewMode = 'desktop',
  parts = {},
  logoText = 'Acme Co.',
  copy = MOCKUP_COPY.marketing,
  onFrameScrollLock,
}) {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const show = (id) => parts[id] !== false;

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
    onFrameScrollLock?.(true);
  };

  const closeAuth = () => {
    setAuthOpen(false);
    onFrameScrollLock?.(false);
  };

  return (
    <div className="mockup-marketing">
      {show('navbar') && (
        <MockupNavbar
          compactNav={previewMode === 'mobile'}
          onOpenAuth={openAuth}
          logoText={logoText}
          copy={copy.navbar}
        />
      )}
      {show('hero') && (
        <MockupHero copy={copy.hero} onOpenAuth={() => openAuth('signup')} />
      )}
      {show('featureCards') && <MockupFeatureCards copy={copy.featureCards} />}
      {show('testimonials') && <MockupTestimonials copy={copy.testimonials} />}
      {show('contactForm') && <MockupContactForm copy={copy.contact} />}
      {show('footer') && <MockupFooter logoText={logoText} />}

      {authOpen && (
        <MockupAuthModal
          mode={authMode}
          onClose={closeAuth}
          onSwitchMode={setAuthMode}
        />
      )}
    </div>
  );
}

export default MockupMarketing;
