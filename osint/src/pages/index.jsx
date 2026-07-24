import React from 'react';
import Layout from '@theme/Layout';
import AuthStatus from '../components/AuthStatus';
import courseManifest from '../data/courseManifest';

export default function Home() {
  return (
    <Layout
      title={`${courseManifest.title} — ${courseManifest.subtitle}`}
      description="Protected self-paced OSINT training from Skunkworks Academy.">
      <main>
        <section className="hero-section">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">Skunkworks Academy · {courseManifest.code}</div>
              <h1>
                OSINT
                <span> Investigation Methodology</span>
              </h1>
              <p className="hero-lead">
                Finding what is already there — through lawful collection,
                verification, evidence handling and defensible reporting.
              </p>
              <div className="button-row">
                <a className="button button--primary button--lg" href="/enrol/">
                  Enrol in the course
                </a>
                <a className="button button--secondary button--lg" href="/login">
                  Create account or sign in
                </a>
              </div>
              <div className="hero-meta">
                <span>{courseManifest.estimatedHours} hours</span>
                <span>{courseManifest.modules.length} modules</span>
                <span>{courseManifest.passMark}% pass mark</span>
              </div>
            </div>
            <aside className="access-card">
              <div className="section-kicker">Access status</div>
              <h2>Protected learning</h2>
              <p>
                Lesson bodies are not published into the public site bundle.
                Authentication and active enrolment are verified before the
                course API releases content.
              </p>
              <AuthStatus />
            </aside>
          </div>
        </section>

        <section className="section" id="outcomes">
          <div className="container">
            <div className="section-heading">
              <div className="section-kicker">Course outcomes</div>
              <h2>From ad-hoc searching to structured intelligence work</h2>
            </div>
            <div className="outcome-grid">
              {courseManifest.learningOutcomes.map((outcome, index) => (
                <article className="outcome-card" key={outcome}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{outcome}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark" id="guardrails">
          <div className="container">
            <div className="section-heading">
              <div className="section-kicker">Non-negotiable guardrails</div>
              <h2>Public-source analysis without creating new harm</h2>
            </div>
            <div className="guardrail-grid">
              <article>
                <h3>Lawful and authorised</h3>
                <p>Public sources only. No access-control bypass, credential testing or evasion.</p>
              </article>
              <article>
                <h3>Evidence-ready</h3>
                <p>Record source, timestamp, context, query, relevance and confidence.</p>
              </article>
              <article>
                <h3>Minimised</h3>
                <p>Mask personal identifiers and retain only what the requirement needs.</p>
              </article>
              <article>
                <h3>Verified</h3>
                <p>A tool hit is a lead. Independent corroboration creates a finding.</p>
              </article>
            </div>
            <div className="guardrail-banner">{courseManifest.guardrail}</div>
          </div>
        </section>

        <section className="section" id="curriculum">
          <div className="container">
            <div className="section-heading">
              <div className="section-kicker">Curriculum</div>
              <h2>A complete tasking-to-reporting workflow</h2>
            </div>
            <div className="curriculum-list">
              {courseManifest.modules.map((module) => (
                <article key={module.slug}>
                  <span className="module-number">
                    {String(module.number).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{module.title}</h3>
                    <p>{module.objectives[0]}</p>
                  </div>
                  <span>{module.durationMinutes} min</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
