import Cookies from "js-cookie";

const TOKEN_KEY = "sportsee_token";

export function setToken(token) {
  Cookies.set(TOKEN_KEY, token, { sameSite: "strict" });
}

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}