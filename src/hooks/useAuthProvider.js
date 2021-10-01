import { useState } from 'react';

function useAuthProvider() {
  const [token, setToken] = useState(localStorage.getItem('token') ?? null);

  const login = (tokenUsuario, callback) => {
    setToken(tokenUsuario);
    localStorage.setItem('token', tokenUsuario);
    if (callback) callback();
  };

  const logout = (callback) => {
    setToken(null);
    localStorage.removeItem('token');
    if (callback) callback();
  };

  return {
    login,
    logout,
    token,
  };
}

export default useAuthProvider;
