import { PREVIEW_ARCHETYPES } from '../components/PreviewComponentsPanel/previewArchetypes';

const ARCHETYPE_BY_ID = Object.fromEntries(
  PREVIEW_ARCHETYPES.map((archetype) => [archetype.id, archetype]),
);

export function getArchetypeBadge(archetypeId) {
  const archetype = ARCHETYPE_BY_ID[archetypeId];
  return archetype?.group === 'group-2' ? 'New' : undefined;
}

export function isGroup2Archetype(archetypeId) {
  return ARCHETYPE_BY_ID[archetypeId]?.group === 'group-2';
}
