"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type AuthUser = {
  access_token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role?: { _id: string; name: string };
    permissions?: string[];
    avatar?: string;
    gender?: string;
  };
};

type AuthContextType = {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUserState] = useState<AuthUser | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("authUser");
    if (userStr) {
      try {
        setAuthUserState(JSON.parse(userStr));
      } catch {
        setAuthUserState(null);
      }
    }
  }, []);

  const setAuthUser = (user: AuthUser | null) => {
    if (user) {
      setAuthUserState(user);
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      setAuthUserState(null);
      localStorage.removeItem("authUser");
    }
  };

  const logout = () => {
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
