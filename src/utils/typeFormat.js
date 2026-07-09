/**
 * Type size formatting for export output
 */

function trimUnitValue(value) {
  const rounded = Math.round(value * 10000) / 10000;
  return `${parseFloat(rounded.toFixed(4))}`;
}

export function formatTypeSize(sizePx, unit = 'px', { typeBasePx = 16, remRootPx = 16 } = {}) {
  const px = Number(sizePx);
  if (!Number.isFinite(px)) return '0px';

  switch (unit) {
    case 'rem': {
      const rem = px / remRootPx;
      return `${trimUnitValue(rem)}rem`;
    }
    case 'em': {
      const base = typeBasePx > 0 ? typeBasePx : 16;
      const em = px / base;
      return `${trimUnitValue(em)}em`;
    }
    case 'px':
    default:
      return `${trimUnitValue(px)}px`;
  }
}

export function getTypeUnitExample(unit, typeBasePx = 16, remRootPx = 16) {
  switch (unit) {
    case 'rem':
      return formatTypeSize(typeBasePx, 'rem', { typeBasePx, remRootPx });
    case 'em':
      return formatTypeSize(typeBasePx, 'em', { typeBasePx, remRootPx });
    case 'px':
    default:
      return formatTypeSize(typeBasePx, 'px', { typeBasePx, remRootPx });
  }
}
