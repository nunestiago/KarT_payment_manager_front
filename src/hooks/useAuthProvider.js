import { useState } from 'react';

function useAuthProvider() {
  const [token, setToken] = useState(localStorage.getItem('token') ?? null);
  const [user, setUser] = useState();

  const login = (userData, callback) => {
    setToken(userData.token);
    setUser(userData.usuario);
    localStorage.setItem('token', userData.token);
    if (callback) callback();
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return {
    login,
    logout,
    token,
    user,
  };
}

export default useAuthProvider;
