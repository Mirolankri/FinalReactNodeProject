import React from 'react'
import {useLocation} from 'react-router-dom'
import NavBar from './nav';
import { excludeNavbarPaths } from '../LayoutSettings';

const Header = () => {
    const location = useLocation();
    // console.log(location);

  // Check if the current path should exclude the Navbar component
    const shouldExcludeNavbar = excludeNavbarPaths.includes(location.pathname);

  return (
    <>
        {!shouldExcludeNavbar && <NavBar />}
    </>  
    )
}

export default Header