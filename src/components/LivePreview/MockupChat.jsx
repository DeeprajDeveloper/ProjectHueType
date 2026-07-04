import './MockupChat.scss';
import { PlusIcon } from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE_SM } from '../Icon/iconConfig';
import { MOCKUP_COPY, DEFAULT_PREVIEW_LOGO } from '../../data/mockupCopy';

function MockupChat({ parts = {}, logoText = DEFAULT_PREVIEW_LOGO }) {
  const copy = MOCKUP_COPY.chat;
  const show = (id) => parts[id] !== false;
  const firstUserId = copy.messages.find((m) => m.role === 'user')?.id;
  const firstAssistantId = copy.messages.find((m) => m.role === 'assistant')?.id;

  return (
    <div className="mockup-chat">
      {show('chatSidebar') && (
        <aside className="mockup-chat__sidebar" aria-label="Conversations">
          <div className="mockup-chat__sidebar-header">
            <span className="mockup-chat__logo">{logoText}</span>
            <button type="button" className="mockup-chat__new">
              <Icon icon={PlusIcon} size={ICON_SIZE_SM} />
            </button>
          </div>
          <ul className="mockup-chat__conv-list">
            {copy.conversations.map((conv) => (
              <li key={conv.id}>
                <button
                  type="button"
                  className={`mockup-chat__conv ${conv.active ? 'mockup-chat__conv--active' : ''}`}
                >
                  <span className="mockup-chat__conv-title">{conv.title}</span>
                  <span className="mockup-chat__conv-preview">{conv.preview}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <section className="mockup-chat__main">
        {show('chatHeader') && (
          <header className="mockup-chat__header">
            <h1 className="mockup-chat__header-title" data-inspect="assistant-header">{copy.header.title}</h1>
            <span className="mockup-chat__model">{copy.header.model}</span>
          </header>
        )}

        {show('messageThread') && (
          <div className="mockup-chat__thread" aria-label="Messages">
            {copy.messages.map((msg) => (
              <article
                key={msg.id}
                className={`mockup-chat__message mockup-chat__message--${msg.role}`}
              >
                <div className="mockup-chat__avatar" aria-hidden="true">
                  {msg.role === 'user' ? copy.avatars.user : copy.avatars.assistant}
                </div>
                <div
                  className="mockup-chat__bubble"
                  data-inspect={
                    msg.id === firstUserId
                      ? 'user-bubble'
                      : msg.id === firstAssistantId
                        ? 'assistant-bubble'
                        : undefined
                  }
                >
                  <p>{msg.text}</p>
                  {msg.code && (
                    <pre className="mockup-chat__code"><code>{msg.code}</code></pre>
                  )}
                </div>
              </article>
            ))}
            <div className="mockup-chat__typing" aria-hidden="true">
              <span /><span /><span />
            </div>
          </div>
        )}

        {show('inputBar') && (
          <footer className="mockup-chat__input-bar">
            <input
              type="text"
              className="mockup-chat__input"
              placeholder={copy.input.placeholder}
              aria-label="Message input"
              data-inspect="message-input"
            />
            <button type="button" className="mockup-chat__send" data-inspect="send-button">{copy.input.send}</button>
          </footer>
        )}
      </section>
    </div>
  );
}

export default MockupChat;
