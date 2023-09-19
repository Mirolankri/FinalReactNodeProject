import React, { createContext, useState, useContext, useMemo, useEffect } from 'react'
import LocalStorage from '../../Helpers/LocalStorage/LocalStorage'
import { AddHourToDate, ConvertStringToDate, currentTime } from '../../Helpers/DateTime';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create the user context
export const UserContext = createContext()

// Create a provider component
export const UserProvider = ({ children }) => {
  console.log('%cfirst in UserProvider', 'background-color: blue;color:#fff;');

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null)
  const [UserBrowserData, setUserBrowserData] = useState({})
  // const [Dogs, setDogs] = useState([])
  const [useUserType, setuseUserType] = useState(false)
  const [isAskUserType, setisAskUserType] = useState(false)
  const [Token, setToken] = useState(LocalStorage.get_item("token"))

  // function handleLogout() {
  //   // Perform logout logic here
  
  //   // Navigate to the desired route (e.g., '/login') after logout
  //   navigate("/login");
  // }
  const GetUserBrowserData = ()=>{
    let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setUserBrowserData({isDarkMode})
  }
  const logout = ()=>{
    LocalStorage.remove_item("username")
    LocalStorage.remove_item("token")
		navigate("/login");
  }

  const CheckUserType = (_userData)=>{
    setisAskUserType(_userData.isDogWalker && _userData.isDogManager)
    if(_userData.isDogWalker) setuseUserType("1")
    if(_userData.isDogManager) setuseUserType("2")
    console.info("useUserType UserProvider",useUserType);
  }
      // const SetUserType = (_UserType)=>{

      // }

  const login = (_userData,_Token) => {
    console.log("in login pro");
    // Assuming successful authentication, set the user data
    setUserData(_userData);
    setToken(_Token)
    LocalStorage.set_item("token",_Token)
    LocalStorage.set_item("username",_userData.username)

  };

  useEffect(() => {
    console.log('%cfirst useEffect in UserProvider', 'background-color: red');
    console.log(Token);

    GetUserBrowserData()
    if (Token) {
      const headers = {
        "Authorization":`Bearer ${Token}`,
      }
      axios.get(`${process.env.REACT_APP_DOMAIN}/user/getme`,{headers:headers})
      .then(response => {
        console.log(" response axios get me",response);
          if (response.data.error_message) {
            alert(response.data.error_message);
            setUserData("");
              setToken("")
              LocalStorage.remove_item("token")
              LocalStorage.remove_item("username")
          } else {
            CheckUserType(response.data.CheckUserLogin)
            setUserData(response.data.CheckUserLogin)
            // console.log(response.data.session.cookie.expires);
            // console.log(response.data.session.Site.username);
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
       if(!["/register","/login"].includes(window.location.pathname)) return navigate("/login")
    }
    console.log('%cend useEffect in UserProvider', 'background-color: red');

  }, [Token]);
  const value = useMemo(() => {
    return { userData, setUserData,login,logout,Token,UserBrowserData,isAskUserType,useUserType, setuseUserType }
}, [userData,Token,useUserType])

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
