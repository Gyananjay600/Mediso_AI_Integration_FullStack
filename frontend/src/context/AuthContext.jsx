import { createContext, useContext, useEffect, useState } from "react";
import { registerUser, loginUser, fetchMe, getToken, setToken, clearToken } from "../lib/api";

const AuthContext = createContext(null);

const SESSION_KEY = "mediso_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      // Show the cached user immediately for a snappy UI, then verify with the server
      const cached = localStorage.getItem(SESSION_KEY);
      if (cached) {
        try {
          setUser(JSON.parse(cached));
        } catch {
          localStorage.removeItem(SESSION_KEY);
        }
      }

      try {
        const { user: verifiedUser } = await fetchMe();
        setUser(verifiedUser);
        localStorage.setItem(SESSION_KEY, JSON.stringify(verifiedUser));
      } catch {
        // token invalid/expired
        clearToken();
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function register({ name, email, password }) {
    try {
      const { token, user: newUser } = await registerUser({ name, email, password });
      setToken(token);
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
      setUser(newUser);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async function login({ email, password }) {
    try {
      const { token, user: loggedInUser } = await loginUser({ email, password });
      setToken(token);
      localStorage.setItem(SESSION_KEY, JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  function logout() {
    clearToken();
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
