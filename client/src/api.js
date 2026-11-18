
let csrfToken = null;
let csrfRequest = null;

export function setCsrfToken(token) {
  csrfToken = token;
}

export async function initializeCsrf() {
  if (csrfToken) return csrfToken;

  if (!csrfRequest) {
    csrfRequest = fetch('/api/csrf-token', {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Unable to initialize security token.');
        }

        const data = await response.json();

        if (typeof data.csrfToken !== 'string') {
          throw new Error('Invalid security token response.');
        }

        csrfToken = data.csrfToken;
        return csrfToken;
      })
      .finally(() => {
        csrfRequest = null;
      });
  }

  return csrfRequest;
}

export async function apiFetch(url, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const headers = new Headers(options.headers || {});

  const unsafeMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];

  if (unsafeMethods.includes(method)) {
    if (!csrfToken) {
      await initializeCsrf();
    }

    headers.set('x-csrf-token', csrfToken);
  }

  const response = await fetch(url, {
    ...options,
    method,
    headers,
    credentials: 'same-origin',
  });

  // Login and registration replace the session and return
  // a fresh CSRF token. Store that new token.
  if (
    (url === '/api/auth/login' || url === '/api/auth/register') &&
    response.ok
  ) {
    const data = await response.clone().json();

    if (typeof data.csrfToken === 'string') {
      setCsrfToken(data.csrfToken);
    }
  }

  if (url === '/api/auth/logout' && response.ok) {
    setCsrfToken(null);
  }

  return response;
}
