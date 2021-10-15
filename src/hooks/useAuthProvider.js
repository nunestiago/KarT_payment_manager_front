import { useState } from 'react';

function useAuthProvider() {
  const [token, setToken] = useState(localStorage.getItem('token') ?? null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userData')) ?? null,
  );

  const login = (userData, callback) => {
    setToken(userData.token);
    setUser(userData.usuario);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userData', JSON.stringify(userData.usuario));
    if (callback) callback();
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  };

  return {
    login,
    logout,
    token,
    user,
    setUser,
  };
}

export default useAuthProvider;
