import React, { createContext, useState, useContext, useMemo, useEffect } from 'react'
import LocalStorage from '../../Helpers/LocalStorage/LocalStorage'

// Create the user context
export const UserContext = createContext()

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const [Token, setToken] = useState(LocalStorage.get_item("token"))


  const login = (_userData,_Token) => {
    console.log("in login pro");
    // Assuming successful authentication, set the user data
    setUserData(_userData);
    setToken(_Token)
    LocalStorage.set_item("token",_Token)
    LocalStorage.set_item("username",_userData.username)

  };
  useEffect( () => {
    console.log("use eff");
    if (Token) {
      // Make an API request to fetch user data using the token
      // Example:
      fetch(`${process.env.REACT_APP_DOMAIN}/user/getme`, {
        method: "GET",
        headers: {
          "Authorization":`Bearer ${Token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error_message) {
            alert(data.error_message);
          } else {
            console.log(data.data);
            // localStorage.setItem("username", data.data.username.username);
            // login(data.data.userdata,data.data.token);
            setUserData(data.CheckUserLogin)
            // navigate("/phone/verify");
          }
        })
        .catch((err) => console.error(err));
    }
  }, [Token]);
  const value = useMemo(() => {
    return { userData, setUserData,login,Token }
}, [userData,Token])

  return (
    <UserContext.Provider value={ value }>
    {/* <UserContext.Provider value={{ userData, setUserData }}> */}
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
    const context = useContext(UserContext)
    console.log(context);
    if (!context) throw new Error("useUser must be used within a UserProvider")
    return context
}
