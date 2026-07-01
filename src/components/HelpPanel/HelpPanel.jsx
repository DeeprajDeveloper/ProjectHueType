import { SHORTCUT_SECTIONS } from '../../data/keyboardShortcuts';
import { formatShortcutLabel } from '../../utils/keyboard';
import './HelpPanel.scss';

function HelpPanel() {
  return (
    <div className="help-panel" data-tour="help-panel">
      <header className="help-panel__header">
        <h3 className="help-panel__title">Help</h3>
        <p className="help-panel__intro">
          Keyboard shortcuts work anywhere except when typing in a field.
          Press the same panel shortcut again to close it.
        </p>
      </header>

      {SHORTCUT_SECTIONS.map((section) => (
        <section key={section.id} className="help-panel__section" aria-labelledby={`help-${section.id}`}>
          <h4 id={`help-${section.id}`} className="help-panel__section-title">{section.title}</h4>
          <dl className="help-panel__shortcuts">
            {section.items.map((item) => (
              <div key={item.label} className="help-panel__shortcut-row">
                <dt>{item.label}</dt>
                <dd><kbd>{formatShortcutLabel(item.shortcut)}</kbd></dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <section className="help-panel__section" aria-labelledby="help-tips">
        <h4 id="help-tips" className="help-panel__section-title">Tips</h4>
        <ul className="help-panel__tips">
          <li>Lock colors or fonts in the customize panels, then shuffle to refresh only unlocked roles.</li>
          <li>Use the floating shuffle button on the live preview for quick preset switching.</li>
          <li>Build Info covers app version and features; Feature Catalog lists the component roadmap.</li>
        </ul>
      </section>
    </div>
  );
}

export default HelpPanel;
