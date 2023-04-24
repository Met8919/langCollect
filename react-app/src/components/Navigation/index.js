import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';
import { login } from "../../store/session";

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [showMenu, setShowMenu] = useState(false);
	const closeMenu = () => setShowMenu(false);
	const dispatch = useDispatch()


	const handleSubmit = async (e) => {

		const data = await dispatch(login('demo@aa.io', 'password'));
		// if (data) {
		//   setErrors(data);
		// }
	  };

	return (
		<div className="login-signup-container">

			<div className="login-container">

			 <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

			</div>

			<div className="signup-container">

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />

			</div>

			<p className="demo-user" onClick={(e) => handleSubmit(e)}>DEMO USER</p>





		</div>
	);
}

export default Navigation;
