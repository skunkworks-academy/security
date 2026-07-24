import React, {useEffect} from 'react';
import Layout from '@theme/Layout';

const logoutUrl = '/.auth/logout?post_logout_redirect_uri=%2F';

export default function LogoutPage() {
  useEffect(() => {
    window.location.replace(logoutUrl);
  }, []);

  return (
    <Layout title="Sign out" description="Sign out of Skunkworks Academy.">
      <main className="section">
        <div className="container narrow">
          <div className="section-kicker">Account session</div>
          <h1>Signing you out…</h1>
          <p className="lead">
            The Academy identity session is being closed securely.
          </p>
          <a className="button button--primary" href={logoutUrl}>
            Continue to sign out
          </a>
        </div>
      </main>
    </Layout>
  );
}
