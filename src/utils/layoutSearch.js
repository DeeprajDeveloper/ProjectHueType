import { getArchetypesForGroup } from '../components/PreviewComponentsPanel/previewArchetypes';
import { ARCHETYPE_NAV_META } from '../data/sidebarNavItems';

function normalizeQuery(query) {
  return query.trim().toLowerCase();
}

function getArchetypeSearchText(archetype, group) {
  const meta = ARCHETYPE_NAV_META[archetype.id] || {};
  return [
    archetype.label,
    archetype.description,
    archetype.previewLabel,
    meta.navLabel,
    meta.chipLabel,
    group?.navLabel,
    group?.label,
    group?.description,
  ].filter(Boolean).join(' ').toLowerCase();
}

function groupMatchesQuery(group, query) {
  return (
    group.navLabel.toLowerCase().includes(query)
    || group.label.toLowerCase().includes(query)
    || group.description.toLowerCase().includes(query)
  );
}

export function searchLayouts(query, groups) {
  const normalizedQuery = normalizeQuery(query);

  if (!normalizedQuery) {
    return {
      isSearching: false,
      groups: groups.map((group) => ({
        group,
        archetypes: getArchetypesForGroup(group.id),
      })),
      flatResults: [],
    };
  }

  const filteredGroups = [];
  const flatResults = [];

  groups.forEach((group) => {
    const groupMatch = groupMatchesQuery(group, normalizedQuery);
    const archetypes = getArchetypesForGroup(group.id).filter(
      (archetype) => groupMatch || getArchetypeSearchText(archetype, group).includes(normalizedQuery),
    );

    if (archetypes.length > 0) {
      filteredGroups.push({ group, archetypes });
      archetypes.forEach((archetype) => {
        flatResults.push({ archetype, group });
      });
    }
  });

  return {
    isSearching: true,
    groups: filteredGroups,
    flatResults,
  };
}
