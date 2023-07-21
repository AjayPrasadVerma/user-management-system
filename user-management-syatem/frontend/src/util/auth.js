import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const stodredExpireDate = localStorage.getItem("expire");
  const expireDate = new Date(stodredExpireDate);
  const now = new Date();

  const duration = expireDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const tokenDuration = getTokenDuration();
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}
