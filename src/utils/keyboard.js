export function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
}

export function matchesShortcut(e, { alt = false, shift = false, code, key }) {
  if (alt !== e.altKey) return false;
  if (shift !== e.shiftKey) return false;
  if (e.ctrlKey || e.metaKey) return false;
  if (key) return e.key === key;
  if (code) return e.code === code;
  return false;
}

export function formatShortcutLabel({ alt = false, shift = false, code, key }, { mac = isMacPlatform() } = {}) {
  if (key) return key;
  const parts = [];
  if (alt) parts.push(mac ? '⌥' : 'Alt');
  if (shift) parts.push(mac ? '⇧' : 'Shift');
  if (code) parts.push(codeToKeyLabel(code));
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
