export function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
}

export function matchesShortcut(e, { alt = false, code }) {
  if (alt !== e.altKey) return false;
  if (e.ctrlKey || e.metaKey || e.shiftKey) return false;
  return e.code === code;
}

export function formatShortcutLabel({ alt, code }, { mac = isMacPlatform() } = {}) {
  const parts = [];
  if (alt) parts.push(mac ? '⌥' : 'Alt');
  parts.push(codeToKeyLabel(code));
  return parts.join(mac ? '' : '+');
}

function isMacPlatform() {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform);
}

function codeToKeyLabel(code) {
  if (code.startsWith('Digit')) return code.replace('Digit', '');
  if (code.startsWith('Key')) return code.replace('Key', '');
  return code;
}
