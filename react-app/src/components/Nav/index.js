import './Nav.css'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getLanguages, getUserLanguages, setCurrentLanguage } from "../../store/language";
import { logout } from "../../store/session";
import {  useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function Nav() {
    const dispatch = useDispatch()
    const languages = useSelector(state => state.languages.languages)
    const userLanguages = useSelector(state => state.languages.userLanguages)
    const currentLanguage = useSelector(state => state.languages.currentLanguage)
    const user = useSelector(state => state.session.user)
    const displayLangs = useSelector(state => state.languages.displayChoices)

    const [showLangs,setShowLangs] = useState(true)
    const history = useLocation()
    const path = history.pathname




    useEffect(() => {



        if (path.includes('/decks/') || !displayLangs) {

            setShowLangs(false)

        } else {

            setShowLangs(true)

            

        }

    },[path,displayLangs])



    const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };




    const handleCurrentLanguage = (e) => {

        const languageName = e.target.innerText
        const lang = languages[languageName]
        console.log(lang)

        dispatch(setCurrentLanguage(lang))






    }




    if (!Object.values(languages).length) return null





    return (


        <>


        <div className="navbar-container">

            <NavLink className='nav-option' to='/'> Profile</NavLink>
            <NavLink className='nav-option' to='/chat'> Chat</NavLink>
            <NavLink className='nav-option' excat to='/decks'> Decks</NavLink>
            <p className='nav-option' onClick={handleLogout}>LOG OUT</p>
            <p className='nav-option' onClick={() => window.open('https://github.com/Met8919')} >ABOUT</p>

        </div>
        <div className='user-languages-container'>

            {showLangs && Object.values(userLanguages).map(lang => (
                <p onClick={(e) => handleCurrentLanguage(e)} className={`user-languages ${currentLanguage?.name === lang.name ? 'active-language' : ''}` } >{lang.name}</p>
            ))}


        </div>
        </>




    )

}
