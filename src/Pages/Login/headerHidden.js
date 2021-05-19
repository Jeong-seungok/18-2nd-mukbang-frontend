import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Components/Header/Header';

const LoginPage = ['/login', '/login/email', '/signup/email'];

export default function Hidden() {
  const { pathname } = useLocation();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(LoginPage.includes(pathname));
  }, [pathname]);

  return <>{login ? null : <Header />}</>;
}
