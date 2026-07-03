import { APP_VERSION } from '../data/buildInfo';

export const FEEDBACK_EMAIL = 'hello@huetype.dev';
export const FEEDBACK_STORAGE_KEY = 'huetype-feedback-submissions';
export const FEEDBACK_MESSAGE_MAX_LENGTH = 2000;

export const FEEDBACK_TYPES = [
  { id: 'bug', label: 'Bug report' },
  { id: 'feature', label: 'Feature idea' },
  { id: 'general', label: 'General feedback' },
];

function getFeedbackTypeLabel(type) {
  return FEEDBACK_TYPES.find((item) => item.id === type)?.label || type;
}

export function buildFeedbackMailto({ type, email, message }) {
  const typeLabel = getFeedbackTypeLabel(type);
  const subject = encodeURIComponent(`HueType Feedback: ${typeLabel}`);
  const bodyLines = [
    `Type: ${typeLabel}`,
    email.trim() ? `From: ${email.trim()}` : null,
    '',
    message.trim(),
    '',
    '---',
    `App version: v${APP_VERSION}`,
    `Page: ${window.location.href}`,
    `Browser: ${navigator.userAgent}`,
  ].filter((line) => line !== null);

  const body = encodeURIComponent(bodyLines.join('\n'));
  return `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
}

function openMailto(mailtoUrl) {
  const link = document.createElement('a');
  link.href = mailtoUrl;
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function submitFeedback({ type, email, message }) {
  const entry = {
    id: crypto.randomUUID(),
    type,
    email: email.trim(),
    message: message.trim(),
    version: APP_VERSION,
    url: window.location.href,
    userAgent: navigator.userAgent,
    createdAt: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY) || '[]');
    const next = [...existing, entry].slice(-50);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage errors
  }

  openMailto(buildFeedbackMailto({ type, email, message }));

  return entry;
}
