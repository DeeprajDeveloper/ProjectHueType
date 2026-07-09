import { MOCKUP_COPY } from '../data/mockupCopy';

function isPlainObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

export function getValueAtPath(obj, path) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((current, key) => (
    current != null ? current[key] : undefined
  ), obj);
}

export function setValueAtPath(obj, path, value) {
  const keys = path.split('.');
  const root = { ...(obj || {}) };
  let current = root;

  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i];
    current[key] = isPlainObject(current[key]) ? { ...current[key] } : {};
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return root;
}

export function removeValueAtPath(obj, path) {
  if (!obj || !path) return {};

  const keys = path.split('.');

  function removeAt(current, depth) {
    if (current == null || typeof current !== 'object') return undefined;

    if (depth === keys.length - 1) {
      const { [keys[depth]]: removed, ...rest } = current;
      void removed;
      return Object.keys(rest).length ? rest : undefined;
    }

    const key = keys[depth];
    if (!(key in current)) return current;

    const updated = removeAt(current[key], depth + 1);
    if (updated === undefined) {
      const { [key]: removedChild, ...rest } = current;
      void removedChild;
      return Object.keys(rest).length ? rest : undefined;
    }

    return { ...current, [key]: updated };
  }

  return removeAt(obj, 0) || {};
}

export function deepMerge(base, overrides) {
  if (!isPlainObject(overrides)) return base;
  if (!isPlainObject(base)) return overrides;

  const result = { ...base };

  for (const key of Object.keys(overrides)) {
    const overrideVal = overrides[key];
    const baseVal = base[key];

    if (isPlainObject(overrideVal) && isPlainObject(baseVal)) {
      result[key] = deepMerge(baseVal, overrideVal);
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal;
    }
  }

  return result;
}

export function resolvePreviewCopy(overrides = {}) {
  const resolved = {};

  for (const archetype of Object.keys(MOCKUP_COPY)) {
    resolved[archetype] = deepMerge(
      MOCKUP_COPY[archetype],
      overrides[archetype],
    );
  }

  return resolved;
}

export function getPreviewCopyDefault(archetype, path) {
  return getValueAtPath(MOCKUP_COPY[archetype], path);
}

export function getPreviewCopyValue(overrides, archetype, path) {
  const overrideValue = getValueAtPath(overrides?.[archetype], path);
  if (overrideValue !== undefined) return overrideValue;
  return getPreviewCopyDefault(archetype, path);
}
