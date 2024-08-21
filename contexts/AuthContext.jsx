import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  showModal: false,
  setShowModal: () => {} // 여기서 setShowModal을 기본적으로 설정해 줍니다.
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const loggedIn = !!token;
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      setShowModal(true); // 토큰이 없으면 모달을 표시
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setShowModal(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, showModal, setShowModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
