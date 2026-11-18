
import { useState } from 'react';
import { apiFetch } from './api';
import './Auth.css';

function Auth({ onAuthenticated }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (isRegistering && !name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (isRegistering && Array.from(password).length < 12) {
      setError('Password must contain at least 12 characters.');
      return;
    }

    if (new TextEncoder().encode(password).length > 1024) {
      setError('Password is too long.');
      return;
    }

    setLoading(true);

    try {
      const endpoint = isRegistering
        ? '/api/auth/register'
        : '/api/auth/login';

      const response = await apiFetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(isRegistering ? { name: name.trim() } : {}),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      if (!data.student || !data.student.id) {
        throw new Error('Invalid server response.');
      }

      onAuthenticated(data.student);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  function switchMode() {
    setIsRegistering((current) => !current);
    setError('');
    setPassword('');
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo">P</span>
          <h1>PrepTrack</h1>
        </div>

        <h2>
          {isRegistering ? 'Create your account' : 'Welcome back'}
        </h2>

        <p className="auth-subtitle">
          {isRegistering
            ? 'Start organizing your placement preparation.'
            : 'Sign in to continue your preparation journey.'}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="auth-field">
              <label htmlFor="auth-name">Full name</label>
              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                maxLength={100}
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">Email address</label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              maxLength={254}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete={
                isRegistering ? 'new-password' : 'current-password'
              }
              required
            />

            {isRegistering && (
              <small>Minimum 12 characters required.</small>
            )}
          </div>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : isRegistering
                ? 'Create account'
                : 'Login'}
          </button>
        </form>

        <p className="auth-switch">
          {isRegistering
            ? 'Already have an account?'
            : "Don't have an account?"}{' '}
          <button type="button" onClick={switchMode}>
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
