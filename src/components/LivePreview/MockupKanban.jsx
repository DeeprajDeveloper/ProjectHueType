import { Fragment, useCallback, useId, useRef, useState } from 'react';
import { DotsSixVerticalIcon, TrashIcon } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupKanban.scss';

const COLUMN_COLOR_CLASS = {
  secondary: 'mockup-kanban__column--secondary',
  primary: 'mockup-kanban__column--primary',
  accent: 'mockup-kanban__column--accent',
};

function cloneColumns(copyColumns) {
  return copyColumns.map((column) => ({
    ...column,
    cards: column.cards.map((card) => ({ ...card })),
  }));
}

function moveCard(columns, cardId, fromColumnId, toColumnId, toIndex) {
  const next = columns.map((column) => ({ ...column, cards: [...column.cards] }));
  const fromColumn = next.find((column) => column.id === fromColumnId);
  const toColumn = next.find((column) => column.id === toColumnId);
  if (!fromColumn || !toColumn) return columns;

  const fromIndex = fromColumn.cards.findIndex((card) => card.id === cardId);
  if (fromIndex === -1) return columns;

  const [card] = fromColumn.cards.splice(fromIndex, 1);

  let insertIndex = toIndex;
  if (fromColumnId === toColumnId && fromIndex < toIndex) {
    insertIndex -= 1;
  }
  insertIndex = Math.max(0, Math.min(insertIndex, toColumn.cards.length));
  toColumn.cards.splice(insertIndex, 0, card);

  return next;
}

