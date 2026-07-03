import {
  MockupBarChart,
  MockupDoughnutChart,
  MockupReportTrendChart,
} from './MockupDashboardCharts';
import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupAnalytics.scss';
import './MockupDashboardCharts.scss';

function MockupAnalytics({ parts = {} }) {
  const copy = MOCKUP_COPY.analytics;
  const show = (id) => parts[id] !== false;

  return (
    <article className="mockup-analytics">
      {show('pageHeader') && (
        <header className="mockup-analytics__masthead">
          <div className="mockup-analytics__masthead-main">
            <p className="mockup-analytics__report-type">Analytics report</p>
            <h1 className="mockup-analytics__title">{copy.header.title}</h1>
            <p className="mockup-analytics__subtitle">{copy.header.subtitle}</p>
          </div>
          <div className="mockup-analytics__meta-block">
            <dl className="mockup-analytics__meta">
              <div>
                <dt>Report ID</dt>
                <dd>{copy.reportMeta.id}</dd>
              </div>
              <div>
                <dt>Prepared for</dt>
                <dd>{copy.reportMeta.preparedFor}</dd>
              </div>
              <div>
                <dt>Generated</dt>
                <dd>{copy.reportMeta.generated}</dd>
              </div>
            </dl>
            {show('dateRange') && (
              <div className="mockup-analytics__period">
                <span className="mockup-analytics__period-label">{copy.dateRange.label}</span>
                <strong className="mockup-analytics__period-value">{copy.dateRange.value}</strong>
                <span className="mockup-analytics__period-compare">{copy.dateRange.compare}</span>
              </div>
            )}
          </div>
        </header>
      )}

      {show('kpiCards') && (
        <section className="mockup-analytics__summary" aria-label="Executive summary">
          <h2 className="mockup-analytics__section-heading">{copy.executiveSummary.title}</h2>
          <p className="mockup-analytics__summary-body">{copy.executiveSummary.body}</p>
          <div className="mockup-analytics__metric-strip">
            {copy.kpis.map((kpi) => (
              <div key={kpi.label} className="mockup-analytics__metric">
                <span className="mockup-analytics__metric-label">{kpi.label}</span>
                <span className="mockup-analytics__metric-value">{kpi.value}</span>
                <span className={`mockup-analytics__metric-change ${kpi.positive ? 'mockup-analytics__metric-change--up' : 'mockup-analytics__metric-change--down'}`}>
                  {kpi.change}
                </span>
                <span className="mockup-analytics__metric-note">{kpi.note}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {show('charts') && (
        <div className="mockup-analytics__figures">
          <MockupReportTrendChart copy={copy.charts.trend} />

          <div className="mockup-analytics__figure-row">
            <MockupBarChart variant="report" copy={copy.charts.presets} />
            <MockupDoughnutChart variant="report" copy={copy.charts.distribution} />
          </div>

          <section className="mockup-analytics__findings">
            <h2 className="mockup-analytics__section-heading">{copy.findings.title}</h2>
            <ul className="mockup-analytics__findings-list">
              {copy.findings.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {show('dataTable') && (
        <section className="mockup-analytics__table-section">
          <h2 className="mockup-analytics__section-heading">{copy.table.title}</h2>
          <p className="mockup-analytics__table-caption">{copy.table.caption}</p>
          <div className="mockup-analytics__table-wrap">
            <table className="mockup-analytics__table">
              <thead>
                <tr>
                  <th scope="col">{copy.table.columns.preset}</th>
                  <th scope="col">{copy.table.columns.views}</th>
                  <th scope="col">{copy.table.columns.saves}</th>
                  <th scope="col">{copy.table.columns.exports}</th>
                  <th scope="col">{copy.table.columns.contrast}</th>
                </tr>
              </thead>
              <tbody>
                {copy.table.rows.map((row) => (
                  <tr key={row.preset}>
                    <td className="mockup-analytics__preset-cell">{row.preset}</td>
                    <td>{row.views}</td>
                    <td>{row.saves}</td>
                    <td>{row.exports}</td>
                    <td>
                      <span className={`mockup-analytics__contrast mockup-analytics__contrast--${row.contrast.toLowerCase()}`}>
                        {row.contrast}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>{copy.table.totals.preset}</td>
                  <td>{copy.table.totals.views}</td>
                  <td>{copy.table.totals.saves}</td>
                  <td>{copy.table.totals.exports}</td>
                  <td>{copy.table.totals.contrast}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      )}

      <footer className="mockup-analytics__footer">
        {copy.footer}
      </footer>
    </article>
  );
}

export default MockupAnalytics;
