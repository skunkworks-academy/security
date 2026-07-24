import React from 'react';
import Layout from '@theme/Layout';
import CourseReader from '../components/CourseReader';

export default function LearnPage() {
  return (
    <Layout
      title="Learning dashboard"
      description="Protected OSINT-101 learning dashboard.">
      <CourseReader />
    </Layout>
  );
}
