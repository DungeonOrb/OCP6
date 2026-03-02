import { userInfoMock } from "../mocks/userInfo.mock";

const USE_MOCKS = false; 
const API_URL = "http://localhost:8000";

export async function fetchUserInfo(token) {
  if (USE_MOCKS) return userInfoMock;

  const res = await fetch(`${API_URL}/api/user-info`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch user info");
  return res.json();
}