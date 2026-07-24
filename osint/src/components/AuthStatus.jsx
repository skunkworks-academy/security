import React, {useEffect, useMemo, useState} from 'react';

export default function AuthStatus({compact = false}) {
  const [state, setState] = useState({loading: true, principal: null, local: false});

  useEffect(() => {
    let active = true;
    fetch('/.auth/me', {credentials: 'same-origin'})
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Authentication endpoint returned ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        if (!active) return;
        const principal = payload?.clientPrincipal || null;
        setState({loading: false, principal, local: false});
      })
      .catch(() => {
        if (!active) return;
        setState({loading: false, principal: null, local: true});
      });

    return () => {
      active = false;
    };
  }, []);

  const roles = useMemo(
    () => new Set(state.principal?.userRoles || []),
    [state.principal],
  );
  const enrolled = roles.has('osint_enrolled') || roles.has('course_admin');

  if (state.loading) {
    return <span className="status-pill">Checking access…</span>;
  }

  if (state.local) {
    return (
      <div className={compact ? 'auth-status compact' : 'auth-status'}>
        <span className="status-pill warning">Local development</span>
        {!compact && (
          <p>
            Azure Static Web Apps authentication is unavailable locally unless the
            SWA emulator is used.
          </p>
        )}
      </div>
    );
  }

  if (!state.principal) {
    return (
      <div className={compact ? 'auth-status compact' : 'auth-status'}>
        <span className="status-pill">Not signed in</span>
        {!compact && (
          <div className="button-row">
            <a className="button button--primary" href="/login">
              Create account or sign in
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={compact ? 'auth-status compact' : 'auth-status'}>
      <span className={`status-pill ${enrolled ? 'success' : 'warning'}`}>
        {enrolled ? 'Enrolled' : 'Account active — enrolment required'}
      </span>
      {!compact && (
        <>
          <p>
            Signed in as <strong>{state.principal.userDetails}</strong>.
          </p>
          <div className="button-row">
            {enrolled ? (
              <a className="button button--primary" href="/learn/">
                Continue course
              </a>
            ) : (
              <a className="button button--primary" href="/enrol/">
                Complete enrolment
              </a>
            )}
            <a className="button button--secondary" href="/logout">
              Sign out
            </a>
          </div>
        </>
      )}
    </div>
  );
}
