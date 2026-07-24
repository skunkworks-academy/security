import React from 'react';
import Layout from '@theme/Layout';

const resources = [
  {
    title: 'Investigation log',
    description:
      'CSV template for requirements, queries, provenance, sensitivity, confidence and next actions.',
    href: '/downloads/osint-investigation-log.csv',
  },
  {
    title: 'Scope and authority checklist',
    description:
      'Pre-collection decision gate covering authority, boundaries, exclusions and escalation.',
    href: '/downloads/osint-scope-authority-checklist.md',
  },
  {
    title: 'Intelligence report template',
    description:
      'Tasking, executive assessment, finding matrix, caveats, confidence and recommendations.',
    href: '/downloads/osint-report-template.md',
  },
  {
    title: 'Finding matrix',
    description:
      'Structured worksheet for SIR, finding, evidence, sensitivity, confidence and handling.',
    href: '/downloads/osint-finding-matrix.csv',
  },
];

export default function ResourcesPage() {
  return (
    <Layout title="Course resources" description="OSINT-101 downloadable templates.">
      <main className="section">
        <div className="container">
          <div className="section-kicker">Downloads</div>
          <h1>Evidence-ready working templates</h1>
          <p className="lead">
            These blank templates are public. They contain no learner data or
            protected course lesson content.
          </p>
          <div className="resource-grid">
            {resources.map((resource) => (
              <article className="resource-card" key={resource.title}>
                <h2>{resource.title}</h2>
                <p>{resource.description}</p>
                <a className="button button--secondary" href={resource.href}>
                  Download
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
