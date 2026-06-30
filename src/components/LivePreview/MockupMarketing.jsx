import { useState } from 'react';
import MockupNavbar from './MockupNavbar';
import MockupHero from './MockupHero';
import MockupFeatureCards from './MockupFeatureCards';
import MockupTestimonials from './MockupTestimonials';
import MockupContactForm from './MockupContactForm';
import MockupFooter from './MockupFooter';
import MockupAuthModal from './MockupAuthModal';
import './MockupMarketing.scss';

function MockupMarketing({ previewMode = 'desktop', parts = {}, onFrameScrollLock }) {
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
        <MockupNavbar compactNav={previewMode === 'mobile'} onOpenAuth={openAuth} />
      )}
      {show('hero') && (
        <MockupHero onOpenAuth={() => openAuth('signup')} />
      )}
      {show('featureCards') && <MockupFeatureCards />}
      {show('testimonials') && <MockupTestimonials />}
      {show('contactForm') && <MockupContactForm />}
      {show('footer') && <MockupFooter />}

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
