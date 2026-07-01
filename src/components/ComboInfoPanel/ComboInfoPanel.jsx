import ContrastBadge from '../ContrastBadge/ContrastBadge';
import { suggestFix } from '../../utils/contrast';
import './ComboInfoPanel.scss';

function ComboInfoPanel({ combo, contrastPairs, contrastStatus }) {
  return (
    <div className="combo-info-panel">
      <div className="combo-info-panel__header">
        <h3 className="combo-info-panel__name">{combo.name}</h3>
        <ContrastBadge status={contrastStatus} compact />
      </div>

      <p className="combo-info-panel__meta">
        Inspired by {combo.inspiredBy} · {combo.mood.join(', ')}
      </p>

      <div className="combo-info-panel__contrast" aria-live="polite" aria-label="Contrast check results">
        {contrastPairs.map((pair) => (
          <div key={pair.id} className="combo-info-panel__contrast-item">
            <ContrastBadge
              status={pair.status === 'pass' ? (pair.level === 'AAA' ? 'aaa' : 'aa') : pair.status === 'warn' ? 'warn' : 'fail'}
              ratio={pair.ratio}
              label={pair.label}
            />
            {pair.status === 'fail' && (
              <span className="combo-info-panel__fix">
                Suggest: {suggestFix(pair.fg, pair.bg)}
              </span>
            )}
          </div>
        ))}
      </div>

      {combo.whyItWorks && (
        <p className="combo-info-panel__why">{combo.whyItWorks}</p>
      )}
    </div>
  );
}

export default ComboInfoPanel;
