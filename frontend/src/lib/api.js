const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const TOKEN_KEY = "mediso_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Can't reach the server. Please check your connection and try again.");
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // no JSON body
  }

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong. Please try again.");
  }

  return data;
}

// --- Auth -------------------------------------------------------------
export const registerUser = (payload) => request("/auth/register", { method: "POST", body: payload });
export const loginUser = (payload) => request("/auth/login", { method: "POST", body: payload });
export const fetchMe = () => request("/auth/me", { auth: true });

// --- Contact ------------------------------------------------------------
export const submitContact = (payload) =>
  request("/contact", { method: "POST", body: payload, auth: true });

// --- Newsletter ---------------------------------------------------------
export const subscribeNewsletter = (email) =>
  request("/newsletter", { method: "POST", body: { email } });

// --- Careers --------------------------------------------------------------
export const submitCareerApplication = (payload) =>
  request("/careers/apply", { method: "POST", body: payload });

// --- AI Health Assistant --------------------------------------------------
export const sendChatMessage = (message, sessionId) =>
  request("/ai/chat", {
    method: "POST",
    body: {
      message,
      ...(sessionId ? { sessionId } : {}),
    },
    auth: true,
  });

export const fetchAIStatus = () => request("/ai/status");
