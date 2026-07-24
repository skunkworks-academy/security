import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AuthStatus from '../components/AuthStatus';

export default function EnrolPage() {
  const {siteConfig} = useDocusaurusContext();
  const checkoutUrl = siteConfig.customFields.checkoutUrl;

  return (
    <Layout
      title="Enrol"
      description="Create an account and enrol in OSINT-101.">
      <main className="section">
        <div className="container narrow">
          <div className="section-kicker">OSINT-101 enrolment</div>
          <h1>Create an account, confirm enrolment, then start learning.</h1>
          <p className="lead">
            The public catalogue is open. Lessons, quizzes and assessments require
            an authenticated Academy account and an active OSINT enrolment
            entitlement.
          </p>

          <div className="step-grid">
            <article>
              <span>01</span>
              <h2>Create or access your account</h2>
              <p>
                Sign in with the identity provider configured for the Academy
                learning tenant.
              </p>
              <a className="button button--secondary" href="/login">
                Create account or sign in
              </a>
            </article>
            <article>
              <span>02</span>
              <h2>Complete enrolment</h2>
              <p>
                Purchase, redeem or receive an organisation-assigned enrolment.
                The entitlement is checked by the protected course API.
              </p>
              <a className="button button--primary" href={checkoutUrl}>
                Open secure enrolment
              </a>
            </article>
            <article>
              <span>03</span>
              <h2>Begin the course</h2>
              <p>
                Return to the dashboard. Access activates once the OSINT
                entitlement is present.
              </p>
              <a className="button button--secondary" href="/learn/">
                Open learning dashboard
              </a>
            </article>
          </div>

          <section className="access-card enrol-status">
            <div className="section-kicker">Current account status</div>
            <AuthStatus />
          </section>
        </div>
      </main>
    </Layout>
  );
}
