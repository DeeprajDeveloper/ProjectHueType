function parseInline(text) {
  const parts = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }

    const token = match[0];
    if (token.startsWith('**')) {
      parts.push({ type: 'strong', value: token.slice(2, -2) });
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        parts.push({ type: 'link', label: linkMatch[1], href: linkMatch[2] });
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return parts;
}

function InlineContent({ text }) {
  const parts = parseInline(text);
  return parts.map((part, index) => {
    if (part.type === 'strong') {
      return <strong key={index}>{part.value}</strong>;
    }
    if (part.type === 'link') {
      const external = /^https?:\/\//.test(part.href);
      return (
        <a
          key={index}
          href={part.href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {part.label}
        </a>
      );
    }
    return <span key={index}>{part.value}</span>;
  });
}

export function renderSimpleMarkdown(source) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line === '---') {
      blocks.push({ type: 'hr', key: `hr-${index}` });
      index += 1;
      continue;
    }

    if (line.startsWith('# ')) {
      blocks.push({ type: 'h1', text: line.slice(2), key: `h1-${index}` });
      index += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3), key: `h2-${index}` });
      index += 1;
      continue;
    }

    if (line.startsWith('- ')) {
      const items = [];
      while (index < lines.length) {
        const trimmed = lines[index].trim();
        if (trimmed.startsWith('- ')) {
          items.push(trimmed.slice(2));
          index += 1;
          continue;
        }
        if (!trimmed && items.length > 0 && index + 1 < lines.length && lines[index + 1].trim().startsWith('- ')) {
          index += 1;
          continue;
        }
        break;
      }
      blocks.push({ type: 'ul', items, key: `ul-${index}` });
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length) {
      const next = lines[index].trim();
      if (!next || next === '---' || next.startsWith('#') || next.startsWith('- ')) break;
      paragraph.push(next);
      index += 1;
    }
    blocks.push({ type: 'p', text: paragraph.join(' '), key: `p-${index}` });
  }

  return blocks.map((block) => {
    switch (block.type) {
      case 'hr':
        return <hr key={block.key} className="simple-markdown__hr" />;
      case 'h1':
        return <h1 key={block.key} className="simple-markdown__h1"><InlineContent text={block.text} /></h1>;
      case 'h2':
        return <h2 key={block.key} className="simple-markdown__h2"><InlineContent text={block.text} /></h2>;
      case 'p':
        return <p key={block.key} className="simple-markdown__p"><InlineContent text={block.text} /></p>;
      case 'ul':
        return (
          <ul key={block.key} className="simple-markdown__ul">
            {block.items.map((item) => (
              <li key={item}><InlineContent text={item} /></li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  });
}
