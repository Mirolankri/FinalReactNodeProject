import React, { createContext, useState, useContext, useMemo, useEffect } from 'react'
import LocalStorage from '../../Helpers/LocalStorage/LocalStorage'
import { AddHourToDate, ConvertStringToDate, currentTime } from '../../Helpers/DateTime';
import axios from 'axios';
import Login from '../pages/Login';
// import { Route } from 'react-router-dom';

// Create the user context
export const UserContext = createContext()

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const [Token, setToken] = useState(LocalStorage.get_item("token"))
  axios.defaults.withCredentials = true;

  // const navigate = useNavigate();
  // function handleLogout() {
  //   // Perform logout logic here
  
  //   // Navigate to the desired route (e.g., '/login') after logout
  //   navigate('/login');
  // }

  const login = (_userData,_Token) => {
    console.log("in login pro");
    // Assuming successful authentication, set the user data
    setUserData(_userData);
    setToken(_Token)
    LocalStorage.set_item("token",_Token)
    LocalStorage.set_item("username",_userData.username)

  };
  useEffect( () => {
    console.log("useEffect in UserProvider");

    if (Token) {
      const headers = {
        "Authorization":`Bearer ${Token}`,
      }
      axios.get(`${process.env.REACT_APP_DOMAIN}/user/getme`,{headers:headers})
      .then(response => {
        console.log(" response axios get me",response);
          if (response.data.error_message) {
            alert(response.data.error_message);
          } else {
            setUserData(response.data.CheckUserLogin)
            console.log(response.data.session.cookie.expires);
            console.log(response.data.session.Site.username);
            if(AddHourToDate(ConvertStringToDate(response.data.session.cookie.expires).getTime()) < currentTime || !response.data.session.Site.username)
            {
              console.log("Logout Valid");
              setUserData("");
              setToken("")
              LocalStorage.remove_item("token")
              LocalStorage.remove_item("username")
              // navigate("/logout");
              // handleLogout()
              return
            }
            else
            {
              console.log("Login Valid");
            }
          }  
      })
      .catch((err) => console.error(err));
    }
    else
    {
      
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
    // console.log(context);  
    if (!context) throw new Error("useUser must be used within a UserProvider")
    return context
}
