import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
// Este contexto fornece o estado de autenticação e funções de login/logout para a aplicação.
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (email, password) => {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {' '}
      {children}{' '}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
