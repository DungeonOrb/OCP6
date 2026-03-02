const API_URL = "http://localhost:8000";

export async function login(emailOrUsername, password) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: emailOrUsername, 
      password,
    }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json(); // { token, userId }
}

export async function getUserInfo(token) {
  const res = await fetch(`${API_URL}/api/user-info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized or failed to fetch user info");
  return res.json();
}

export async function getUserActivity(token, startWeek, endWeek) {
  const res = await fetch(
    `${API_URL}/api/user-activity?startWeek=${encodeURIComponent(startWeek)}&endWeek=${encodeURIComponent(endWeek)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch user activity");
  return res.json(); // array of sessions
}