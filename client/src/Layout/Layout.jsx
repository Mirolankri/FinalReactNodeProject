import React from 'react'
import {useLocation} from 'react-router-dom'
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

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