function MockupKanban({ parts = {} }) {
  const copy = MOCKUP_COPY.kanban;
  const show = (id) => parts[id] !== false;
  const composeInputId = useId();
  const nextCardId = useRef(100);

  const [columns, setColumns] = useState(() => cloneColumns(copy.columns));
  const [dragging, setDragging] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const [composingColumnId, setComposingColumnId] = useState(null);
  const [draftTitle, setDraftTitle] = useState('');

  const clearDragState = useCallback(() => {
    setDragging(null);
    setDropTarget(null);
  }, []);

  const handleDragStart = (event, columnId, cardId) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(cardId));
    setDragging({ cardId, columnId });
  };

  const handleDragEnd = () => {
    clearDragState();
  };

  const handleCardDragOver = (event, columnId, cardIndex) => {
    if (!dragging) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    const rect = event.currentTarget.getBoundingClientRect();
    const insertBefore = event.clientY < rect.top + rect.height / 2;
    setDropTarget({
      columnId,
      index: insertBefore ? cardIndex : cardIndex + 1,
    });
  };

  const handleColumnDragOver = (event, columnId, cardCount) => {
    if (!dragging) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDropTarget({ columnId, index: cardCount });
  };

  const handleDrop = (event, columnId) => {
    event.preventDefault();
    if (!dragging || !dropTarget || dropTarget.columnId !== columnId) {
      clearDragState();
      return;
    }

    setColumns((prev) => moveCard(
      prev,
      dragging.cardId,
      dragging.columnId,
      columnId,
      dropTarget.index,
    ));
    clearDragState();
  };

  const openComposer = (columnId) => {
    setComposingColumnId(columnId);
    setDraftTitle('');
  };

  const closeComposer = () => {
    setComposingColumnId(null);
    setDraftTitle('');
  };

  const handleAddCard = (event, columnId) => {
    event.preventDefault();
    const title = draftTitle.trim();
    if (!title) return;

    const newCard = {
      id: nextCardId.current,
      title,
      tag: 'New',
      assignee: copy.header.members[0] || 'AR',
    };
    nextCardId.current += 1;

    setColumns((prev) => prev.map((column) => (
      column.id === columnId
        ? { ...column, cards: [...column.cards, newCard] }
        : column
    )));
    closeComposer();
  };

  const handleDeleteCard = (event, columnId, cardId) => {
    event.stopPropagation();
    event.preventDefault();
    setColumns((prev) => prev.map((column) => (
      column.id === columnId
        ? { ...column, cards: column.cards.filter((card) => card.id !== cardId) }
        : column
    )));
    if (dragging?.cardId === cardId) {
      clearDragState();
    }
  };

  const renderDropLine = (columnId, index) => (
    dropTarget?.columnId === columnId && dropTarget.index === index ? (
      <li key={`drop-${columnId}-${index}`} className="mockup-kanban__drop-slot" aria-hidden="true">
        <span className="mockup-kanban__drop-line" />
      </li>
    ) : null
  );

  return (
    <div className="mockup-kanban">
      {show('boardHeader') && (
        <header className="mockup-kanban__header">
          <div>
            <h1 className="mockup-kanban__title">{copy.header.title}</h1>
            <p className="mockup-kanban__subtitle">{copy.header.subtitle}</p>
          </div>
          <div className="mockup-kanban__members" aria-label="Board members">
            {copy.header.members.map((initials) => (
              <span key={initials} className="mockup-kanban__member">{initials}</span>
            ))}
          </div>
        </header>
      )}

      {show('columns') && (
        <div className="mockup-kanban__board">
          {columns.map((column, columnIndex) => {
            const isDragOverColumn = dropTarget?.columnId === column.id;
            const isComposing = composingColumnId === column.id;

            return (
              <section
                key={column.id}
                className={[
                  'mockup-kanban__column',
                  COLUMN_COLOR_CLASS[column.colorRole] || '',
                  isDragOverColumn ? 'mockup-kanban__column--drag-over' : '',
                ].filter(Boolean).join(' ')}
                aria-label={column.title}
                onDragOver={(event) => handleColumnDragOver(event, column.id, column.cards.length)}
                onDrop={(event) => handleDrop(event, column.id)}
              >
                <header className="mockup-kanban__column-header">
                  <h2 className="mockup-kanban__column-title" data-inspect={columnIndex === 0 ? 'kanban-column-title' : undefined}>{column.title}</h2>
                  <span className="mockup-kanban__column-count">{column.cards.length}</span>
                </header>

                <ul className="mockup-kanban__cards">
                  {column.cards.map((card, cardIndex) => (
                    <Fragment key={card.id}>
                      {renderDropLine(column.id, cardIndex)}
                      <li>
                        <article
                          className={[
                            'mockup-kanban__card',
                            card.active ? 'mockup-kanban__card--active' : '',
                            dragging?.cardId === card.id ? 'mockup-kanban__card--dragging' : '',
                          ].filter(Boolean).join(' ')}
                          draggable
                          onDragStart={(event) => handleDragStart(event, column.id, card.id)}
                          onDragEnd={handleDragEnd}
                          onDragOver={(event) => handleCardDragOver(event, column.id, cardIndex)}
                          onDrop={(event) => handleDrop(event, column.id)}
                          aria-grabbed={dragging?.cardId === card.id}
                        >
                          <span className="mockup-kanban__card-drag" aria-hidden="true">
                            <Icon icon={DotsSixVerticalIcon} size={ICON_SIZE} />
                          </span>
                          <div className="mockup-kanban__card-body">
                            <span className="mockup-kanban__card-tag">{card.tag}</span>
                            <h3 className="mockup-kanban__card-title" data-inspect={columnIndex === 0 && cardIndex === 0 ? 'kanban-card-title' : undefined}>{card.title}</h3>
                            {show('cardDetails') && (
                              <footer className="mockup-kanban__card-footer">
                                <span className="mockup-kanban__card-assignee">{card.assignee}</span>
                                <span className="mockup-kanban__card-meta">
                                  {copy.cardMeta.comments} · {copy.cardMeta.attachments}
                                </span>
                              </footer>
                            )}
                          </div>
                          <button
                            type="button"
                            className="mockup-kanban__card-delete"
                            aria-label={copy.deleteCard}
                            onMouseDown={(event) => event.stopPropagation()}
                            onClick={(event) => handleDeleteCard(event, column.id, card.id)}
                          >
                            <Icon icon={TrashIcon} size={ICON_SIZE} />
                          </button>
                        </article>
                      </li>
                    </Fragment>
                  ))}
                  {renderDropLine(column.id, column.cards.length)}
                </ul>

                {show('addCard') && (
                  isComposing ? (
                    <form
                      className="mockup-kanban__compose"
                      onSubmit={(event) => handleAddCard(event, column.id)}
                    >
                      <label className="mockup-kanban__compose-label" htmlFor={`${composeInputId}-${column.id}`}>
                        New card title
                      </label>
                      <input
                        id={`${composeInputId}-${column.id}`}
                        type="text"
                        className="mockup-kanban__compose-input"
                        value={draftTitle}
                        onChange={(event) => setDraftTitle(event.target.value)}
                        placeholder={copy.addCardForm.placeholder}
                        maxLength={80}
                        autoFocus
                      />
                      <div className="mockup-kanban__compose-actions">
                        <button type="submit" className="mockup-kanban__compose-save">
                          {copy.addCardForm.save}
                        </button>
                        <button
                          type="button"
                          className="mockup-kanban__compose-cancel"
                          onClick={closeComposer}
                        >
                          {copy.addCardForm.cancel}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      type="button"
                      className="mockup-kanban__add"
                      data-inspect={columnIndex === 0 ? 'kanban-add-button' : undefined}
                      onClick={() => openComposer(column.id)}
                    >
                      + {copy.addCard}
                    </button>
                  )
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MockupKanban;
