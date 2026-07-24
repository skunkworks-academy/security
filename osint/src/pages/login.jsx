import React, {useEffect} from 'react';
import Layout from '@theme/Layout';

const authenticationUrl =
  '/.auth/login/aad?post_login_redirect_uri=%2Flearn%2F';

export default function LoginPage() {
  useEffect(() => {
    window.location.replace(authenticationUrl);
  }, []);

  return (
    <Layout title="Sign in" description="Sign in to Skunkworks Academy.">
      <main className="section">
        <div className="container narrow">
          <div className="section-kicker">Secure authentication</div>
          <h1>Redirecting to sign in…</h1>
          <p className="lead">
            Authentication is handled by the Academy identity provider. No
            password is collected by this course page.
          </p>
          <a className="button button--primary" href={authenticationUrl}>
            Continue to sign in
          </a>
        </div>
      </main>
    </Layout>
  );
}
