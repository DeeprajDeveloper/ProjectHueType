import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupDashboardCharts.scss';

const BAR_VALUES = [42, 68, 55, 82, 61, 74, 48];

const LINE_POINTS = [
  [0, 62], [28, 48], [56, 52], [84, 28], [112, 36], [140, 18], [168, 24], [200, 12],
];

const DOUGHNUT_SEGMENTS = [
  { value: 45, color: 'var(--preview-accent)' },
  { value: 30, color: 'var(--preview-primary)' },
  { value: 25, color: 'color-mix(in srgb, var(--preview-text) 35%, var(--preview-secondary))' },
];

const AREA_POINTS = [
  [0, 70], [25, 58], [50, 62], [75, 40], [100, 48], [125, 32], [150, 38], [175, 22], [200, 28],
];

function toPolyline(points) {
  return points.map(([x, y]) => `${x},${y}`).join(' ');
}

function toAreaPath(points, baseline = 80) {
  const line = toPolyline(points);
  return `M0,${baseline} L${line.replace(/ /g, ' L')} L200,${baseline} Z`;
}

function MockupBarChart() {
  const copy = MOCKUP_COPY.dashboard.charts.bar;

  return (
    <div className="mockup-dash-chart mockup-dash-chart--bar">
      <h3 className="mockup-dash-chart__title">{copy.title}</h3>
      <div className="mockup-dash-chart__canvas" aria-hidden="true">
        <div className="mockup-dash-chart__y-axis">
          {copy.yAxis.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="mockup-dash-chart__plot">
          <div className="mockup-dash-chart__grid">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="mockup-dash-chart__grid-line" />
            ))}
          </div>
          <div className="mockup-dash-chart__bars">
            {BAR_VALUES.map((height, i) => (
              <div key={copy.xAxis[i]} className="mockup-dash-chart__bar-col">
                <div
                  className="mockup-dash-chart__bar"
                  style={{ '--bar-height': `${height}%`, '--bar-delay': `${i * 0.12}s` }}
                />
                <span className="mockup-dash-chart__x-label">{copy.xAxis[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupLineChart() {
  const copy = MOCKUP_COPY.dashboard.charts.line;
  const line = toPolyline(LINE_POINTS);
  const area = toAreaPath(LINE_POINTS);

  return (
    <div className="mockup-dash-chart mockup-dash-chart--line">
      <h3 className="mockup-dash-chart__title">{copy.title}</h3>
      <div className="mockup-dash-chart__canvas" aria-hidden="true">
        <svg className="mockup-dash-chart__svg" viewBox="0 0 200 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mockup-line-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--preview-accent)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--preview-accent)" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[20, 40, 60].map((y) => (
            <line key={y} x1="0" y1={y} x2="200" y2={y} className="mockup-dash-chart__svg-grid" />
          ))}
          <path d={area} fill="url(#mockup-line-fill)" className="mockup-dash-chart__area" />
          <polyline
            points={line}
            className="mockup-dash-chart__line"
            fill="none"
            stroke="var(--preview-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {LINE_POINTS.map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="3"
              className="mockup-dash-chart__dot"
              style={{ '--dot-delay': `${i * 0.15}s` }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

function MockupDoughnutChart() {
  const copy = MOCKUP_COPY.dashboard.charts.doughnut;
  const total = DOUGHNUT_SEGMENTS.reduce((sum, s) => sum + s.value, 0);
  let offset = 0;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="mockup-dash-chart mockup-dash-chart--doughnut">
      <h3 className="mockup-dash-chart__title">{copy.title}</h3>
      <div className="mockup-dash-chart__doughnut-wrap">
        <svg className="mockup-dash-chart__doughnut" viewBox="0 0 96 96" aria-hidden="true">
          <g transform="translate(48, 48) rotate(-90)">
            {DOUGHNUT_SEGMENTS.map((seg, i) => {
              const length = (seg.value / total) * circumference;
              const dasharray = `${length} ${circumference - length}`;
              const dashoffset = -offset;
              offset += length;
              return (
                <circle
                  key={i}
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="14"
                  strokeDasharray={dasharray}
                  strokeDashoffset={dashoffset}
                  className="mockup-dash-chart__ring-seg"
                  style={{ '--ring-delay': `${i * 0.2}s` }}
                />
              );
            })}
          </g>
          <text x="48" y="46" textAnchor="middle" className="mockup-dash-chart__doughnut-value">{copy.centerValue}</text>
          <text x="48" y="58" textAnchor="middle" className="mockup-dash-chart__doughnut-label">{copy.centerLabel}</text>
        </svg>
        <ul className="mockup-dash-chart__legend">
          {copy.legend.map((label, i) => (
            <li key={label}><span style={{ background: DOUGHNUT_SEGMENTS[i].color }} />{label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MockupAreaChart() {
  const copy = MOCKUP_COPY.dashboard.charts.area;
  const line = toPolyline(AREA_POINTS);
  const area = toAreaPath(AREA_POINTS);

  return (
    <div className="mockup-dash-chart mockup-dash-chart--area">
      <h3 className="mockup-dash-chart__title">{copy.title}</h3>
      <div className="mockup-dash-chart__canvas" aria-hidden="true">
        <svg className="mockup-dash-chart__svg" viewBox="0 0 200 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mockup-area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--preview-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--preview-primary)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {[20, 40, 60].map((y) => (
            <line key={y} x1="0" y1={y} x2="200" y2={y} className="mockup-dash-chart__svg-grid" />
          ))}
          <path d={area} fill="url(#mockup-area-fill)" className="mockup-dash-chart__area-fill" />
          <polyline
            points={line}
            className="mockup-dash-chart__area-line"
            fill="none"
            stroke="var(--preview-primary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export { MockupBarChart, MockupLineChart, MockupDoughnutChart, MockupAreaChart };
