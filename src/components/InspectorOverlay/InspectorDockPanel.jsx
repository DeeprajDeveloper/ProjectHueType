import { useEffect } from 'react';
import Accordion from '../Accordion/Accordion';
import AccordionStack, { useAccordionStack } from '../Accordion/AccordionStack';
import InspectorPopupContent from './InspectorPopupContent';
import './InspectorDockPanel.scss';

function DockExpandedSync({ expandedId }) {
  const stack = useAccordionStack();

  useEffect(() => {
    if (!expandedId || !stack) return;
    stack.setOpen(expandedId, true);
  }, [expandedId, stack]);

  useEffect(() => {
    if (!expandedId) return;
    const trigger = document.querySelector(`[data-inspect-dock-id="${expandedId}"]`);
    trigger?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [expandedId]);

  return null;
}

function InspectorDockPanel({
  items = [],
  paletteColors,
  highlightedId,
  expandedId,
  registerTriggerRef,
  onCopied,
  onApplyFix,
  onScroll,
}) {
  return (
    <aside className="inspector-dock" aria-label="Docked element inspector">
      <header className="inspector-dock__header">
        <h2 className="inspector-dock__title">Element inspector</h2>
        <p className="inspector-dock__subtitle">
          {items.length} element{items.length === 1 ? '' : 's'} — click a dot or expand an accordion
        </p>
      </header>

      <div className="inspector-dock__scroll" onScroll={onScroll}>
        <AccordionStack className="inspector-dock__stack">
          <DockExpandedSync expandedId={expandedId} />
          {items.map(({ entry, element }) => (
            <Accordion
              key={entry.inspectId}
              title={entry.name}
              stackId={entry.inspectId}
              defaultOpen={false}
              variant="chrome"
              className={[
                'inspector-dock__item',
                highlightedId === entry.inspectId ? 'inspector-dock__item--highlighted' : '',
              ].filter(Boolean).join(' ')}
              dataInspectDockId={entry.inspectId}
              triggerRef={(node) => registerTriggerRef?.(entry.inspectId, node)}
            >
              <InspectorPopupContent
                entry={entry}
                element={element}
                paletteColors={paletteColors}
                isCompactPopup
                onCopied={() => onCopied?.(entry.inspectId)}
                onApplyFix={onApplyFix}
              />
            </Accordion>
          ))}
        </AccordionStack>
      </div>
    </aside>
  );
}

export default InspectorDockPanel;
