import React, { useState,useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import LocalStorage from '../../Helpers/LocalStorage/LocalStorage'

// import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Swal from 'sweetalert2'
import { UserContext, useUser } from "../../users/providers/UserProvider";
import  axios  from "axios";



const BlankPage = ({children}) => {
	return (
		<>
		<div className="Auth-form-container">
            <div className="Auth-form-title">
                <img src="/assets/images/logo/logo-orange.png" alt="Main Logo" width='100%'></img>
            </div>
			<form className="Auth-form" style={{backgroundColor:'#FFF8F880'}}>
				<div className="Auth-form-content">
				    {children}
				</div>
			</form>
            <div className="Auth-form-footer">
                <img src="/assets/images/dog/dog-reg.png" alt="Dog Logo" width='100%'></img>
            </div>
		</div>	
		</>
	);
};

export default BlankPage;