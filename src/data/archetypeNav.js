import { PREVIEW_ARCHETYPES } from '../components/PreviewComponentsPanel/previewArchetypes';

const ARCHETYPE_BY_ID = Object.fromEntries(
  PREVIEW_ARCHETYPES.map((archetype) => [archetype.id, archetype]),
);

const NEW_BADGE_GROUPS = new Set();

export function getArchetypeBadge(archetypeId) {
  const group = ARCHETYPE_BY_ID[archetypeId]?.group;
  return NEW_BADGE_GROUPS.has(group) ? 'New' : undefined;
}

export function getArchetypeGroupBadge(groupId) {
  return NEW_BADGE_GROUPS.has(groupId) ? 'New' : undefined;
}

export function isNewArchetype(archetypeId) {
  return NEW_BADGE_GROUPS.has(ARCHETYPE_BY_ID[archetypeId]?.group);
}
