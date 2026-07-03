import { useId } from 'react';
import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupDashboardCharts.scss';

const DEFAULT_LINE_POINTS = [
  [0, 58], [22, 52], [44, 48], [66, 38], [88, 42], [110, 28], [132, 32], [154, 22], [176, 26], [200, 18],
];

const DEFAULT_AREA_POINTS = [
  [0, 68], [25, 62], [50, 58], [75, 52], [100, 48], [125, 44], [150, 40], [175, 36], [200, 32],
];

const REPORT_LINE_POINTS = [
  [0, 64], [20, 58], [40, 54], [60, 48], [80, 50], [100, 42], [120, 38], [140, 34], [160, 30], [180, 28], [200, 22],
];

const DOUGHNUT_COLORS = [
  'var(--preview-accent)',
  'var(--preview-primary)',
  'color-mix(in srgb, var(--preview-text) 35%, var(--preview-secondary))',
  'color-mix(in srgb, var(--preview-primary) 55%, var(--preview-accent))',
];

function toPolyline(points) {
  return points.map(([x, y]) => `${x},${y}`).join(' ');
}

function toAreaPath(points, baseline = 80) {
  const line = toPolyline(points);
  return `M0,${baseline} L${line.replace(/ /g, ' L')} L200,${baseline} Z`;
}

function ChartHeader({ copy, summary }) {
  return (
    <header className="mockup-dash-chart__header">
      <div>
        <h3 className="mockup-dash-chart__title">{copy.title}</h3>
        {copy.subtitle && <p className="mockup-dash-chart__subtitle">{copy.subtitle}</p>}
      </div>
      {summary && <span className="mockup-dash-chart__summary">{summary}</span>}
    </header>
  );
}

