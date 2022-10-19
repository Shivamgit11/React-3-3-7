import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
    
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInformation = localStorage.getItem('isLoggedin');
    
    if (storedUserLoggedInformation === "1") {
        setIsLoggedIn(true);
      }
      }, []);

    const LogoutHandler = () => {
        localStorage.removeItem('isLoggedin')
        setIsLoggedIn(false);
    }

    const loginHandler = () => {
        localStorage.setItem('isLoggedin', '1');
        setIsLoggedIn(true);
    };
   
    return <AuthContext.Provider 
    value={{isLoggedIn: isLoggedIn, 
            onLogout: LogoutHandler, 
            onLogin: loginHandler}}
    >{props.children}
    </AuthContext.Provider>
};

export default AuthContext;