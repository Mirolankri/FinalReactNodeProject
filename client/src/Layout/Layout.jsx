import React, { useEffect } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { useUser } from '../users/providers/UserProvider';

const Layout = ({children}) => {
  return (
    <>
    <Header/>
      <Main>{children}</Main>
    <Footer/>
    </>
  )
}

export default Layout