export function getToken() {
  const token = localStorage.getItem('accessToken');
  if (token) return token;
  return null;
}

export function setToken(token: string) {
  localStorage.setItem('accessToken', token);
}

export function removeToken() {
  localStorage.removeItem('accessToken');
}

export function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

export function isTokenExpire(token: string) {
  if (!token) return true;
  const { exp } = parseJwt(token);
  return exp * 1000 < Date.now();
}