function MockupBarChart({ variant = 'dashboard', copy: copyOverride }) {
  const copy = copyOverride ?? MOCKUP_COPY.dashboard.charts.bar;
  const values = copy.values ?? [42, 68, 55, 82, 61, 74, 48];
  const valueLabels = copy.valueLabels ?? values.map((v) => `${v}`);

  return (
    <figure className={`mockup-dash-chart mockup-dash-chart--bar mockup-dash-chart--${variant}`}>
      <ChartHeader copy={copy} />
      <div className="mockup-dash-chart__canvas" aria-hidden="true">
        <div className="mockup-dash-chart__y-axis">
          {copy.yAxis.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="mockup-dash-chart__plot">
          <div className="mockup-dash-chart__grid">
            {copy.yAxis.map((label) => (
              <span key={label} className="mockup-dash-chart__grid-line" />
            ))}
          </div>
          <div className="mockup-dash-chart__bars">
            {values.map((height, i) => (
              <div key={copy.xAxis[i]} className="mockup-dash-chart__bar-col">
                <span className="mockup-dash-chart__bar-value">{valueLabels[i]}</span>
                <div
                  className="mockup-dash-chart__bar"
                  style={{ '--bar-height': `${height}%`, '--bar-delay': `${i * 0.06}s` }}
                />
                <span className="mockup-dash-chart__x-label">{copy.xAxis[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {copy.caption && <figcaption className="mockup-dash-chart__caption">{copy.caption}</figcaption>}
    </figure>
  );
}

function MockupLineChart({ variant = 'dashboard', copy: copyOverride, points = DEFAULT_LINE_POINTS }) {
  const copy = copyOverride ?? MOCKUP_COPY.dashboard.charts.line;
  const uid = useId().replace(/:/g, '');
  const line = toPolyline(points);
  const area = toAreaPath(points);
  const gridSteps = copy.yAxis?.length ? copy.yAxis.length - 1 : 4;

  return (
    <figure className={`mockup-dash-chart mockup-dash-chart--line mockup-dash-chart--${variant}`}>
      <ChartHeader copy={copy} summary={copy.summary} />
      <div className="mockup-dash-chart__canvas mockup-dash-chart__canvas--line" aria-hidden="true">
        {copy.yAxis && (
          <div className="mockup-dash-chart__y-axis">
            {copy.yAxis.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        )}
        <div className="mockup-dash-chart__plot">
          <svg className="mockup-dash-chart__svg" viewBox="0 0 200 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`mockup-line-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--preview-accent)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--preview-accent)" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {Array.from({ length: gridSteps }, (_, i) => {
              const y = 16 + (i * (64 / Math.max(gridSteps - 1, 1)));
              return (
                <line key={y} x1="0" y1={y} x2="200" y2={y} className="mockup-dash-chart__svg-grid" />
              );
            })}
            <path d={area} fill={`url(#mockup-line-fill-${uid})`} className="mockup-dash-chart__area" />
            <polyline
              points={line}
              className="mockup-dash-chart__line"
              fill="none"
              stroke="var(--preview-accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {points.map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="3"
                className="mockup-dash-chart__dot"
                style={{ '--dot-delay': `${0.4 + i * 0.05}s` }}
              />
            ))}
          </svg>
          {copy.xAxis && (
            <div className="mockup-dash-chart__x-axis">
              {copy.xAxis.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      {copy.caption && <figcaption className="mockup-dash-chart__caption">{copy.caption}</figcaption>}
    </figure>
  );
}

function MockupDoughnutChart({ variant = 'dashboard', copy: copyOverride }) {
  const copy = copyOverride ?? MOCKUP_COPY.dashboard.charts.doughnut;
  const segments = copy.segments ?? [45, 30, 25];
  const legendItems = copy.legend ?? [];
  const total = segments.reduce((sum, value) => sum + value, 0);
  let offset = 0;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <figure className={`mockup-dash-chart mockup-dash-chart--doughnut mockup-dash-chart--${variant}`}>
      <ChartHeader copy={copy} />
      <div className="mockup-dash-chart__doughnut-wrap">
        <svg className="mockup-dash-chart__doughnut" viewBox="0 0 96 96" aria-hidden="true">
          <circle r={radius} cx="48" cy="48" fill="none" className="mockup-dash-chart__ring-track" strokeWidth="14" />
          <g transform="translate(48, 48) rotate(-90)">
            {segments.map((value, i) => {
              const length = (value / total) * circumference;
              const dasharray = `${length} ${circumference - length}`;
              const dashoffset = -offset;
              offset += length;
              return (
                <circle
                  key={i}
                  r={radius}
                  fill="none"
                  stroke={DOUGHNUT_COLORS[i % DOUGHNUT_COLORS.length]}
                  strokeWidth="14"
                  strokeDasharray={dasharray}
                  strokeDashoffset={dashoffset}
                  className="mockup-dash-chart__ring-seg"
                  style={{ '--ring-delay': `${i * 0.12}s` }}
                />
              );
            })}
          </g>
          <text x="48" y="44" textAnchor="middle" className="mockup-dash-chart__doughnut-value">{copy.centerValue}</text>
          <text x="48" y="56" textAnchor="middle" className="mockup-dash-chart__doughnut-label">{copy.centerLabel}</text>
        </svg>
        <ul className="mockup-dash-chart__legend">
          {legendItems.map((item, i) => {
            const label = typeof item === 'string' ? item : item.label;
            const detail = typeof item === 'string' ? null : `${item.value} · ${item.count}`;
            return (
              <li key={label}>
                <span style={{ background: DOUGHNUT_COLORS[i % DOUGHNUT_COLORS.length] }} />
                <span className="mockup-dash-chart__legend-copy">
                  <span className="mockup-dash-chart__legend-label">{label}</span>
                  {detail && <span className="mockup-dash-chart__legend-detail">{detail}</span>}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      {copy.caption && <figcaption className="mockup-dash-chart__caption">{copy.caption}</figcaption>}
    </figure>
  );
}

function MockupAreaChart({ variant = 'dashboard', copy: copyOverride, points = DEFAULT_AREA_POINTS }) {
  const copy = copyOverride ?? MOCKUP_COPY.dashboard.charts.area;
  const uid = useId().replace(/:/g, '');
  const line = toPolyline(points);
  const area = toAreaPath(points);
  const gridSteps = copy.yAxis?.length ? copy.yAxis.length - 1 : 4;

  return (
    <figure className={`mockup-dash-chart mockup-dash-chart--area mockup-dash-chart--${variant}`}>
      <ChartHeader copy={copy} summary={copy.summary} />
      <div className="mockup-dash-chart__canvas mockup-dash-chart__canvas--line" aria-hidden="true">
        {copy.yAxis && (
          <div className="mockup-dash-chart__y-axis">
            {copy.yAxis.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        )}
        <div className="mockup-dash-chart__plot">
          <svg className="mockup-dash-chart__svg" viewBox="0 0 200 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`mockup-area-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--preview-primary)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--preview-primary)" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {Array.from({ length: gridSteps }, (_, i) => {
              const y = 16 + (i * (64 / Math.max(gridSteps - 1, 1)));
              return (
                <line key={y} x1="0" y1={y} x2="200" y2={y} className="mockup-dash-chart__svg-grid" />
              );
            })}
            <path d={area} fill={`url(#mockup-area-fill-${uid})`} className="mockup-dash-chart__area-fill" />
            <polyline
              points={line}
              className="mockup-dash-chart__area-line"
              fill="none"
              stroke="var(--preview-primary)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {copy.xAxis && (
            <div className="mockup-dash-chart__x-axis">
              {copy.xAxis.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      {copy.caption && <figcaption className="mockup-dash-chart__caption">{copy.caption}</figcaption>}
    </figure>
  );
}

function MockupReportTrendChart({ copy }) {
  return <MockupLineChart variant="report" copy={copy} points={REPORT_LINE_POINTS} />;
}

export {
  MockupBarChart,
  MockupLineChart,
  MockupDoughnutChart,
  MockupAreaChart,
  MockupReportTrendChart,
};
