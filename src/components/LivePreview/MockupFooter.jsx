import './MockupFooter.scss';

function MockupFooter() {
  return (
    <footer className="mockup-footer">
      <span className="mockup-footer__brand">Brand</span>
      <div className="mockup-footer__links">
        <a href="#preview">Privacy</a>
        <a href="#preview">Terms</a>
        <a href="#preview">Contact</a>
      </div>
      <span className="mockup-footer__copy">© 2026 Brand Inc.</span>
    </footer>
  );
}

export default MockupFooter;
