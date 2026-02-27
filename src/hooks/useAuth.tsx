import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

const CREDENTIALS = [
  { username: "dreamz", password: "Dreamz@1", admin: false },
  { username: "admin", password: "Dre@mz@89#", admin: true },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("dc_authenticated") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem("dc_admin") === "true"
  );

  const login = (username: string, password: string): boolean => {
    const match = CREDENTIALS.find(
      (c) => c.username === username && c.password === password
    );
    if (match) {
      sessionStorage.setItem("dc_authenticated", "true");
      sessionStorage.setItem("dc_admin", match.admin ? "true" : "false");
      setIsAuthenticated(true);
      setIsAdmin(match.admin);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("dc_authenticated");
    sessionStorage.removeItem("dc_admin");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
