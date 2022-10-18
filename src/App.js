import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './Store/auth-context';

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storedUserLoggedInformation = localStorage.getItem('isLoggedin');

  if (storedUserLoggedInformation === 1) {
    setIsLoggedIn(true);
  }

  useEffect(() => {
    const storedUserLoggedInformation = localStorage.getItem('isLoggedin');

  if (storedUserLoggedInformation === "1") {
    setIsLoggedIn(true);
  }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedin', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedin')
    setIsLoggedIn(false);
  };

  return (
    
      <AuthContext.Provider 
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
      }}
      >
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </AuthContext.Provider>
    
  );
}

export default App;
