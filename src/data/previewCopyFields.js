/**
 * Editable preview copy fields per archetype.
 * Each field maps a dot-path into MOCKUP_COPY[archetype] to a sidebar input.
 */
export const PREVIEW_COPY_FIELDS = {
  marketing: [
    { path: 'hero.eyebrow', label: 'Eyebrow', group: 'Hero' },
    { path: 'hero.heading', label: 'Heading', group: 'Hero' },
    { path: 'hero.subtext', label: 'Subtext', group: 'Hero', multiline: true },
    { path: 'hero.cta.primary', label: 'Primary button', group: 'Hero' },
    { path: 'hero.cta.secondary', label: 'Secondary button', group: 'Hero' },
    { path: 'featureCards.header.title', label: 'Section title', group: 'Feature cards' },
    { path: 'featureCards.header.subtitle', label: 'Section subtitle', group: 'Feature cards', multiline: true },
    { path: 'testimonials.header.title', label: 'Section title', group: 'Testimonials' },
    { path: 'testimonials.header.subtitle', label: 'Section subtitle', group: 'Testimonials', multiline: true },
    { path: 'contact.title', label: 'Section title', group: 'Contact form' },
    { path: 'contact.subtitle', label: 'Section subtitle', group: 'Contact form', multiline: true },
    { path: 'navbar.login', label: 'Log in label', group: 'Navigation' },
    { path: 'navbar.signup', label: 'Sign up label', group: 'Navigation' },
  ],
  waitlist: [
    { path: 'headline', label: 'Headline', group: 'Hero' },
    { path: 'subhead', label: 'Subhead', group: 'Hero', multiline: true },
    { path: 'form.placeholder', label: 'Email placeholder', group: 'Signup form' },
    { path: 'form.submit', label: 'Submit button', group: 'Signup form' },
    { path: 'form.hint', label: 'Form hint', group: 'Signup form' },
    { path: 'socialProof.count', label: 'Social proof count', group: 'Social proof' },
    { path: 'socialProof.label', label: 'Social proof label', group: 'Social proof' },
  ],
  error404: [
    { path: 'title', label: 'Title', group: 'Message' },
    { path: 'body', label: 'Body text', group: 'Message', multiline: true },
    { path: 'primary', label: 'Primary button', group: 'Actions' },
  ],
};

export function getPreviewCopyFieldsForArchetype(archetype) {
  return PREVIEW_COPY_FIELDS[archetype] || [];
}

export function groupPreviewCopyFields(fields) {
  const groups = [];

  for (const field of fields) {
    const existing = groups.find((group) => group.label === field.group);
    if (existing) {
      existing.fields.push(field);
    } else {
      groups.push({ label: field.group, fields: [field] });
    }
  }

  return groups;
}
